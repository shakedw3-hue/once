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
        <Hero />

        {/* The problem */}
        <Section>
          <h2 className="mb-3 text-section text-xl sm:text-2xl">
            Most people spend years trying things that don&apos;t work.
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Wrong courses. Wrong timing. Wrong order. Once starts differently.
            We studied what actually works and built a system that tells you
            exactly what you need, right now, based on where you actually are
            in life.
          </p>
          <p className="text-sm font-medium">
            Thousands of hours of research. One path. Built for you.
          </p>
        </Section>

        {/* How Once works */}
        <Section>
          <div className="rounded-2xl border bg-primary/[0.03] border-primary/10 p-6 sm:p-10">
            <p className="mb-2 text-label text-primary">How Once works</p>
            <h2 className="mb-8 text-section text-xl sm:text-2xl">
              Four steps. One path.
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { step: "1", title: "Diagnose", desc: "We find exactly where you are. 10 questions across Money, Mind, Body, and Spirit. No assumptions." },
                { step: "2", title: "Match", desc: "We build one path. Yours. Based on your actual scores, not a catalog of courses." },
                { step: "3", title: "Learn", desc: "Thousands of hours of research. In 10 minutes a day. Every lesson is built from what the best minds already proved." },
                { step: "4", title: "Launch", desc: "Your first real income. Step by step. Pro members get practical skills for the Philippine market." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-card p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{item.step}</span>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              <Link href="/how-it-works" className="text-primary hover:underline">See the full breakdown →</Link>
            </p>
          </div>
        </Section>

        {/* The 4 pillars */}
        <Section>
          <h2 className="mb-2 text-section text-xl sm:text-2xl">The 4 pillars</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Weakness in one quietly drains the others.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Money", color: "#F59E0B", desc: "Built from what the world's most successful investors actually do." },
              { name: "Mind", color: "#A78BFA", desc: "Built from decades of neuroscience research on how high performers think and decide." },
              { name: "Body", color: "#34D399", desc: "Built from the science of energy, sleep, and performance." },
              { name: "Spirit", color: "#60A5FA", desc: "Built from the philosophy of people who found meaning in the hardest circumstances." },
            ].map((p) => (
              <div key={p.name} className="rounded-xl border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-sm font-semibold">{p.name}</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            <Link href="/pillars" className="text-primary hover:underline">See all pillars and modules →</Link>
          </p>
        </Section>

        {/* Interactive demo */}
        <Section>
          <h2 className="mb-2 text-section text-xl sm:text-2xl">Try it right now</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Answer 2 questions. Watch your scores shift in real time.
          </p>
          <AssessmentDemo />
        </Section>

        {/* Your journey */}
        <Section>
          <h2 className="mb-2 text-section text-xl sm:text-2xl">Your journey with Once</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            From first question to real results. Here is every step.
          </p>
          <Timeline />
        </Section>

        {/* Pricing */}
        <Section id="pricing">
          <h2 className="mb-2 text-section text-xl sm:text-2xl">
            Two paths. One decision.
          </h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Most people spend ₱5,000 to ₱20,000 on courses they never finish.
            Once costs less than one course and tells you exactly which path is
            right for you.
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
            Both start with the same free assessment. Both are one-time. No subscription.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6">
              <p className="mb-1 text-label text-muted-foreground">Once Core</p>
              <p className="mb-1 text-xs text-muted-foreground">Your path. Built for you.</p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-display text-4xl">649</span>
              </div>
              <ul className="mb-6 space-y-2">
                {[
                  "Full 4-pillar diagnostic assessment",
                  "Your personalized Once profile",
                  "5 modules matched to your path",
                  "25 lessons built from world-class research",
                  "Every lesson: teaching + action step + reflection",
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
                Do It Once
              </Button>
            </div>

            <div className="relative rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 card-elevated">
              <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground">
                Income track
              </div>
              <p className="mb-1 text-label text-primary">Once Pro</p>
              <p className="mb-1 text-xs text-muted-foreground">Your path. Plus your first income.</p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-display text-4xl">999</span>
              </div>
              <ul className="mb-6 space-y-2">
                {[
                  "Everything in Core",
                  "Social media management for clients",
                  "Shopee and Lazada e-commerce",
                  "Freelancing and client acquisition",
                  "Building an online side income",
                  "100 additional lessons with PH-specific tools",
                  "Priority updates and new modules",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Button render={<Link href="/auth/signup" />} className="w-full shadow-sm shadow-primary/10">
                Do It Once
              </Button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            GCash and Maya accepted. No subscription. No upsells.
          </p>
        </Section>

        {/* Comparison */}
        <Section>
          <h2 className="mb-6 text-section text-xl sm:text-2xl">How it compares</h2>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground sm:px-4" />
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-primary sm:px-4">Once</th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground sm:px-4">Online course</th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground sm:table-cell">Coaching</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs">
                {[
                  ["Price", "₱649/999 one-time", "₱2,000+", "₱5,000+/mo"],
                  ["Built for you", "✓ Based on your scores", "✗ Same for all", "✓"],
                  ["Sources", "✓ Best research, one path", "✗ One creator", "✗ One coach"],
                  ["Format", "10-min actionable lessons", "Video lectures", "Calls"],
                  ["Income skills", "✓ Pro plan", "✗ Usually theory", "Depends"],
                  ["Recurring cost", "None", "Often subscription", "Monthly"],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="px-3 py-2.5 font-medium sm:px-4">{row[0]}</td>
                    <td className="px-3 py-2.5 font-medium text-primary sm:px-4">{row[1]}</td>
                    <td className="px-3 py-2.5 text-muted-foreground sm:px-4">{row[2]}</td>
                    <td className="hidden px-4 py-2.5 text-muted-foreground sm:table-cell">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Testimonials */}
        <Section>
          <Testimonials />
        </Section>

        {/* FAQ */}
        <Section>
          <h2 className="mb-8 text-section text-xl sm:text-2xl">Common questions</h2>
          <div className="space-y-5">
            {[
              { q: "Where does the content come from?", a: "Every lesson is built from published research and books by the world's leading thinkers in each field. We cite the source in each lesson. Nothing is invented." },
              { q: "Why should I trust this?", a: "You should not. Not until you try the free assessment. See if the results match what you already know about yourself. If they do, the path will help. If not, you have not paid anything." },
              { q: "What is the difference between Core and Pro?", a: "Core gives you the assessment and a personalized path with 25 lessons. Pro adds the income track: 100 additional lessons on social media management, e-commerce, freelancing, and building online side income. All with Philippine-specific tools and real peso numbers." },
              { q: "Is this another online course?", a: "No. No video lectures. No guru. Every lesson is a 10-minute worksheet: what the research says, one action step for today, one reflection question. You do. You do not watch." },
              { q: "Will there be upsells?", a: "No. Your plan gets you everything in it. No hidden tier. No add-ons." },
              { q: "Can I see results before paying?", a: "Yes. The assessment is free. You see your scores and your path. You only pay if you want the full lessons." },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="mb-1 text-sm font-semibold">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Final CTA */}
        <section className="mx-auto max-w-3xl px-5 pb-16">
          <div className="rounded-2xl border-2 border-primary/15 bg-primary/[0.03] p-8 text-center sm:p-12 card-elevated">
            <h2 className="mb-3 text-display text-2xl sm:text-3xl">
              One decision.
            </h2>
            <p className="mb-2 text-sm text-muted-foreground">
              You don&apos;t need another course. You need the right one. Once.
            </p>
            <p className="mb-6 text-xs text-muted-foreground">
              Free assessment. 3 minutes. You keep your results either way.
            </p>
            <Button
              render={<Link href="/auth/signup" />}
              size="lg"
              className="h-13 px-8 text-base font-semibold shadow-lg shadow-primary/10 transition-all hover:scale-[1.02]"
            >
              Do It Once
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
