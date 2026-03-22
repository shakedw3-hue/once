"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const pillars = [
  { label: "Money", pct: 72, color: "#F59E0B" },
  { label: "Mind", pct: 85, color: "#A78BFA" },
  { label: "Body", pct: 58, color: "#34D399" },
  { label: "Spirit", pct: 41, color: "#60A5FA" },
];

export default function Hero() {
  return (
    <>
      <section
        className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-5 pb-20 pt-24"
        style={{
          background: "linear-gradient(165deg, #0c0a1a 0%, #111029 35%, #0d0b1e 70%, #08071a 100%)",
        }}
      >
        {/* ── Grain overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* ── Ambient orbs ── */}
        <div
          className="pointer-events-none absolute top-[-20%] right-[-10%] h-[700px] w-[700px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl">
          {/* ── Eyebrow ── */}
          <p
            className="mb-8 text-[11px] font-medium tracking-[0.3em] uppercase sm:text-xs"
            style={{ color: "rgba(167,139,250,0.6)", animation: "heroFadeIn 0.8s ease-out 0.3s both" }}
          >
            The only platform that diagnoses your life, then builds your path
          </p>

          {/* ── Headline — "Once." as monument ── */}
          <div style={{ animation: "heroFadeIn 0.8s ease-out 0.45s both" }}>
            <h1
              className="text-[4.5rem] font-bold leading-[0.9] tracking-tight sm:text-[7rem] md:text-[9rem] lg:text-[11rem]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff" }}
            >
              Once
              {/* The dot as a glowing orb */}
              <span className="relative inline-block">
                <span
                  className="inline-block"
                  style={{ color: "#6366F1" }}
                >
                  .
                </span>
                <span
                  className="pointer-events-none absolute bottom-[0.15em] left-1/2 -translate-x-1/2 h-4 w-4 rounded-full sm:h-6 sm:w-6"
                  style={{
                    background: "#6366F1",
                    filter: "blur(12px)",
                    opacity: 0.7,
                  }}
                />
              </span>
            </h1>
          </div>

          {/* ── Subtitle ── */}
          <p
            className="mt-4 max-w-lg text-lg font-light leading-relaxed sm:mt-6 sm:text-xl md:text-2xl"
            style={{ color: "rgba(255,255,255,0.45)", animation: "heroFadeIn 0.8s ease-out 0.6s both" }}
          >
            The decision that changes everything.
          </p>

          {/* ── Pillar visualization — the product IS the hero ── */}
          <div
            className="mt-10 max-w-md sm:mt-14"
            style={{ animation: "heroFadeIn 0.8s ease-out 0.75s both" }}
          >
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
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${p.color}CC, ${p.color})`,
                        animation: `pillarGrow${i} 1.2s ease-out ${1.0 + i * 0.15}s both`,
                      }}
                    />
                    <span
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold tabular-nums"
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        animation: `heroFadeInOnly 0.4s ease-out ${1.6 + i * 0.15}s both`,
                      }}
                    >
                      {p.pct}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p
              className="mt-3 text-[11px] tracking-wide"
              style={{
                color: "rgba(255,255,255,0.2)",
                animation: "heroFadeInOnly 0.4s ease-out 2.2s both",
              }}
            >
              Your scores. Your path. Your results.
            </p>
          </div>

          {/* ── Value + income text ── */}
          <div
            className="mt-10 max-w-lg sm:mt-14"
            style={{ animation: "heroFadeIn 0.8s ease-out 0.9s both" }}
          >
            <p
              className="text-sm leading-[1.8] sm:text-[0.95rem]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              We studied what the world&apos;s best minds actually do and distilled it
              into{" "}
              <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                one personalized path
              </span>
              . Not just knowledge.{" "}
              <span
                style={{
                  color: "#818CF8",
                  fontWeight: 700,
                  textShadow: "0 0 30px rgba(99,102,241,0.4)",
                }}
              >
                real income skills
              </span>{" "}
              built for the Philippine market. You finish the path. You earn it back. And more.
            </p>
          </div>

          {/* ── CTA ── */}
          <div
            className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center"
            style={{ animation: "heroFadeIn 0.8s ease-out 1.05s both" }}
          >
            <Button
              render={<Link href="/auth/signup" />}
              size="lg"
              className="relative h-14 w-full cursor-pointer overflow-hidden px-10 text-base font-semibold transition-all hover:scale-[1.03] sm:w-auto"
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
                boxShadow: "0 0 40px rgba(79,70,229,0.3), 0 4px 20px rgba(0,0,0,0.3)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Do It Once
            </Button>
            <div className="flex flex-col gap-0.5 sm:ml-1">
              <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                Free assessment · 10 minutes
              </span>
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                No card required. Keep your results.
              </span>
            </div>
          </div>

          {/* ── Credibility — marquee carousel ── */}
          <div
            className="mt-14 sm:mt-20"
            style={{ animation: "heroFadeInOnly 1s ease-out 2.2s both" }}
          >
            <p
              className="mb-5 text-center text-sm font-bold tracking-[0.15em] uppercase sm:text-left sm:text-base"
              style={{
                color: "#818CF8",
                textShadow: "0 0 20px rgba(129,140,248,0.5), 0 0 60px rgba(129,140,248,0.2)",
              }}
            >
              Built from the principles of
            </p>

            {/* Marquee container — full width overflow */}
            <div className="relative -mx-5 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
              <div className="flex animate-[marquee_10s_linear_infinite] gap-8 sm:gap-12 whitespace-nowrap">
                {/* Double the items for seamless loop */}
                {[...Array(2)].map((_, setIdx) => (
                  <div key={setIdx} className="flex shrink-0 items-center gap-8 sm:gap-12">
                    {[
                      "Warren Buffett", "Tony Robbins", "Elon Musk", "Dalai Lama",
                      "Andrew Huberman", "James Clear", "Ray Dalio", "Oprah Winfrey",
                      "Peter Attia", "Cal Newport", "Viktor Frankl", "Robert Kiyosaki",
                      "LeBron James", "Matthew Walker", "Ryan Holiday", "Gary Vaynerchuk",
                      "Cristiano Ronaldo", "Simon Sinek", "Mark Cuban", "Jay Shetty",
                      "Tim Ferriss", "David Goggins", "Naval Ravikant", "Brene Brown",
                      "Kobe Bryant",
                    ].map((name) => (
                      <span
                        key={`${setIdx}-${name}`}
                        className="shrink-0 text-base font-medium sm:text-lg"
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontStyle: "italic",
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Institutions below marquee */}
            <p
              className="mt-6 mb-3 text-[9px] font-semibold tracking-[0.2em] uppercase sm:text-left text-center"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Research sourced from
            </p>
            <div className="flex items-center justify-center gap-x-4 sm:justify-start sm:gap-x-7">
              {[
                { name: "HARVARD", font: "Georgia, serif", weight: 700, spacing: "0.08em", size: "0.85rem" },
                { name: "MIT", font: "'Arial Black', Arial, sans-serif", weight: 900, spacing: "0.15em", size: "0.9rem" },
                { name: "WHO", font: "Arial, sans-serif", weight: 800, spacing: "0.12em", size: "0.85rem" },
                { name: "McKinsey", font: "Georgia, serif", weight: 400, spacing: "0.02em", size: "0.9rem", italic: true },
                { name: "Forbes", font: "Georgia, serif", weight: 700, spacing: "-0.01em", size: "0.9rem", italic: true },
              ].map((inst) => (
                <span
                  key={inst.name}
                  className="select-none"
                  style={{
                    fontFamily: inst.font,
                    fontWeight: inst.weight,
                    letterSpacing: inst.spacing,
                    fontSize: inst.size,
                    fontStyle: inst.italic ? "italic" : "normal",
                    color: "rgba(255,255,255,0.35)",
                    lineHeight: 1,
                  }}
                >
                  {inst.name}
                </span>
              ))}
            </div>
          </div>

          {/* Keyframes for all CSS animations */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes heroFadeIn {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes heroFadeInOnly {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes pillarGrow0 {
              from { width: 0; }
              to { width: 72%; }
            }
            @keyframes pillarGrow1 {
              from { width: 0; }
              to { width: 85%; }
            }
            @keyframes pillarGrow2 {
              from { width: 0; }
              to { width: 58%; }
            }
            @keyframes pillarGrow3 {
              from { width: 0; }
              to { width: 41%; }
            }
          ` }} />
        </div>
      </section>

      {/* ── Transition gradient to light section ── */}
      <div
        className="h-24 sm:h-32"
        style={{
          background: "linear-gradient(to bottom, #08071a, var(--color-background, #FAFAFF))",
        }}
      />
    </>
  );
}
