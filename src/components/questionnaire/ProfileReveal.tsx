"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PILLARS, PILLAR_ORDER } from "@/lib/constants";
import { normalizeScores } from "@/lib/questionnaire";
import { theme } from "@/lib/theme";
import { devSkipPayment } from "@/app/questionnaire/actions";
import type { Pillar, PillarScores, Recommendation, Plan } from "@/types/database";

interface ProfileRevealProps {
  fullName: string;
  primaryPath: Pillar;
  secondaryPath: Pillar;
  scores: PillarScores;
  hasPaid: boolean;
  recommendation: Recommendation;
}

const pillarInsights: Record<Pillar, { high: string; connection: string }> = {
  money: {
    high: "Financial stress is your biggest bottleneck. This is not about earning more. It is about clarity on where your money goes and how to make it work harder.",
    connection: "When money stress is high, it bleeds into everything: sleep, focus, relationships. Fixing this first creates space for everything else.",
  },
  mind: {
    high: "Focus and mental clarity are where you are struggling most. You know what to do but cannot make yourself do it consistently. That is a systems problem, not discipline.",
    connection: "The mind is the operating system. When it is off, nothing else runs properly.",
  },
  body: {
    high: "Your energy and physical health need the most attention. Low energy affects every decision you make, every conversation, every hour of your day.",
    connection: "Energy is the currency of life. Without it, the best plan will not matter.",
  },
  spirit: {
    high: "You are missing a sense of direction and purpose. Without knowing why you are doing what you are doing, everything feels like going through the motions.",
    connection: "Purpose is the anchor. People with clarity finish what they start.",
  },
};

/* Blurred teaser module names per pillar */
const teaserModules: Record<Pillar, string[]> = {
  money: ["Smart Money Blueprint", "Income Growth System", "Wealth Protection", "Investment Foundations", "Financial Freedom Path"],
  mind: ["Peak Focus Protocol", "Mental Clarity System", "Decision Mastery", "Habit Architecture", "Productivity Engine"],
  body: ["Energy Optimization", "Sleep Science Protocol", "Movement Blueprint", "Nutrition Essentials", "Recovery System"],
  spirit: ["Purpose Discovery", "Mindfulness Practice", "Values Alignment", "Gratitude System", "Inner Peace Path"],
};

const incomeTeaser = [
  { track: "Social Media Management", range: "₱██,███/mo" },
  { track: "Shopee/Lazada E-commerce", range: "₱██,███/mo" },
  { track: "Freelancing Skills", range: "₱██,███/project" },
  { track: "AI Business Services", range: "₱██,███/project" },
  { track: "AI Content & Design", range: "₱██,███/mo" },
];

function ScoreBar({ label, score, pillar, delay }: { label: string; score: number; pillar: Pillar; delay: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const info = theme.pillar[pillar];

  useEffect(() => {
    const start = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(interval);
        } else {
          setAnimatedScore(current);
        }
      }, 15);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(start);
  }, [score, delay]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: info.color }} />
          <span className="font-medium">{label}</span>
        </div>
        <span className="font-semibold tabular-nums">{animatedScore}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-[1500ms] ease-out"
          style={{ backgroundColor: info.color, width: `${animatedScore}%` }}
        />
      </div>
    </div>
  );
}

/* Blurred overlay section */
function BlurredTeaser({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50">
      {/* Content underneath — blurred */}
      <div style={{ filter: "blur(6px)", pointerEvents: "none", userSelect: "none" }} className="p-5 sm:p-6">
        {children}
      </div>
      {/* Overlay with lock */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px]">
        <div
          className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(79,70,229,0.1)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">Unlock your plan to see this</p>
      </div>
    </div>
  );
}

export default function ProfileReveal({
  fullName,
  primaryPath,
  secondaryPath,
  scores,
  hasPaid,
  recommendation,
}: ProfileRevealProps) {
  const defaultScores: PillarScores = { money: 50, mind: 50, body: 50, spirit: 50 };
  const safeScores = scores && typeof scores === "object" ? scores : defaultScores;
  const normalized = normalizeScores(safeScores);
  const primary = PILLARS[primaryPath];
  const firstName = fullName.split(" ")[0] || "there";
  const insight = pillarInsights[primaryPath];

  const sorted = PILLAR_ORDER.map((p) => ({ pillar: p, score: normalized[p] })).sort((a, b) => a.score - b.score);
  const lowest = sorted[0];

  const safeRecommendation: Recommendation = recommendation ?? {
    plan: "core" as Plan,
    why: "Based on your assessment, we recommend starting with the foundation.",
    skills: [],
  };

  const recPlanName = safeRecommendation.plan === "ai" ? "Once AI Careers" : safeRecommendation.plan === "pro" ? "Once Pro" : "Once Core";
  const recPrice = safeRecommendation.plan === "ai" ? "3,950" : safeRecommendation.plan === "pro" ? "2,350" : "1,499";
  const recCheckoutPlan = safeRecommendation.plan === "ai" ? "ai" : safeRecommendation.plan === "pro" ? "pro" : "core";

  const gradientSecondary = secondaryPath === primaryPath
    ? PILLAR_ORDER.find((p) => p !== primaryPath) ?? secondaryPath
    : secondaryPath;

  const modules = teaserModules[primaryPath];

  return (
    <div className="min-h-screen px-5 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Logo */}
        <div className="mb-10 text-center fade-in" style={{ animationDelay: "0s" }}>
          <p className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Once<span style={{ color: "#4F46E5" }}>.</span>
          </p>
        </div>

        {/* ═══ SECTION 1: Scores (FREE — full visibility) ═══ */}
        <div className="mb-8 fade-in" style={{ animationDelay: "0.2s" }}>
          <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {firstName}, here is what Once found.
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This is built from what you told us. No one else has this exact profile.
          </p>
        </div>

        <div className="mb-6 fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="overflow-hidden rounded-2xl border" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div
              className="h-2"
              style={{
                background: `linear-gradient(to right, ${theme.pillar[primaryPath].color}, ${theme.pillar[gradientSecondary].color})`,
              }}
            />
            <div className="p-5 sm:p-6">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Your pillar scores</p>
              <div className="space-y-3.5">
                <ScoreBar label="Money" score={normalized.money} pillar="money" delay={0.6} />
                <ScoreBar label="Mind" score={normalized.mind} pillar="mind" delay={0.8} />
                <ScoreBar label="Body" score={normalized.body} pillar="body" delay={1.0} />
                <ScoreBar label="Spirit" score={normalized.spirit} pillar="spirit" delay={1.2} />
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SECTION 2: Primary insight (FREE) ═══ */}
        <div className="mb-4 fade-in" style={{ animationDelay: "1.4s" }}>
          <div className="rounded-2xl border p-5 sm:p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.pillar[primaryPath].color }} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Your #1 area: {primary.title}
              </p>
            </div>
            <p className="mb-2 text-sm leading-relaxed">{insight.high}</p>
            <p className="text-xs leading-relaxed text-muted-foreground italic">{insight.connection}</p>
          </div>
        </div>

        <div className="mb-8 fade-in" style={{ animationDelay: "1.6s" }}>
          <div className="rounded-2xl border p-5 sm:p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.pillar[lowest.pillar].color }} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Strongest: {PILLARS[lowest.pillar].title} ({lowest.score})
              </p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This is where you are already solid. It means the work you do elsewhere will actually stick.
            </p>
          </div>
        </div>

        {!hasPaid ? (
          <>
            {/* ═══ SECTION 3: BLURRED TEASERS ═══ */}

            {/* Teaser 1: Your personalized path (blurred) */}
            <div className="mb-4 fade-in" style={{ animationDelay: "2.0s" }}>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#6366F1" }}>
                Your personalized path
              </p>
              <BlurredTeaser label="Your custom learning path">
                <p className="mb-3 text-sm font-semibold">Path: {primary.title}</p>
                <div className="space-y-2">
                  {modules.map((mod, i) => (
                    <div key={mod} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                      <span className="text-xs font-bold text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm">{mod}</span>
                      <span className="ml-auto text-xs text-muted-foreground">5 lessons</span>
                    </div>
                  ))}
                </div>
              </BlurredTeaser>
            </div>

            {/* Teaser 2: Income potential (blurred) — Pro/AI only */}
            <div className="mb-8 fade-in" style={{ animationDelay: "2.2s" }}>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#6366F1" }}>
                Your income potential
              </p>
              <BlurredTeaser label="How much you could earn">
                <p className="mb-3 text-sm font-semibold">Income tracks available to you</p>
                <div className="space-y-2">
                  {incomeTeaser.map((item) => (
                    <div key={item.track} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                      <span className="text-sm">{item.track}</span>
                      <span className="text-sm font-bold" style={{ color: "#4F46E5" }}>{item.range}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-lg bg-emerald-50 p-3">
                  <p className="text-sm font-bold text-emerald-700">Total potential: ₱██,███ to ₱███,███/month</p>
                </div>
              </BlurredTeaser>
            </div>

            {/* ═══ SECTION 4: THE OFFER ═══ */}
            <div className="mb-6 fade-in" style={{ animationDelay: "2.4s" }}>
              <div
                className="overflow-hidden rounded-2xl p-6 sm:p-8"
                style={{
                  background: "linear-gradient(135deg, #FAFAFF 0%, #F0EDFF 50%, #FAFAFF 100%)",
                  border: "2px solid rgba(79,70,229,0.15)",
                  boxShadow: "0 4px 32px rgba(79,70,229,0.1)",
                }}
              >
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#6366F1" }}>
                  Based on your answers, Once recommends
                </p>

                <h2 className="mb-1 text-2xl font-bold tracking-tight sm:text-3xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {recPlanName}
                </h2>

                {safeRecommendation.track && (
                  <p className="mb-4 text-xs font-medium" style={{ color: "#6366F1" }}>{safeRecommendation.track}</p>
                )}

                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {safeRecommendation.why}
                </p>

                {/* What's included — visible */}
                <div className="mb-5 space-y-2">
                  {[
                    "Full personalized learning path",
                    `${safeRecommendation.plan === "core" ? "25" : safeRecommendation.plan === "pro" ? "125" : "200"}+ lessons selected for you`,
                    "Action steps + reflections every lesson",
                    "Progress tracking + streaks",
                    "Lifetime access",
                    ...(safeRecommendation.plan !== "core" ? ["Income skills for PH market"] : []),
                    ...(safeRecommendation.plan === "ai" ? ["3 AI career tracks"] : []),
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm">
                      <svg className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#4F46E5" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">₱</span>
                  <span className="text-4xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{recPrice}</span>
                  <span className="text-sm text-muted-foreground">one-time</span>
                </div>

                <a
                  href={`/checkout?plan=${recCheckoutPlan}`}
                  className="flex h-14 w-full items-center justify-center rounded-lg text-base font-semibold transition-transform hover:scale-[1.01]"
                  style={{
                    background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(79,70,229,0.25)",
                    textDecoration: "none",
                  }}
                >
                  Unlock My Path — ₱{recPrice}
                </a>

                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  Visa, Mastercard, GCash, Maya accepted. One payment. Lifetime access.
                </p>
                <p className="mt-1 text-center text-[11px] text-muted-foreground/70">
                  7-day money-back guarantee. No questions asked.
                </p>
              </div>
            </div>

            {/* Other plans */}
            <div className="fade-in" style={{ animationDelay: "2.6s" }}>
              <p className="mb-3 text-center text-xs text-muted-foreground">Other options:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {safeRecommendation.plan !== "core" && (
                  <div className="rounded-xl border p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Once Core</p>
                    <div className="mb-2 flex items-baseline gap-1">
                      <span className="text-xs text-muted-foreground">₱</span>
                      <span className="text-xl font-bold">1,499</span>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">Personalized path + 25 lessons.</p>
                    <a href="/checkout?plan=core" className="block rounded-lg border py-2 text-center text-xs font-medium transition-colors hover:bg-muted">
                      Start with Core
                    </a>
                  </div>
                )}
                {safeRecommendation.plan !== "pro" && (
                  <div className="rounded-xl border p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#6366F1" }}>Once Pro</p>
                    <div className="mb-2 flex items-baseline gap-1">
                      <span className="text-xs text-muted-foreground">₱</span>
                      <span className="text-xl font-bold">2,350</span>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">Core + income skills. 125 lessons.</p>
                    <a href="/checkout?plan=pro" className="block rounded-lg border py-2 text-center text-xs font-medium transition-colors hover:bg-muted">
                      Go Pro
                    </a>
                  </div>
                )}
                {safeRecommendation.plan !== "ai" && (
                  <div className="rounded-xl border p-4" style={{ background: "#F8FAFF", boxShadow: "0 2px 8px rgba(59,130,246,0.06)" }}>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#3B82F6" }}>Once AI Careers</p>
                    <div className="mb-2 flex items-baseline gap-1">
                      <span className="text-xs text-muted-foreground">₱</span>
                      <span className="text-xl font-bold">3,950</span>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">Pro + 3 AI career tracks.</p>
                    <a href="/checkout?plan=ai" className="block rounded-lg py-2 text-center text-xs font-medium text-white" style={{ background: "#3B82F6" }}>
                      Go AI Careers
                    </a>
                  </div>
                )}
              </div>

              <p className="mt-5 text-center text-xs text-muted-foreground">
                Not sure? Start with Core. You can upgrade anytime.
              </p>
            </div>

            {/* Dev skip */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 border-t pt-4">
                <p className="mb-2 text-xs text-muted-foreground">Dev only:</p>
                <div className="flex gap-2">
                  {(["core", "pro", "ai"] as const).map((p) => (
                    <button key={p} onClick={() => devSkipPayment(p)} className="rounded bg-muted px-3 py-1 text-xs">
                      Skip → {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="fade-in" style={{ animationDelay: "2.0s" }}>
            <a
              href="/dashboard"
              className="flex h-14 w-full items-center justify-center rounded-lg text-base font-semibold"
              style={{ background: "#4F46E5", color: "#fff", textDecoration: "none" }}
            >
              Continue Your Path
            </a>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .fade-in{opacity:0;transform:translateY(15px);animation:prFadeIn .6s ease-out both}
        @keyframes prFadeIn{to{opacity:1;transform:translateY(0)}}
      `}} />
    </div>
  );
}
