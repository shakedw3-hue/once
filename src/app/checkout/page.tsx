import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CheckoutRedirect from "@/components/dashboard/CheckoutRedirect";

export default async function CheckoutPage() {
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

  return <CheckoutRedirect />;
}
