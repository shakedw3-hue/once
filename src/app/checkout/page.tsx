import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CheckoutRedirect from "@/components/dashboard/CheckoutRedirect";

interface Props {
  searchParams: Promise<{ plan?: string }>;
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { plan } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("users")
    .select("has_paid")
    .eq("id", user.id)
    .single();

  if (profile?.has_paid) redirect("/dashboard");

  const selectedPlan = plan === "ai" ? "ai" : plan === "pro" ? "pro" : "core";

  return <CheckoutRedirect plan={selectedPlan} />;
}
