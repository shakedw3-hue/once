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

  // If already completed, go to profile
  const { data: profile } = await supabase
    .from("users")
    .select("primary_path")
    .eq("id", user.id)
    .single();

  if (profile?.primary_path) {
    redirect("/profile");
  }

  return <QuestionnaireFlow />;
}
