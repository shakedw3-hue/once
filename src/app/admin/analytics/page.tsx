import { createServiceClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const QUESTION_NAMES: Record<string, string> = {
  battery: "Q1: Life battery level",
  proud: "Q2: Last time proud",
  one_change: "Q3: One area to change",
  two_years: "Q4: 2-year vision",
  follow_through: "Q5: Follow-through blocker",
  income: "Q6: Income feeling",
  sleep: "Q7: Sleep hours",
  reaction: "Q8: Reaction to problems",
  values: "Q9: Clear values",
  habits: "Q10: Habit consistency",
  free_time: "Q11: Free time dream",
  income_target: "Q12: Income target",
  digital_skills: "Q13: Digital comfort",
  success_def: "Q14: Success definition",
  commitment: "Q15: Commitment",
};

export default async function AdminAnalyticsPage() {
  const db = createServiceClient();

  // ─── Core counts ───
  const { count: totalSignups } = await db.from("users").select("*", { count: "exact", head: true });
  const { count: questionnaireDone } = await db.from("questionnaire_answers").select("*", { count: "exact", head: true });
  const { count: paidUsers } = await db.from("users").select("*", { count: "exact", head: true }).eq("has_paid", true);

  // Users with progress
  const { data: progressData } = await db.from("user_progress").select("user_id, lesson_id").eq("completed", true);
  const userLessonCount: Record<string, number> = {};
  (progressData ?? []).forEach(r => { userLessonCount[r.user_id] = (userLessonCount[r.user_id] ?? 0) + 1; });
  const startedCount = Object.keys(userLessonCount).length;
  const completed5 = Object.values(userLessonCount).filter(c => c >= 5).length;
  const completed10 = Object.values(userLessonCount).filter(c => c >= 10).length;
  const completed25 = Object.values(userLessonCount).filter(c => c >= 25).length;
  const totalLessonsDone = Object.values(userLessonCount).reduce((s, v) => s + v, 0);
  const avgLessons = startedCount > 0 ? (totalLessonsDone / startedCount).toFixed(1) : "0";

  // ─── Funnel ───
  const funnel = [
    { stage: "Visited Site", count: totalSignups ?? 0, note: "Signed up" },
    { stage: "Completed Questionnaire", count: questionnaireDone ?? 0, note: "" },
    { stage: "Paid", count: paidUsers ?? 0, note: "" },
    { stage: "Started Learning", count: startedCount, note: "1+ lessons" },
    { stage: "5+ Lessons", count: completed5, note: "" },
    { stage: "10+ Lessons", count: completed10, note: "" },
    { stage: "25+ Lessons", count: completed25, note: "Power user" },
  ];
  const maxFunnel = funnel[0]?.count || 1;

  // ─── Question-by-question drop-off ───
  const { data: allAnswers } = await db.from("questionnaire_answers").select("answers");
  const questionOrder = ["battery", "proud", "one_change", "two_years", "follow_through", "income", "sleep", "reaction", "values", "habits", "free_time", "income_target", "digital_skills", "success_def", "commitment"];
  const questionCounts = questionOrder.map(qId => {
    const count = (allAnswers ?? []).filter(row => {
      const ans = row.answers as Record<string, unknown> | null;
      return ans && qId in ans;
    }).length;
    return { id: qId, name: QUESTION_NAMES[qId] || qId, count };
  });
  const totalStarts = allAnswers?.length ?? 0;

  // ─── Path/Plan/Track distribution ───
  const { data: userData } = await db.from("users").select("primary_path, plan, recommendation_plan, recommendation_track, utm_source, device_type, created_at, last_activity_date, current_streak");

  const pathDist: Record<string, number> = {};
  const planDist: Record<string, number> = {};
  const trackDist: Record<string, number> = {};
  const sourceDist: Record<string, number> = {};
  const deviceDist: Record<string, number> = {};
  const streaks = (userData ?? []).map(u => u.current_streak ?? 0);
  const avgStreak = streaks.length > 0 ? (streaks.reduce((s, v) => s + v, 0) / streaks.length).toFixed(1) : "0";

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  let activeIn7 = 0;

  const signupsByDay = [0, 0, 0, 0, 0, 0, 0];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  (userData ?? []).forEach(u => {
    if (u.primary_path) pathDist[u.primary_path] = (pathDist[u.primary_path] ?? 0) + 1;
    if (u.plan) planDist[u.plan] = (planDist[u.plan] ?? 0) + 1;
    if (u.recommendation_track) trackDist[u.recommendation_track] = (trackDist[u.recommendation_track] ?? 0) + 1;
    const src = u.utm_source || "direct";
    sourceDist[src] = (sourceDist[src] ?? 0) + 1;
    const dev = u.device_type || "unknown";
    deviceDist[dev] = (deviceDist[dev] ?? 0) + 1;
    if (u.last_activity_date && new Date(u.last_activity_date) >= sevenDaysAgo) activeIn7++;
    signupsByDay[new Date(u.created_at).getDay()]++;
  });

  const maxDaySignups = Math.max(...signupsByDay, 1);

  // ─── Revenue / AOV ───
  const { data: payments } = await db.from("payments").select("amount, status, created_at").eq("status", "completed");
  const totalRevenue = (payments ?? []).reduce((s, p) => s + (p.amount ?? 0), 0) / 100;
  const orderCount = (payments ?? []).length;
  const aov = orderCount > 0 ? (totalRevenue / orderCount).toFixed(0) : "0";

  // This month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const monthRevenue = (payments ?? []).filter(p => new Date(p.created_at) >= startOfMonth).reduce((s, p) => s + (p.amount ?? 0), 0) / 100;

  // ─── Recent events ───
  const { data: recentEvents } = await db.from("analytics").select("event, created_at, user_id").order("created_at", { ascending: false }).limit(20);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Analytics</h1>

      {/* ═══ KEY METRICS ═══ */}
      <div className="mb-8 grid gap-3 grid-cols-2 sm:grid-cols-4">
        <MetricCard label="Total Users" value={totalSignups ?? 0} />
        <MetricCard label="Paid Users" value={paidUsers ?? 0} sub={`${totalSignups ? Math.round(((paidUsers ?? 0) / (totalSignups ?? 1)) * 100) : 0}% conversion`} />
        <MetricCard label="Total Revenue" value={`₱${totalRevenue.toLocaleString()}`} sub={`₱${monthRevenue.toLocaleString()} this month`} />
        <MetricCard label="AOV" value={`₱${aov}`} sub={`${orderCount} orders`} />
      </div>

      <div className="mb-8 grid gap-3 grid-cols-2 sm:grid-cols-4">
        <MetricCard label="Avg Streak" value={`${avgStreak} days`} />
        <MetricCard label="Active (7d)" value={activeIn7} sub={`${totalSignups ? Math.round((activeIn7 / (totalSignups ?? 1)) * 100) : 0}% of total`} />
        <MetricCard label="Avg Lessons/User" value={avgLessons} sub={`${startedCount} active users`} />
        <MetricCard label="Total Lessons Done" value={totalLessonsDone} />
      </div>

      {/* ═══ CONVERSION FUNNEL ═══ */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Conversion Funnel</h2>
        <Card>
          <CardContent className="p-5">
            <div className="space-y-3">
              {funnel.map((step, i) => {
                const pct = maxFunnel > 0 ? Math.round((step.count / maxFunnel) * 100) : 0;
                const dropoff = i > 0 && funnel[i - 1].count > 0
                  ? Math.round(((funnel[i - 1].count - step.count) / funnel[i - 1].count) * 100) : null;
                return (
                  <div key={step.stage}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{step.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{step.count}</span>
                        {dropoff !== null && dropoff > 0 && (
                          <span className={`text-xs ${dropoff > 50 ? "text-red-500 font-semibold" : "text-amber-500"}`}>-{dropoff}%</span>
                        )}
                      </div>
                    </div>
                    <div className="h-5 overflow-hidden rounded bg-muted">
                      <div className="h-full rounded bg-primary/70" style={{ width: `${Math.max(pct, 2)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══ QUESTIONNAIRE DROP-OFF ═══ */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Questionnaire Drop-off (Question by Question)</h2>
        <Card>
          <CardContent className="p-5">
            {totalStarts === 0 ? (
              <p className="text-sm text-muted-foreground">No questionnaire data yet.</p>
            ) : (
              <div className="space-y-2">
                {questionCounts.map((q, i) => {
                  const pct = totalStarts > 0 ? Math.round((q.count / totalStarts) * 100) : 0;
                  const prev = i > 0 ? questionCounts[i - 1].count : totalStarts;
                  const drop = prev > 0 ? Math.round(((prev - q.count) / prev) * 100) : 0;
                  return (
                    <div key={q.id} className="flex items-center gap-3">
                      <span className="w-48 text-xs text-muted-foreground truncate">{q.name}</span>
                      <div className="flex-1 h-4 rounded bg-muted overflow-hidden">
                        <div className={`h-full rounded ${drop > 20 ? "bg-red-400" : drop > 10 ? "bg-amber-400" : "bg-emerald-400"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-xs font-medium text-right">{q.count}</span>
                      {drop > 0 && i > 0 && (
                        <span className={`w-10 text-[10px] text-right ${drop > 20 ? "text-red-500 font-bold" : "text-muted-foreground"}`}>-{drop}%</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ═══ DISTRIBUTIONS ═══ */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {/* Path distribution */}
        <Card>
          <CardContent className="p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Primary Path Distribution</p>
            <div className="space-y-2">
              {Object.entries(pathDist).sort((a, b) => b[1] - a[1]).map(([path, count]) => (
                <div key={path} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{path}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan distribution */}
        <Card>
          <CardContent className="p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plan Distribution</p>
            <div className="space-y-2">
              {Object.entries(planDist).sort((a, b) => b[1] - a[1]).map(([plan, count]) => (
                <div key={plan} className="flex items-center justify-between">
                  <span className="text-sm">{plan === "ai" ? "AI Careers" : plan.charAt(0).toUpperCase() + plan.slice(1)}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Track distribution */}
        <Card>
          <CardContent className="p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recommended Track</p>
            <div className="space-y-2">
              {Object.entries(trackDist).sort((a, b) => b[1] - a[1]).map(([track, count]) => (
                <div key={track} className="flex items-center justify-between">
                  <span className="text-sm">{track}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
              {Object.keys(trackDist).length === 0 && <p className="text-xs text-muted-foreground">No data yet</p>}
            </div>
          </CardContent>
        </Card>

        {/* Traffic source */}
        <Card>
          <CardContent className="p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Traffic Source</p>
            <div className="space-y-2">
              {Object.entries(sourceDist).sort((a, b) => b[1] - a[1]).map(([src, count]) => (
                <div key={src} className="flex items-center justify-between">
                  <span className="text-sm">{src}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══ SIGNUPS BY DAY ═══ */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Signups by Day</h2>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-end gap-2 h-28">
              {dayNames.map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-bold">{signupsByDay[i]}</span>
                  <div className="w-full rounded-t bg-primary/70" style={{ height: `${Math.max((signupsByDay[i] / maxDaySignups) * 100, 4)}%` }} />
                  <span className="text-[10px] text-muted-foreground">{day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══ ACTIVITY LOG ═══ */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {(recentEvents ?? []).map((ev, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5">
                  <Badge variant="outline" className="font-mono text-[10px]">{ev.event}</Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(ev.created_at).toLocaleDateString()} {new Date(ev.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
              {(!recentEvents || recentEvents.length === 0) && (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">No events yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
        {sub && <p className="mt-0.5 text-[10px] text-muted-foreground">{sub}</p>}
      </CardContent>
    </Card>
  );
}
