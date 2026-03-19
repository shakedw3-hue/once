"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { calculateScores, determinePaths } from "@/lib/questionnaire";

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

  // Update user profile with paths
  const { error: updateError } = await supabase
    .from("users")
    .update({
      primary_path: paths.primary,
      secondary_path: paths.secondary,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (updateError) {
    return { error: updateError.message };
  }

  redirect("/profile");
}
