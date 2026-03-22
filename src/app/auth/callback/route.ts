import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check user profile to determine redirect destination
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("primary_path, has_paid")
          .eq("id", user.id)
          .single();

        if (profile?.has_paid) {
          return NextResponse.redirect(`${origin}/dashboard`);
        }

        if (profile?.primary_path) {
          // Has path but hasn't paid — send to profile/reveal
          return NextResponse.redirect(`${origin}/profile`);
        }
      }

      // No profile or no primary_path — start questionnaire
      return NextResponse.redirect(`${origin}/questionnaire`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
