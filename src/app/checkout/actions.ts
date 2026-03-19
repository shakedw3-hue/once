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

  const validPlan: Plan = plan === "pro" ? "pro" : "core";
  const session = await createCheckoutSession(user.id, user.email!, validPlan);

  if (session.url) {
    redirect(session.url);
  }

  return { error: "Failed to create checkout session" };
}
