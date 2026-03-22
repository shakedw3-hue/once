import { createServiceClient } from "@/lib/supabase/server";
import CouponManager from "./CouponManager";

export default async function CouponsPage() {
  const db = createServiceClient();

  const { data: coupons } = await db
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Coupons</h1>
      <CouponManager coupons={coupons ?? []} />
    </div>
  );
}
