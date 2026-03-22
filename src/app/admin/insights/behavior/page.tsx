import { createServiceClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default async function BehaviorPage() {
  const db = createServiceClient();

  const { data: users } = await db.from("users").select("id, full_name, email, primary_path, plan, has_paid, current_streak, longest_streak, last_activity_date, created_at");
  const { data: progress } = await db.from("user_progress").select("user_id, lesson_id, completed, completed_at").eq("completed", true);
  const { data: tracking } = await db.from("user_tracking").select("user_id, entry_date, metric_type");

  // Build user profiles
  const userProfiles = (users ?? []).map(u => {
    const lessons = (progress ?? []).filter(p => p.user_id === u.id);
    const trackingDays = new Set((tracking ?? []).filter(t => t.user_id === u.id).map(t => t.entry_date)).size;
    const daysSinceSignup = Math.max(1, Math.ceil((Date.now() - new Date(u.created_at).getTime()) / 86400000));
    const lastActive = u.last_activity_date ? Math.ceil((Date.now() - new Date(u.last_activity_date).getTime()) / 86400000) : null;

    // Calculate activity days (unique days with lesson completions)
    const activeDays = new Set(lessons.filter(l => l.completed_at).map(l => l.completed_at!.split("T")[0])).size;

    // Consistency score: active days / days since signup (max 100%)
    const consistency = Math.min(100, Math.round((activeDays / daysSinceSignup) * 100));

    // Velocity: lessons per active day
    const velocity = activeDays > 0 ? (lessons.length / activeDays).toFixed(1) : "0";

    return {
      ...u,
      lessonsCompleted: lessons.length,
      activeDays,
      trackingDays,
      daysSinceSignup,
      lastActiveDaysAgo: lastActive,
      consistency,
      velocity: parseFloat(velocity as string),
      // Engagement score: weighted combination
      engagementScore: Math.round(
        (u.current_streak ?? 0) * 3 +
        lessons.length * 2 +
        activeDays * 2 +
        trackingDays * 1 +
        consistency * 0.5
      ),
    };
  }).sort((a, b) => b.engagementScore - a.engagementScore);

  const paidProfiles = userProfiles.filter(u => u.has_paid);
  const maxEngagement = userProfiles[0]?.engagementScore || 1;

  // ─── Segments ───
  const champions = paidProfiles.filter(u => u.consistency >= 60 && u.lessonsCompleted >= 10);
  const risking = paidProfiles.filter(u => u.lastActiveDaysAgo !== null && u.lastActiveDaysAgo > 3 && u.lastActiveDaysAgo <= 14 && u.lessonsCompleted > 0);
  const dormant = paidProfiles.filter(u => u.lastActiveDaysAgo !== null && u.lastActiveDaysAgo > 14);
  const newActive = paidProfiles.filter(u => u.daysSinceSignup <= 7 && u.lessonsCompleted > 0);

  // ─── Averages ───
  const avgLessons = paidProfiles.length > 0 ? (paidProfiles.reduce((s, u) => s + u.lessonsCompleted, 0) / paidProfiles.length).toFixed(1) : "0";
  const avgStreak = paidProfiles.length > 0 ? (paidProfiles.reduce((s, u) => s + (u.current_streak ?? 0), 0) / paidProfiles.length).toFixed(1) : "0";
  const avgConsistency = paidProfiles.length > 0 ? Math.round(paidProfiles.reduce((s, u) => s + u.consistency, 0) / paidProfiles.length) : 0;
  const avgActiveDays = paidProfiles.length > 0 ? (paidProfiles.reduce((s, u) => s + u.activeDays, 0) / paidProfiles.length).toFixed(1) : "0";

  // ─── Retention cohort (simplified) ───
  // What % of users who signed up X days ago are still active?
  const retentionBuckets = [
    { label: "Day 1", days: 1 },
    { label: "Day 3", days: 3 },
    { label: "Day 7", days: 7 },
    { label: "Day 14", days: 14 },
    { label: "Day 30", days: 30 },
  ].map(bucket => {
    const eligible = paidProfiles.filter(u => u.daysSinceSignup >= bucket.days);
    const retained = eligible.filter(u => u.activeDays >= Math.min(bucket.days, u.activeDays + 1) || (u.lastActiveDaysAgo !== null && u.lastActiveDaysAgo <= bucket.days));
    return {
      ...bucket,
      eligible: eligible.length,
      retained: retained.length,
      rate: eligible.length > 0 ? Math.round((retained.length / eligible.length) * 100) : 0,
    };
  });

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">User Behavior</h1>
      <p className="mb-6 text-sm text-muted-foreground">Who is actually using the product and who needs attention.</p>

      {/* ═══ OVERVIEW CARDS ═══ */}
      <div className="mb-8 grid gap-3 grid-cols-2 sm:grid-cols-4">
        <MetricCard label="Avg Lessons/User" value={avgLessons} />
        <MetricCard label="Avg Streak" value={`${avgStreak} days`} />
        <MetricCard label="Avg Consistency" value={`${avgConsistency}%`} />
        <MetricCard label="Avg Active Days" value={avgActiveDays} />
      </div>

      {/* ═══ USER SEGMENTS ═══ */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">User Segments</h2>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
          <SegmentCard emoji="🏆" label="Champions" count={champions.length} sub="60%+ consistency, 10+ lessons" color="emerald" />
          <SegmentCard emoji="🌱" label="New Active" count={newActive.length} sub="Signed up this week, started learning" color="blue" />
          <SegmentCard emoji="⚠️" label="At Risk" count={risking.length} sub="3-14 days inactive" color="amber" />
          <SegmentCard emoji="💤" label="Dormant" count={dormant.length} sub="14+ days inactive" color="red" />
        </div>
      </div>

      {/* ═══ RETENTION ═══ */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Retention</h2>
        <Card>
          <CardContent className="p-5">
            <div className="space-y-3">
              {retentionBuckets.map((b) => (
                <div key={b.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{b.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{b.rate}%</span>
                      <span className="text-xs text-muted-foreground">({b.retained}/{b.eligible})</span>
                    </div>
                  </div>
                  <div className="h-4 rounded bg-muted overflow-hidden">
                    <div className={`h-full rounded ${b.rate >= 70 ? "bg-emerald-400" : b.rate >= 40 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${Math.max(b.rate, 3)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Takeaway text={retentionBuckets[2]?.rate < 50 ? "Week 1 retention is below 50%. Focus on improving the first 3 lessons and adding a Day 3 email reminder." : "Week 1 retention is healthy. Keep the momentum going."} />
          </CardContent>
        </Card>
      </div>

      {/* ═══ TOP USERS (Champions) ═══ */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">🏆 Top Users by Engagement</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">#</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">User</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Lessons</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Streak</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Consistency</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Active Days</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {userProfiles.slice(0, 15).map((u, i) => (
                    <tr key={u.id} className={i < 3 ? "bg-amber-50/30" : ""}>
                      <td className="px-4 py-2.5 font-bold text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-2.5">
                        <p className="font-medium text-sm">{u.full_name || "—"}</p>
                        <p className="text-[10px] text-muted-foreground">{u.email}</p>
                      </td>
                      <td className="px-4 py-2.5 font-semibold">{u.lessonsCompleted}</td>
                      <td className="px-4 py-2.5">🔥 {u.current_streak ?? 0}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <Progress value={u.consistency} className="h-1.5 w-12" />
                          <span className="text-xs">{u.consistency}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-xs">{u.activeDays}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded bg-muted overflow-hidden">
                            <div className="h-full rounded bg-primary" style={{ width: `${(u.engagementScore / maxEngagement) * 100}%` }} />
                          </div>
                          <span className="text-xs font-bold">{u.engagementScore}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══ AT RISK USERS ═══ */}
      {risking.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">⚠️ At Risk — Need Attention</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {risking.slice(0, 10).map((u) => (
                  <div key={u.id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{u.full_name || u.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {u.lessonsCompleted} lessons · Last active {u.lastActiveDaysAgo} days ago
                      </p>
                    </div>
                    <Badge variant="outline" className="text-amber-600 border-amber-300 text-[10px]">
                      {u.lastActiveDaysAgo}d inactive
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Takeaway text={`${risking.length} paid users haven't been active in 3-14 days. Send them a re-engagement email with their progress and next lesson.`} />
        </div>
      )}

      {/* ═══ DORMANT USERS ═══ */}
      {dormant.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">💤 Dormant — 14+ Days Inactive</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {dormant.slice(0, 10).map((u) => (
                  <div key={u.id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{u.full_name || u.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {u.lessonsCompleted} lessons · Inactive {u.lastActiveDaysAgo} days
                      </p>
                    </div>
                    <Badge variant="outline" className="text-red-500 border-red-300 text-[10px]">
                      dormant
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Takeaway text={`${dormant.length} users stopped using Once. Consider a "We miss you" email with a special offer or new content announcement.`} />
        </div>
      )}

      {/* ═══ VELOCITY ═══ */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">⚡ Learning Velocity</h2>
        <p className="mb-3 text-xs text-muted-foreground">Lessons per active day — who learns fast vs slow</p>
        <div className="grid gap-3 grid-cols-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{paidProfiles.filter(u => u.velocity >= 2).length}</p>
              <p className="text-xs text-muted-foreground">Fast learners</p>
              <p className="text-[10px] text-emerald-500">2+ lessons/day</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{paidProfiles.filter(u => u.velocity >= 1 && u.velocity < 2).length}</p>
              <p className="text-xs text-muted-foreground">Steady</p>
              <p className="text-[10px] text-blue-500">1-2 lessons/day</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{paidProfiles.filter(u => u.velocity > 0 && u.velocity < 1).length}</p>
              <p className="text-xs text-muted-foreground">Slow & steady</p>
              <p className="text-[10px] text-amber-500">&lt;1 lesson/day</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card><CardContent className="p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </CardContent></Card>
  );
}

function SegmentCard({ emoji, label, count, sub, color }: { emoji: string; label: string; count: number; sub: string; color: string }) {
  const colors: Record<string, string> = {
    emerald: "border-emerald-200 bg-emerald-50/50",
    blue: "border-blue-200 bg-blue-50/50",
    amber: "border-amber-200 bg-amber-50/50",
    red: "border-red-200 bg-red-50/50",
  };
  return (
    <Card className={colors[color] || ""}>
      <CardContent className="p-4 text-center">
        <p className="text-2xl">{emoji}</p>
        <p className="mt-1 text-2xl font-bold">{count}</p>
        <p className="text-xs font-medium">{label}</p>
        <p className="text-[9px] text-muted-foreground">{sub}</p>
      </CardContent>
    </Card>
  );
}

function Takeaway({ text }: { text: string }) {
  return (
    <div className="mt-3 rounded-lg border-l-4 border-primary bg-primary/[0.04] px-4 py-3">
      <p className="text-xs font-medium">
        <span className="text-primary font-semibold">Takeaway: </span>{text}
      </p>
    </div>
  );
}
