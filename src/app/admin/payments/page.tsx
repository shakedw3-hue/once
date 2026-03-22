import { createServiceClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminPaymentsPage() {
  const supabase = createServiceClient();

  // All payments
  const { data: payments } = await supabase
    .from("payments")
    .select("id, user_id, amount, currency, status, created_at")
    .order("created_at", { ascending: false });

  // Get user info for display
  const userIds = [...new Set((payments ?? []).map((p) => p.user_id))];
  const { data: users } = await supabase
    .from("users")
    .select("id, email, full_name, plan")
    .in("id", userIds.length > 0 ? userIds : ["none"]);

  const userMap = new Map((users ?? []).map((u) => [u.id, u]));

  // ── Top Cards ──

  const completedPayments = (payments ?? []).filter(
    (p) => p.status === "completed"
  );

  const totalRevenue = completedPayments.reduce(
    (sum, p) => sum + (p.amount ?? 0),
    0
  );

  // This month revenue
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthRevenue = completedPayments
    .filter((p) => new Date(p.created_at) >= monthStart)
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  const avgOrderValue =
    completedPayments.length > 0
      ? Math.round(totalRevenue / completedPayments.length)
      : 0;

  const totalOrders = (payments ?? []).length;

  // ── Plan Breakdown ──

  const planRevenue: Record<string, { revenue: number; orders: number }> = {};
  completedPayments.forEach((p) => {
    const user = userMap.get(p.user_id);
    const plan = user?.plan || "unknown";
    if (!planRevenue[plan]) {
      planRevenue[plan] = { revenue: 0, orders: 0 };
    }
    planRevenue[plan].revenue += p.amount ?? 0;
    planRevenue[plan].orders += 1;
  });

  const planOrder = ["core", "pro", "ai", "unknown"];
  const sortedPlans = Object.entries(planRevenue).sort(
    (a, b) => planOrder.indexOf(a[0]) - planOrder.indexOf(b[0])
  );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
        Payments
      </h1>

      {/* ── Top Summary Cards ── */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              This Month Revenue
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              ₱{(thisMonthRevenue / 100).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Avg Order Value
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              ₱{(avgOrderValue / 100).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Orders
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {totalOrders}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Plan Breakdown ── */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Revenue by Plan
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {sortedPlans.map(([plan, data]) => (
            <Card key={plan}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {plan === "unknown" ? "No Plan" : plan}
                  </p>
                  <PlanBadge plan={plan} />
                </div>
                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                  ₱{(data.revenue / 100).toLocaleString()}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {data.orders} order{data.orders !== 1 ? "s" : ""}
                </p>
              </CardContent>
            </Card>
          ))}
          {sortedPlans.length === 0 && (
            <p className="col-span-3 text-sm text-muted-foreground">
              No completed payments yet.
            </p>
          )}
        </div>
      </div>

      {/* ── Orders Table ── */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          All Orders
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      User
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(payments ?? []).map((payment) => {
                    const user = userMap.get(payment.user_id);
                    return (
                      <tr
                        key={payment.id}
                        className="border-b last:border-0"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                          {new Date(payment.created_at).toLocaleDateString()}{" "}
                          {new Date(payment.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {user?.full_name || "Unknown"}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {user?.email || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <PlanBadge plan={user?.plan || "unknown"} />
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          ₱{((payment.amount ?? 0) / 100).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={payment.status} />
                        </td>
                      </tr>
                    );
                  })}
                  {(!payments || payments.length === 0) && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-muted-foreground"
                      >
                        No payments yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50">
          Completed
        </Badge>
      );
    case "pending":
      return <Badge variant="outline">Pending</Badge>;
    case "failed":
      return (
        <Badge className="bg-red-50 text-red-600 hover:bg-red-50">
          Failed
        </Badge>
      );
    case "refunded":
      return <Badge variant="secondary">Refunded</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function PlanBadge({ plan }: { plan: string }) {
  switch (plan) {
    case "core":
      return (
        <Badge variant="outline" className="text-xs">
          Core
        </Badge>
      );
    case "pro":
      return (
        <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 text-xs">
          Pro
        </Badge>
      );
    case "ai":
      return (
        <Badge className="bg-purple-50 text-purple-600 hover:bg-purple-50 text-xs">
          AI
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs text-muted-foreground">
          —
        </Badge>
      );
  }
}
