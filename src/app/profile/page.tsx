import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { buildRecommendation } from "@/lib/questionnaire";
import ProfileReveal from "@/components/questionnaire/ProfileReveal";
import type { Pillar, Plan, PillarScores } from "@/types/database";

export const metadata: Metadata = {
  title: "Your Profile",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signup");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, primary_path, secondary_path, has_paid, recommendation_plan, recommendation_track, income_target, digital_comfort")
    .eq("id", user.id)
    .single();

  if (!profile?.primary_path) {
    redirect("/questionnaire");
  }

  const { data: qa } = await supabase
    .from("questionnaire_answers")
    .select("scores, answers")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(1)
    .single();

  const scores = (qa?.scores as PillarScores) ?? { money: 0, mind: 0, body: 0, spirit: 0 };
  const answers = (qa?.answers as Record<string, number>) ?? {};
  const primaryPath = profile.primary_path as Pillar;

  // Build full recommendation object
  const recPlan = (profile.recommendation_plan as Plan) || "pro";
  const recTrack = profile.recommendation_track || "";
  const recommendation = buildRecommendation(recPlan, recTrack, answers, primaryPath);

  return (
    <ProfileReveal
      fullName={profile.full_name}
      primaryPath={primaryPath}
      secondaryPath={profile.secondary_path as Pillar}
      scores={scores}
      hasPaid={profile.has_paid}
      recommendation={recommendation}
    />
  );
}
