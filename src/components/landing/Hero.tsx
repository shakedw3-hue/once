"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PillarOrbs from "./PillarOrbs";

/* ── animation helpers ── */
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const pillars = [
  { label: "Money", color: "#F59E0B" },
  { label: "Mind", color: "#A78BFA" },
  { label: "Body", color: "#34D399" },
  { label: "Spirit", color: "#60A5FA" },
] as const;

const names = [
  "Warren Buffett",
  "Kobe Bryant",
  "Elon Musk",
  "Dalai Lama",
] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-20 pb-16">
      {/* ── Ambient background ── */}
      {/* Large indigo glow — top center */}
      <div
        className="pointer-events-none absolute -top-[200px] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)" }}
      />
      {/* Warm accent glow — bottom right */}
      <div
        className="pointer-events-none absolute -right-[100px] bottom-[10%] h-[500px] w-[500px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)" }}
      />
      {/* Cool accent glow — bottom left */}
      <div
        className="pointer-events-none absolute -left-[100px] bottom-[20%] h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)" }}
      />

      {/* ── Floating ambient particles (CSS only) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: [3, 2, 4, 2][i],
              height: [3, 2, 4, 2][i],
              left: `${[15, 75, 55, 30][i]}%`,
              top: `${[25, 35, 65, 80][i]}%`,
              background: [
                "rgba(79,70,229,0.3)",
                "rgba(167,139,250,0.25)",
                "rgba(52,211,153,0.25)",
                "rgba(96,165,250,0.2)",
              ][i],
              animation: `heroFloat${i} ${[7, 9, 8, 10][i]}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Keyframes for hero animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroFloat0 { 0%, 100% { transform: translate(0, 0); opacity: 0.4; } 50% { transform: translate(12px, -18px); opacity: 0.8; } }
        @keyframes heroFloat1 { 0%, 100% { transform: translate(0, 0); opacity: 0.3; } 50% { transform: translate(-15px, 12px); opacity: 0.7; } }
        @keyframes heroFloat2 { 0%, 100% { transform: translate(0, 0); opacity: 0.35; } 50% { transform: translate(10px, 15px); opacity: 0.75; } }
        @keyframes heroFloat3 { 0%, 100% { transform: translate(0, 0); opacity: 0.25; } 50% { transform: translate(-8px, -20px); opacity: 0.65; } }
        @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 4px rgba(79,70,229,0.4), 0 0 8px rgba(79,70,229,0.2); } 50% { box-shadow: 0 0 8px rgba(79,70,229,0.6), 0 0 20px rgba(79,70,229,0.3); } }
        @keyframes earnGlow { 0%, 100% { text-shadow: 0 0 8px rgba(79,70,229,0.3); } 50% { text-shadow: 0 0 20px rgba(79,70,229,0.5), 0 0 40px rgba(79,70,229,0.2); } }
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      ` }} />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ── Left column: messaging ── */}
          <div className="flex flex-col">
            {/* ─ Eyebrow — animated gradient border with pulsing dot ─ */}
            <motion.div {...fade(0.05)}>
              <div className="relative inline-flex">
                {/* Gradient border wrapper */}
                <div
                  className="relative inline-flex items-center gap-2.5 rounded-full px-4 py-2"
                  style={{
                    background: "rgba(79,70,229,0.04)",
                    border: "1px solid transparent",
                    backgroundClip: "padding-box",
                  }}
                >
                  {/* Animated gradient border behind */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(167,139,250,0.2), rgba(96,165,250,0.2), rgba(79,70,229,0.3))",
                      backgroundSize: "300% 300%",
                      animation: "gradientShift 4s ease-in-out infinite",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      padding: "1px",
                      borderRadius: "9999px",
                    }}
                  />
                  {/* Pulsing dot */}
                  <span
                    className="relative inline-block h-2 w-2 shrink-0 rounded-full"
                    style={{
                      background: "#4F46E5",
                      animation: "pulseGlow 2s ease-in-out infinite",
                    }}
                  />
                  <span className="text-[11px] font-medium tracking-wide text-muted-foreground sm:text-xs">
                    The only platform that diagnoses your life — then builds your path
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ─ Headline — massive type contrast ─ */}
            <motion.h1
              {...fade(0.15)}
              className="mt-8"
            >
              <span
                className="block text-[3.5rem] font-bold leading-[1] tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]"
              >
                Once<span style={{ color: "#4F46E5" }}>.</span>
              </span>
              <span className="mt-3 block text-[1.35rem] font-medium leading-[1.3] text-muted-foreground sm:text-2xl md:text-[1.75rem]">
                The decision that changes everything.
              </span>
            </motion.h1>

            {/* ─ Value proposition — visual card treatment ─ */}
            <motion.div
              {...fade(0.35)}
              className="mt-8"
            >
              {/* Main value statement */}
              <div
                className="relative rounded-2xl p-5 sm:p-6"
                style={{
                  background: "linear-gradient(135deg, rgba(79,70,229,0.03) 0%, rgba(167,139,250,0.02) 50%, rgba(96,165,250,0.02) 100%)",
                  border: "1px solid rgba(79,70,229,0.08)",
                }}
              >
                {/* Pillar color dots along top */}
                <div className="mb-4 flex items-center gap-2">
                  {pillars.map((p) => (
                    <div key={p.label} className="flex items-center gap-1.5">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: p.color, boxShadow: `0 0 6px ${p.color}40` }}
                      />
                      <span className="text-[10px] font-medium tracking-wide text-muted-foreground/60 uppercase">
                        {p.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-[0.95rem] leading-[1.75] text-muted-foreground sm:text-base">
                  We built{" "}
                  <span className="font-semibold text-foreground">
                    one personalized path
                  </span>{" "}
                  from the world&apos;s best minds&nbsp;&mdash; that takes you from
                  knowledge to{" "}
                  <span className="font-semibold text-foreground">
                    real income
                  </span>.
                </p>

                {/* Separator */}
                <div className="my-4 h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(79,70,229,0.1), transparent)" }} />

                {/* Earn more — glowing highlight */}
                <p className="text-[0.9rem] leading-[1.75] text-foreground/80 sm:text-[0.95rem]">
                  At the end of your path you don&apos;t just know more &mdash; you{" "}
                  <span
                    className="inline-block font-bold"
                    style={{
                      color: "#4F46E5",
                      animation: "earnGlow 3s ease-in-out infinite",
                    }}
                  >
                    earn more
                  </span>
                  .
                  <br />
                  <span className="text-muted-foreground">
                    Real, practical income skills built for the Philippine market.
                  </span>
                </p>
              </div>
            </motion.div>

            {/* ─ CTA row ─ */}
            <motion.div
              {...fade(0.55)}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                render={<Link href="/auth/signup" />}
                size="lg"
                className="relative h-[3.25rem] w-full cursor-pointer overflow-hidden px-8 text-[0.95rem] font-semibold shadow-lg shadow-primary/15 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 sm:w-auto"
              >
                Do It Once
              </Button>
              <span className="flex items-center gap-1.5 text-[0.8rem] text-muted-foreground sm:ml-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-50">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M7 3.5V7L9.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Free assessment&ensp;·&ensp;10 minutes
              </span>
            </motion.div>

            {/* ─ Credibility strip — refined ─ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-12"
            >
              <p className="mb-3 text-[10px] font-medium tracking-[0.18em] text-muted-foreground/50 uppercase">
                Built from the principles of
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                {names.map((name, i) => (
                  <span key={name} className="flex items-center">
                    <span className="text-[0.8rem] font-medium tracking-tight text-muted-foreground/80 sm:text-[0.85rem]">
                      {name}
                    </span>
                    {i < names.length - 1 && (
                      <span
                        className="ml-3 inline-block h-3 w-px"
                        style={{ background: "rgba(79,70,229,0.15)" }}
                      />
                    )}
                  </span>
                ))}
                <span className="text-[0.8rem] italic text-muted-foreground/40">
                  &amp; hundreds more
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Right column: PillarOrbs (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden items-center justify-center lg:flex"
          >
            <PillarOrbs />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
