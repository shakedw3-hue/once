import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LessonView from "@/components/dashboard/LessonView";

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

  const { data: lesson } = await supabase
    .from("lessons")
    .select("id, title, description, action_step, reflection_prompt, order, module_id")
    .eq("id", lessonId)
    .single();

  if (!lesson || lesson.module_id !== moduleId) redirect("/dashboard");

  const { data: mod } = await supabase
    .from("modules")
    .select("id, title, order")
    .eq("id", moduleId)
    .single();

  if (!mod) redirect("/dashboard");

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
    .eq("module_id", moduleId)
    .order("order");

  const currentIndex = (allLessons ?? []).findIndex((l) => l.id === lessonId);
  const nextLessonId = allLessons?.[currentIndex + 1]?.id ?? null;
  const prevLessonId = allLessons?.[currentIndex - 1]?.id ?? null;

  return (
    <LessonView
      lesson={lesson}
      module={mod}
      progress={progress}
      nextLessonId={nextLessonId}
      prevLessonId={prevLessonId}
      userId={user.id}
    />
  );
}
