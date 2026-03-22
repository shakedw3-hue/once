"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PILLARS, PILLAR_ORDER } from "@/lib/constants";
import { normalizeScores } from "@/lib/questionnaire";
import { theme } from "@/lib/theme";
import Logo from "@/components/ui/logo";
import type { Pillar, PillarScores, Recommendation } from "@/types/database";

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
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedScore}%` }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: info.color }}
        />
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
  const normalized = normalizeScores(scores);
  const primary = PILLARS[primaryPath];
  const firstName = fullName.split(" ")[0] || "there";
  const insight = pillarInsights[primaryPath];

  // Find lowest scoring pillar (strongest area)
  const sorted = PILLAR_ORDER.map((p) => ({ pillar: p, score: normalized[p] })).sort((a, b) => a.score - b.score);
  const lowest = sorted[0];

  const recPlanName = recommendation.plan === "ai" ? "Once AI Careers" : recommendation.plan === "pro" ? "Once Pro" : "Once Core";
  const recPrice = recommendation.plan === "ai" ? "3,950" : recommendation.plan === "pro" ? "2,350" : "1,499";
  const recCheckoutPlan = recommendation.plan === "ai" ? "ai" : recommendation.plan === "pro" ? "pro" : "core";

  return (
    <div className="min-h-screen px-5 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <Logo size="lg" />
        </motion.div>

        {/* ═══════════════════════════════════════════ */}
        {/* ABOVE THE FOLD — Greeting + Scores         */}
        {/* ═══════════════════════════════════════════ */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-display text-2xl sm:text-3xl">
            {firstName}, here is what Once found.
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Take a moment. This is built from what you told us.
          </p>
        </motion.div>

        {/* Animated pillar scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="mb-6 overflow-hidden">
            <div
              className="h-2"
              style={{
                background: `linear-gradient(to right, ${theme.pillar[primaryPath].color}, ${theme.pillar[secondaryPath].color})`,
              }}
            />
            <CardContent className="p-5 sm:p-6">
              <p className="mb-4 text-label text-muted-foreground">Your pillar scores</p>
              <div className="space-y-3.5">
                <ScoreBar label="Money" score={normalized.money} pillar="money" delay={0.6} />
                <ScoreBar label="Mind" score={normalized.mind} pillar="mind" delay={0.8} />
                <ScoreBar label="Body" score={normalized.body} pillar="body" delay={1.0} />
                <ScoreBar label="Spirit" score={normalized.spirit} pillar="spirit" delay={1.2} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Primary path insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.pillar[primaryPath].color }} />
                <p className="text-label text-muted-foreground">Your #1 area: {primary.title}</p>
              </div>
              <p className="mb-2 text-sm leading-relaxed">{insight.high}</p>
              <p className="text-xs leading-relaxed text-muted-foreground italic">{insight.connection}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Strongest area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.pillar[lowest.pillar].color }} />
                <p className="text-label text-muted-foreground">Strongest: {PILLARS[lowest.pillar].title} ({lowest.score})</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This is where you are already solid. It means the work you do elsewhere will actually stick.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════════════════════════════════════ */}
        {/* THE MONEY MOMENT — Recommendation Card     */}
        {/* ═══════════════════════════════════════════ */}

        {!hasPaid ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="mb-6"
            >
              <Card className="overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/10">
                <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
                <CardContent className="p-5 sm:p-8">
                  <p className="mb-1 text-label text-primary">Based on your answers, Once recommends</p>

                  <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-display text-2xl sm:text-3xl">{recPlanName}</h2>
                    {recommendation.track && (
                      <Badge variant="secondary" className="text-xs">{recommendation.track}</Badge>
                    )}
                  </div>

                  {/* Why this recommendation */}
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    {recommendation.why}
                  </p>

                  {/* Skills they'll learn */}
                  {recommendation.skills.length > 0 && (
                    <div className="mb-5">
                      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        What you will learn
                      </p>
                      <ul className="space-y-2">
                        {recommendation.skills.map((skill) => (
                          <li key={skill} className="flex items-start gap-2.5 text-sm text-foreground">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Earning potential */}
                  {recommendation.earning && (
                    <div className="mb-6 rounded-lg bg-primary/[0.06] px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Earning potential</p>
                      <p className="mt-0.5 text-lg font-bold text-foreground">{recommendation.earning}</p>
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-sm text-muted-foreground">₱</span>
                    <span className="text-display text-4xl">{recPrice}</span>
                    <span className="text-sm text-muted-foreground">one-time</span>
                  </div>

                  <Button
                    render={<Link href={`/checkout?plan=${recCheckoutPlan}`} />}
                    size="lg"
                    className="h-14 w-full text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.01]"
                  >
                    Do It Once — ₱{recPrice}
                  </Button>

                  <p className="mt-3 text-center text-[11px] text-muted-foreground">
                    GCash and Maya accepted. One payment. Lifetime access.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <Separator className="my-8" />

            {/* ═══════════════════════════════════════════ */}
            {/* BELOW THE FOLD — Other Plans               */}
            {/* ═══════════════════════════════════════════ */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.4 }}
            >
              <p className="mb-4 text-sm text-muted-foreground">
                Other options available:
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* Show the two plans that AREN'T the recommendation */}
                {recommendation.plan !== "core" && (
                  <Card>
                    <CardContent className="p-4">
                      <p className="mb-1 text-label text-muted-foreground">Once Core</p>
                      <div className="mb-2 flex items-baseline gap-1">
                        <span className="text-xs text-muted-foreground">₱</span>
                        <span className="text-display text-2xl">1,499</span>
                      </div>
                      <p className="mb-3 text-xs text-muted-foreground">
                        Assessment + personalized path + 25 lessons. Build the foundation.
                      </p>
                      <Button
                        render={<Link href="/checkout?plan=core" />}
                        variant="outline"
                        className="w-full text-xs"
                      >
                        Start Once — ₱1,499
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {recommendation.plan !== "pro" && (
                  <Card className={recommendation.plan === "core" ? "border-primary/20" : ""}>
                    <CardContent className="p-4">
                      <div className="mb-1 flex items-center gap-2">
                        <p className="text-label text-primary">Once Pro</p>
                        {recommendation.plan === "core" && <Badge className="text-[8px]">Most Popular</Badge>}
                      </div>
                      <div className="mb-2 flex items-baseline gap-1">
                        <span className="text-xs text-muted-foreground">₱</span>
                        <span className="text-display text-2xl">2,350</span>
                      </div>
                      <p className="mb-3 text-xs text-muted-foreground">
                        Everything in Core + 100 income-track lessons. Build your first side income.
                      </p>
                      <Button
                        render={<Link href="/checkout?plan=pro" />}
                        variant={recommendation.plan === "core" ? "default" : "outline"}
                        className="w-full text-xs"
                      >
                        Do It Once — ₱2,350
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {recommendation.plan !== "ai" && (
                  <Card className="border-blue-400/20 bg-blue-50/50">
                    <CardContent className="p-4">
                      <div className="mb-1 flex items-center gap-2">
                        <p className="text-label text-blue-600">Once AI Careers</p>
                        <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-[7px] font-bold text-white">Best Investment</span>
                      </div>
                      <div className="mb-2 flex items-baseline gap-1">
                        <span className="text-xs text-muted-foreground">₱</span>
                        <span className="text-display text-2xl">3,950</span>
                      </div>
                      <p className="mb-3 text-xs text-muted-foreground">
                        Everything in Pro + 3 AI career tracks. Earn ₱20,000+ per project.
                      </p>
                      <Button
                        render={<Link href="/checkout?plan=ai" />}
                        className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Do It Once — ₱3,950
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Not sure? Start with Core ₱1,499. You can upgrade anytime.
              </p>

              <p className="mt-6 text-center once-signature">One investment. One path. Once<span className="once-dot">.</span></p>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            <Button
              render={<Link href="/dashboard" />}
              size="lg"
              className="h-14 w-full font-semibold"
            >
              Continue Your Path
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
