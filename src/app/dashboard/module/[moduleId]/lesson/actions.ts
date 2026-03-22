"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";

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

  // Update streak
  const db = createServiceClient();
  const today = new Date().toISOString().split("T")[0];
  const { data: streakData } = await db
    .from("users")
    .select("current_streak, longest_streak, last_activity_date")
    .eq("id", user.id)
    .single();

  if (streakData) {
    const lastDate = streakData.last_activity_date;
    let newStreak = streakData.current_streak || 0;

    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      newStreak = lastDate === yesterday.toISOString().split("T")[0] ? newStreak + 1 : 1;

      await db.from("users").update({
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, streakData.longest_streak || 0),
        last_activity_date: today,
      }).eq("id", user.id);
    }
  }

  return { success: true };
}
