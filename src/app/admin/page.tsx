import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminOverview() {
  const supabase = await createClient();

  const { count: totalUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: paidUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("has_paid", true);

  const { count: questionnairesCompleted } = await supabase
    .from("questionnaire_answers")
    .select("*", { count: "exact", head: true });

  const { data: revenueData } = await supabase
    .from("payments")
    .select("amount")
    .eq("status", "completed");

  const totalRevenue = (revenueData ?? []).reduce(
    (sum, p) => sum + (p.amount ?? 0),
    0
  );

  const { count: lessonsCompleted } = await supabase
    .from("user_progress")
    .select("*", { count: "exact", head: true })
    .eq("completed", true);

  const conversionRate =
    totalUsers && totalUsers > 0
      ? Math.round(((paidUsers ?? 0) / totalUsers) * 100)
      : 0;

  const stats = [
    { label: "Total Users", value: totalUsers ?? 0 },
    { label: "Paid Users", value: paidUsers ?? 0 },
    { label: "Conversion Rate", value: `${conversionRate}%` },
    {
      label: "Revenue",
      value: `₱${((totalRevenue ?? 0) / 100).toLocaleString()}`,
    },
    { label: "Questionnaires", value: questionnairesCompleted ?? 0 },
    { label: "Lessons Completed", value: lessonsCompleted ?? 0 },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
