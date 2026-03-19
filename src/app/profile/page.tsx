import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileReveal from "@/components/questionnaire/ProfileReveal";
import type { Pillar, PillarScores } from "@/types/database";

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
    .select("full_name, primary_path, secondary_path, has_paid")
    .eq("id", user.id)
    .single();

  if (!profile?.primary_path) {
    redirect("/questionnaire");
  }

  const { data: qa } = await supabase
    .from("questionnaire_answers")
    .select("scores")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(1)
    .single();

  return (
    <ProfileReveal
      fullName={profile.full_name}
      primaryPath={profile.primary_path as Pillar}
      secondaryPath={profile.secondary_path as Pillar}
      scores={(qa?.scores as PillarScores) ?? { money: 0, mind: 0, body: 0, spirit: 0 }}
      hasPaid={profile.has_paid}
    />
  );
}
