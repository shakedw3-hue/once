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
    .select("full_name, primary_path, secondary_path, has_paid")
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

  // Get modules for user's primary path
  const { data: pathRow } = await supabase
    .from("paths")
    .select("id, title, description")
    .eq("pillar", profile.primary_path)
    .single();

  const { data: modules } = await supabase
    .from("modules")
    .select("id, title, description, order")
    .eq("path_id", pathRow?.id)
    .order("order");

  // Get lesson counts per module and user progress
  const moduleIds = (modules ?? []).map((m) => m.id);
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

  const modulesWithProgress = (modules ?? []).map((mod) => {
    const modLessons = (lessons ?? []).filter((l) => l.module_id === mod.id);
    const completedCount = modLessons.filter((l) =>
      completedLessonIds.has(l.id)
    ).length;
    return {
      ...mod,
      totalLessons: modLessons.length,
      completedLessons: completedCount,
    };
  });

  const totalLessons = (lessons ?? []).length;
  const totalCompleted = completedLessonIds.size;

  return (
    <DashboardView
      fullName={profile.full_name}
      primaryPath={profile.primary_path as Pillar}
      secondaryPath={profile.secondary_path as Pillar}
      scores={(qa?.scores as PillarScores) ?? { money: 0, mind: 0, body: 0, spirit: 0 }}
      modules={modulesWithProgress}
      totalLessons={totalLessons}
      totalCompleted={totalCompleted}
    />
  );
}
