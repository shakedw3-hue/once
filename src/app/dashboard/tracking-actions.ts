"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";

// ─── Streak Logic ───

export async function updateStreak() {
  try {
    const supabase = await createClient();
    const db = createServiceClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const today = new Date().toISOString().split("T")[0];

    const { data: profile } = await db
      .from("users")
      .select("current_streak, longest_streak, last_activity_date")
      .eq("id", user.id)
      .single();

    if (!profile) return { error: "Profile not found" };

    const lastDate = profile.last_activity_date;
    let newStreak = profile.current_streak || 0;

    if (lastDate === today) {
      // Already logged today
      return { streak: newStreak, longest: profile.longest_streak || 0 };
    }

    // Check if yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (lastDate === yesterdayStr) {
      newStreak += 1;
    } else {
      newStreak = 1; // Reset streak
    }

    const longestStreak = Math.max(newStreak, profile.longest_streak || 0);

    await db
      .from("users")
      .update({
        current_streak: newStreak,
        longest_streak: longestStreak,
        last_activity_date: today,
      })
      .eq("id", user.id);

    return { streak: newStreak, longest: longestStreak };
  } catch (err) {
    console.error("Update streak error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

// ─── Personal Tracking ───

export async function saveTrackingEntry(
  metricType: string,
  value: number | null,
  text: string | null
) {
  try {
    const supabase = await createClient();
    const db = createServiceClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const today = new Date().toISOString().split("T")[0];

    // Use service client to bypass RLS for upsert
    const { error } = await db
      .from("user_tracking")
      .upsert({
        user_id: user.id,
        entry_date: today,
        metric_type: metricType,
        metric_value: value,
        metric_text: text,
      }, {
        onConflict: "user_id,entry_date,metric_type",
      });

    if (error) {
      console.error("Save tracking entry error:", error.message);
      return { error: "Something went wrong. Please try again." };
    }
    return { success: true };
  } catch (err) {
    console.error("Save tracking entry error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function getTrackingHistory(metricType: string, days: number = 30) {
  try {
    const supabase = await createClient();
    const db = createServiceClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { entries: [] };

    const since = new Date();
    since.setDate(since.getDate() - days);

    const { data } = await db
      .from("user_tracking")
      .select("entry_date, metric_value, metric_text")
      .eq("user_id", user.id)
      .eq("metric_type", metricType)
      .gte("entry_date", since.toISOString().split("T")[0]);

    return { entries: data ?? [] };
  } catch (err) {
    console.error("Get tracking history error:", err);
    return { entries: [] };
  }
}
