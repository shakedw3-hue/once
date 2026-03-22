import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconCompass, IconMatch, IconLearn, IconRocket } from "@/components/ui/icons";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = { title: "How it works" };

export default function HowItWorksPage() {
  return (
    <SiteLayout>
      <h1 className="mb-4 text-display text-3xl sm:text-4xl">
        How Once works
      </h1>
      <p className="mb-12 text-base leading-relaxed text-muted-foreground sm:text-lg">
        Four steps. One path. The assessment is free.
      </p>

      <div className="mb-16 space-y-12">
        <Step n="1" title="Diagnose" sub="We find exactly where you are." icon={<IconCompass />}>
          <p>
            15 questions about your goals, daily life, and frustrations. Each answer
            adds weighted points to four pillars: Money, Mind, Body, Spirit. When you
            finish, the system calculates your score for each.
          </p>
          <p>
            This is not a personality quiz. It is a diagnostic. The same approach
            therapists use before treatment, coaches use before training, and the
            U.S. military uses before assigning support.
          </p>
          <p>Takes 10 minutes. You do not need to pay for this step.</p>
        </Step>

        <Step n="2" title="Match" sub="We build one path. Yours." icon={<IconMatch />}>
          <p>
            Your highest scoring pillar becomes your primary path. You get a full
            Once profile with scores, insights about what is holding you back, and
            a preview of your modules.
          </p>
          <p>
            This is where most platforms hand you a catalog. Once does the opposite:
            the system picks what is right for you, based on your actual data. No
            browsing. No guessing. No wasted modules.
          </p>
          <p>You see your profile before paying anything.</p>
        </Step>

        <Step n="3" title="Learn" sub="Thousands of hours of research. In 10 minutes a day." icon={<IconLearn />}>
          <p>
            Ray Dalio wrote 600 pages on principles. Andrew Huberman recorded 300
            hours of neuroscience podcasts. James Clear spent years studying habit
            formation. We took what matters for your specific situation and built each
            insight into a 10-minute lesson you can act on today.
          </p>
          <p>Every lesson follows the same structure:</p>
          <div className="rounded-lg border bg-card p-4">
            <div className="space-y-2 text-xs">
              <div><span className="font-semibold text-foreground">Teaching</span>: what the research says, explained simply</div>
              <div><span className="font-semibold text-foreground">Action step</span>: one specific thing to do within 24 hours</div>
              <div><span className="font-semibold text-foreground">Reflection</span>: a question that connects the insight to your life</div>
            </div>
          </div>
          <p>25 Core lessons. Each one sourced from a specific researcher or practitioner.</p>
        </Step>

        <Step n="4" title="Launch" sub="Your first real income. Step by step." icon={<IconRocket />}>
          <p>
            Once Pro adds 100 additional lessons across four income tracks designed
            for the Philippine market: social media management, Shopee/Lazada
            e-commerce, freelancing, and building online side income. Once AI Careers
            goes further with three AI-powered tracks: AI Business Services, AI Content
            &amp; Design, and AI Web &amp; No-Code, teaching you the skills employers and
            clients are paying premium for right now.
          </p>
          <p>
            These include real platforms (Canva, OnlineJobs.ph, Shopee Seller Center),
            real numbers (₱5,000 to ₱15,000 per client), and step-by-step instructions
            you can follow this week.
          </p>
          <p>Growing as a person is the foundation. Growing your income is the launch.</p>
        </Step>
        <p className="mt-8 text-center once-signature">This is how change happens. Once<span className="once-dot">.</span></p>
      </div>

      <div className="mb-8 flex justify-end">
        <Link href="/pillars" className="text-sm text-primary hover:underline">
          Next: The 4 pillars →
        </Link>
      </div>

      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Step 1 is free. See your scores first.
        </p>
        <Button render={<Link href="/auth/signup" />} size="lg" className="h-14 w-full px-8 text-base font-semibold sm:w-auto">
          Do It Once
        </Button>
      </div>
    </SiteLayout>
  );
}

function Step({ n, title, sub, icon, children }: { n: string; title: string; sub: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        {icon}
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-xs text-primary">{sub}</p>
        </div>
      </div>
      <div className="ml-[60px] space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
