"use server";

import { createClient } from "@/lib/supabase/server";

export async function completeLesson(lessonId: string, reflection: string | null) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Verify user has paid
  const { data: profile } = await supabase
    .from("users")
    .select("has_paid")
    .eq("id", user.id)
    .single();

  if (!profile?.has_paid) return { error: "Payment required" };

  // Upsert progress
  const { error } = await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
        reflection,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    );

  if (error) return { error: error.message };

  // Track analytics
  await supabase.from("analytics").insert({
    user_id: user.id,
    event: "lesson_completion",
    metadata: { lesson_id: lessonId },
  });

  return { success: true };
}
