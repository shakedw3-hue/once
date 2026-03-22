import Link from "next/link";

const pillars = [
  { label: "Money", pct: 72, color: "#F59E0B" },
  { label: "Mind", pct: 85, color: "#A78BFA" },
  { label: "Body", pct: 58, color: "#34D399" },
  { label: "Spirit", pct: 41, color: "#60A5FA" },
];

const names = [
  "Warren Buffett", "Tony Robbins", "Elon Musk", "Dalai Lama",
  "Andrew Huberman", "James Clear", "Ray Dalio", "Oprah Winfrey",
  "Peter Attia", "Cal Newport", "Viktor Frankl", "Robert Kiyosaki",
  "LeBron James", "Matthew Walker", "Ryan Holiday", "Gary Vaynerchuk",
  "Cristiano Ronaldo", "Simon Sinek", "Mark Cuban", "Jay Shetty",
  "Tim Ferriss", "David Goggins", "Naval Ravikant", "Brene Brown",
  "Kobe Bryant",
];

const institutions = [
  { name: "HARVARD", font: "Georgia, serif", weight: 700, spacing: "0.08em", size: "0.85rem" },
  { name: "MIT", font: "'Arial Black', Arial, sans-serif", weight: 900, spacing: "0.15em", size: "0.9rem" },
  { name: "WHO", font: "Arial, sans-serif", weight: 800, spacing: "0.12em", size: "0.85rem" },
  { name: "McKinsey", font: "Georgia, serif", weight: 400, spacing: "0.02em", size: "0.9rem", italic: true },
  { name: "Forbes", font: "Georgia, serif", weight: 700, spacing: "-0.01em", size: "0.9rem", italic: true },
] as const;

export default function Hero() {
  return (
    <>
      <section
        className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-5 pb-20 pt-24"
        style={{
          background: "linear-gradient(165deg, #0c0a1a 0%, #111029 35%, #0d0b1e 70%, #08071a 100%)",
        }}
      >
        {/* Ambient glow — simple radial gradients on the section itself, no blur elements */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(79,70,229,0.1) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(96,165,250,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl">
          {/* ── Eyebrow ── */}
          <p
            className="mb-8 text-[11px] font-medium tracking-[0.3em] uppercase sm:text-xs hero-fade"
            style={{ color: "rgba(167,139,250,0.6)", animationDelay: "0.1s" }}
          >
            The only platform that diagnoses your life, then builds your path
          </p>

          {/* ── Headline ── */}
          <div className="hero-fade" style={{ animationDelay: "0.2s" }}>
            <h1
              className="text-[4.5rem] font-bold leading-[0.9] tracking-tight sm:text-[7rem] md:text-[9rem] lg:text-[11rem]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff" }}
            >
              Once
              <span className="relative inline-block">
                <span style={{ color: "#6366F1" }}>.</span>
                <span
                  className="pointer-events-none absolute bottom-[0.15em] left-1/2 -translate-x-1/2 h-4 w-4 rounded-full sm:h-6 sm:w-6"
                  style={{ background: "#6366F1", filter: "blur(12px)", opacity: 0.7 }}
                />
              </span>
            </h1>
          </div>

          {/* ── Subtitle ── */}
          <p
            className="mt-4 max-w-lg text-lg font-light leading-relaxed sm:mt-6 sm:text-xl md:text-2xl hero-fade"
            style={{ color: "rgba(255,255,255,0.45)", animationDelay: "0.3s" }}
          >
            The decision that changes everything.
          </p>

          {/* ── Pillar bars ── */}
          <div className="mt-10 max-w-md sm:mt-14 hero-fade" style={{ animationDelay: "0.4s" }}>
            <div className="space-y-3">
              {pillars.map((p, i) => (
                <div key={p.label} className="flex items-center gap-3">
                  <span
                    className="w-12 text-right text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ color: `${p.color}99` }}
                  >
                    {p.label}
                  </span>
                  <div className="relative h-[6px] flex-1 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="absolute inset-y-0 left-0 rounded-full pillar-bar"
                      style={{
                        background: `linear-gradient(90deg, ${p.color}CC, ${p.color})`,
                        width: `${p.pct}%`,
                        animationDelay: `${0.6 + i * 0.1}s`,
                      }}
                    />
                    <span
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold tabular-nums hero-fade-only"
                      style={{ color: "rgba(255,255,255,0.3)", animationDelay: `${0.9 + i * 0.1}s` }}
                    >
                      {p.pct}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p
              className="mt-3 text-[11px] tracking-wide hero-fade-only"
              style={{ color: "rgba(255,255,255,0.2)", animationDelay: "1.3s" }}
            >
              Your scores. Your path. Your results.
            </p>
          </div>

          {/* ── Value text ── */}
          <div className="mt-10 max-w-lg sm:mt-14 hero-fade" style={{ animationDelay: "0.5s" }}>
            <p className="text-sm leading-[1.8] sm:text-[0.95rem]" style={{ color: "rgba(255,255,255,0.5)" }}>
              We studied what the world&apos;s best minds actually do and distilled it
              into{" "}
              <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>one personalized path</span>.
              Not just knowledge.{" "}
              <span style={{ color: "#818CF8", fontWeight: 700 }}>real income skills</span>{" "}
              built for the Philippine market. You finish the path. You earn it back. And more.
            </p>
          </div>

          {/* ── CTA ── */}
          <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center hero-fade" style={{ animationDelay: "0.6s" }}>
            <a
              href="/auth/signup"
              className="flex h-14 w-full items-center justify-center rounded-lg px-10 text-base font-semibold transition-transform hover:scale-[1.03] sm:w-auto"
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
                boxShadow: "0 0 40px rgba(79,70,229,0.3), 0 4px 20px rgba(0,0,0,0.3)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
                textDecoration: "none",
              }}
            >
              Do It Once
            </a>
            <div className="flex flex-col gap-0.5 sm:ml-1">
              <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                Free assessment · 10 minutes
              </span>
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                No card required. Keep your results.
              </span>
            </div>
          </div>

          {/* ── Credibility marquee ── */}
          <div className="mt-14 sm:mt-20 hero-fade-only" style={{ animationDelay: "1s" }}>
            <p
              className="mb-5 text-center text-sm font-bold tracking-[0.15em] uppercase sm:text-left sm:text-base"
              style={{ color: "#818CF8" }}
            >
              Built from the principles of
            </p>

            <div
              className="relative -mx-5 overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              }}
            >
              {/* Two identical strips side by side, animated together */}
              <div className="marquee-wrap">
                <div className="marquee-set">
                  {names.map((name) => (
                    <span key={name} className="marquee-name">{name}</span>
                  ))}
                </div>
                <div className="marquee-set" aria-hidden="true">
                  {names.map((name) => (
                    <span key={name} className="marquee-name">{name}</span>
                  ))}
                </div>
              </div>
            </div>

            <p
              className="mt-6 mb-3 text-[9px] font-semibold tracking-[0.2em] uppercase sm:text-left text-center"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Research sourced from
            </p>
            <div className="flex items-center justify-center gap-x-4 sm:justify-start sm:gap-x-7">
              {institutions.map((inst) => (
                <span
                  key={inst.name}
                  className="select-none"
                  style={{
                    fontFamily: inst.font,
                    fontWeight: inst.weight,
                    letterSpacing: inst.spacing,
                    fontSize: inst.size,
                    fontStyle: "italic" in inst && inst.italic ? "italic" : "normal",
                    color: "rgba(255,255,255,0.35)",
                    lineHeight: 1,
                  }}
                >
                  {inst.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* All animations via CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          .hero-fade{opacity:0;transform:translateY(20px);animation:hf .6s ease-out both}
          .hero-fade-only{opacity:0;animation:hfo .4s ease-out both}
          .pillar-bar{transform:scaleX(0);transform-origin:left;animation:pb .8s ease-out both}
          .marquee-wrap{display:flex;width:max-content;animation:mq 20s linear infinite}
          .marquee-set{display:flex;gap:2.5rem}
          .marquee-set+.marquee-set{margin-left:2.5rem}
          .marquee-name{flex-shrink:0;font-size:1rem;font-weight:500;color:rgba(255,255,255,0.5);font-family:'Playfair Display',Georgia,serif;font-style:italic;white-space:nowrap}
          @keyframes hf{to{opacity:1;transform:translateY(0)}}
          @keyframes hfo{to{opacity:1}}
          @keyframes pb{to{transform:scaleX(1)}}
          @keyframes mq{to{transform:translateX(-50%)}}
        `}} />
      </section>

      <div className="h-24 sm:h-32" style={{ background: "linear-gradient(to bottom, #08071a, var(--color-background, #FAFAFF))" }} />
    </>
  );
}
