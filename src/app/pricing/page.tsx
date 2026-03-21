import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = {
  title: "Pricing | Once",
};

export default function PricingPage() {
  return (
    <SiteLayout>
      <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Pricing
      </h1>
      <p className="mb-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
        Most people spend ₱5,000 to ₱20,000 on courses they never finish. Once costs less than one course and tells you exactly which path is right for you.
      </p>
      <p className="mb-12 text-base leading-relaxed text-muted-foreground sm:text-lg">
        The assessment is free. If the results make sense and you want the full
        path, it&apos;s a one-time payment.
      </p>

      {/* Price cards */}
      <div className="mb-12 grid gap-6 sm:grid-cols-3">
        {/* Once Core */}
        <div className="rounded-xl border bg-card p-6 sm:p-8">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Once Core</p>
          <p className="mb-4 text-xs text-muted-foreground">Your path. Built for you.</p>
          <div className="mb-6 flex items-baseline gap-1">
            <span className="text-sm text-muted-foreground">₱</span>
            <span className="font-display text-5xl font-bold tracking-tight">1,499</span>
            <span className="ml-2 text-sm text-muted-foreground">one-time</span>
          </div>

          <ul className="mb-6 space-y-2.5">
            {[
              "Full assessment & personalized profile",
              "5 structured modules",
              "5–7 lessons per module",
              "Progress tracking",
              "Lifetime access",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <Button
            render={<Link href="/auth/signup" />}
            size="lg"
            className="h-12 w-full text-sm font-semibold"
          >
            Start Once
          </Button>
        </div>

        {/* Once Pro */}
        <div className="rounded-xl border-2 border-primary bg-card p-6 sm:p-8">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary">Once Pro</p>
          <p className="mb-4 text-xs text-muted-foreground">Your path. Plus your first income.</p>
          <div className="mb-6 flex items-baseline gap-1">
            <span className="text-sm text-muted-foreground">₱</span>
            <span className="font-display text-5xl font-bold tracking-tight">2,350</span>
            <span className="ml-2 text-sm text-muted-foreground">one-time</span>
          </div>

          <ul className="mb-6 space-y-2.5">
            {[
              "Everything in Core",
              "Social media management skills",
              "Shopee/Lazada e-commerce",
              "Freelancing & client acquisition",
              "Building an online side income",
              "Priority updates",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <Button
            render={<Link href="/auth/signup" />}
            size="lg"
            className="h-12 w-full text-sm font-semibold"
          >
            Do It Once
          </Button>
        </div>

        {/* Once AI Careers */}
        <div className="rounded-xl border bg-card p-6 sm:p-8">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Once AI Careers</p>
          <p className="mb-4 text-xs text-muted-foreground">Your path. Plus AI-powered income skills.</p>
          <div className="mb-6 flex items-baseline gap-1">
            <span className="text-sm text-muted-foreground">₱</span>
            <span className="font-display text-5xl font-bold tracking-tight">3,950</span>
            <span className="ml-2 text-sm text-muted-foreground">one-time</span>
          </div>

          <ul className="mb-6 space-y-2.5">
            {[
              "Everything in Pro",
              "AI Business Services — earn ₱15K–₱50K/mo",
              "AI Content & Design — earn ₱10K–₱40K/mo",
              "AI Web & No-Code — earn ₱20K–₱60K/mo",
              "Real AI tools and workflows",
              "Priority updates + new AI modules",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <Button
            render={<Link href="/auth/signup" />}
            size="lg"
            className="h-12 w-full text-sm font-semibold"
          >
            Go AI
          </Button>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mb-12">
        <h2 className="mb-6 font-display text-xl font-semibold tracking-tight sm:text-2xl">
          How it compares
        </h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground" />
                <th className="px-4 py-3 text-left font-semibold text-primary">Once</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Typical online course</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Life coaching</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-3 font-medium">Price</td>
                <td className="px-4 py-3 font-semibold text-primary">₱1,499–3,950</td>
                <td className="px-4 py-3 text-muted-foreground">₱2,000–₱8,000</td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">₱3,000–₱15,000/mo</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Personalized to you</td>
                <td className="px-4 py-3">
                  <Check />
                </td>
                <td className="px-4 py-3">
                  <Cross />
                  <span className="ml-1 text-xs text-muted-foreground">Same content for everyone</span>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <Check />
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Starts with assessment</td>
                <td className="px-4 py-3">
                  <Check />
                  <span className="ml-1 text-xs text-muted-foreground">Before you pay</span>
                </td>
                <td className="px-4 py-3">
                  <Cross />
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span className="text-xs text-muted-foreground">Depends on coach</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Format</td>
                <td className="px-4 py-3 text-xs">Worksheets with action steps</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">Video lectures</td>
                <td className="hidden px-4 py-3 text-xs text-muted-foreground sm:table-cell">1-on-1 calls</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Completion rate</td>
                <td className="px-4 py-3 text-xs">Structured to finish</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">Most people quit</td>
                <td className="hidden px-4 py-3 text-xs text-muted-foreground sm:table-cell">Depends on you</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Covers all 4 life areas</td>
                <td className="px-4 py-3">
                  <Check />
                </td>
                <td className="px-4 py-3">
                  <Cross />
                  <span className="ml-1 text-xs text-muted-foreground">Usually 1 topic</span>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span className="text-xs text-muted-foreground">Depends on coach</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Recurring cost</td>
                <td className="px-4 py-3 font-semibold text-primary">None</td>
                <td className="px-4 py-3 text-muted-foreground">Often subscription</td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">Monthly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="mb-6 font-display text-xl font-semibold tracking-tight sm:text-2xl">
          Common questions about pricing
        </h2>
        <div className="space-y-5">
          {[
            {
              q: "Can I see the assessment results before paying?",
              a: "Yes. The assessment is completely free. You'll see your pillar scores and primary path. You only pay if you want access to the full modules and lessons.",
            },
            {
              q: "Why is it so cheap?",
              a: "The content is text-based worksheets, so there's no video production, no hosting costs, no support team. We pass those savings to you. We'd rather 10,000 people use it at ₱1,499 than 100 people pay ₱14,990.",
            },
            {
              q: "Is there a refund?",
              a: "We built it so you can judge the quality before paying. Take the assessment, see if it resonates. If it does, pay. If it doesn't, don't. We'd rather you not pay than feel tricked.",
            },
            {
              q: "What's the difference between Core and Pro?",
              a: "Core gives you the full assessment, personalized profile, and 5 modules with lessons and action steps. Pro includes everything in Core plus practical income skills: social media management, Shopee/Lazada e-commerce, freelancing, and building an online side income, plus priority updates. AI Careers includes everything in Pro plus three AI-powered career tracks: AI Business Services, AI Content & Design, and AI Web & No-Code.",
            },
            {
              q: "Will there be upsells after I pay?",
              a: "No. You pick Core, Pro, or AI Careers and that's it. No hidden fees, no add-ons, no \"exclusive masterclass\" behind another paywall.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="mb-1 text-sm font-semibold">{faq.q}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Start with the free assessment. Pay later if it makes sense.
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

function Check() {
  return (
    <svg className="inline h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="inline h-4 w-4 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
