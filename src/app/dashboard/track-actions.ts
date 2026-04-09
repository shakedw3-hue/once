"use server";

import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { findTrackById, tracksForPlan } from "@/lib/tracks";

/**
 * Set the user's currently active income/career track.
 * Stored in the existing `recommendation_track` column on the users table
 * (we repurpose it as the user's chosen active track id since adding a new
 * column requires a manual migration).
 *
 * Validates that the track belongs to the user's plan tier.
 */
export async function setActiveTrack(trackId: string) {
  try {
    const supabase = await createClient();
    const db = createServiceClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const track = findTrackById(trackId);
    if (!track) return { error: "Unknown track" };

    // Verify the user's plan grants access to this track tier
    const { data: profile } = await db
      .from("users")
      .select("plan")
      .eq("id", user.id)
      .single();

    if (!profile) return { error: "Profile not found" };

    const allowed = tracksForPlan(profile.plan);
    if (!allowed.find((t) => t.id === trackId)) {
      return { error: "This track requires a different plan" };
    }

    const { error } = await db
      .from("users")
      .update({ recommendation_track: trackId })
      .eq("id", user.id);

    if (error) {
      console.error("setActiveTrack update error:", error.message);
      return { error: "Could not save your selection. Please try again." };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    console.error("setActiveTrack error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}
