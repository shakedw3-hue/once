import type { Metadata } from "next";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = {
  title: "Refund Policy",
};

export default function RefundPage() {
  return (
    <SiteLayout>
      <h1 className="mb-4 text-display text-2xl sm:text-3xl">Refund Policy</h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: March 2026</p>

      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          We want you to feel confident about your purchase. This Refund Policy explains how
          refunds work for Once Core (₱1,499), Once Pro (₱2,350), and Once AI Careers (₱3,950).
        </p>
      </div>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">1. Free Assessment</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            The Once assessment is completely free. You can take the assessment, explore your
            results, and decide whether the full program is right for you, with no payment
            required and no obligation.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">2. Paid Access</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            When you purchase Once Core, Once Pro, or Once AI Careers, you receive immediate, full access to all
            modules and lessons included in your plan. This is a one-time payment. There are no
            subscriptions or recurring charges.
          </p>
          <p>
            Because Once is a digital product with immediate access upon purchase, refunds are
            generally not available once your payment is processed. We encourage you to review
            the free assessment results and plan details before purchasing.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">3. Exceptions</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            We understand that issues can happen. We will consider refund requests in the
            following cases:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>Technical issues:</strong> you are unable to access the content you paid
              for due to a platform error, and the issue cannot be resolved by our support team
            </li>
            <li>
              <strong>Duplicate charges:</strong> you were accidentally charged more than once
              for the same purchase
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">4. How to Request a Refund</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            To request a refund, please email us at{" "}
            <a href="mailto:hello@useonce.co" className="underline hover:text-foreground">
              hello@useonce.co
            </a>{" "}
            within <strong>7 days</strong> of your purchase. Include the following details:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Your full name and the email address associated with your account</li>
            <li>Date of purchase</li>
            <li>Reason for the refund request</li>
            <li>
              Any relevant screenshots or details (for example, error messages or proof of
              duplicate charges)
            </li>
          </ul>
          <p>Refund requests submitted after the 7-day window may not be eligible.</p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">5. Processing Time</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Once a refund is approved, it will be processed within <strong>5 to 10 business
            days</strong> and returned to your original payment method (GCash, Maya, credit card,
            or debit card via Stripe). The exact timing may vary depending on your bank or
            payment provider.
          </p>
          <p>
            Upon refund, your access to the paid content will be revoked.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">6. Contact Us</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            If you have any questions about this policy or need assistance, reach out to us at{" "}
            <a href="mailto:hello@useonce.co" className="underline hover:text-foreground">
              hello@useonce.co
            </a>
            . We are here to help.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
