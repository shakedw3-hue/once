import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardView from "@/components/dashboard/DashboardView";
import type { Pillar, PillarScores } from "@/types/database";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, primary_path, secondary_path, has_paid, plan, recommendation_track")
    .eq("id", user.id)
    .single();

  if (!profile?.primary_path) redirect("/questionnaire");
  if (!profile.has_paid) redirect("/profile");

  const { data: qa } = await supabase
    .from("questionnaire_answers")
    .select("scores")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(1)
    .single();

  // Get ALL paths the user has access to
  const pathPillars: Pillar[] = [profile.primary_path as Pillar];
  if (profile.secondary_path && profile.secondary_path !== profile.primary_path) {
    pathPillars.push(profile.secondary_path as Pillar);
  }

  // Get path rows for all pillars the user gets
  const { data: pathRows } = await supabase
    .from("paths")
    .select("id, title, description, pillar")
    .in("pillar", pathPillars);

  const allPathIds = (pathRows ?? []).map((p) => p.id);

  // Get Core modules (order 1-5) for user's paths
  const { data: coreModules } = await supabase
    .from("modules")
    .select("id, title, description, order, path_id")
    .in("path_id", allPathIds.length > 0 ? allPathIds : ["none"])
    .lte("order", 5)
    .order("order");

  // Get Pro modules (order 6+) if user is Pro or AI
  let proModules: typeof coreModules = [];
  if (profile.plan === "pro" || profile.plan === "ai") {
    const { data: pm } = await supabase
      .from("modules")
      .select("id, title, description, order, path_id")
      .in("path_id", allPathIds.length > 0 ? allPathIds : ["none"])
      .gt("order", 5)
      .order("order");
    proModules = pm ?? [];
  }

  const allModules = [...(coreModules ?? []), ...(proModules ?? [])];
  const moduleIds = allModules.map((m) => m.id);

  // Get lessons and progress
  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module_id")
    .in("module_id", moduleIds.length > 0 ? moduleIds : ["none"]);

  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id, completed")
    .eq("user_id", user.id);

  const completedLessonIds = new Set(
    (progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id)
  );

  // Build modules with progress, grouped by path
  const pathModules = pathPillars.map((pillar) => {
    const pathRow = (pathRows ?? []).find((p) => p.pillar === pillar);
    if (!pathRow) return null;

    const mods = allModules
      .filter((m) => m.path_id === pathRow.id)
      .map((mod) => {
        const modLessons = (lessons ?? []).filter((l) => l.module_id === mod.id);
        const completedCount = modLessons.filter((l) => completedLessonIds.has(l.id)).length;
        return {
          ...mod,
          totalLessons: modLessons.length,
          completedLessons: completedCount,
        };
      });

    const coreMods = mods.filter((m) => m.order <= 5);
    const proMods = mods.filter((m) => m.order > 5);

    return {
      pillar,
      title: pathRow.title,
      description: pathRow.description,
      coreMods,
      proMods,
    };
  }).filter(Boolean) as {
    pillar: Pillar;
    title: string;
    description: string;
    coreMods: Array<{ id: string; title: string; description: string; order: number; path_id: string; totalLessons: number; completedLessons: number }>;
    proMods: Array<{ id: string; title: string; description: string; order: number; path_id: string; totalLessons: number; completedLessons: number }>;
  }[];

  const totalLessons = (lessons ?? []).length;
  const totalCompleted = completedLessonIds.size;

  return (
    <DashboardView
      fullName={profile.full_name}
      primaryPath={profile.primary_path as Pillar}
      secondaryPath={profile.secondary_path as Pillar}
      scores={(qa?.scores as PillarScores) ?? { money: 0, mind: 0, body: 0, spirit: 0 }}
      pathModules={pathModules}
      totalLessons={totalLessons}
      totalCompleted={totalCompleted}
      plan={profile.plan}
      recommendationTrack={profile.recommendation_track}
    />
  );
}
