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
          Once is operated by Better. We want every customer to feel confident about their
          purchase. This policy explains how refunds work.
        </p>
      </div>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">1. 14-Day Refund Guarantee</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            If you are not satisfied with your purchase for any reason, you may request a
            full refund within <strong>14 days</strong> of your purchase date. No questions
            asked. No conditions. No exceptions.
          </p>
          <p>
            This applies to all plans: Once Core (₱1,499), Once Pro (₱2,350), and Once AI
            Careers (₱3,950).
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">2. How to Request a Refund</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            To request a refund, simply email us at{" "}
            <a href="mailto:hello@onceph.com" className="underline hover:text-foreground">
              hello@onceph.com
            </a>{" "}
            within 14 days of your purchase. Include your name and the email address
            associated with your account.
          </p>
          <p>
            That is all we need. You do not need to provide a reason.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">3. Processing Time</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Once a refund is requested, it will be processed within <strong>5 to 10 business
            days</strong> and returned to your original payment method. The exact timing may
            vary depending on your bank or payment provider.
          </p>
          <p>
            Upon refund, your access to the paid content will be revoked.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">4. Free Assessment</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            The Once assessment is completely free. You can take the assessment, explore your
            results, and decide whether the full program is right for you, with no payment
            required and no obligation.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">5. Contact Us</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            If you have any questions about this policy or need assistance, reach out to us at{" "}
            <a href="mailto:hello@onceph.com" className="underline hover:text-foreground">
              hello@onceph.com
            </a>
            .
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
