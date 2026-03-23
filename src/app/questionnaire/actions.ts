"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { calculateScores, determinePaths, determineRecommendation } from "@/lib/questionnaire";
import { sendProfileReadyEmail } from "@/lib/email";
import { questionnaireAnswersSchema } from "@/lib/validation";

export async function submitQuestionnaire(answers: Record<string, number>) {
  try {
    const parsed = questionnaireAnswersSchema.safeParse(answers);
    if (!parsed.success) {
      return { error: "Invalid questionnaire answers. Please try again." };
    }
    const validatedAnswers = parsed.data;

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Not authenticated" };
    }

    const scores = calculateScores(validatedAnswers);
    const paths = determinePaths(scores);

    // Smart recommendation engine
    const recommendation = determineRecommendation(validatedAnswers, paths.primary);

    // Save questionnaire answers
    const { error: insertError } = await supabase
      .from("questionnaire_answers")
      .insert({
        user_id: user.id,
        answers: validatedAnswers,
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
        income_target: validatedAnswers["income_target"] ?? null,
        digital_comfort: validatedAnswers["digital_skills"] ?? null,
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
  } catch (err) {
    if (err instanceof Error && err.message === "NEXT_REDIRECT") throw err;
    console.error("Submit questionnaire error:", err);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/profile/complete");
}

export async function devSkipPayment(plan: "core" | "pro" | "ai") {
  try {
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
  } catch (err) {
    if (err instanceof Error && err.message === "NEXT_REDIRECT") throw err;
    console.error("Dev skip payment error:", err);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}
