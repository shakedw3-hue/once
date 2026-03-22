import { createServiceClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default async function ContentPage() {
  const db = createServiceClient();

  const { data: paths } = await db.from("paths").select("id, pillar, title");
  const { data: modules } = await db.from("modules").select("id, title, order, path_id");
  const { data: lessons } = await db.from("lessons").select("id, title, order, module_id");
  const { data: progress } = await db.from("user_progress").select("lesson_id, completed").eq("completed", true);

  const completionMap = new Map<string, number>();
  for (const p of progress ?? []) {
    completionMap.set(p.lesson_id, (completionMap.get(p.lesson_id) ?? 0) + 1);
  }

  const pillarOrder = ["money", "mind", "body", "spirit"];
  const sortedPaths = (paths ?? []).sort((a, b) => pillarOrder.indexOf(a.pillar) - pillarOrder.indexOf(b.pillar));

  const totalLessons = (lessons ?? []).length;
  const totalModules = (modules ?? []).length;
  const totalCompletions = (progress ?? []).length;

  const lessonCompletions = (lessons ?? []).map(l => ({
    ...l,
    completions: completionMap.get(l.id) ?? 0,
    moduleName: (modules ?? []).find(m => m.id === l.module_id)?.title ?? "",
  })).sort((a, b) => b.completions - a.completions);

  const topLessons = lessonCompletions.slice(0, 5);
  const maxCompletions = topLessons[0]?.completions ?? 1;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Content</h1>

      <div className="mb-8 grid gap-4 grid-cols-2 sm:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lessons</p><p className="mt-1 text-2xl font-bold">{totalLessons}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Modules</p><p className="mt-1 text-2xl font-bold">{totalModules}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Completions</p><p className="mt-1 text-2xl font-bold">{totalCompletions}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pillars</p><p className="mt-1 text-2xl font-bold">{sortedPaths.length}</p></CardContent></Card>
      </div>

      {topLessons.length > 0 && topLessons[0].completions > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Most Completed Lessons</h2>
          <div className="space-y-2">
            {topLessons.map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{l.moduleName}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-20"><Progress value={(l.completions / maxCompletions) * 100} className="h-1.5" /></div>
                  <span className="text-xs font-semibold w-8 text-right">{l.completions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="mb-4 text-lg font-semibold">Content by Pillar</h2>
      <div className="space-y-4">
        {sortedPaths.map((path) => {
          const pathModules = (modules ?? []).filter(m => m.path_id === path.id).sort((a, b) => a.order - b.order);
          const tiers = [
            { label: "Core", filter: (m: { order: number }) => m.order <= 5 },
            { label: "Pro", filter: (m: { order: number }) => m.order >= 6 && m.order <= 25 },
            { label: "AI Careers", filter: (m: { order: number }) => m.order >= 26 },
          ];

          return (
            <Card key={path.id}>
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="secondary">{path.title}</Badge>
                  <span className="text-xs text-muted-foreground">{pathModules.length} modules</span>
                </div>
                {tiers.map((tier) => {
                  const tierMods = pathModules.filter(tier.filter);
                  if (tierMods.length === 0) return null;
                  return (
                    <div key={tier.label} className="mb-3 last:mb-0">
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{tier.label}</p>
                      <div className="space-y-1">
                        {tierMods.map((mod) => {
                          const modLessons = (lessons ?? []).filter(l => l.module_id === mod.id);
                          const modCompletions = modLessons.reduce((sum, l) => sum + (completionMap.get(l.id) ?? 0), 0);
                          return (
                            <div key={mod.id} className="flex items-center justify-between rounded bg-muted/50 px-3 py-1.5">
                              <span className="text-xs">{mod.order}. {mod.title}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-muted-foreground">{modLessons.length} lessons</span>
                                {modCompletions > 0 && <Badge variant="secondary" className="text-[9px]">{modCompletions} done</Badge>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
