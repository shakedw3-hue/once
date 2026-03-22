import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonials";
import StickyCTA from "@/components/landing/StickyCTA";
import TrustBadges from "@/components/landing/TrustBadges";
import SocialProofStrip from "@/components/landing/SocialProofStrip";
import PhoneMockup from "@/components/landing/PhoneMockup";
import { IconMoney, IconMind, IconBody, IconSpirit, IconCompass, IconMatch, IconLearn, IconRocket } from "@/components/ui/icons";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ━━━ 1. HERO — Hook + CTA ━━━ */}
        <Hero />

        {/* ━━━ 2. SOCIAL PROOF — Big numbers early ━━━ */}
        <Section tight>
          <SocialProofStrip />
        </Section>

        {/* ━━━ 4. PROBLEM — Agitate ━━━ */}
        <Section>
          <h2 className="mb-3 text-section text-xl sm:text-2xl">
            You&apos;ve tried courses. You&apos;ve watched videos.
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            And nothing stuck. Not because you&apos;re lazy — because none of it
            was built for where <span className="font-medium text-foreground">you</span> actually are.
            Once is different. We start with your real scores, then build one
            path. Yours.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: "Wrong courses", icon: "✗", sub: "Generic content" },
              { label: "Wrong order", icon: "✗", sub: "Random modules" },
              { label: "No action", icon: "✗", sub: "Just theory" },
              { label: "No results", icon: "✗", sub: "Money wasted" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-red-100 bg-red-50/50 p-3 text-center">
                <p className="text-lg text-red-400">{item.icon}</p>
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ━━━ 5. BEFORE/AFTER — Transformation strip ━━━ */}
        <Section tight>
          <div className="rounded-2xl border bg-card p-5 sm:p-8">
            <p className="mb-5 text-center text-label text-primary">What changes after Once</p>
            <div className="space-y-3">
              {[
                { before: "\"I don't know where to start\"", after: "A clear, personalized path on day one", icon: "→" },
                { before: "\"I spent ₱40K on courses I never finished\"", after: "275 lessons you'll actually complete — ₱1,499", icon: "→" },
                { before: "\"I watch videos but nothing changes\"", after: "One action step per lesson. You do, not watch.", icon: "→" },
                { before: "\"I want income but don't know how\"", after: "₱15,000–₱40,000/mo skills for PH market", icon: "→" },
              ].map((row) => (
                <div key={row.before} className="flex items-center gap-3 rounded-lg border px-4 py-3">
                  <p className="flex-1 text-xs text-muted-foreground line-through decoration-red-300">{row.before}</p>
                  <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  <p className="flex-1 text-xs font-semibold text-foreground">{row.after}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button
                render={<Link href="/auth/signup" />}
                size="lg"
                className="h-12 px-8 text-sm font-semibold shadow-lg shadow-primary/10"
              >
                Start Your Path — Free
              </Button>
              <p className="mt-2 text-[10px] text-muted-foreground">Free assessment. 10 minutes. Keep your results.</p>
            </div>
          </div>
        </Section>

        {/* ━━━ 6. TESTIMONIALS — Proof right after they tried ━━━ */}
        <Section>
          <Testimonials />
        </Section>

        {/* ━━━ 7. HOW IT WORKS + PRODUCT — Solution ━━━ */}
        <Section>
          <p className="mb-2 text-label text-primary">How Once works</p>
          <h2 className="mb-8 text-section text-xl sm:text-2xl">
            Four steps. One path.
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Diagnose", icon: <IconCompass size="sm" />, desc: "15 questions across Money, Mind, Body, and Spirit. We find exactly where you are." },
              { title: "Match", icon: <IconMatch size="sm" />, desc: "We build one path based on your scores. Not a catalog — your path." },
              { title: "Learn", icon: <IconLearn size="sm" />, desc: "10 minutes a day. Every lesson is built from what the world's best minds already proved." },
              { title: "Launch", icon: <IconRocket size="sm" />, desc: "Pro members get practical income skills for the Philippine market. Real pesos." },
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
        </Section>

        {/* ━━━ 8. PHONE MOCKUP — Show the product ━━━ */}
        <Section>
          <h2 className="mb-2 text-center text-section text-xl sm:text-2xl">Your personal dashboard</h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Track your scores, streaks, and lessons — all in one place.
          </p>
          <PhoneMockup />
        </Section>

        {/* ━━━ 9. THE 4 PILLARS — Detail ━━━ */}
        <Section>
          <h2 className="mb-2 text-section text-xl sm:text-2xl">The 4 pillars</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Weakness in one quietly drains the others.
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {[
              {
                name: "Money", color: "#F59E0B", bg: "bg-amber-50", border: "border-amber-200",
                icon: <IconMoney size="sm" />,
                names: "Buffett · Dalio · Kiyosaki",
              },
              {
                name: "Mind", color: "#A78BFA", bg: "bg-violet-50", border: "border-violet-200",
                icon: <IconMind size="sm" />,
                names: "Huberman · Clear · Newport",
              },
              {
                name: "Body", color: "#34D399", bg: "bg-emerald-50", border: "border-emerald-200",
                icon: <IconBody size="sm" />,
                names: "Walker · Attia · LeBron",
              },
              {
                name: "Spirit", color: "#60A5FA", bg: "bg-blue-50", border: "border-blue-200",
                icon: <IconSpirit size="sm" />,
                names: "Dalai Lama · Frankl · Holiday",
              },
            ].map((p) => (
              <div key={p.name} className={`rounded-xl border ${p.border} ${p.bg} p-3 sm:p-4`}>
                <div className="mb-1.5 flex items-center gap-2">
                  {p.icon}
                  <span className="text-sm font-semibold">{p.name}</span>
                </div>
                <p className="text-[10px] text-muted-foreground/70">{p.names}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            <Link href="/pillars" className="text-primary hover:underline">See all pillars and modules →</Link>
          </p>
        </Section>

        {/* ━━━ 10. PRICING + TRUST — Decision moment ━━━ */}
        <Section id="pricing">
          <h2 className="mb-2 text-section text-xl sm:text-2xl">
            Three paths. One decision.
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            One-time payment. Lifetime access. No subscription. No upsells.
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
              <p className="mb-1 text-xs text-muted-foreground">Your first side income. ₱15,000–₱40,000/month.</p>
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

          {/* Trust badges right under pricing */}
          <div className="mt-8">
            <TrustBadges />
          </div>
        </Section>

        {/* ━━━ 11. FAQ — Handle objections ━━━ */}
        <Section>
          <h2 className="mb-8 text-section text-xl sm:text-2xl">Common questions</h2>
          <div className="space-y-5">
            {[
              { q: "Why should I trust this?", a: "You should not. Not until you try the free assessment. See if the results match what you already know about yourself. If they do, the path will help. If not, you have not paid anything." },
              { q: "Is this another online course?", a: "No. No video lectures. No guru. Every lesson is a 10-minute worksheet: what the research says, one action step for today, one reflection question. You do. You do not watch." },
              { q: "Where does the content come from?", a: "Every lesson is built from published research and books by the world's leading thinkers in each field. We cite the source in each lesson. Nothing is invented." },
              { q: "What is the difference between Core, Pro, and AI Careers?", a: "Core gives you the assessment and a personalized path with 25 lessons. Pro adds the income track: 100 additional lessons on social media management, e-commerce, freelancing, and building online side income. AI Careers includes everything in Pro plus three AI-powered career tracks. All with Philippine-specific tools and real peso numbers." },
              { q: "Can I see results before paying?", a: "Yes. The assessment is free. You see your scores and your path. You only pay if you want the full lessons." },
              { q: "Will there be upsells?", a: "No. Your plan gets you everything in it. No hidden tier. No add-ons. No subscription." },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="mb-1 text-sm font-semibold">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ━━━ 12. FINAL CTA ━━━ */}
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
            <p className="mt-6 once-signature">Once<span style={{color:"#4F46E5"}}>.</span></p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}

function Section({ children, id, tight }: { children: React.ReactNode; id?: string; tight?: boolean }) {
  return (
    <section id={id} className={`mx-auto max-w-3xl px-5 ${tight ? "py-8 sm:py-12" : "py-14 sm:py-20"}`}>
      {children}
    </section>
  );
}
