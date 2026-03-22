export const dynamic = "force-dynamic";
import { createServiceClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import AdminDateFilter from "./AdminDateFilter";

interface Props {
  searchParams: Promise<{ from?: string; to?: string; range?: string }>;
}

export default async function AdminOverview({ searchParams }: Props) {
  const { from, to, range } = await searchParams;
  const db = createServiceClient();

  // Determine date range
  const now = new Date();
  let fromDate: Date;
  let toDate: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  if (from && to) {
    fromDate = new Date(from);
    toDate = new Date(to + "T23:59:59");
  } else {
    const r = range || "7d";
    const days = r === "1d" ? 1 : r === "7d" ? 7 : r === "30d" ? 30 : r === "90d" ? 90 : 7;
    fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);
    fromDate.setHours(0, 0, 0, 0);
  }

  const fromISO = fromDate.toISOString();
  const toISO = toDate.toISOString();

  // ─── Period metrics ───
  const { count: newUsers } = await db.from("users").select("*", { count: "exact", head: true }).gte("created_at", fromISO).lte("created_at", toISO);
  const { count: totalUsers } = await db.from("users").select("*", { count: "exact", head: true });
  const { count: newQuestionnaires } = await db.from("questionnaire_answers").select("*", { count: "exact", head: true }).gte("completed_at", fromISO).lte("completed_at", toISO);

  const { data: periodPayments } = await db.from("payments").select("amount, user_id, created_at").eq("status", "completed").gte("created_at", fromISO).lte("created_at", toISO);
  const periodRevenue = (periodPayments ?? []).reduce((s, p) => s + (p.amount ?? 0), 0) / 100;
  const periodOrders = (periodPayments ?? []).length;
  const periodAOV = periodOrders > 0 ? Math.round(periodRevenue / periodOrders) : 0;

  const { data: periodProgress } = await db.from("user_progress").select("user_id, completed_at").eq("completed", true).gte("completed_at", fromISO).lte("completed_at", toISO);
  const periodLessons = (periodProgress ?? []).length;
  const periodActiveUsers = new Set((periodProgress ?? []).map(p => p.user_id)).size;

  // ─── All-time totals ───
  const { data: allPayments } = await db.from("payments").select("amount").eq("status", "completed");
  const totalRevenue = (allPayments ?? []).reduce((s, p) => s + (p.amount ?? 0), 0) / 100;
  const { count: totalPaid } = await db.from("users").select("*", { count: "exact", head: true }).eq("has_paid", true);

  // ─── Daily breakdown for chart ───
  const dailyMap: Record<string, { signups: number; revenue: number; lessons: number; questionnaires: number }> = {};

  // Initialize days
  const daysDiff = Math.ceil((toDate.getTime() - fromDate.getTime()) / 86400000) + 1;
  for (let i = 0; i < Math.min(daysDiff, 90); i++) {
    const d = new Date(fromDate);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().split("T")[0];
    dailyMap[key] = { signups: 0, revenue: 0, lessons: 0, questionnaires: 0 };
  }

  // Fill signups
  const { data: periodUsers } = await db.from("users").select("created_at").gte("created_at", fromISO).lte("created_at", toISO);
  (periodUsers ?? []).forEach(u => {
    const day = u.created_at.split("T")[0];
    if (dailyMap[day]) dailyMap[day].signups++;
  });

  // Fill revenue
  (periodPayments ?? []).forEach(p => {
    const day = p.created_at.split("T")[0];
    if (dailyMap[day]) dailyMap[day].revenue += (p.amount ?? 0) / 100;
  });

  // Fill lessons
  (periodProgress ?? []).forEach(p => {
    if (p.completed_at) {
      const day = p.completed_at.split("T")[0];
      if (dailyMap[day]) dailyMap[day].lessons++;
    }
  });

  // Fill questionnaires
  const { data: periodQA } = await db.from("questionnaire_answers").select("completed_at").gte("completed_at", fromISO).lte("completed_at", toISO);
  (periodQA ?? []).forEach(q => {
    if (q.completed_at) {
      const day = q.completed_at.split("T")[0];
      if (dailyMap[day]) dailyMap[day].questionnaires++;
    }
  });

  const dailyData = Object.entries(dailyMap).sort((a, b) => a[0].localeCompare(b[0]));
  const maxSignups = Math.max(...dailyData.map(d => d[1].signups), 1);
  const maxRevenue = Math.max(...dailyData.map(d => d[1].revenue), 1);
  const maxLessons = Math.max(...dailyData.map(d => d[1].lessons), 1);

  const rangeLabel = from && to ? `${from} to ${to}` : range === "1d" ? "Today" : range === "30d" ? "Last 30 days" : range === "90d" ? "Last 90 days" : "Last 7 days";

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <AdminDateFilter />
      </div>

      <p className="mb-4 text-xs text-muted-foreground">Showing: {rangeLabel}</p>

      {/* Period metrics */}
      <div className="mb-6 grid gap-3 grid-cols-2 sm:grid-cols-4">
        <MC label="New Users" value={newUsers ?? 0} sub={`${totalUsers ?? 0} total`} />
        <MC label="Revenue" value={`₱${periodRevenue.toLocaleString()}`} sub={`₱${totalRevenue.toLocaleString()} all-time`} />
        <MC label="Orders" value={periodOrders} sub={periodAOV > 0 ? `₱${periodAOV} avg` : ""} />
        <MC label="Questionnaires" value={newQuestionnaires ?? 0} />
      </div>

      <div className="mb-8 grid gap-3 grid-cols-2 sm:grid-cols-4">
        <MC label="Lessons Done" value={periodLessons} />
        <MC label="Active Users" value={periodActiveUsers} />
        <MC label="Paid Users" value={totalPaid ?? 0} sub={totalUsers ? `${Math.round(((totalPaid ?? 0) / (totalUsers ?? 1)) * 100)}% of total` : ""} />
        <MC label="Conversion" value={`${totalUsers ? Math.round(((totalPaid ?? 0) / (totalUsers ?? 1)) * 100) : 0}%`} sub="signup → paid" />
      </div>

      {/* Daily chart */}
      <h2 className="mb-3 text-lg font-semibold">Daily Breakdown</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {/* Signups chart */}
        <Card>
          <CardContent className="p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Signups</p>
            <div className="flex items-end gap-[2px] h-20">
              {dailyData.map(([day, d]) => (
                <div key={day} className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t bg-blue-400" style={{ height: `${Math.max((d.signups / maxSignups) * 100, 3)}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[8px] text-muted-foreground">
              <span>{dailyData[0]?.[0]?.slice(5)}</span>
              <span>{dailyData[dailyData.length - 1]?.[0]?.slice(5)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Revenue chart */}
        <Card>
          <CardContent className="p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Revenue (₱)</p>
            <div className="flex items-end gap-[2px] h-20">
              {dailyData.map(([day, d]) => (
                <div key={day} className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t bg-emerald-400" style={{ height: `${Math.max((d.revenue / maxRevenue) * 100, 3)}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[8px] text-muted-foreground">
              <span>{dailyData[0]?.[0]?.slice(5)}</span>
              <span>{dailyData[dailyData.length - 1]?.[0]?.slice(5)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Lessons chart */}
        <Card>
          <CardContent className="p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Lessons Completed</p>
            <div className="flex items-end gap-[2px] h-20">
              {dailyData.map(([day, d]) => (
                <div key={day} className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t bg-violet-400" style={{ height: `${Math.max((d.lessons / maxLessons) * 100, 3)}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[8px] text-muted-foreground">
              <span>{dailyData[0]?.[0]?.slice(5)}</span>
              <span>{dailyData[dailyData.length - 1]?.[0]?.slice(5)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Day-by-day table */}
      <h2 className="mb-3 text-lg font-semibold">Day by Day</h2>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Signups</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Questionnaires</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Revenue</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Lessons</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {dailyData.reverse().map(([day, d]) => (
                  <tr key={day} className={d.signups === 0 && d.revenue === 0 && d.lessons === 0 ? "opacity-40" : ""}>
                    <td className="px-4 py-2 text-xs">{new Date(day + "T00:00:00").toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}</td>
                    <td className="px-4 py-2 text-xs text-right font-medium">{d.signups || "—"}</td>
                    <td className="px-4 py-2 text-xs text-right">{d.questionnaires || "—"}</td>
                    <td className="px-4 py-2 text-xs text-right font-medium">{d.revenue > 0 ? `₱${d.revenue.toLocaleString()}` : "—"}</td>
                    <td className="px-4 py-2 text-xs text-right">{d.lessons || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MC({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
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
