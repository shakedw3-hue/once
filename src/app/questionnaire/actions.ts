"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { calculateScores, determinePaths, determineRecommendation } from "@/lib/questionnaire";
import { sendProfileReadyEmail } from "@/lib/email";

export async function submitQuestionnaire(answers: Record<string, number>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const scores = calculateScores(answers);
  const paths = determinePaths(scores);

  // Smart recommendation engine
  const recommendation = determineRecommendation(answers, paths.primary);

  // Save questionnaire answers
  const { error: insertError } = await supabase
    .from("questionnaire_answers")
    .insert({
      user_id: user.id,
      answers,
      scores,
    });

  if (insertError) {
    console.error("Questionnaire insert error:", insertError.message);
    return { error: "Something went wrong saving your answers. Please try again." };
  }

  // Update user profile with paths + recommendation
  const { error: updateError } = await supabase
    .from("users")
    .update({
      primary_path: paths.primary,
      secondary_path: paths.secondary,
      recommendation_plan: recommendation.plan,
      recommendation_track: recommendation.track || null,
      income_target: answers["income_target"] ?? null,
      digital_comfort: answers["digital_skills"] ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (updateError) {
    console.error("Profile update error:", updateError.message);
    return { error: "Something went wrong updating your profile. Please try again." };
  }

  // Fire-and-forget profile ready email
  const recPlanName = recommendation.plan === "ai" ? "Once AI Careers" : recommendation.plan === "pro" ? "Once Pro" : "Once Core";
  const firstName = (user.user_metadata?.full_name as string)?.split(" ")[0] || "there";
  sendProfileReadyEmail({
    email: user.email || "",
    firstName,
    primaryPillar: paths.primary,
    planName: recPlanName,
    trackName: recommendation.track || undefined,
  }).catch(console.error);

  redirect("/profile/complete");
}

export async function devSkipPayment(plan: "core" | "pro" | "ai") {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("users")
    .update({
      has_paid: true,
      plan,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    console.error("Dev skip payment error:", error.message);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}
