"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const demoQuestions = [
  {
    text: "What's the #1 thing you want to improve right now?",
    options: [
      { label: "My financial situation", scores: { money: 40, mind: 10, body: 0, spirit: 0 } },
      { label: "My focus and mental clarity", scores: { money: 0, mind: 40, body: 5, spirit: 5 } },
      { label: "My energy and health", scores: { money: 0, mind: 5, body: 40, spirit: 5 } },
      { label: "My sense of direction", scores: { money: 0, mind: 5, body: 0, spirit: 45 } },
    ],
  },
  {
    text: "When you're stressed, what usually happens?",
    options: [
      { label: "I worry about money", scores: { money: 35, mind: 15, body: 0, spirit: 0 } },
      { label: "I overthink and can't sleep", scores: { money: 0, mind: 35, body: 10, spirit: 5 } },
      { label: "I eat badly or skip exercise", scores: { money: 0, mind: 10, body: 35, spirit: 5 } },
      { label: "I feel empty or lost", scores: { money: 0, mind: 10, body: 0, spirit: 40 } },
    ],
  },
];

const pillarConfig = [
  { key: "money", label: "Money", color: "#D4920A" },
  { key: "mind", label: "Mind", color: "#7B5EA7" },
  { key: "body", label: "Body", color: "#2D8A6E" },
  { key: "spirit", label: "Spirit", color: "#4A7FB5" },
] as const;

type Scores = { money: number; mind: number; body: number; spirit: number };

export default function AssessmentDemo() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({ money: 0, mind: 0, body: 0, spirit: 0 });
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const question = demoQuestions[step];
  const maxScore = Math.max(...Object.values(scores), 1);

  function handleSelect(idx: number) {
    setSelected(idx);
    const optScores = question.options[idx].scores;
    const newScores = {
      money: scores.money + optScores.money,
      mind: scores.mind + optScores.mind,
      body: scores.body + optScores.body,
      spirit: scores.spirit + optScores.spirit,
    };
    setScores(newScores);

    setTimeout(() => {
      if (step < demoQuestions.length - 1) {
        setStep((s) => s + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 600);
  }

  const topPillar = pillarConfig.reduce((best, p) =>
    scores[p.key] > scores[best.key] ? p : best
  , pillarConfig[0]);

  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      {/* Score bars — always visible */}
      <div className="border-b bg-muted/30 px-4 py-4 sm:px-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Live score
        </p>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {pillarConfig.map((p) => {
            const value = scores[p.key];
            const pct = maxScore > 0 ? (value / maxScore) * 100 : 0;
            return (
              <div key={p.key} className="text-center">
                <div className="relative mx-auto mb-1.5 h-20 w-full max-w-[2rem] overflow-hidden rounded-md bg-muted sm:h-24">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 rounded-md"
                    style={{
                      backgroundColor: p.color,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), 0 -1px 3px ${p.color}30`,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <p className="text-[10px] font-semibold text-foreground sm:text-xs">
                  {value > 0 ? value : "–"}
                </p>
                <p className="text-[9px] text-muted-foreground sm:text-[10px]">{p.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question or result */}
      <div className="px-4 py-5 sm:px-5 sm:py-6">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <p className="mb-1 text-[10px] font-medium text-muted-foreground">
                Question {step + 1} of {demoQuestions.length} · Demo
              </p>
              <h3 className="mb-4 text-sm font-semibold text-foreground sm:text-base">
                {question.text}
              </h3>
              <div className="space-y-2">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selected === null && handleSelect(i)}
                    disabled={selected !== null}
                    className={`w-full rounded-lg border border-l-[3px] border-l-transparent px-3.5 py-3 text-left text-sm transition-all duration-200 ${
                      selected === i
                        ? "border-l-primary border-primary bg-primary/8 text-foreground font-medium"
                        : selected !== null
                          ? "opacity-40"
                          : "hover:border-l-primary/50 hover:bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div
                className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${topPillar.color}15` }}
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: topPillar.color }}
                />
              </div>
              <p className="mb-1 text-sm font-semibold text-foreground">
                Your top pillar: {topPillar.label}
              </p>
              <p className="mb-5 text-xs text-muted-foreground">
                That was 2 questions. The full assessment has 10 and gives you
                a complete profile with a personalized path.
              </p>
              <Button
                render={<Link href="/auth/signup" />}
                className="h-10 px-5 text-sm font-semibold"
              >
                Do It Once, Free Assessment
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
