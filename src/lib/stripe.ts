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

export const PRICE_AMOUNT = 64900; // ₱649 in centavos
export const PRICE_CURRENCY = "php";

/**
 * Creates a Stripe Checkout Session with GCash and Maya
 * as additional Philippine payment methods alongside card.
 */
export async function createCheckoutSession(userId: string, userEmail: string) {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    customer_email: userEmail,
    payment_method_types: ["card"],
    payment_method_options: {},
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: PRICE_CURRENCY,
          product_data: {
            name: "BetterLife — Full Access",
            description:
              "Lifetime access to your personalized path across Money, Mind, Body, and Spirit.",
          },
          unit_amount: PRICE_AMOUNT,
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: userId,
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/profile`,
  });

  return session;
}
