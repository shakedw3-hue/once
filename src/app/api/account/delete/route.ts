import { createClient, createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const admin = createServiceClient();

  // Delete user data in dependency order (keep anonymized payment records for legal compliance)
  await admin.from("push_subscriptions").delete().eq("user_id", user.id);
  await admin.from("user_tracking").delete().eq("user_id", user.id);
  await admin.from("user_progress").delete().eq("user_id", user.id);
  await admin.from("questionnaire_answers").delete().eq("user_id", user.id);

  // Anonymize payments (keep for legal/financial compliance)
  await admin
    .from("payments")
    .update({ user_id: null })
    .eq("user_id", user.id);

  // Delete user profile
  await admin.from("users").delete().eq("id", user.id);

  // Delete auth user
  await admin.auth.admin.deleteUser(user.id);

  return NextResponse.json({ success: true });
}
