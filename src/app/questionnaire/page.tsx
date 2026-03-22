import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import QuestionnaireFlow from "@/components/questionnaire/QuestionnaireFlow";

export const metadata: Metadata = {
  title: "Questionnaire",
};

export default async function QuestionnairePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signup");
  }

  // If already paid, go to dashboard
  const { data: profile } = await supabase
    .from("users")
    .select("primary_path, has_paid")
    .eq("id", user.id)
    .single();

  if (profile?.has_paid) {
    redirect("/dashboard");
  }

  // Allow retaking the questionnaire even if primary_path exists
  // (user might want to redo it before paying)
  return <QuestionnaireFlow />;
}
