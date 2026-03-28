export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LessonView from "@/components/dashboard/LessonView";
import { theme } from "@/lib/theme";
import type { Pillar } from "@/types/database";

interface Props {
  params: Promise<{ moduleId: string; lessonId: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { moduleId, lessonId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // Get user plan to determine Pro/AI content
  const { data: profile } = await supabase
    .from("users")
    .select("plan")
    .eq("id", user.id)
    .single();

  const isPro = profile?.plan === "pro" || profile?.plan === "ai";

  const { data: lesson } = await supabase
    .from("lessons")
    .select("id, title, description, action_step, reflection_prompt, order, module_id")
    .eq("id", lessonId)
    .single();

  if (!lesson || lesson.module_id !== moduleId) redirect("/dashboard");

  const { data: mod } = await supabase
    .from("modules")
    .select("id, title, description, order")
    .eq("id", moduleId)
    .single();

  if (!mod) redirect("/dashboard");

  // Get the path to determine pillar color
  const { data: pathData } = await supabase
    .from("paths")
    .select("pillar")
    .eq("id", (mod as any).path_id ?? "")
    .maybeSingle();

  // Also try to get pillar from the module's path via a join
  let pillarKey: Pillar = "mind"; // fallback
  if (pathData?.pillar) {
    pillarKey = pathData.pillar as Pillar;
  } else {
    // Fallback: query paths that contain this module
    const { data: modWithPath } = await supabase
      .from("modules")
      .select("path_id")
      .eq("id", moduleId)
      .single();
    if (modWithPath?.path_id) {
      const { data: fallbackPath } = await supabase
        .from("paths")
        .select("pillar")
        .eq("id", modWithPath.path_id)
        .single();
      if (fallbackPath?.pillar) {
        pillarKey = fallbackPath.pillar as Pillar;
      }
    }
  }

  const pillarColor = theme.pillar[pillarKey]?.color ?? "#4F46E5";
  const pillarName = pillarKey.charAt(0).toUpperCase() + pillarKey.slice(1);

  // Get progress
  const { data: progress } = await supabase
    .from("user_progress")
    .select("id, completed, reflection")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  // Get all lessons in module for navigation
  const { data: allLessons } = await supabase
    .from("lessons")
    .select("id, order")
    .eq("module_id", moduleId);

  const sortedLessons = (allLessons ?? []).sort((a, b) => a.order - b.order);
  const currentIndex = sortedLessons.findIndex((l) => l.id === lessonId);
  const nextLessonId = sortedLessons[currentIndex + 1]?.id ?? null;
  const prevLessonId = sortedLessons[currentIndex - 1]?.id ?? null;

  return (
    <LessonView
      lesson={lesson}
      module={mod}
      progress={progress}
      nextLessonId={nextLessonId}
      prevLessonId={prevLessonId}
      userId={user.id}
      isPro={isPro}
      totalLessonsInModule={(allLessons ?? []).length}
      pillarColor={pillarColor}
      pillarName={pillarName}
    />
  );
}
