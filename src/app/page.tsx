import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import AssessmentDemo from "@/components/landing/AssessmentDemo";
import Timeline from "@/components/landing/Timeline";
import Testimonials from "@/components/landing/Testimonials";
import StickyCTA from "@/components/landing/StickyCTA";
import { IconMoney, IconMind, IconBody, IconSpirit, IconCompass, IconMatch, IconLearn, IconRocket } from "@/components/ui/icons";

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
          <p className="mt-6 once-signature">Once<span className="once-dot">.</span></p>
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
                { title: "Diagnose", icon: <IconCompass size="sm" />, desc: "We find exactly where you are. 15 questions across Money, Mind, Body, and Spirit. No assumptions." },
                { title: "Match", icon: <IconMatch size="sm" />, desc: "We build one path. Yours. Based on your actual scores, not a catalog of courses." },
                { title: "Learn", icon: <IconLearn size="sm" />, desc: "Thousands of hours of research. In 10 minutes a day. Every lesson is built from what the best minds already proved." },
                { title: "Launch", icon: <IconRocket size="sm" />, desc: "Your first real income. Step by step. Pro members get practical skills for the Philippine market." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-card p-4">
                  <div className="mb-2 flex items-center gap-2">
                    {item.icon}
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              <Link href="/how-it-works" className="text-primary hover:underline">See the full breakdown →</Link>
            </p>
            <p className="mt-4 text-center once-signature">This is how change happens. Once<span className="once-dot">.</span></p>
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
                icon: <IconMoney size="sm" />,
                desc: "Built from what the world's most successful investors actually do.",
                names: "Warren Buffett · Ray Dalio · Robert Kiyosaki · Elon Musk",
              },
              {
                name: "Mind", color: "#A78BFA", bg: "bg-violet-50", border: "border-violet-200",
                icon: <IconMind size="sm" />,
                desc: "Built from decades of neuroscience research on how high performers think and decide.",
                names: "Andrew Huberman · Kobe Bryant · James Clear · Cal Newport",
              },
              {
                name: "Body", color: "#34D399", bg: "bg-emerald-50", border: "border-emerald-200",
                icon: <IconBody size="sm" />,
                desc: "Built from the science of energy, sleep, and performance.",
                names: "LeBron James · Cristiano Ronaldo · Matthew Walker · Peter Attia",
              },
              {
                name: "Spirit", color: "#60A5FA", bg: "bg-blue-50", border: "border-blue-200",
                icon: <IconSpirit size="sm" />,
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
            Simple. Personal. Life-changing.
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
              <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground">Most Popular</div>
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
              <div className="absolute -top-3 right-4 rounded-full bg-blue-500 px-3 py-1 text-[10px] font-semibold text-white">Best Investment</div>
              <p className="mb-1 text-label text-blue-600">Once AI Careers</p>
              <p className="mb-1 text-xs text-muted-foreground">No experience needed. AI does the work.</p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-display text-3xl">3,950</span>
              </div>
              <div className="mb-5 space-y-2.5">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Everything in Pro, plus 3 AI tracks:</p>
                <div className="rounded-lg border bg-card p-3 space-y-3">
                  <div className="text-xs"><div className="flex items-center gap-1.5 font-semibold"><span>🤖</span>AI Business Services</div><p className="mt-0.5 text-muted-foreground">&ldquo;You ask AI. AI does the work. You get paid.&rdquo;</p><p className="mt-0.5 font-semibold text-blue-600">Earn: ₱20,000–₱50,000/project</p></div>
                  <div className="text-xs"><div className="flex items-center gap-1.5 font-semibold"><span>🎨</span>AI Content & Design</div><p className="mt-0.5 text-muted-foreground">&ldquo;You describe it. AI creates it. You deliver it.&rdquo;</p><p className="mt-0.5 font-semibold text-blue-600">Earn: ₱8,000–₱25,000/month</p></div>
                  <div className="text-xs"><div className="flex items-center gap-1.5 font-semibold"><span>💻</span>AI Web & No-Code</div><p className="mt-0.5 text-muted-foreground">&ldquo;Build a real website in 48 hours. Zero coding.&rdquo;</p><p className="mt-0.5 font-semibold text-blue-600">Earn: ₱15,000–₱40,000/project</p></div>
                </div>
              </div>
              <Button render={<Link href="/auth/signup" />} className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white">Do It Once</Button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            GCash and Maya accepted. No subscription. No upsells. Make your money back on your first client.
          </p>
          <p className="mt-4 text-center once-signature">One investment. One path. Once<span className="once-dot">.</span></p>
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
              You don&apos;t need another course. You need the right one.
            </p>
            <p className="mb-6 text-xs text-muted-foreground">
              Free assessment. 10 minutes. You keep your results either way.
            </p>
            <Button
              render={<Link href="/auth/signup" />}
              size="lg"
              className="h-14 w-full sm:w-auto px-8 text-base font-semibold shadow-lg shadow-primary/10 transition-all hover:scale-[1.02]"
            >
              Do It Once
            </Button>
            <p className="mt-6 once-signature">Once<span className="once-dot">.</span></p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
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
