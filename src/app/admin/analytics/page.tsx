import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();

  // Event counts
  const { data: events } = await supabase
    .from("analytics")
    .select("event, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  const eventCounts: Record<string, number> = {};
  (events ?? []).forEach((e) => {
    eventCounts[e.event] = (eventCounts[e.event] ?? 0) + 1;
  });

  const sortedEvents = Object.entries(eventCounts).sort(
    (a, b) => b[1] - a[1]
  );

  // Recent events
  const recentEvents = (events ?? []).slice(0, 20);

  // Funnel metrics
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

  const { count: activeLearners } = await supabase
    .from("user_progress")
    .select("user_id", { count: "exact", head: true })
    .eq("completed", true);

  const funnel = [
    { stage: "Signed Up", count: totalSignups ?? 0 },
    { stage: "Completed Questionnaire", count: questionnaireDone ?? 0 },
    { stage: "Paid", count: paidUsers ?? 0 },
    { stage: "Started Learning", count: activeLearners ?? 0 },
  ];

  const maxFunnel = funnel[0]?.count || 1;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Analytics</h1>

      {/* Funnel */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">User Funnel</h2>
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
                      <span className="font-medium text-muted-foreground">{step.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{step.count}</span>
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

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Event summary */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Event Summary</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {sortedEvents.map(([event, count]) => (
                  <div
                    key={event}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <Badge variant="outline" className="font-mono text-xs">
                      {event}
                    </Badge>
                    <span className="text-sm font-bold text-foreground">{count}</span>
                  </div>
                ))}
                {sortedEvents.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No events recorded yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent events */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Events</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentEvents.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <Badge variant="outline" className="font-mono text-xs">
                      {event.event}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.created_at).toLocaleDateString()}{" "}
                      {new Date(event.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
                {recentEvents.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No events recorded yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
