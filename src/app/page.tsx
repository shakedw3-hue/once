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
                { step: "1", title: "Diagnose", desc: "We find exactly where you are. 15 questions across Money, Mind, Body, and Spirit. No assumptions." },
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                name: "Money", color: "#F59E0B", bg: "bg-amber-50", border: "border-amber-200",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                desc: "Built from what the world's most successful investors actually do.",
                names: "Warren Buffett · Ray Dalio · Robert Kiyosaki · Elon Musk",
              },
              {
                name: "Mind", color: "#A78BFA", bg: "bg-violet-50", border: "border-violet-200",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7l3 3 3-3c2-1.5 4-4 4-7a7 7 0 0 0-7-7z"/></svg>,
                desc: "Built from decades of neuroscience research on how high performers think and decide.",
                names: "Andrew Huberman · Kobe Bryant · James Clear · Cal Newport",
              },
              {
                name: "Body", color: "#34D399", bg: "bg-emerald-50", border: "border-emerald-200",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
                desc: "Built from the science of energy, sleep, and performance.",
                names: "LeBron James · Cristiano Ronaldo · Matthew Walker · Peter Attia",
              },
              {
                name: "Spirit", color: "#60A5FA", bg: "bg-blue-50", border: "border-blue-200",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
                desc: "Built from the philosophy of people who found meaning in the hardest circumstances.",
                names: "Dalai Lama · Oprah Winfrey · Viktor Frankl · Ryan Holiday",
              },
            ].map((p) => (
              <div key={p.name} className={`rounded-xl border ${p.border} ${p.bg} p-4`}>
                <div className="mb-2 flex items-center gap-2.5">
                  {p.icon}
                  <span className="text-sm font-semibold">{p.name}</span>
                </div>
                <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                <p className="text-[10px] text-muted-foreground/60">
                  Inspired by {p.names}
                </p>
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
            Three paths. One decision.
          </h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Most people spend ₱5,000 to ₱20,000 on courses they never finish.
            Once costs less and tells you exactly which path is right for you.
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
            All start with the same free assessment. All are one-time. No subscription.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-card p-5">
              <p className="mb-1 text-label text-muted-foreground">Once Core</p>
              <p className="mb-1 text-xs text-muted-foreground">Know where you are. Build the foundation.</p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-display text-3xl">1,499</span>
              </div>
              <ul className="mb-5 space-y-1.5">
                {["Full 4-pillar assessment", "Your personalized Once profile", "5 modules, 25 lessons", "Action steps + reflections", "Progress tracking", "Lifetime access"].map(i => <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{i}</li>)}
              </ul>
              <Button render={<Link href="/auth/signup" />} variant="outline" className="w-full text-xs">Do It Once</Button>
            </div>

            <div className="relative rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-5 card-elevated">
              <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground">Popular</div>
              <p className="mb-1 text-label text-primary">Once Pro</p>
              <p className="mb-1 text-xs text-muted-foreground">Your first side income. ₱15,000 to ₱40,000/month.</p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-display text-3xl">2,350</span>
              </div>
              <ul className="mb-5 space-y-1.5">
                {["Everything in Core", "Social media management", "Shopee/Lazada e-commerce", "Freelancing skills", "Online side income", "100 additional lessons"].map(i => <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{i}</li>)}
              </ul>
              <Button render={<Link href="/auth/signup" />} className="w-full text-xs shadow-sm shadow-primary/10">Do It Once</Button>
            </div>

            <div className="relative rounded-2xl border-2 border-blue-400/20 bg-blue-50 p-5">
              <div className="absolute -top-3 right-4 rounded-full bg-blue-500 px-3 py-1 text-[10px] font-semibold text-white">⚡ AI Careers</div>
              <p className="mb-1 text-label text-blue-600">Once AI Careers</p>
              <p className="mb-1 text-xs text-muted-foreground">Skills of the future. ₱20,000+ per project.</p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-display text-3xl">3,950</span>
              </div>
              <div className="mb-5 space-y-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Everything in Pro, plus 3 AI tracks:</p>
                <div className="rounded-lg border bg-card p-3 space-y-2">
                  <div className="flex items-start gap-2 text-xs"><span>🤖</span><div><span className="font-semibold">AI Business Services</span><br/><span className="text-muted-foreground">Build chatbots and automations. ₱20,000 to ₱50,000/project</span></div></div>
                  <div className="flex items-start gap-2 text-xs"><span>🎨</span><div><span className="font-semibold">AI Content & Design</span><br/><span className="text-muted-foreground">Create content and brand identities with AI. ₱8,000 to ₱25,000/month</span></div></div>
                  <div className="flex items-start gap-2 text-xs"><span>💻</span><div><span className="font-semibold">AI Web & No-Code</span><br/><span className="text-muted-foreground">Build websites and dashboards for SMEs. ₱15,000 to ₱40,000/project</span></div></div>
                </div>
              </div>
              <Button render={<Link href="/auth/signup" />} className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white">Do It Once</Button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            GCash and Maya accepted. No subscription. No upsells. Make your money back on your first client.
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
                  ["Price", "₱1,499/2,350/3,950 one-time", "₱2,000+", "₱5,000+/mo"],
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
              { q: "What is the difference between Core, Pro, and AI Careers?", a: "Core gives you the assessment and a personalized path with 25 lessons. Pro adds the income track: 100 additional lessons on social media management, e-commerce, freelancing, and building online side income. AI Careers includes everything in Pro plus three AI-powered career tracks: AI Business Services, AI Content & Design, and AI Web & No-Code. All with Philippine-specific tools and real peso numbers." },
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
              Free assessment. 10 minutes. You keep your results either way.
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
    <section id={id} className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      {children}
    </section>
  );
}
