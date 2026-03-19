import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import AssessmentDemo from "@/components/landing/AssessmentDemo";
import Timeline from "@/components/landing/Timeline";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* 1. Hero.cinematic full-viewport */}
        <Hero />

        {/* 2. Credibility.visually distinct */}
        <Section>
          <div className="rounded-2xl rounded-2xl border bg-primary/[0.03] border-primary/10 p-6 sm:p-10">
            <p className="mb-2 text-label text-primary">Proven methodology</p>
            <h2 className="mb-3 text-section text-xl text-foreground sm:text-2xl">
              This isn&apos;t something we made up
            </h2>
            <p className="mb-8 max-w-lg text-sm text-muted-foreground">
              Once is built on principles used by therapists, coaches, athletes,
              and the military. We made them accessible to everyone.
            </p>

            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              {[
                { title: "Check all 4 areas, not just one", desc: "Your life doesn't run on one thing. Money stress kills focus. Low energy kills motivation. You have to see the full picture." },
                { title: "Do it, don't just watch it", desc: "You remember 50% more when you actually do something, compared to watching a video. Every lesson has an action step." },
                { title: "Start small, not big", desc: "Big transformation plans fail. One specific action per lesson. Small enough to actually do today." },
                { title: "Know the problem first", desc: "Therapists assess before treating. Coaches evaluate before coaching. Once does the same: assessment first." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-card p-4">
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["Professional athletes", "Therapists", "The U.S. military", "Executive coaches", "Harvard Medical School"].map((name) => (
                <span key={name} className="rounded-full border border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* 3. Interactive demo */}
        <Section>
          <h2 className="mb-2 text-section text-xl text-foreground sm:text-2xl">
            Try it right now
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Answer 2 questions. Watch your scores shift in real time.
          </p>
          <AssessmentDemo />
        </Section>

        {/* 4. How it works */}
        <Section>
          <h2 className="mb-8 text-section text-xl text-foreground sm:text-2xl">
            How it works
          </h2>
          <div className="space-y-6">
            {[
              { n: "1", title: "Take the assessment", desc: "10 questions about where you are in life. Each answer adds weighted scores to Money, Mind, Body, Spirit. 3 minutes." },
              { n: "2", title: "See your profile", desc: "Your scores across all 4 pillars. Your highest becomes your primary path. You see this before paying anything." },
              { n: "3", title: "Follow your path", desc: "5 modules. 5–7 lessons each. Every lesson: teaching, one action step, one reflection. 10–15 minutes per lesson." },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {step.n}
                </span>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 5. The 4 pillars */}
        <Section>
          <h2 className="mb-2 text-section text-xl text-foreground sm:text-2xl">The 4 pillars</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Weakness in one quietly drains the others.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Money", color: "#F59E0B", desc: "Financial clarity, decisions, risk" },
              { name: "Mind", color: "#A78BFA", desc: "Focus, stress, resilience, habits" },
              { name: "Body", color: "#34D399", desc: "Energy, nutrition, movement, recovery" },
              { name: "Spirit", color: "#60A5FA", desc: "Purpose, values, reflection, calm" },
            ].map((p) => (
              <div key={p.name} className="rounded-xl border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-sm font-semibold text-foreground">{p.name}</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. Your journey.timeline infographic */}
        <Section>
          <h2 className="mb-2 text-section text-xl text-foreground sm:text-2xl">
            Your journey with Once
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            From first question to path complete. Here&apos;s every step.
          </p>
          <Timeline />
        </Section>

        {/* 7. Pricing.Core + Pro */}
        <Section id="pricing">
          <h2 className="mb-2 text-section text-xl text-foreground sm:text-2xl">
            Two plans. One decision.
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Both include the full assessment. Both are one-time. No subscription.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Core */}
            <div className="rounded-2xl border bg-card p-6">
              <p className="mb-1 text-label text-muted-foreground">Once Core</p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-display text-4xl">649</span>
              </div>
              <ul className="mb-6 space-y-2">
                {[
                  "Full 4-pillar assessment",
                  "Personalized BetterLife profile",
                  "5 modules matched to your path",
                  "5–7 lessons with action steps",
                  "Progress tracking",
                  "Lifetime access",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Button render={<Link href="/auth/signup" />} variant="outline" className="w-full">
                Start Once
              </Button>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 card-elevated">
              <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground">
                Most popular
              </div>
              <p className="mb-1 text-label text-primary">Once Pro</p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-display text-4xl">999</span>
              </div>
              <ul className="mb-6 space-y-2">
                {[
                  "Everything in Core",
                  "Income skills: Social media management",
                  "E-commerce: Shopee & Lazada selling",
                  "Freelancing & client acquisition",
                  "Building an online side income",
                  "Priority updates & new modules",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Button render={<Link href="/auth/signup" />} className="w-full glow-indigo">
                Do It Once
              </Button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            GCash &amp; Maya accepted. No subscription. No upsells.
          </p>
        </Section>

        {/* 7. Comparison */}
        <Section>
          <h2 className="mb-6 text-section text-xl text-foreground sm:text-2xl">
            How it compares
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground sm:px-4" />
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-primary sm:px-4">Once</th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground sm:px-4">Online course</th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground sm:table-cell">Coaching</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs">
                {[
                  ["Price", "₱649–999 one-time", "₱2,000–₱8,000", "₱3,000–₱15,000/mo"],
                  ["Personalized", "✓ Based on your scores", "✗ Same for everyone", "✓"],
                  ["Assessment first", "✓ Free, before payment", "✗", "Depends"],
                  ["Format", "Worksheets + action steps", "Video lectures", "1-on-1 calls"],
                  ["Income skills", "✓ Pro plan", "✗ Usually 1 topic", "Depends"],
                  ["Recurring cost", "None", "Often subscription", "Monthly"],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="px-3 py-2.5 font-medium text-foreground sm:px-4">{row[0]}</td>
                    <td className="px-3 py-2.5 font-medium text-primary sm:px-4">{row[1]}</td>
                    <td className="px-3 py-2.5 text-muted-foreground sm:px-4">{row[2]}</td>
                    <td className="hidden px-4 py-2.5 text-muted-foreground sm:table-cell">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 8. Testimonials */}
        <Section>
          <Testimonials />
        </Section>

        {/* 9. FAQ */}
        <Section>
          <h2 className="mb-8 text-section text-xl text-foreground sm:text-2xl">Common questions</h2>
          <div className="space-y-5">
            {[
              { q: "Why should I trust this?", a: "You shouldn't, not until you try the free assessment. See if the results match what you know about yourself. If they do, the path will help. If not, you haven't paid anything." },
              { q: "Is this another online course?", a: "No. No video lectures. No guru. It's a diagnostic tool with structured worksheets. You read, you do, you reflect." },
              { q: "What's the difference between Core and Pro?", a: "Core gives you the assessment + personalized path. Pro adds practical income skills: social media management, Shopee/Lazada e-commerce, freelancing, and building an online side income." },
              { q: "Will there be upsells?", a: "No. Your plan gets you everything in it. No hidden premium tier, no add-ons." },
              { q: "Can I see results before paying?", a: "Yes. The assessment is free. You see your pillar scores and primary path. You only pay if you want the full modules." },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 9. Final CTA */}
        <section className="mx-auto max-w-3xl px-5 pb-16">
          <div className="rounded-2xl border-2 border-primary/15 bg-primary/[0.03] p-8 text-center sm:p-12 card-elevated">
            <h2 className="mb-3 text-display text-2xl sm:text-3xl">
              One decision.
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              The assessment is free. 3 minutes. You keep your results either way.
            </p>
            <Button
              render={<Link href="/auth/signup" />}
              size="lg"
              className="h-13 px-8 text-base font-semibold shadow-lg shadow-primary/10 transition-all hover:scale-[1.02]"
            >
              Take the Free Assessment
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      {children}
    </section>
  );
}
