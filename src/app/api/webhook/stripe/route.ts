import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
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
    }
  }

  return NextResponse.json({ received: true });
}
