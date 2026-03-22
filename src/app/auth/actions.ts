"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Map raw Supabase error messages to user-friendly text */
function friendlyAuthError(raw: string): string {
  const lower = raw.toLowerCase();

  if (lower.includes("invalid login credentials"))
    return "Incorrect email or password. Please try again.";
  if (lower.includes("email not confirmed"))
    return "Please verify your email before logging in. Check your inbox.";
  if (lower.includes("user already registered"))
    return "An account with this email already exists. Try logging in instead.";
  if (lower.includes("password") && lower.includes("least"))
    return "Password must be at least 6 characters.";
  if (lower.includes("rate limit") || lower.includes("too many requests"))
    return "Too many attempts. Please wait a moment and try again.";
  if (lower.includes("email"))
    return "Please enter a valid email address.";

  // Fallback — never expose raw Supabase internals
  return "Something went wrong. Please try again.";
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: friendlyAuthError(error.message) };
  }

  redirect("/questionnaire");
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: friendlyAuthError(error.message) };
  }

  // Check if user has completed questionnaire
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
      redirect("/dashboard");
    }

    if (profile?.primary_path) {
      redirect("/profile");
    }

    redirect("/questionnaire");
  }

  redirect("/dashboard");
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/auth/reset-password`,
  });

  if (error) {
    return { error: friendlyAuthError(error.message) };
  }

  return { success: true };
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: friendlyAuthError(error.message) };
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
