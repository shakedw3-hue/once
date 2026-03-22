"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function createCoupon(formData: FormData) {
  const db = createServiceClient();

  const code = (formData.get("code") as string).toUpperCase().trim();
  const discountType = formData.get("discountType") as string;
  const discountValue = Number(formData.get("discountValue"));
  const maxUses = formData.get("maxUses") ? Number(formData.get("maxUses")) : null;
  const expiresAt = formData.get("expiresAt") ? new Date(formData.get("expiresAt") as string).toISOString() : null;
  const plans = formData.getAll("plans") as string[];

  const { error } = await db.from("coupons").insert({
    code,
    discount_type: discountType,
    discount_value: discountValue,
    applicable_plans: plans.length > 0 ? plans : ["core", "pro", "ai"],
    max_uses: maxUses,
    expires_at: expiresAt,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/coupons");
  return { success: true };
}

export async function toggleCoupon(id: string, active: boolean) {
  const db = createServiceClient();
  await db.from("coupons").update({ active }).eq("id", id);
  revalidatePath("/admin/coupons");
}

export async function deleteCoupon(id: string) {
  const db = createServiceClient();
  await db.from("coupons").delete().eq("id", id);
  revalidatePath("/admin/coupons");
}
