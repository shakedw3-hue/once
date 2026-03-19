import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}

export type Plan = "core" | "pro";

export const PLANS: Record<Plan, { amount: number; name: string; description: string }> = {
  core: {
    amount: 64900,
    name: "Once Core",
    description: "Your personalized path across Money, Mind, Body, and Spirit. 25 lessons. Lifetime access.",
  },
  pro: {
    amount: 99900,
    name: "Once Pro",
    description: "Everything in Core plus 100 income-track lessons: social media, e-commerce, freelancing, and online side income. Lifetime access.",
  },
};

export async function createCheckoutSession(userId: string, userEmail: string, plan: Plan = "core") {
  const stripe = getStripe();
  const planConfig = PLANS[plan];

  const session = await stripe.checkout.sessions.create({
    customer_email: userEmail,
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "php",
          product_data: {
            name: planConfig.name,
            description: planConfig.description,
          },
          unit_amount: planConfig.amount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: userId,
      plan: plan,
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/profile`,
  });

  return session;
}
