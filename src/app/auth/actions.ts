"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { signupSchema, loginSchema } from "@/lib/validation";

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
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { success } = rateLimit(ip, 5, 15 * 60 * 1000);
    if (!success) {
      return { error: "Too many attempts. Please try again later." };
    }

    const parsed = signupSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      fullName: formData.get("fullName"),
    });

    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message || "Invalid input." };
    }

    const { email, password, fullName } = parsed.data;

    const supabase = await createClient();

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

    // Fire-and-forget welcome email
    sendWelcomeEmail({ email, firstName: fullName.split(" ")[0] }).catch(console.error);
  } catch (err) {
    // Re-throw redirect errors (Next.js uses thrown responses for redirects)
    if (err instanceof Error && err.message === "NEXT_REDIRECT") throw err;
    console.error("Signup error:", err);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/questionnaire");
}

export async function login(formData: FormData) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { success } = rateLimit(ip, 5, 15 * 60 * 1000);
    if (!success) {
      return { error: "Too many attempts. Please try again later." };
    }

    const parsed = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message || "Invalid input." };
    }

    const { email, password } = parsed.data;

    const supabase = await createClient();

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
        .select("primary_path, has_paid, role")
        .eq("id", user.id)
        .single();

      // Admin always goes to admin dashboard
      if (profile?.role === "admin") {
        redirect("/admin");
      }

      if (profile?.has_paid) {
        redirect("/dashboard");
      }

      if (profile?.primary_path) {
        redirect("/profile");
      }

      redirect("/questionnaire");
    }
  } catch (err) {
    if (err instanceof Error && err.message === "NEXT_REDIRECT") throw err;
    console.error("Login error:", err);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}

export async function forgotPassword(formData: FormData) {
  try {
    const supabase = await createClient();
    const email = formData.get("email") as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${SITE_URL}/auth/reset-password`,
    });

    if (error) {
      return { error: friendlyAuthError(error.message) };
    }

    return { success: true };
  } catch (err) {
    console.error("Forgot password error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function resetPassword(formData: FormData) {
  try {
    const supabase = await createClient();
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return { error: friendlyAuthError(error.message) };
    }
  } catch (err) {
    if (err instanceof Error && err.message === "NEXT_REDIRECT") throw err;
    console.error("Reset password error:", err);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
