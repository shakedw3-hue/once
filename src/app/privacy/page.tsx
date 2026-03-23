import type { Metadata } from "next";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <h1 className="mb-4 text-display text-2xl sm:text-3xl">Privacy Policy</h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: March 2026</p>

      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          Once (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, store, and protect your
          personal information in compliance with the Philippine Data Privacy Act of 2012
          (Republic Act No. 10173) and its Implementing Rules and Regulations.
        </p>
      </div>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">1. Information We Collect</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>We collect the following types of personal information:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>Account information:</strong> your name and email address when you create
              an account
            </li>
            <li>
              <strong>Assessment answers:</strong> your responses to the Once assessment, used to
              personalize your learning experience
            </li>
            <li>
              <strong>Payment information:</strong> payment details processed securely through
              Stripe (we do not store your full card number, GCash, or Maya account details on
              our servers)
            </li>
            <li>
              <strong>Usage data:</strong> information about how you interact with the platform,
              including pages visited, lessons completed, and time spent
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">2. How We Use Your Information</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>We use your personal information to:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Provide and deliver the Once educational service to you</li>
            <li>Personalize your learning path based on your assessment results</li>
            <li>Process payments and send transaction confirmations</li>
            <li>Communicate with you about your account, updates, or support requests</li>
            <li>Improve and develop the platform based on aggregated usage patterns</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">3. Data Storage and Security</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Your data is stored securely using Supabase with encryption at rest and in transit.
            We implement industry-standard security measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p>
            While we take reasonable steps to protect your data, no method of electronic storage
            or transmission is 100% secure. We cannot guarantee absolute security.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">4. Third-Party Services</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            We share your information with third parties only as necessary to operate the
            Service:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>Stripe:</strong> processes your payments securely. Stripe&apos;s use of
              your data is governed by their own{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Supabase:</strong> provides our database and authentication infrastructure.
            </li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information to third parties for
            marketing purposes.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">
          5. Your Rights Under RA 10173
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Under the Philippine Data Privacy Act (RA 10173), you have the following rights as a
            data subject:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>Right to be informed:</strong> you have the right to know how your personal
              data is being collected and processed
            </li>
            <li>
              <strong>Right to access:</strong> you may request a copy of the personal data we
              hold about you
            </li>
            <li>
              <strong>Right to correction:</strong> you may request correction of any inaccurate
              or incomplete personal data
            </li>
            <li>
              <strong>Right to erasure or blocking:</strong> you may request deletion of your
              personal data, subject to legitimate business or legal requirements
            </li>
            <li>
              <strong>Right to data portability:</strong> you may request your data in a
              structured, commonly used format
            </li>
            <li>
              <strong>Right to object:</strong> you may object to the processing of your personal
              data in certain circumstances
            </li>
            <li>
              <strong>Right to file a complaint:</strong> you may file a complaint with the
              National Privacy Commission (NPC) if you believe your data privacy rights have been
              violated
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:hello@onceph.com" className="underline hover:text-foreground">
              hello@onceph.com
            </a>
            . We will respond to your request within a reasonable timeframe, and no later than 30
            days from receipt.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">6. Data Retention</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            We retain your personal data for as long as your account is active or as needed to
            provide you with the Service. If you request account deletion, we will remove your
            personal data within 30 days, except where we are required to retain it for legal or
            legitimate business purposes.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">7. Cookies</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            We use essential cookies to keep you logged in and to ensure the platform functions
            properly. We may also use analytics cookies to understand how the platform is used.
            You can control cookie settings through your browser preferences.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">8. Children&apos;s Privacy</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            The Once platform is not intended for children under the age of 18. We do not
            knowingly collect personal information from anyone under 18 without parental consent.
            If we become aware that we have collected data from a minor without appropriate
            consent, we will take steps to delete that information promptly.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">9. Changes to This Policy</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            We may update this Privacy Policy from time to time. When we make significant
            changes, we will notify you by updating the &quot;Last updated&quot; date at the top
            of this page and, where appropriate, by sending you a notification. Your continued use
            of the Service after changes are posted constitutes acceptance of the updated policy.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mt-8 mb-3 text-section text-lg">10. Contact Us</h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            If you have questions or concerns about this Privacy Policy or your personal data,
            please contact us at{" "}
            <a href="mailto:hello@onceph.com" className="underline hover:text-foreground">
              hello@onceph.com
            </a>
            .
          </p>
          <p>
            You may also contact the National Privacy Commission (NPC) of the Philippines for
            data privacy concerns at{" "}
            <a
              href="https://www.privacy.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              www.privacy.gov.ph
            </a>
            .
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
