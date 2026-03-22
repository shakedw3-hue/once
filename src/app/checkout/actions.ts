"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createCheckoutSession, type Plan } from "@/lib/stripe";

export async function initiateCheckout(plan: Plan = "core") {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("has_paid")
    .eq("id", user.id)
    .single();

  if (profile?.has_paid) {
    redirect("/dashboard");
  }

  const validPlan: Plan = plan === "ai" ? "ai" : plan === "pro" ? "pro" : "core";

  try {
    const session = await createCheckoutSession(user.id, user.email!, validPlan);

    if (session.url) {
      redirect(session.url);
    }

    return { error: "Failed to create checkout session. Please try again." };
  } catch (e) {
    // redirect() throws a special error — rethrow it
    if (e instanceof Error && e.message === "NEXT_REDIRECT") {
      throw e;
    }
    // Check for common error property patterns
    const err = e as { digest?: string; message?: string };
    if (err.digest?.startsWith("NEXT_REDIRECT")) {
      throw e;
    }
    return { error: "Payment provider is not configured yet. Contact support or try again later." };
  }
}
