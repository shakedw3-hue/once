import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { sendPurchaseConfirmationEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success, retryAfter } = rateLimit(ip, 100, 60 * 1000);
  if (!success) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const plan = session.metadata?.plan ?? "core";

    if (userId && session.payment_status === "paid") {
      const supabaseAdmin = getSupabaseAdmin();

      // Record payment
      await supabaseAdmin.from("payments").insert({
        user_id: userId,
        stripe_session_id: session.id,
        amount: session.amount_total ?? 64900,
        currency: session.currency ?? "php",
        status: "completed",
      });

      // Unlock user access with plan
      await supabaseAdmin
        .from("users")
        .update({ has_paid: true, plan, updated_at: new Date().toISOString() })
        .eq("id", userId);

      // Track analytics
      await supabaseAdmin.from("analytics").insert({
        user_id: userId,
        event: "purchase",
        metadata: {
          amount: session.amount_total,
          currency: session.currency,
          session_id: session.id,
        },
      });

      // Fire-and-forget purchase confirmation email
      const { data: userData } = await supabaseAdmin
        .from("users")
        .select("primary_path, recommendation_plan, recommendation_track")
        .eq("id", userId)
        .single();

      const customerEmail = session.customer_details?.email || session.metadata?.email;
      const customerName = session.customer_details?.name || session.metadata?.name || "";

      if (customerEmail) {
        const planLabels: Record<string, string> = { core: "Once Core", pro: "Once Pro", ai: "Once AI Careers" };
        const planLabel = planLabels[plan] || plan;
        const priceLookup: Record<string, number> = { core: 1499, pro: 2350, ai: 3950 };
        const lessonLookup: Record<string, number> = { core: 20, pro: 40, ai: 60 };

        sendPurchaseConfirmationEmail({
          email: customerEmail,
          firstName: customerName.split(" ")[0] || "there",
          planName: planLabel,
          primaryPillar: userData?.primary_path || "",
          trackName: userData?.recommendation_track || undefined,
          price: priceLookup[plan] || (session.amount_total ? session.amount_total / 100 : 0),
          lessonCount: lessonLookup[plan] || 20,
        }).catch(console.error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
