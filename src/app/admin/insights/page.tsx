import { createServiceClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const QUESTION_LABELS: Record<string, { question: string; options: string[] }> = {
  battery: { question: "Life battery level", options: ["Almost dead (5%)", "Low, barely getting through", "Okay, not great not bad", "Charged, just need direction"] },
  one_change: { question: "One area to change", options: ["Money", "Mind", "Body", "Spirit"] },
  income: { question: "Income feeling", options: ["Not enough, no path", "Covers basics only", "Okay but want more", "Not my main concern"] },
  income_target: { question: "Income target", options: ["₱5K-15K extra", "Replace my job", "₱50K+ freedom", "Just stability"] },
  digital_skills: { question: "Digital comfort", options: ["Very comfortable", "Need clear steps", "Nervous but willing", "Not sure if I can"] },
  follow_through: { question: "What stops follow-through", options: ["Lose motivation", "Don't know where to start", "Get distracted", "Afraid it won't work"] },
  success_def: { question: "Success definition", options: ["Financial freedom for family", "Meaningful work", "Time for loved ones", "Being proud of myself"] },
  commitment: { question: "Willing to commit", options: ["Yes, done starting things", "Want to, need support", "Not sure yet"] },
  sleep: { question: "Sleep hours", options: ["Under 5", "5-6 hours", "6-7 hours", "7-8+ hours"] },
  free_time: { question: "Dream free time", options: ["Build something own", "Help family/community", "Learn and grow", "Experience life/travel"] },
};

export default async function InsightsPage() {
  const db = createServiceClient();

  const { data: users } = await db.from("users").select("id, primary_path, secondary_path, plan, recommendation_plan, recommendation_track, has_paid, income_target, digital_comfort, created_at");
  const { data: answers } = await db.from("questionnaire_answers").select("user_id, answers, scores");
  const { data: progress } = await db.from("user_progress").select("user_id, lesson_id, completed").eq("completed", true);
  const { data: payments } = await db.from("payments").select("user_id, amount, status").eq("status", "completed");

  const totalUsers = users?.length ?? 0;
  const paidUsers = (users ?? []).filter(u => u.has_paid);

  // ─── 1. Pillar Popularity ───
  const pillarCount: Record<string, number> = {};
  const pillarPaid: Record<string, number> = {};
  (users ?? []).forEach(u => {
    if (u.primary_path) {
      pillarCount[u.primary_path] = (pillarCount[u.primary_path] ?? 0) + 1;
      if (u.has_paid) pillarPaid[u.primary_path] = (pillarPaid[u.primary_path] ?? 0) + 1;
    }
  });
  const pillarConversion = Object.entries(pillarCount).map(([p, total]) => ({
    pillar: p,
    total,
    paid: pillarPaid[p] ?? 0,
    rate: total > 0 ? Math.round(((pillarPaid[p] ?? 0) / total) * 100) : 0,
  })).sort((a, b) => b.rate - a.rate);

  // ─── 2. Which answer converts best ───
  const answerConversion: Record<string, { question: string; option: string; total: number; paid: number; rate: number }[]> = {};
  const paidUserIds = new Set(paidUsers.map(u => u.id));

  for (const qId of Object.keys(QUESTION_LABELS)) {
    const ql = QUESTION_LABELS[qId];
    const optionStats = ql.options.map((opt, idx) => {
      const usersWithAnswer = (answers ?? []).filter(a => {
        const ans = a.answers as Record<string, number> | null;
        return ans && ans[qId] === idx;
      });
      const total = usersWithAnswer.length;
      const paid = usersWithAnswer.filter(a => paidUserIds.has(a.user_id)).length;
      return { question: ql.question, option: opt, total, paid, rate: total > 0 ? Math.round((paid / total) * 100) : 0 };
    }).filter(o => o.total > 0);

    if (optionStats.length > 0) {
      answerConversion[qId] = optionStats.sort((a, b) => b.rate - a.rate);
    }
  }

  // ─── 3. Revenue per pillar ───
  const revenueByPillar: Record<string, number> = {};
  (payments ?? []).forEach(p => {
    const user = (users ?? []).find(u => u.id === p.user_id);
    if (user?.primary_path) {
      revenueByPillar[user.primary_path] = (revenueByPillar[user.primary_path] ?? 0) + (p.amount / 100);
    }
  });

  // ─── 4. Income target vs conversion ───
  const incomeTargetLabels = ["₱5K-15K extra", "Replace job", "₱50K+ freedom", "Just stability"];
  const incomeStats = incomeTargetLabels.map((label, idx) => {
    const usersWithTarget = (users ?? []).filter(u => u.income_target === idx);
    const paid = usersWithTarget.filter(u => u.has_paid).length;
    return { label, total: usersWithTarget.length, paid, rate: usersWithTarget.length > 0 ? Math.round((paid / usersWithTarget.length) * 100) : 0 };
  }).filter(s => s.total > 0);

  // ─── 5. Digital comfort vs conversion ───
  const digitalLabels = ["Very comfortable", "Need clear steps", "Nervous but willing", "Not sure"];
  const digitalStats = digitalLabels.map((label, idx) => {
    const usersWithLevel = (users ?? []).filter(u => u.digital_comfort === idx);
    const paid = usersWithLevel.filter(u => u.has_paid).length;
    return { label, total: usersWithLevel.length, paid, rate: usersWithLevel.length > 0 ? Math.round((paid / usersWithLevel.length) * 100) : 0 };
  }).filter(s => s.total > 0);

  // ─── 6. Recommended plan acceptance rate ───
  const recAcceptance = { matched: 0, upgraded: 0, downgraded: 0, total: 0 };
  paidUsers.forEach(u => {
    if (u.recommendation_plan && u.plan) {
      recAcceptance.total++;
      const plans = ["core", "pro", "ai"];
      const recIdx = plans.indexOf(u.recommendation_plan);
      const actualIdx = plans.indexOf(u.plan);
      if (recIdx === actualIdx) recAcceptance.matched++;
      else if (actualIdx > recIdx) recAcceptance.upgraded++;
      else recAcceptance.downgraded++;
    }
  });

  // ─── 7. Top performing tracks ───
  const trackConversion: Record<string, { total: number; paid: number }> = {};
  (users ?? []).forEach(u => {
    if (u.recommendation_track) {
      if (!trackConversion[u.recommendation_track]) trackConversion[u.recommendation_track] = { total: 0, paid: 0 };
      trackConversion[u.recommendation_track].total++;
      if (u.has_paid) trackConversion[u.recommendation_track].paid++;
    }
  });

  // ─── 8. Engagement by pillar ───
  const lessonsByUser: Record<string, number> = {};
  (progress ?? []).forEach(p => { lessonsByUser[p.user_id] = (lessonsByUser[p.user_id] ?? 0) + 1; });

  const engagementByPillar: Record<string, { users: number; totalLessons: number }> = {};
  (users ?? []).filter(u => u.has_paid).forEach(u => {
    const p = u.primary_path;
    if (!p) return;
    if (!engagementByPillar[p]) engagementByPillar[p] = { users: 0, totalLessons: 0 };
    engagementByPillar[p].users++;
    engagementByPillar[p].totalLessons += (lessonsByUser[u.id] ?? 0);
  });

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Marketing Insights</h1>
      <p className="mb-6 text-sm text-muted-foreground">Data-driven insights to optimize content, messaging, and conversion.</p>

      {/* ═══ INSIGHT 1: Which pillar converts best ═══ */}
      <Section title="🎯 Which Pillar Converts Best?" sub="Focus marketing on the pillar with highest conversion rate">
        <div className="space-y-2">
          {pillarConversion.map((p, i) => (
            <div key={p.pillar} className="flex items-center gap-3 rounded-lg border p-3">
              <span className="text-lg">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "📊"}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold capitalize">{p.pillar}</span>
                  {i === 0 && <Badge className="text-[9px] bg-emerald-50 text-emerald-600 border-emerald-200">Best Converter</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{p.total} users → {p.paid} paid</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold">{p.rate}%</span>
                <p className="text-[10px] text-muted-foreground">conversion</p>
              </div>
              {revenueByPillar[p.pillar] && (
                <div className="text-right">
                  <span className="text-sm font-semibold">₱{revenueByPillar[p.pillar].toLocaleString()}</span>
                  <p className="text-[10px] text-muted-foreground">revenue</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <Takeaway text={pillarConversion[0] ? `Lead with "${pillarConversion[0].pillar}" messaging in ads — it converts ${pillarConversion[0].rate}% of users.` : "Need more data."} />
      </Section>

      {/* ═══ INSIGHT 2: Income target vs conversion ═══ */}
      <Section title="💰 Income Ambition vs Conversion" sub="Which income target group pays most?">
        <div className="space-y-2">
          {incomeStats.map((s) => (
            <div key={s.label} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.total} users → {s.paid} paid</p>
              </div>
              <span className={`text-lg font-bold ${s.rate >= 50 ? "text-emerald-600" : s.rate >= 25 ? "text-amber-600" : ""}`}>{s.rate}%</span>
            </div>
          ))}
        </div>
        <Takeaway text={incomeStats[0] ? `Users wanting "${incomeStats.sort((a,b) => b.rate - a.rate)[0].label}" convert at ${incomeStats.sort((a,b) => b.rate - a.rate)[0].rate}%. Target this segment in ads.` : "Need more data."} />
      </Section>

      {/* ═══ INSIGHT 3: Digital comfort vs conversion ═══ */}
      <Section title="🖥️ Digital Comfort vs Conversion" sub="Do tech-savvy users pay more?">
        <div className="space-y-2">
          {digitalStats.map((s) => (
            <div key={s.label} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.total} users</p>
              </div>
              <span className="text-lg font-bold">{s.rate}%</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ INSIGHT 4: Recommendation acceptance ═══ */}
      {recAcceptance.total > 0 && (
        <Section title="🤖 Does the Recommendation Engine Work?" sub="Do users buy what we recommend?">
          <div className="grid grid-cols-3 gap-3">
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">{recAcceptance.total > 0 ? Math.round((recAcceptance.matched / recAcceptance.total) * 100) : 0}%</p>
              <p className="text-xs text-muted-foreground">Bought recommended</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{recAcceptance.total > 0 ? Math.round((recAcceptance.upgraded / recAcceptance.total) * 100) : 0}%</p>
              <p className="text-xs text-muted-foreground">Upgraded higher</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{recAcceptance.total > 0 ? Math.round((recAcceptance.downgraded / recAcceptance.total) * 100) : 0}%</p>
              <p className="text-xs text-muted-foreground">Chose lower</p>
            </CardContent></Card>
          </div>
          <Takeaway text={recAcceptance.matched > recAcceptance.downgraded ? "Recommendation engine is working — most users trust the suggestion." : "Users are downgrading from recommendations. Consider adjusting the algorithm or the pricing page."} />
        </Section>
      )}

      {/* ═══ INSIGHT 5: Track conversion ═══ */}
      <Section title="📈 Track Performance" sub="Which income track gets chosen most?">
        <div className="space-y-2">
          {Object.entries(trackConversion).sort((a, b) => b[1].paid - a[1].paid).map(([track, data]) => (
            <div key={track} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">{track}</p>
                <p className="text-xs text-muted-foreground">{data.total} recommended → {data.paid} paid</p>
              </div>
              <span className="text-lg font-bold">{data.total > 0 ? Math.round((data.paid / data.total) * 100) : 0}%</span>
            </div>
          ))}
          {Object.keys(trackConversion).length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
        </div>
      </Section>

      {/* ═══ INSIGHT 6: Engagement by pillar ═══ */}
      <Section title="📚 Engagement by Pillar" sub="Which pillar users complete the most lessons?">
        <div className="space-y-2">
          {Object.entries(engagementByPillar).sort((a, b) => {
            const avgA = a[1].users > 0 ? a[1].totalLessons / a[1].users : 0;
            const avgB = b[1].users > 0 ? b[1].totalLessons / b[1].users : 0;
            return avgB - avgA;
          }).map(([pillar, data]) => {
            const avg = data.users > 0 ? (data.totalLessons / data.users).toFixed(1) : "0";
            return (
              <div key={pillar} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium capitalize">{pillar}</p>
                  <p className="text-xs text-muted-foreground">{data.users} paid users</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold">{avg}</span>
                  <p className="text-[10px] text-muted-foreground">avg lessons</p>
                </div>
              </div>
            );
          })}
        </div>
        <Takeaway text="Pillars with higher engagement = better content. Low engagement = review lesson quality or relevance." />
      </Section>

      {/* ═══ INSIGHT 7: Best answer combinations for conversion ═══ */}
      <Section title="🔑 Highest Converting Answers" sub="Which questionnaire answers predict a paying customer?">
        <div className="space-y-4">
          {Object.entries(answerConversion).slice(0, 6).map(([qId, options]) => (
            <div key={qId}>
              <p className="mb-1.5 text-xs font-semibold text-muted-foreground">{options[0].question}</p>
              <div className="space-y-1">
                {options.map((o, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex-1 h-5 rounded bg-muted overflow-hidden">
                      <div className={`h-full rounded ${o.rate >= 50 ? "bg-emerald-400" : o.rate >= 25 ? "bg-amber-400" : "bg-muted-foreground/20"}`} style={{ width: `${Math.max(o.rate, 3)}%` }} />
                    </div>
                    <span className="w-32 text-xs truncate text-muted-foreground">{o.option}</span>
                    <span className="w-10 text-xs font-semibold text-right">{o.rate}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Takeaway text="Use the highest-converting answer profiles in your Facebook ad targeting. Lead with the pain points these users selected." />
      </Section>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      <p className="mb-4 text-xs text-muted-foreground">{sub}</p>
      {children}
    </div>
  );
}

function Takeaway({ text }: { text: string }) {
  return (
    <div className="mt-3 rounded-lg border-l-4 border-primary bg-primary/[0.04] px-4 py-3">
      <p className="text-xs font-medium">
        <span className="text-primary font-semibold">Takeaway: </span>
        {text}
      </p>
    </div>
  );
}
