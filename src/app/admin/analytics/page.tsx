import { createServiceClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminAnalyticsPage() {
  const supabase = createServiceClient();

  // ──────────────────────────────────────
  // SECTION 1 — User Funnel
  // ──────────────────────────────────────

  const { count: totalSignups } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: questionnaireDone } = await supabase
    .from("questionnaire_answers")
    .select("*", { count: "exact", head: true });

  const { count: paidUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("has_paid", true);

  // Users who have at least 1 completed lesson
  const { data: startedLearningData } = await supabase
    .from("user_progress")
    .select("user_id")
    .eq("completed", true);

  const startedLearningUsers = new Set(
    (startedLearningData ?? []).map((r) => r.user_id)
  );
  const startedLearningCount = startedLearningUsers.size;

  // Users who completed 5+ lessons
  const lessonCountByUser: Record<string, number> = {};
  (startedLearningData ?? []).forEach((r) => {
    lessonCountByUser[r.user_id] = (lessonCountByUser[r.user_id] ?? 0) + 1;
  });
  const completed5PlusCount = Object.values(lessonCountByUser).filter(
    (c) => c >= 5
  ).length;

  const funnel = [
    { stage: "Signed Up", count: totalSignups ?? 0 },
    { stage: "Completed Questionnaire", count: questionnaireDone ?? 0 },
    { stage: "Paid", count: paidUsers ?? 0 },
    { stage: "Started Learning", count: startedLearningCount },
    { stage: "Completed 5+ Lessons", count: completed5PlusCount },
  ];

  const maxFunnel = funnel[0]?.count || 1;

  // ──────────────────────────────────────
  // SECTION 2 — Questionnaire Analytics
  // ──────────────────────────────────────

  const { data: allAnswers } = await supabase
    .from("questionnaire_answers")
    .select("answers");

  // Which question has highest drop-off
  const questionCounts: Record<string, number> = {};
  (allAnswers ?? []).forEach((row) => {
    const ans = row.answers as Record<string, unknown> | null;
    if (ans && typeof ans === "object") {
      Object.keys(ans).forEach((key) => {
        questionCounts[key] = (questionCounts[key] ?? 0) + 1;
      });
    }
  });
  const questionsSorted = Object.entries(questionCounts).sort(
    (a, b) => b[1] - a[1]
  );
  // The question with the lowest answer count relative to total questionnaire starts
  const questionWithHighestDropoff = questionsSorted.length > 0
    ? questionsSorted[questionsSorted.length - 1]
    : null;

  // Most common primary_path
  const { data: pathData } = await supabase
    .from("users")
    .select("primary_path")
    .not("primary_path", "is", null);

  const pathCounts: Record<string, number> = {};
  (pathData ?? []).forEach((u) => {
    if (u.primary_path) {
      pathCounts[u.primary_path] = (pathCounts[u.primary_path] ?? 0) + 1;
    }
  });
  const topPath = Object.entries(pathCounts).sort((a, b) => b[1] - a[1])[0];

  // Most common recommendation_plan
  const { data: planData } = await supabase
    .from("users")
    .select("recommendation_plan")
    .not("recommendation_plan", "is", null);

  const planCounts: Record<string, number> = {};
  (planData ?? []).forEach((u) => {
    if (u.recommendation_plan) {
      planCounts[u.recommendation_plan] =
        (planCounts[u.recommendation_plan] ?? 0) + 1;
    }
  });
  const topPlan = Object.entries(planCounts).sort((a, b) => b[1] - a[1])[0];

  // Most common recommendation_track
  const { data: trackData } = await supabase
    .from("users")
    .select("recommendation_track")
    .not("recommendation_track", "is", null);

  const trackCounts: Record<string, number> = {};
  (trackData ?? []).forEach((u) => {
    if (u.recommendation_track) {
      trackCounts[u.recommendation_track] =
        (trackCounts[u.recommendation_track] ?? 0) + 1;
    }
  });
  const topTrack = Object.entries(trackCounts).sort((a, b) => b[1] - a[1])[0];

  // ──────────────────────────────────────
  // SECTION 3 — Engagement
  // ──────────────────────────────────────

  // Average streak
  const { data: streakData } = await supabase
    .from("users")
    .select("current_streak");

  const streaks = (streakData ?? []).map((u) => u.current_streak ?? 0);
  const avgStreak =
    streaks.length > 0
      ? (streaks.reduce((s, v) => s + v, 0) / streaks.length).toFixed(1)
      : "0";

  // Users active in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const { count: activeIn7Days } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .gte("last_activity_date", sevenDaysAgo.toISOString().split("T")[0]);

  // Average lessons completed per user
  const totalLessonsCompleted = Object.values(lessonCountByUser).reduce(
    (s, v) => s + v,
    0
  );
  const usersWithProgress = Object.keys(lessonCountByUser).length;
  const avgLessonsPerUser =
    usersWithProgress > 0
      ? (totalLessonsCompleted / usersWithProgress).toFixed(1)
      : "0";

  // Most completed modules
  const { data: completedLessons } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("completed", true);

  const lessonIds = [
    ...new Set((completedLessons ?? []).map((r) => r.lesson_id)),
  ];

  let moduleCompletionRanking: { title: string; count: number }[] = [];
  if (lessonIds.length > 0) {
    const { data: lessonsWithModules } = await supabase
      .from("lessons")
      .select("id, module_id")
      .in("id", lessonIds);

    const { data: allModules } = await supabase
      .from("modules")
      .select("id, title");

    const moduleMap = new Map(
      (allModules ?? []).map((m) => [m.id, m.title])
    );

    // Count completions per module
    const lessonToModule = new Map(
      (lessonsWithModules ?? []).map((l) => [l.id, l.module_id])
    );

    const moduleCompletions: Record<string, number> = {};
    (completedLessons ?? []).forEach((r) => {
      const modId = lessonToModule.get(r.lesson_id);
      if (modId) {
        moduleCompletions[modId] = (moduleCompletions[modId] ?? 0) + 1;
      }
    });

    moduleCompletionRanking = Object.entries(moduleCompletions)
      .map(([modId, count]) => ({
        title: moduleMap.get(modId) ?? modId,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  // ──────────────────────────────────────
  // SECTION 4 — Device/Time
  // ──────────────────────────────────────

  // Signups by day of week
  const { data: allUsers } = await supabase
    .from("users")
    .select("created_at");

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const signupsByDay = [0, 0, 0, 0, 0, 0, 0];
  (allUsers ?? []).forEach((u) => {
    const day = new Date(u.created_at).getDay();
    signupsByDay[day]++;
  });
  const maxDaySignups = Math.max(...signupsByDay, 1);

  // Recent analytics events
  const { data: recentEvents } = await supabase
    .from("analytics")
    .select("event, created_at, user_id, metadata")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
        Analytics
      </h1>

      {/* ── Section 1: User Funnel ── */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          User Funnel
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {funnel.map((step, i) => {
                const pct =
                  maxFunnel > 0
                    ? Math.round((step.count / maxFunnel) * 100)
                    : 0;
                const dropoff =
                  i > 0 && funnel[i - 1].count > 0
                    ? Math.round(
                        ((funnel[i - 1].count - step.count) /
                          funnel[i - 1].count) *
                          100
                      )
                    : null;

                return (
                  <div key={step.stage}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-muted-foreground">
                        {step.stage}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">
                          {step.count}
                        </span>
                        {dropoff !== null && dropoff > 0 && (
                          <span className="text-xs text-red-600">
                            -{dropoff}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-6 overflow-hidden rounded-md bg-muted">
                      <div
                        className="h-full rounded-md bg-primary/80 transition-all"
                        style={{ width: `${Math.max(pct, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Section 2: Questionnaire Analytics ── */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Questionnaire Analytics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Highest Drop-off Question
              </p>
              <p className="mt-1 text-lg font-bold tracking-tight text-foreground">
                {questionWithHighestDropoff
                  ? questionWithHighestDropoff[0]
                  : "N/A"}
              </p>
              {questionWithHighestDropoff && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {questionWithHighestDropoff[1]} answered of{" "}
                  {allAnswers?.length ?? 0} total
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Top Primary Path
              </p>
              <p className="mt-1 text-lg font-bold capitalize tracking-tight text-foreground">
                {topPath ? topPath[0] : "N/A"}
              </p>
              {topPath && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {topPath[1]} users
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Top Recommendation Plan
              </p>
              <p className="mt-1 text-lg font-bold capitalize tracking-tight text-foreground">
                {topPlan ? topPlan[0] : "N/A"}
              </p>
              {topPlan && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {topPlan[1]} users
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Top Recommendation Track
              </p>
              <p className="mt-1 text-lg font-bold capitalize tracking-tight text-foreground">
                {topTrack ? topTrack[0] : "N/A"}
              </p>
              {topTrack && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {topTrack[1]} users
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Section 3: Engagement ── */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Engagement
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Avg Streak
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                {avgStreak}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">days</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active (Last 7 Days)
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                {activeIn7Days ?? 0}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  / {totalSignups ?? 0}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {(totalSignups ?? 0) > 0
                  ? Math.round(
                      ((activeIn7Days ?? 0) / (totalSignups ?? 1)) * 100
                    )
                  : 0}
                % of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Avg Lessons / User
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                {avgLessonsPerUser}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {usersWithProgress} users with progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total Lessons Done
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                {totalLessonsCompleted}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Most completed modules */}
        {moduleCompletionRanking.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
              Most Completed Modules
            </h3>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {moduleCompletionRanking.map((mod) => (
                    <div
                      key={mod.title}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {mod.title}
                      </span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {mod.count} completions
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* ── Section 4: Device/Time ── */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Signups by Day of Week
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-end gap-2">
              {dayNames.map((day, i) => {
                const pct = Math.round((signupsByDay[i] / maxDaySignups) * 100);
                return (
                  <div
                    key={day}
                    className="flex flex-1 flex-col items-center gap-1"
                  >
                    <span className="text-xs font-bold text-foreground">
                      {signupsByDay[i]}
                    </span>
                    <div className="w-full overflow-hidden rounded-t-md bg-muted">
                      <div
                        className="w-full rounded-t-md bg-primary/80 transition-all"
                        style={{
                          height: `${Math.max(pct, 4)}px`,
                          minHeight: "4px",
                          maxHeight: "120px",
                          // Scale to 120px max
                          ...(maxDaySignups > 0
                            ? {
                                height: `${Math.max(
                                  (signupsByDay[i] / maxDaySignups) * 120,
                                  4
                                )}px`,
                              }
                            : {}),
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Recent Activity Log
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {(recentEvents ?? []).map((event, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {event.event}
                    </Badge>
                    {event.user_id && (
                      <span className="text-xs text-muted-foreground">
                        {event.user_id.slice(0, 8)}...
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(event.created_at).toLocaleDateString()}{" "}
                    {new Date(event.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
              {(!recentEvents || recentEvents.length === 0) && (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No events recorded yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
