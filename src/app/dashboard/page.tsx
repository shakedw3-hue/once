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

  // User's pillars
  const pathPillars: Pillar[] = [profile.primary_path as Pillar];
  if (profile.secondary_path && profile.secondary_path !== profile.primary_path) {
    pathPillars.push(profile.secondary_path as Pillar);
  }

  // Step 1: Get paths
  const { data: pathRows } = await supabase
    .from("paths")
    .select("id, title, description, pillar")
    .in("pillar", pathPillars);

  const pathIds = (pathRows ?? []).map((p) => p.id);

  // Step 2: Get modules for those paths
  let allModules: { id: string; title: string; description: string; order: number; path_id: string }[] = [];
  if (pathIds.length > 0) {
    const { data: mods } = await supabase
      .from("modules")
      .select("id, title, description, order, path_id")
      .in("path_id", pathIds)
      .order("order");
    allModules = mods ?? [];
  }

  // Filter modules by plan:
  // Core: only order 1-5 (5 modules per path)
  // Pro/AI: order 1-5 (core) + order 6-10 (one Pro track = 5 modules)
  const isPro = profile.plan === "pro" || profile.plan === "ai";
  const filteredModules = isPro
    ? allModules.filter((m) => m.order <= 10)
    : allModules.filter((m) => m.order <= 5);

  // Step 3: Get lessons for those modules
  const moduleIds = filteredModules.map((m) => m.id);
  let lessons: { id: string; module_id: string }[] = [];
  if (moduleIds.length > 0) {
    const { data: lsns } = await supabase
      .from("lessons")
      .select("id, module_id")
      .in("module_id", moduleIds);
    lessons = lsns ?? [];
  }

  // Step 4: Get user progress
  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id, completed")
    .eq("user_id", user.id);

  const completedLessonIds = new Set(
    (progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id)
  );

  // Build grouped path modules
  const pathModules = pathPillars.map((pillar) => {
    const pathRow = (pathRows ?? []).find((p) => p.pillar === pillar);
    if (!pathRow) return null;

    const mods = filteredModules
      .filter((m) => m.path_id === pathRow.id)
      .map((mod) => {
        const modLessons = lessons.filter((l) => l.module_id === mod.id);
        const completedCount = modLessons.filter((l) => completedLessonIds.has(l.id)).length;
        return {
          id: mod.id,
          title: mod.title,
          description: mod.description,
          order: mod.order,
          totalLessons: modLessons.length,
          completedLessons: completedCount,
        };
      });

    return {
      pillar,
      title: pathRow.title,
      description: pathRow.description,
      coreMods: mods.filter((m) => m.order <= 5),
      proMods: mods.filter((m) => m.order > 5),
    };
  }).filter(Boolean) as {
    pillar: Pillar;
    title: string;
    description: string;
    coreMods: Array<{ id: string; title: string; description: string; order: number; totalLessons: number; completedLessons: number }>;
    proMods: Array<{ id: string; title: string; description: string; order: number; totalLessons: number; completedLessons: number }>;
  }[];

  const totalLessons = lessons.length;
  const totalCompleted = completedLessonIds.size;

  // Get first lesson of first primary module for "Start here" CTA
  const primaryGroup = pathModules.find((p) => p?.pillar === profile.primary_path);
  const firstModule = primaryGroup?.coreMods[0];
  let firstLessonId: string | null = null;
  if (firstModule) {
    const { data: firstLesson } = await supabase
      .from("lessons")
      .select("id")
      .eq("module_id", firstModule.id)
      .order("order")
      .limit(1)
      .single();
    firstLessonId = firstLesson?.id ?? null;
  }

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
      firstModuleId={firstModule?.id ?? null}
      firstModuleTitle={firstModule?.title ?? null}
      firstLessonId={firstLessonId}
    />
  );
}
