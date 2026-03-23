import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonials";
import StickyCTA from "@/components/landing/StickyCTA";
import InstallBanner from "@/components/ui/InstallBanner";
import TrustBadges from "@/components/landing/TrustBadges";
import SocialProofStrip from "@/components/landing/SocialProofStrip";
import PhoneMockup from "@/components/landing/PhoneMockup";
import { IconMoney, IconMind, IconBody, IconSpirit, IconCompass, IconMatch, IconLearn, IconRocket } from "@/components/ui/icons";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ━━━ 1. HERO ━━━ */}
        <Hero />

        {/* ━━━ 2. SOCIAL PROOF ━━━ */}
        <Section tight>
          <SocialProofStrip />
        </Section>

        {/* ━━━ 3. PROBLEM ━━━ */}
        <Section>
          <p
            className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#6366F1" }}
          >
            The real problem
          </p>
          <h2
            className="mb-4 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            You&apos;ve tried courses. You&apos;ve watched videos.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
            And nothing stuck. Not because you&apos;re lazy. Because none of it
            was built for where <span className="font-medium text-foreground">you</span> actually are.
            Once is different. We start with your real scores, then build one
            path. Yours.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Wrong courses", sub: "Generic content" },
              { label: "Wrong order", sub: "Random modules" },
              { label: "No action", sub: "Just theory" },
              { label: "No results", sub: "Money wasted" },
            ].map((item) => (
              <div
                key={item.label}
                className="group relative rounded-xl p-4 text-center transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #FAFAFA 0%, #F5F3FF 100%)",
                  boxShadow: "0 1px 3px rgba(99,102,241,0.06), 0 4px 12px rgba(99,102,241,0.04)",
                  border: "1px solid rgba(99,102,241,0.08)",
                }}
              >
                <div
                  className="mx-auto mb-2.5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(99,102,241,0.08)",
                    color: "#818CF8",
                  }}
                >
                  ✕
                </div>
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ━━━ 4. BEFORE / AFTER ━━━ */}
        <Section tight>
          <div
            className="rounded-2xl p-6 sm:p-10"
            style={{
              background: "linear-gradient(180deg, #FAFAFE 0%, #FFFFFF 100%)",
              boxShadow: "0 4px 24px rgba(99,102,241,0.06), 0 1px 4px rgba(0,0,0,0.03)",
              border: "1px solid rgba(99,102,241,0.08)",
            }}
          >
            <p
              className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#6366F1" }}
            >
              The transformation
            </p>
            <h3
              className="mb-8 text-center text-xl sm:text-2xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              What changes after Once
            </h3>
            <div className="space-y-3">
              {[
                { before: "\"I don't know where to start\"", after: "A clear, personalized path on day one" },
                { before: "\"I spent ₱40K on courses I never finished\"", after: "A library of 275+ lessons. We pick the right ones for you." },
                { before: "\"I watch videos but nothing changes\"", after: "One action step per lesson. You do, not watch." },
                { before: "\"I want income but don't know how\"", after: "Skills to earn ₱15,000 to ₱50,000 per project. Guaranteed." },
              ].map((row) => (
                <div
                  key={row.before}
                  className="flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 hover:scale-[1.005]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(99,102,241,0.03)",
                    border: "1px solid rgba(99,102,241,0.06)",
                  }}
                >
                  <p className="flex-1 text-xs text-muted-foreground/70 line-through decoration-muted-foreground/20">{row.before}</p>
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(99,102,241,0.08)" }}
                  >
                    <svg className="h-3.5 w-3.5" style={{ color: "#6366F1" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                  <p className="flex-1 text-xs font-semibold text-foreground">{row.after}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button
                render={<Link href="/auth/signup" />}
                size="lg"
                className="h-12 px-8 text-sm font-semibold shadow-lg shadow-primary/10"
              >
                Start Your Path. Free.
              </Button>
              <p className="mt-3 text-[10px] text-muted-foreground">Free assessment. 10 minutes. Keep your results.</p>
            </div>
          </div>
        </Section>

        {/* ━━━ 5. TESTIMONIALS ━━━ */}
        <Section>
          <Testimonials />
        </Section>

        {/* ━━━ 6. HOW IT WORKS ━━━ */}
        <Section>
          <p
            className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#6366F1" }}
          >
            How Once works
          </p>
          <h2
            className="mb-10 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Four steps. One path.
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Diagnose", icon: <IconCompass size="sm" />, desc: "15 questions across Money, Mind, Body, and Spirit. We find exactly where you are.", step: "01" },
              { title: "Match", icon: <IconMatch size="sm" />, desc: "We build one path based on your scores. Not a catalog. Your path.", step: "02" },
              { title: "Learn", icon: <IconLearn size="sm" />, desc: "10 minutes a day. Every lesson is built from what the world's best minds already proved.", step: "03" },
              { title: "Launch", icon: <IconRocket size="sm" />, desc: "Pro members get practical income skills for the Philippine market. Real pesos.", step: "04" },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl p-5 transition-all duration-200 hover:scale-[1.01]"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(99,102,241,0.05)",
                  border: "1px solid rgba(99,102,241,0.07)",
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="text-[10px] font-bold tracking-wider"
                    style={{ color: "#C7D2FE" }}
                  >
                    {item.step}
                  </span>
                  {item.icon}
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ━━━ 7. PHONE MOCKUP ━━━ */}
        <Section>
          <p
            className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#6366F1" }}
          >
            Your dashboard
          </p>
          <h2
            className="mb-2 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your personal dashboard
          </h2>
          <p className="mb-10 text-center text-sm text-muted-foreground">
            Track your scores, streaks, and lessons. All in one place.
          </p>
          <PhoneMockup />
        </Section>

        {/* ━━━ 8. THE 4 PILLARS ━━━ */}
        <Section>
          <p
            className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#6366F1" }}
          >
            The framework
          </p>
          <h2
            className="mb-2 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The 4 pillars
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Weakness in one quietly drains the others.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                name: "Money", color: "#F59E0B", bgFrom: "#FFFBEB", bgTo: "#FFFFFF", borderColor: "rgba(245,158,11,0.15)",
                icon: <IconMoney size="sm" />,
                names: "Buffett, Dalio, Kiyosaki",
              },
              {
                name: "Mind", color: "#A78BFA", bgFrom: "#F5F3FF", bgTo: "#FFFFFF", borderColor: "rgba(167,139,250,0.15)",
                icon: <IconMind size="sm" />,
                names: "Huberman, Clear, Newport",
              },
              {
                name: "Body", color: "#34D399", bgFrom: "#ECFDF5", bgTo: "#FFFFFF", borderColor: "rgba(52,211,153,0.15)",
                icon: <IconBody size="sm" />,
                names: "Walker, Attia, LeBron",
              },
              {
                name: "Spirit", color: "#60A5FA", bgFrom: "#EFF6FF", bgTo: "#FFFFFF", borderColor: "rgba(96,165,250,0.15)",
                icon: <IconSpirit size="sm" />,
                names: "Dalai Lama, Frankl, Holiday",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${p.bgFrom} 0%, ${p.bgTo} 100%)`,
                  border: `1px solid ${p.borderColor}`,
                  boxShadow: `0 2px 12px rgba(0,0,0,0.03), 0 1px 3px ${p.borderColor}`,
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  {p.icon}
                  <span className="text-sm font-semibold">{p.name}</span>
                </div>
                <p className="text-[10px] text-muted-foreground/70">{p.names}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            <Link href="/pillars" className="text-primary hover:underline">See all pillars and modules &rarr;</Link>
          </p>
        </Section>

        {/* ━━━ 9. PRICING ━━━ */}
        <Section id="pricing">
          <p
            className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#6366F1" }}
          >
            Investment
          </p>
          <h2
            className="mb-2 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Three paths. One decision.
          </h2>
          <p className="mb-10 text-center text-sm text-muted-foreground">
            One-time payment. Lifetime access. No subscription. No upsells.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Core */}
            <div
              className="rounded-2xl p-6 transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 20px rgba(99,102,241,0.05)",
                border: "1px solid rgba(99,102,241,0.08)",
              }}
            >
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Once Core</p>
              <p className="mb-3 text-xs text-muted-foreground">Know where you are. Build the foundation.</p>
              <div className="mb-5 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>1,499</span>
              </div>
              <ul className="mb-6 space-y-2">
                {["Full 4-pillar assessment", "Your personalized Once profile", "5 modules, 25 lessons", "Action steps + reflections", "Progress tracking", "Lifetime access"].map(i => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#6366F1" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {i}
                  </li>
                ))}
              </ul>
              <Button render={<Link href="/auth/signup" />} variant="outline" className="w-full text-xs">Do It Once</Button>
            </div>

            {/* Pro */}
            <div
              className="relative rounded-2xl p-6 transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(180deg, #FAFAFF 0%, #FFFFFF 100%)",
                boxShadow: "0 4px 24px rgba(99,102,241,0.10), 0 1px 4px rgba(99,102,241,0.06)",
                border: "2px solid rgba(99,102,241,0.15)",
              }}
            >
              <div
                className="absolute -top-3 right-4 rounded-full px-3 py-1 text-[10px] font-semibold text-white"
                style={{ background: "#6366F1" }}
              >
                Most Popular
              </div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#6366F1" }}>Once Pro</p>
              <p className="mb-3 text-xs text-muted-foreground">Your first side income. ₱15,000 to ₱40,000/month.</p>
              <div className="mb-5 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>2,350</span>
              </div>
              <ul className="mb-6 space-y-2">
                {["Everything in Core", "Social media management", "Shopee/Lazada e-commerce", "Freelancing skills", "Online side income", "100 additional lessons"].map(i => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#6366F1" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {i}
                  </li>
                ))}
              </ul>
              <Button render={<Link href="/auth/signup" />} className="w-full text-xs shadow-md shadow-primary/10">Do It Once</Button>
            </div>

            {/* AI Careers */}
            <div
              className="relative rounded-2xl p-6 transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 100%)",
                boxShadow: "0 4px 24px rgba(59,130,246,0.10), 0 1px 4px rgba(59,130,246,0.06)",
                border: "2px solid rgba(59,130,246,0.15)",
              }}
            >
              <div
                className="absolute -top-3 right-4 rounded-full px-3 py-1 text-[10px] font-semibold text-white"
                style={{ background: "#3B82F6" }}
              >
                Best Investment
              </div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#3B82F6" }}>Once AI Careers</p>
              <p className="mb-3 text-xs text-muted-foreground">No experience needed. AI does the work.</p>
              <div className="mb-5 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">₱</span>
                <span className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>3,950</span>
              </div>
              <div className="mb-6 space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Everything in Pro, plus 3 AI tracks:</p>
                <div
                  className="rounded-xl p-3.5 space-y-3"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(59,130,246,0.08)",
                    boxShadow: "0 1px 4px rgba(59,130,246,0.04)",
                  }}
                >
                  <div className="text-xs"><div className="flex items-center gap-1.5 font-semibold"><span>🤖</span>AI Business Services</div><p className="mt-0.5 text-muted-foreground">&ldquo;You ask AI. AI does the work. You get paid.&rdquo;</p><p className="mt-0.5 font-semibold" style={{ color: "#3B82F6" }}>Earn: ₱20,000 to ₱50,000/project</p></div>
                  <div className="text-xs"><div className="flex items-center gap-1.5 font-semibold"><span>🎨</span>AI Content & Design</div><p className="mt-0.5 text-muted-foreground">&ldquo;You describe it. AI creates it. You deliver it.&rdquo;</p><p className="mt-0.5 font-semibold" style={{ color: "#3B82F6" }}>Earn: ₱8,000 to ₱25,000/month</p></div>
                  <div className="text-xs"><div className="flex items-center gap-1.5 font-semibold"><span>💻</span>AI Web & No-Code</div><p className="mt-0.5 text-muted-foreground">&ldquo;Build a real website in 48 hours. Zero coding.&rdquo;</p><p className="mt-0.5 font-semibold" style={{ color: "#3B82F6" }}>Earn: ₱15,000 to ₱40,000/project</p></div>
                </div>
              </div>
              <Button
                render={<Link href="/auth/signup" />}
                className="w-full text-xs text-white"
                style={{ background: "#3B82F6" }}
              >
                Do It Once
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            GCash and Maya accepted. No subscription. No upsells. Make your money back on your first client.
          </p>

          {/* Trust badges */}
          <div className="mt-10">
            <TrustBadges />
          </div>
        </Section>

        {/* ━━━ 10. FAQ ━━━ */}
        <Section>
          <p
            className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#6366F1" }}
          >
            Questions
          </p>
          <h2
            className="mb-10 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Common questions
          </h2>
          <div className="mx-auto max-w-2xl space-y-0">
            {[
              { q: "Why should I trust this?", a: "You should not. Not until you try the free assessment. See if the results match what you already know about yourself. If they do, the path will help. If not, you have not paid anything." },
              { q: "Is this another online course?", a: "No. No video lectures. No guru. Every lesson is a 10-minute worksheet: what the research says, one action step for today, one reflection question. You do. You do not watch." },
              { q: "Where does the content come from?", a: "Every lesson is built from published research and books by the world's leading thinkers in each field. We cite the source in each lesson. Nothing is invented." },
              { q: "What is the difference between Core, Pro, and AI Careers?", a: "Core gives you the assessment and a personalized path with 25 lessons. Pro adds the income track: 100 additional lessons on social media management, e-commerce, freelancing, and building online side income. AI Careers includes everything in Pro plus three AI-powered career tracks. All with Philippine-specific tools and real peso numbers." },
              { q: "Can I see results before paying?", a: "Yes. The assessment is free. You see your scores and your path. You only pay if you want the full lessons." },
              { q: "Will there be upsells?", a: "No. Your plan gets you everything in it. No hidden tier. No add-ons. No subscription." },
            ].map((faq, i) => (
              <div
                key={faq.q}
                className="py-5"
                style={{
                  borderBottom: i < 5 ? "1px solid rgba(99,102,241,0.06)" : "none",
                }}
              >
                <h3 className="mb-2 text-sm font-semibold text-foreground">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ━━━ 11. FINAL CTA ━━━ */}
        <section className="mx-auto max-w-3xl px-5 pb-20 pt-4">
          <div
            className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-14"
            style={{
              background: "linear-gradient(135deg, #FAFAFF 0%, #F0EDFF 50%, #FAFAFF 100%)",
              boxShadow: "0 4px 32px rgba(99,102,241,0.10), 0 1px 4px rgba(99,102,241,0.06)",
              border: "1px solid rgba(99,102,241,0.10)",
            }}
          >
            {/* Subtle decorative glow */}
            <div
              className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
              }}
            />
            <p
              className="relative mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#6366F1" }}
            >
              Your moment
            </p>
            <h2
              className="relative mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              One decision.
            </h2>
            <p className="relative mb-2 text-sm text-muted-foreground">
              You don&apos;t need another course. You need the right one.
            </p>
            <p className="relative mb-8 text-xs text-muted-foreground">
              Free assessment. 10 minutes. You keep your results either way.
            </p>
            <Button
              render={<Link href="/auth/signup" />}
              size="lg"
              className="relative h-14 w-full sm:w-auto px-10 text-base font-semibold shadow-lg shadow-primary/15 transition-all duration-200 hover:scale-[1.02]"
            >
              Do It Once
            </Button>
            <p className="relative mt-8 once-signature text-lg">Once<span style={{color:"#4F46E5"}}>.</span></p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
      <InstallBanner />
    </>
  );
}

function Section({ children, id, tight }: { children: React.ReactNode; id?: string; tight?: boolean }) {
  return (
    <section id={id} className={`mx-auto max-w-3xl px-5 ${tight ? "py-10 sm:py-14" : "py-16 sm:py-24"}`}>
      {children}
    </section>
  );
}
