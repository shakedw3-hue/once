import { createServiceClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PATH_COLORS: Record<string, string> = {
  confidence: "bg-purple-100 text-purple-700",
  career: "bg-blue-100 text-blue-700",
  money: "bg-emerald-100 text-emerald-700",
  health: "bg-rose-100 text-rose-700",
  relationships: "bg-amber-100 text-amber-700",
};

const PLAN_COLORS: Record<string, string> = {
  core: "bg-slate-100 text-slate-700",
  pro: "bg-indigo-100 text-indigo-700",
  ai_careers: "bg-cyan-100 text-cyan-700",
};

function planLabel(plan: string | null): string {
  if (!plan) return "Free";
  if (plan === "ai_careers") return "AI Careers";
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

export default async function AdminUsersPage() {
  const supabase = createServiceClient();

  // ── Fetch all users ──
  const { data: users } = await supabase
    .from("users")
    .select(
      "id, email, full_name, plan, primary_path, recommendation_track, current_streak, has_paid, last_activity_date, created_at, age, location, occupation, bought_courses_before"
    )
    .order("created_at", { ascending: false });

  // ── Count completed lessons per user ──
  const { data: progressRows } = await supabase
    .from("user_progress")
    .select("user_id")
    .eq("completed", true);

  const lessonCounts = new Map<string, number>();
  for (const row of progressRows ?? []) {
    lessonCounts.set(row.user_id, (lessonCounts.get(row.user_id) ?? 0) + 1);
  }

  // ── Total available lessons (for X/total display) ──
  const { count: totalLessons } = await supabase
    .from("lessons")
    .select("*", { count: "exact", head: true });

  const total = totalLessons ?? 0;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Users
        </h1>
        <Badge variant="secondary">{users?.length ?? 0} users</Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Plan
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Primary Path
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Rec. Track
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Streak
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Lessons
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Joined
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Last Active
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Paid
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Age
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Location
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Occupation
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                    Bought Before
                  </th>
                </tr>
              </thead>
              <tbody>
                {(users ?? []).map((user) => {
                  const done = lessonCounts.get(user.id) ?? 0;
                  return (
                    <tr
                      key={user.id}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-foreground">
                        {user.full_name || "\u2014"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            PLAN_COLORS[user.plan ?? ""] ??
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {planLabel(user.plan)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {user.primary_path ? (
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                              PATH_COLORS[user.primary_path] ??
                              "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {user.primary_path}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">&mdash;</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {user.recommendation_track ? (
                          <span className="capitalize">
                            {user.recommendation_track}
                          </span>
                        ) : (
                          "\u2014"
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {(user.current_streak ?? 0) > 0 ? (
                          <span className="font-medium">
                            <span className="mr-0.5">&#x1F525;</span>
                            {user.current_streak}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {done}
                        {total > 0 ? `/${total}` : ""}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {user.last_activity_date
                          ? new Date(
                              user.last_activity_date
                            ).toLocaleDateString()
                          : "\u2014"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center">
                        {user.has_paid ? (
                          <span className="text-emerald-600 font-semibold">&#x2713;</span>
                        ) : (
                          <span className="text-muted-foreground">&#x2717;</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {String((user as Record<string, unknown>).age ?? "—")}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {String((user as Record<string, unknown>).location ?? "—")}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {String((user as Record<string, unknown>).occupation ?? "—")}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center">
                        {(user as Record<string, unknown>).bought_courses_before ? "Yes" : "—"}
                      </td>
                    </tr>
                  );
                })}
                {(!users || users.length === 0) && (
                  <tr>
                    <td
                      colSpan={14}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      No users yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
