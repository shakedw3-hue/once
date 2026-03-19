import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminPaymentsPage() {
  const supabase = await createClient();

  const { data: payments } = await supabase
    .from("payments")
    .select("id, user_id, amount, currency, status, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  // Get user emails for display
  const userIds = [...new Set((payments ?? []).map((p) => p.user_id))];
  const { data: users } = await supabase
    .from("users")
    .select("id, email, full_name")
    .in("id", userIds.length > 0 ? userIds : ["none"]);

  const userMap = new Map(
    (users ?? []).map((u) => [u.id, u])
  );

  const totalRevenue = (payments ?? [])
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  const completedCount = (payments ?? []).filter(
    (p) => p.status === "completed"
  ).length;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Payments</h1>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
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
              Completed Payments
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {completedCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Avg per Payment
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              ₱{completedCount > 0 ? (totalRevenue / completedCount / 100).toFixed(0) : 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payments table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    User
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {(payments ?? []).map((payment) => {
                  const user = userMap.get(payment.user_id);
                  return (
                    <tr key={payment.id} className="border-b last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">
                          {user?.full_name || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        ₱{((payment.amount ?? 0) / 100).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(payment.created_at).toLocaleDateString()}{" "}
                        {new Date(payment.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  );
                })}
                {(!payments || payments.length === 0) && (
                  <tr>
                    <td
                      colSpan={4}
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
