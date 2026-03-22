"use server";

import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export async function saveProfileDetails(formData: FormData) {
  const supabase = await createClient();
  const db = createServiceClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const fullName = formData.get("fullName") as string;
  const age = formData.get("age") ? Number(formData.get("age")) : null;
  const location = formData.get("location") as string || null;
  const occupation = formData.get("occupation") as string || null;
  const boughtBefore = formData.get("boughtBefore") === "yes";

  const { error } = await db
    .from("users")
    .update({
      full_name: fullName,
      age,
      location,
      occupation,
      bought_courses_before: boughtBefore,
      profile_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  redirect("/profile");
}
