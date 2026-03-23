"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { couponSchema } from "@/lib/validation";

export async function createCoupon(formData: FormData) {
  try {
    const db = createServiceClient();

    const code = (formData.get("code") as string || "").toUpperCase().trim();
    const discountType = formData.get("discountType") as string;
    const discountValue = Number(formData.get("discountValue"));
    const maxUses = formData.get("maxUses") ? Number(formData.get("maxUses")) : undefined;
    const expiresAt = formData.get("expiresAt") ? new Date(formData.get("expiresAt") as string).toISOString() : undefined;
    const plans = formData.getAll("plans") as string[];

    const parsed = couponSchema.safeParse({
      code,
      discount_type: discountType,
      discount_value: discountValue,
      applicable_plans: plans.length > 0 ? plans : undefined,
      max_uses: maxUses,
      expires_at: expiresAt,
    });

    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message || "Invalid coupon data." };
    }

    const { error } = await db.from("coupons").insert({
      code: parsed.data.code,
      discount_type: parsed.data.discount_type,
      discount_value: parsed.data.discount_value,
      applicable_plans: parsed.data.applicable_plans || ["core", "pro", "ai"],
      max_uses: parsed.data.max_uses || null,
      expires_at: parsed.data.expires_at || null,
    });

    if (error) {
      console.error("Create coupon error:", error.message);
      return { error: "Something went wrong. Please try again." };
    }

    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (err) {
    console.error("Create coupon error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function toggleCoupon(id: string, active: boolean) {
  try {
    const db = createServiceClient();
    await db.from("coupons").update({ active }).eq("id", id);
    revalidatePath("/admin/coupons");
  } catch (err) {
    console.error("Toggle coupon error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function deleteCoupon(id: string) {
  try {
    const db = createServiceClient();
    await db.from("coupons").delete().eq("id", id);
    revalidatePath("/admin/coupons");
  } catch (err) {
    console.error("Delete coupon error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}
