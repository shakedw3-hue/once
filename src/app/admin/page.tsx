import { createServiceClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminOverview() {
  const supabase = createServiceClient();

  // ── Total users ──
  const { count: totalUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  // ── New users this week ──
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const { count: newThisWeek } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .gte("created_at", oneWeekAgo.toISOString());

  // ── Paid users by plan ──
  const { data: paidUsersData } = await supabase
    .from("users")
    .select("plan")
    .eq("has_paid", true);

  const paidUsers = paidUsersData ?? [];
  const coreCount = paidUsers.filter((u) => u.plan === "core").length;
  const proCount = paidUsers.filter((u) => u.plan === "pro").length;
  const aiCount = paidUsers.filter((u) => u.plan === "ai_careers").length;
  const totalPaid = paidUsers.length;

  // ── Today's revenue ──
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { data: todayPayments } = await supabase
    .from("payments")
    .select("amount")
    .eq("status", "completed")
    .gte("created_at", todayStart.toISOString());

  const todayRevenue = (todayPayments ?? []).reduce(
    (sum, p) => sum + (p.amount ?? 0),
    0
  );

  // ── Total revenue (all time) ──
  const { data: allPayments } = await supabase
    .from("payments")
    .select("amount")
    .eq("status", "completed");

  const totalRevenue = (allPayments ?? []).reduce(
    (sum, p) => sum + (p.amount ?? 0),
    0
  );

  // ── Questionnaire completions (unique users) ──
  const { data: questionnaireUsers } = await supabase
    .from("questionnaire_answers")
    .select("user_id");

  const uniqueQuestionnaireUsers = new Set(
    (questionnaireUsers ?? []).map((q) => q.user_id)
  ).size;

  // ── Average lessons per paid user ──
  const { data: paidUserIds } = await supabase
    .from("users")
    .select("id")
    .eq("has_paid", true);

  const paidIdSet = new Set((paidUserIds ?? []).map((u) => u.id));

  const { data: completedLessons } = await supabase
    .from("user_progress")
    .select("user_id")
    .eq("completed", true);

  const lessonsByPaidUser = new Map<string, number>();
  for (const row of completedLessons ?? []) {
    if (paidIdSet.has(row.user_id)) {
      lessonsByPaidUser.set(
        row.user_id,
        (lessonsByPaidUser.get(row.user_id) ?? 0) + 1
      );
    }
  }
  const avgLessons =
    lessonsByPaidUser.size > 0
      ? (
          Array.from(lessonsByPaidUser.values()).reduce((a, b) => a + b, 0) /
          lessonsByPaidUser.size
        ).toFixed(1)
      : "0";

  // ── Most popular primary path ──
  const { data: pathUsers } = await supabase
    .from("users")
    .select("primary_path")
    .not("primary_path", "is", null);

  const pathCounts: Record<string, number> = {};
  for (const u of pathUsers ?? []) {
    if (u.primary_path) {
      pathCounts[u.primary_path] = (pathCounts[u.primary_path] ?? 0) + 1;
    }
  }
  const topPath =
    Object.entries(pathCounts).sort((a, b) => b[1] - a[1])[0] ?? null;

  // ── Active users (last 7 days) ──
  const { count: activeUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .gte("last_activity_date", oneWeekAgo.toISOString());

  // ── Funnel calculations ──
  const total = totalUsers ?? 0;
  const questionnaireRate =
    total > 0 ? Math.round((uniqueQuestionnaireUsers / total) * 100) : 0;
  const paidRate = total > 0 ? Math.round((totalPaid / total) * 100) : 0;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
        Overview
      </h1>

      {/* ── Top metric cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Users
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {total}
            </p>
            {(newThisWeek ?? 0) > 0 && (
              <p className="mt-1 text-sm text-emerald-600">
                +{newThisWeek} this week
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Today&apos;s Revenue
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              ₱{(todayRevenue / 100).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Revenue
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              ₱{(totalRevenue / 100).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Active Users (7d)
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {activeUsers ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Conversion Funnel ── */}
      <h2 className="mb-3 mt-8 text-lg font-semibold text-foreground">
        Conversion Funnel
      </h2>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            {/* Step 1: Signup */}
            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Signups
              </p>
              <div className="relative h-24 w-full overflow-hidden rounded-lg bg-blue-100">
                <div
                  className="absolute inset-0 rounded-lg bg-blue-500"
                  style={{ width: "100%" }}
                />
                <span className="relative z-10 flex h-full items-center justify-center text-2xl font-bold text-white">
                  {total}
                </span>
              </div>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                100%
              </p>
            </div>

            <div className="hidden text-2xl text-muted-foreground sm:block">
              &rarr;
            </div>

            {/* Step 2: Questionnaire */}
            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Questionnaire
              </p>
              <div className="relative h-24 w-full overflow-hidden rounded-lg bg-amber-100">
                <div
                  className="absolute inset-0 rounded-lg bg-amber-500"
                  style={{
                    width: `${Math.max(questionnaireRate, 4)}%`,
                  }}
                />
                <span className="relative z-10 flex h-full items-center justify-center text-2xl font-bold text-white">
                  {uniqueQuestionnaireUsers}
                </span>
              </div>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                {questionnaireRate}%
              </p>
            </div>

            <div className="hidden text-2xl text-muted-foreground sm:block">
              &rarr;
            </div>

            {/* Step 3: Paid */}
            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Paid
              </p>
              <div className="relative h-24 w-full overflow-hidden rounded-lg bg-emerald-100">
                <div
                  className="absolute inset-0 rounded-lg bg-emerald-500"
                  style={{
                    width: `${Math.max(paidRate, 4)}%`,
                  }}
                />
                <span className="relative z-10 flex h-full items-center justify-center text-2xl font-bold text-white">
                  {totalPaid}
                </span>
              </div>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                {paidRate}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Plan Breakdown + Extra Metrics ── */}
      <h2 className="mb-3 mt-8 text-lg font-semibold text-foreground">
        Plan Breakdown
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Core
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {coreCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pro
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {proCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              AI Careers
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {aiCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Avg Lessons / Paid User
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {avgLessons}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Most Popular Path ── */}
      {topPath && (
        <div className="mt-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Most Popular Path
              </p>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold capitalize text-primary">
                {topPath[0]}
              </span>
              <span className="text-sm text-muted-foreground">
                {topPath[1]} users
              </span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
