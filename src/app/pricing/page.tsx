import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconPath, IconGrowth, IconCircuitBrain } from "@/components/ui/icons";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = {
  title: "Pricing | Once",
};

const playfair: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
};

export default function PricingPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <div className="text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500 mb-4">
          Simple Pricing
        </p>
        <h1
          className="text-4xl font-semibold tracking-tight sm:text-5xl mb-6"
          style={playfair}
        >
          Invest in yourself. Once.
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Most people spend ₱5,000 to ₱20,000 on courses they never finish. Once costs less than one course and tells you exactly which path is right for you.
        </p>
        <p className="mx-auto max-w-2xl mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
          The assessment is free. If the results make sense and you want the full
          path, it&apos;s a one-time payment.
        </p>
      </div>

      {/* Price cards */}
      <div className="mb-20 grid gap-8 sm:grid-cols-3 items-start">
        {/* Once Core */}
        <div className="rounded-2xl bg-white p-8 shadow-[0_4px_32px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
          <div className="mb-4"><IconPath size="md" /></div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-500">Once Core</p>
          <p className="mb-6 text-sm text-muted-foreground">Your path. Built for you.</p>
          <div className="mb-8 flex items-baseline gap-1">
            <span className="text-sm text-muted-foreground">₱</span>
            <span className="text-5xl font-bold tracking-tight" style={playfair}>1,499</span>
            <span className="ml-2 text-sm text-muted-foreground">one-time</span>
          </div>

          <ul className="mb-8 space-y-3">
            {[
              "Full assessment & personalized profile",
              "5 structured modules",
              "5–7 lessons per module",
              "Progress tracking",
              "Lifetime access",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
        <div className="relative rounded-2xl bg-white p-8 shadow-[0_4px_40px_rgba(79,70,229,0.18)] transition-shadow hover:shadow-[0_8px_48px_rgba(79,70,229,0.25)]">
          <div className="absolute -top-3.5 right-5 rounded-full bg-indigo-600 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-md">
            Most Popular
          </div>
          <div className="mb-4"><IconGrowth size="md" /></div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600">Once Pro</p>
          <p className="mb-6 text-sm text-muted-foreground">Your path. Plus your first income.</p>
          <div className="mb-8 flex items-baseline gap-1">
            <span className="text-sm text-muted-foreground">₱</span>
            <span className="text-5xl font-bold tracking-tight" style={playfair}>2,350</span>
            <span className="ml-2 text-sm text-muted-foreground">one-time</span>
          </div>

          <ul className="mb-8 space-y-3">
            {[
              "Everything in Core",
              "Social media management skills",
              "Shopee/Lazada e-commerce",
              "Freelancing & client acquisition",
              "Building an online side income",
              "Priority updates",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
        <div className="relative rounded-2xl bg-white p-8 shadow-[0_4px_40px_rgba(59,130,246,0.16)] transition-shadow hover:shadow-[0_8px_48px_rgba(59,130,246,0.24)]">
          <div className="absolute -top-3.5 right-5 rounded-full bg-blue-500 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-md">
            Best Investment
          </div>
          <div className="mb-4"><IconCircuitBrain size="md" color="#3B82F6" /></div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-500">Once AI Careers</p>
          <p className="mb-6 text-sm text-muted-foreground">No experience needed. AI does the work.</p>
          <div className="mb-8 flex items-baseline gap-1">
            <span className="text-sm text-muted-foreground">₱</span>
            <span className="text-5xl font-bold tracking-tight" style={playfair}>3,950</span>
            <span className="ml-2 text-sm text-muted-foreground">one-time</span>
          </div>

          <ul className="mb-8 space-y-3">
            {[
              "Everything in Pro, plus:",
              "\u{1F916} AI Business Services \u2014 \"You ask AI. AI does the work. You get paid.\" Earn: \u20B120K\u2013\u20B150K/project",
              "\u{1F3A8} AI Content & Design \u2014 \"You describe it. AI creates it. You deliver it.\" Earn: \u20B18K\u2013\u20B125K/month",
              "\u{1F4BB} AI Web & No-Code \u2014 \"Build a real website in 48 hours. Zero coding.\" Earn: \u20B115K\u2013\u20B140K/project",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
      </div>

      {/* Comparison table */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500 mb-3">
            Compare
          </p>
          <h2
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
            style={playfair}
          >
            How it compares
          </h2>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-5 py-4 text-left font-medium text-muted-foreground" />
                <th className="px-5 py-4 text-left font-semibold text-indigo-600">Once</th>
                <th className="px-5 py-4 text-left font-medium text-muted-foreground">Typical online course</th>
                <th className="hidden px-5 py-4 text-left font-medium text-muted-foreground sm:table-cell">Life coaching</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-5 py-4 font-medium">Price</td>
                <td className="px-5 py-4 font-semibold text-indigo-600">₱1,499–3,950</td>
                <td className="px-5 py-4 text-muted-foreground">₱2,000–₱8,000</td>
                <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">₱3,000–₱15,000/mo</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium">Personalized to you</td>
                <td className="px-5 py-4">
                  <Check />
                </td>
                <td className="px-5 py-4">
                  <Cross />
                  <span className="ml-1 text-xs text-muted-foreground">Same content for everyone</span>
                </td>
                <td className="hidden px-5 py-4 sm:table-cell">
                  <Check />
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium">Starts with assessment</td>
                <td className="px-5 py-4">
                  <Check />
                  <span className="ml-1 text-xs text-muted-foreground">Before you pay</span>
                </td>
                <td className="px-5 py-4">
                  <Cross />
                </td>
                <td className="hidden px-5 py-4 sm:table-cell">
                  <span className="text-xs text-muted-foreground">Depends on coach</span>
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium">Format</td>
                <td className="px-5 py-4 text-xs">Worksheets with action steps</td>
                <td className="px-5 py-4 text-xs text-muted-foreground">Video lectures</td>
                <td className="hidden px-5 py-4 text-xs text-muted-foreground sm:table-cell">1-on-1 calls</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium">Completion rate</td>
                <td className="px-5 py-4 text-xs">Structured to finish</td>
                <td className="px-5 py-4 text-xs text-muted-foreground">Most people quit</td>
                <td className="hidden px-5 py-4 text-xs text-muted-foreground sm:table-cell">Depends on you</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium">Covers all 4 life areas</td>
                <td className="px-5 py-4">
                  <Check />
                </td>
                <td className="px-5 py-4">
                  <Cross />
                  <span className="ml-1 text-xs text-muted-foreground">Usually 1 topic</span>
                </td>
                <td className="hidden px-5 py-4 sm:table-cell">
                  <span className="text-xs text-muted-foreground">Depends on coach</span>
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium">Recurring cost</td>
                <td className="px-5 py-4 font-semibold text-indigo-600">None</td>
                <td className="px-5 py-4 text-muted-foreground">Often subscription</td>
                <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">Monthly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500 mb-3">
            FAQ
          </p>
          <h2
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
            style={playfair}
          >
            Common questions about pricing
          </h2>
        </div>
        <div className="mx-auto max-w-2xl space-y-8">
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
            <div key={faq.q} className="rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
              <h3 className="mb-2 text-sm font-semibold">{faq.q}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-2xl bg-white p-10 text-center shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
        <p className="mb-6 text-sm text-muted-foreground">
          Start with the free assessment. Pay only if it makes sense.
        </p>
        <Button
          render={<Link href="/auth/signup" />}
          size="lg"
          className="h-14 w-full sm:w-auto px-8 text-sm font-semibold"
        >
          Do It Once
        </Button>
        <p className="mt-8 text-center once-signature">One investment. One path. Once<span style={{color:"#4F46E5"}}>.</span></p>
      </div>
    </SiteLayout>
  );
}

function Check() {
  return (
    <svg className="inline h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
