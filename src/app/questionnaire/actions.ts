"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { calculateScores, determinePaths, determineRecommendation } from "@/lib/questionnaire";

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
    return { error: insertError.message };
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
    return { error: updateError.message };
  }

  redirect("/profile");
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

  if (error) return { error: error.message };

  redirect("/dashboard");
}
