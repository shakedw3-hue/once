"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase: null, error: "Not authenticated" };

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { supabase: null, error: "Not authorized" };
  return { supabase, error: null };
}

// --- Module actions ---

export async function createModule(pathId: string, title: string, description: string) {
  const { supabase, error } = await requireAdmin();
  if (error || !supabase) return { error: error ?? "Unknown error" };

  // Get next order
  const { data: existing } = await supabase
    .from("modules")
    .select("order")
    .eq("path_id", pathId)
    .order("order", { ascending: false })
    .limit(1);

  const nextOrder = (existing?.[0]?.order ?? 0) + 1;

  const { error: insertError } = await supabase.from("modules").insert({
    path_id: pathId,
    title,
    description,
    order: nextOrder,
  });

  if (insertError) return { error: insertError.message };
  revalidatePath("/admin/content");
  return { success: true };
}

export async function updateModule(moduleId: string, title: string, description: string) {
  const { supabase, error } = await requireAdmin();
  if (error || !supabase) return { error: error ?? "Unknown error" };

  const { error: updateError } = await supabase
    .from("modules")
    .update({ title, description })
    .eq("id", moduleId);

  if (updateError) return { error: updateError.message };
  revalidatePath("/admin/content");
  return { success: true };
}

export async function deleteModule(moduleId: string) {
  const { supabase, error } = await requireAdmin();
  if (error || !supabase) return { error: error ?? "Unknown error" };

  const { error: deleteError } = await supabase
    .from("modules")
    .delete()
    .eq("id", moduleId);

  if (deleteError) return { error: deleteError.message };
  revalidatePath("/admin/content");
  return { success: true };
}

// --- Lesson actions ---

export async function createLesson(
  moduleId: string,
  data: { title: string; description: string; actionStep: string; reflectionPrompt: string }
) {
  const { supabase, error } = await requireAdmin();
  if (error || !supabase) return { error: error ?? "Unknown error" };

  const { data: existing } = await supabase
    .from("lessons")
    .select("order")
    .eq("module_id", moduleId)
    .order("order", { ascending: false })
    .limit(1);

  const nextOrder = (existing?.[0]?.order ?? 0) + 1;

  const { error: insertError } = await supabase.from("lessons").insert({
    module_id: moduleId,
    title: data.title,
    description: data.description,
    action_step: data.actionStep,
    reflection_prompt: data.reflectionPrompt,
    order: nextOrder,
  });

  if (insertError) return { error: insertError.message };
  revalidatePath("/admin/content");
  return { success: true };
}

export async function updateLesson(
  lessonId: string,
  data: { title: string; description: string; actionStep: string; reflectionPrompt: string }
) {
  const { supabase, error } = await requireAdmin();
  if (error || !supabase) return { error: error ?? "Unknown error" };

  const { error: updateError } = await supabase
    .from("lessons")
    .update({
      title: data.title,
      description: data.description,
      action_step: data.actionStep,
      reflection_prompt: data.reflectionPrompt,
    })
    .eq("id", lessonId);

  if (updateError) return { error: updateError.message };
  revalidatePath("/admin/content");
  return { success: true };
}

export async function deleteLesson(lessonId: string) {
  const { supabase, error } = await requireAdmin();
  if (error || !supabase) return { error: error ?? "Unknown error" };

  const { error: deleteError } = await supabase
    .from("lessons")
    .delete()
    .eq("id", lessonId);

  if (deleteError) return { error: deleteError.message };
  revalidatePath("/admin/content");
  return { success: true };
}
