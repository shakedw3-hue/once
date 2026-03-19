import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ModuleView from "@/components/dashboard/ModuleView";

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { moduleId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("users")
    .select("has_paid")
    .eq("id", user.id)
    .single();

  if (!profile?.has_paid) redirect("/profile");

  const { data: mod } = await supabase
    .from("modules")
    .select("id, title, description, order, path_id")
    .eq("id", moduleId)
    .single();

  if (!mod) redirect("/dashboard");

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, title, description, order")
    .eq("module_id", moduleId)
    .order("order");

  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id, completed")
    .eq("user_id", user.id);

  const completedSet = new Set(
    (progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id)
  );

  const lessonsWithProgress = (lessons ?? []).map((lesson) => ({
    ...lesson,
    completed: completedSet.has(lesson.id),
  }));

  return (
    <ModuleView
      module={mod}
      lessons={lessonsWithProgress}
    />
  );
}
