import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
        <Step n="1" title="Diagnose" sub="We find exactly where you are." icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>}>
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

        <Step n="2" title="Match" sub="We build one path. Yours." icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.707c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/></svg>}>
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

        <Step n="3" title="Learn" sub="Thousands of hours of research. In 10 minutes a day." icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>}>
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

        <Step n="4" title="Launch" sub="Your first real income. Step by step." icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>}>
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
      </div>

      <div className="mb-8 flex justify-end">
        <Link href="/pillars" className="text-sm text-primary hover:underline">
          Next: The 4 pillars →
        </Link>
      </div>

      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Step 1 is free. See your scores before deciding.
        </p>
        <Button render={<Link href="/auth/signup" />} size="lg" className="h-12 px-6 text-sm font-semibold">
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
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
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
