import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = {
  title: "How it works | Once",
};

export default function HowItWorksPage() {
  return (
    <SiteLayout>
      <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        How it works
      </h1>
      <p className="mb-12 text-base leading-relaxed text-muted-foreground sm:text-lg">
        Three steps. No account needed to start. The assessment is free.
      </p>

      {/* Steps */}
      <div className="mb-16 space-y-10">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              1
            </span>
            <h2 className="text-lg font-semibold">Take the assessment</h2>
          </div>
          <div className="ml-11 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              10 questions about your goals, daily life, and what&apos;s frustrating
              you. Each question has 4 options. Pick the one that fits best.
            </p>
            <p>
              Behind the scenes, every answer adds weighted points to four
              pillars: Money, Mind, Body, Spirit. When you&apos;re done, the system
              calculates your score for each.
            </p>
            <p>
              This takes about 3 minutes. You don&apos;t need to pay to do this part.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              2
            </span>
            <h2 className="text-lg font-semibold">See your Once profile</h2>
          </div>
          <div className="ml-11 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              You get a score for each pillar, for example: Money 78, Mind 54,
              Body 41, Spirit 63. The highest becomes your primary path. Second
              highest becomes your secondary.
            </p>
            <p>
              You also see a preview of the modules in your path. The first
              module is visible. The rest are locked until you pay.
            </p>
            <p>
              This is where you decide: does this make sense for me? If yes,
              continue. If not, you keep your scores and go.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              3
            </span>
            <h2 className="text-lg font-semibold">Work through your path</h2>
          </div>
          <div className="ml-11 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Pay ₱649 once and unlock your full path: 5 modules, each with
              5–7 lessons. Every lesson is structured the same way:
            </p>
            <div className="rounded-lg border bg-card p-4">
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-foreground">Teaching section</span>
                  <span className="text-muted-foreground">: the concept explained clearly, no fluff</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Action step</span>
                  <span className="text-muted-foreground">: one specific thing to do today</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Reflection prompt</span>
                  <span className="text-muted-foreground">: a question to help you think deeper</span>
                </div>
              </div>
            </div>
            <p>
              No videos. No passive watching. You read, you do, you reflect.
              Go at your own pace. There&apos;s no timer or deadline.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 flex justify-end">
        <Link href="/pillars" className="text-sm text-primary hover:underline">
          Next: The 4 pillars &rarr;
        </Link>
      </div>

      {/* CTA */}
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          The assessment is free. See your scores first, then decide.
        </p>
        <Button
          render={<Link href="/auth/signup" />}
          size="lg"
          className="h-12 px-6 text-sm font-semibold"
        >
          Take the assessment
        </Button>
      </div>
    </SiteLayout>
  );
}
