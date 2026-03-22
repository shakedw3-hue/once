import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./ProfileForm";

export default async function ProfileCompletePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signup");

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, profile_completed, has_paid")
    .eq("id", user.id)
    .single();

  if (profile?.has_paid) redirect("/dashboard");
  if (profile?.profile_completed) redirect("/profile");

  return <ProfileForm name={profile?.full_name ?? ""} />;
}
