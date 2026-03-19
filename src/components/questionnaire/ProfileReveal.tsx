"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PILLARS, MODULES_PER_PILLAR, PILLAR_ORDER } from "@/lib/constants";
import { normalizeScores } from "@/lib/questionnaire";
import { theme } from "@/lib/theme";
import Logo from "@/components/ui/logo";
import type { Pillar, PillarScores } from "@/types/database";

interface ProfileRevealProps {
  fullName: string;
  primaryPath: Pillar;
  secondaryPath: Pillar;
  scores: PillarScores;
  hasPaid: boolean;
}

const pillarInsights: Record<Pillar, { high: string; low: string; connection: string }> = {
  money: {
    high: "Financial stress is your biggest bottleneck right now. This isn't about not earning enough. It's about not having clarity on where your money goes and how to make it work harder.",
    low: "Your financial foundation is relatively stable. That's a strength. It means you can focus on the areas that actually need attention without money stress getting in the way.",
    connection: "When money stress is high, it bleeds into everything: sleep, focus, relationships, confidence. Fixing this first creates space for everything else.",
  },
  mind: {
    high: "Focus and mental clarity are where you're struggling most. You probably know what to do but can't make yourself do it consistently. That's not a discipline problem. It's a systems problem.",
    low: "Your mental clarity is in a good place. You can focus when you need to and manage stress reasonably well. That's a real advantage for tackling other areas.",
    connection: "The mind is the operating system. When it's off, nothing else runs properly, not your finances, not your health, not your sense of purpose.",
  },
  body: {
    high: "Your energy and physical health need the most attention. Low energy doesn't just affect workouts. It affects every decision you make, every conversation you have, every hour of your day.",
    low: "Your physical foundation is solid. You have the energy to show up. That matters more than most people realize.",
    connection: "Energy is the currency of life. Without it, the best financial plan or the clearest mindset won't matter because you won't have the fuel to execute.",
  },
  spirit: {
    high: "You're missing a sense of direction and purpose. This is the pillar most people ignore, but it's often the root cause. Without knowing why you're doing what you're doing, everything feels like going through the motions.",
    low: "You have a sense of purpose and direction. That's rare and valuable. It means the work you do in other areas will actually stick because you know why it matters.",
    connection: "Purpose is the anchor. People with high Spirit scores finish what they start because they know it connects to something bigger than today.",
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
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: info.color }} />
          <span className="font-medium">{label}</span>
        </div>
        <span className="font-semibold tabular-nums">{animatedScore}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedScore}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
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
}: ProfileRevealProps) {
  const normalized = normalizeScores(scores);
  const primary = PILLARS[primaryPath];
  const secondary = PILLARS[secondaryPath];
  const firstName = fullName.split(" ")[0] || "there";
  const insight = pillarInsights[primaryPath];

  // Find lowest pillar
  const sorted = PILLAR_ORDER.map((p) => ({ pillar: p, score: normalized[p] })).sort((a, b) => a.score - b.score);
  const lowest = sorted[0];
  const lowestInsight = pillarInsights[lowest.pillar];

  return (
    <div className="min-h-screen px-5 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Full logo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <Logo size="lg" />
        </motion.div>

        {/* Personal greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-display text-2xl sm:text-3xl">
            {firstName}, we see you.
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Based on your answers, here is what we found. Take a moment to read
            through this. It&apos;s built specifically around what you told us.
          </p>
        </motion.div>

        {/* Score card */}
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
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: theme.pillar[primaryPath].color }}
                />
                <p className="text-label text-muted-foreground">
                  Your #1 area: {primary.title}
                </p>
              </div>
              <p className="mb-3 text-sm leading-relaxed">
                {insight.high}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground italic">
                {insight.connection}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lowest pillar observation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: theme.pillar[lowest.pillar].color }}
                />
                <p className="text-label text-muted-foreground">
                  Your strongest area: {PILLARS[lowest.pillar].title} ({lowest.score})
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {lowestInsight.low}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* What this means */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mb-8"
        >
          <Card className="border-primary/15 bg-primary/[0.03]">
            <CardContent className="p-5 sm:p-6">
              <h3 className="mb-2 text-sm font-semibold">What this means for you</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Your {primary.title} path has 5 structured modules designed
                specifically for someone with your score pattern. Each module has
                5 to 7 lessons. Each lesson takes 10 to 15 minutes. You get a
                teaching section, one action step to do that day, and a
                reflection question. By the time you finish, you will have
                completed {5 * 6} practical exercises tailored to your exact
                situation.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="my-8" />

        {/* Your path modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="mb-8"
        >
          <h3 className="mb-4 text-label text-muted-foreground">
            Your {primary.title} path: 5 modules
          </h3>
          <div className="space-y-2">
            {MODULES_PER_PILLAR[primaryPath].map((mod, i) => (
              <motion.div
                key={mod}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.8 + i * 0.08 }}
                className="flex items-center gap-3 rounded-lg border px-4 py-3"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: `${theme.pillar[primaryPath].color}15`,
                    color: theme.pillar[primaryPath].color,
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium">{mod}</span>
                {!hasPaid && i > 0 && (
                  <Badge variant="secondary" className="ml-auto text-[10px]">
                    Locked
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Separator className="my-8" />

        {/* Pricing: two plans */}
        {!hasPaid ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            <h3 className="mb-2 text-section text-lg sm:text-xl">
              Choose your plan
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              You&apos;ve seen your scores. You know what needs attention.
              Now choose how deep you want to go.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {/* Core */}
              <Card>
                <CardContent className="p-5">
                  <p className="mb-1 text-label text-muted-foreground">Once Core</p>
                  <div className="mb-3 flex items-baseline gap-1">
                    <span className="text-xs text-muted-foreground">₱</span>
                    <span className="text-display text-3xl">649</span>
                    <span className="ml-1 text-xs text-muted-foreground">one-time</span>
                  </div>
                  <ul className="mb-4 space-y-1.5">
                    {[
                      "Your full Once profile",
                      `5 ${primary.title} modules`,
                      "5 to 7 lessons per module",
                      "Action steps + reflections",
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
                  <Button
                    render={<Link href="/checkout?plan=core" />}
                    variant="outline"
                    className="w-full"
                  >
                    Start Once: ₱649
                  </Button>
                </CardContent>
              </Card>

              {/* Pro */}
              <Card className="border-primary/20 bg-primary/[0.02]">
                <CardContent className="p-5">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-label text-primary">Once Pro</p>
                    <Badge className="text-[9px]">Recommended</Badge>
                  </div>
                  <div className="mb-3 flex items-baseline gap-1">
                    <span className="text-xs text-muted-foreground">₱</span>
                    <span className="text-display text-3xl">999</span>
                    <span className="ml-1 text-xs text-muted-foreground">one-time</span>
                  </div>
                  <ul className="mb-4 space-y-1.5">
                    {[
                      "Everything in Core",
                      "Social media management",
                      "Shopee/Lazada e-commerce",
                      "Freelancing and client skills",
                      "Building online side income",
                      "Priority updates",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    render={<Link href="/checkout?plan=pro" />}
                    className="w-full font-semibold shadow-sm shadow-primary/10"
                  >
                    Do It Once: ₱999
                  </Button>
                </CardContent>
              </Card>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              GCash and Maya accepted. No subscription. No upsells. One payment, lifetime access.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            <Button
              render={<Link href="/dashboard" />}
              size="lg"
              className="w-full h-12 font-semibold"
            >
              Go to Your Dashboard
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
