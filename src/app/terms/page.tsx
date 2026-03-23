import type { Metadata } from "next";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <SiteLayout>
      <h1 className="mb-4 text-display text-2xl sm:text-3xl">Terms of Service</h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: March 2026</p>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">1. Agreement to Terms</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            By accessing or using the Once platform (&quot;Service&quot;), operated by Better
            (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;), you agree to be bound by
            these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may
            not access or use the Service. Once is a digital education platform operated by Better
            in the Republic of the Philippines.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">2. Eligibility</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            You must be at least 18 years old to create an account and purchase access to Once.
            By using the Service, you represent and warrant that you meet this age requirement.
            If you are under 18, you may only use the Service under the supervision of a parent
            or legal guardian who agrees to be bound by these Terms.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">3. Your Account</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            When you create an account, you must provide accurate and complete information. You
            are responsible for maintaining the confidentiality of your account credentials and
            for all activities that occur under your account. Please notify us immediately if you
            suspect unauthorized access to your account.
          </p>
          <p>
            Each purchase grants access to a single user. Account sharing or transferring your
            account to another person is not permitted.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">4. Payment</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Once offers digital education products available for a one-time payment. There are no
            subscriptions, recurring charges, or hidden fees. Current pricing:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Once Core: ₱1,499 (one-time payment)</li>
            <li>Once Pro: ₱2,350 (one-time payment)</li>
            <li>Once AI Careers: ₱3,950 (one-time payment)</li>
          </ul>
          <p>
            Payments are accepted via GCash, Maya, credit card, and debit card. All transactions
            are securely processed by Paddle, our Merchant of Record. Once does not store your
            full payment details on its servers. Prices are listed in Philippine Pesos (₱) and
            are inclusive of applicable charges unless otherwise stated.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">5. Content License</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Upon successful payment, you are granted a limited, non-exclusive, non-transferable,
            revocable license to access and use the purchased course content for your personal,
            non-commercial educational purposes only.
          </p>
          <p>
            You may not reproduce, distribute, publicly display, sell, resell, or otherwise
            exploit any course materials, including but not limited to videos, text, images,
            worksheets, and assessments, without prior written consent from Once.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">6. User Conduct</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>You agree not to:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
            <li>Share, redistribute, or resell course content in any form</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Interfere with or disrupt the Service or its infrastructure</li>
            <li>Use automated tools, bots, or scrapers to access the Service</li>
            <li>Impersonate another person or entity</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate your account if you violate these Terms.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">7. Intellectual Property</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            All content on the Once platform, including course materials, text, graphics, logos,
            designs, software, and trademarks, is the property of Once or its licensors and is
            protected by Philippine and international intellectual property laws. Nothing in these
            Terms grants you any right, title, or interest in the Service beyond the limited
            license described above.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">8. Limitation of Liability</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            To the maximum extent permitted by Philippine law, Once and its operators, employees,
            and affiliates shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of or related to your use of the
            Service. Our total liability for any claim arising from these Terms or the Service
            shall not exceed the amount you paid for your purchase.
          </p>
          <p>
            The Service and its content are provided &quot;as is&quot; and &quot;as available&quot;
            without warranties of any kind, whether express or implied. We do not guarantee
            specific outcomes or results from using our educational content.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">9. Changes to Terms</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            We may update these Terms from time to time. When we make changes, we will update the
            &quot;Last updated&quot; date at the top of this page. Continued use of the Service
            after changes are posted constitutes your acceptance of the revised Terms. We
            encourage you to review these Terms periodically.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">10. Governing Law</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            Republic of the Philippines. Any disputes arising from or relating to these Terms or
            the Service shall be subject to the exclusive jurisdiction of the courts of the
            Republic of the Philippines.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">11. Contact Us</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            If you have any questions about these Terms, please contact us at{" "}
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
