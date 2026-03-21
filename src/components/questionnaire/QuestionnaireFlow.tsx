"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QUESTIONS } from "@/lib/questionnaire";
import { submitQuestionnaire } from "@/app/questionnaire/actions";

type Phase = "intro" | "questions" | "analyzing";

export default function QuestionnaireFlow() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [idleMsg, setIdleMsg] = useState(false);

  const question = QUESTIONS[currentStep];
  const totalSteps = QUESTIONS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  useEffect(() => {
    if (phase === "intro") {
      const timer = setTimeout(() => setIdleMsg(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  function handleSelect(optionIndex: number) {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    setResponse(question.options[optionIndex].response);

    const newAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((s) => s + 1);
        setSelectedOption(null);
        setResponse(null);
      } else {
        setPhase("analyzing");
        doSubmit(newAnswers);
      }
    }, 1800);
  }

  async function doSubmit(finalAnswers: Record<string, number>) {
    await new Promise((r) => setTimeout(r, 3500));
    await submitQuestionnaire(finalAnswers);
  }

  // INTRO SCREEN
  if (phase === "intro") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-foreground px-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 font-display text-2xl font-semibold text-background sm:text-3xl"
          >
            This assessment is not for everyone.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-8 space-y-3 text-sm leading-relaxed text-background/60"
          >
            <p>It takes 10 minutes. It requires honesty.</p>
            <p>
              And it will show you exactly what&apos;s holding you back,
              and what to do about it.
            </p>
            <p>
              Most people scroll past this.
              <br />A few decide to actually find out.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Button
              onClick={() => setPhase("questions")}
              size="lg"
              className="h-12 px-8 text-sm font-semibold bg-background text-foreground hover:bg-background/90"
            >
              I&apos;m ready to find out
            </Button>
          </motion.div>

          <AnimatePresence>
            {idleMsg && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-xs text-background/30"
              >
                Still here? Good. That already tells us something.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // ANALYZING SCREEN
  if (phase === "analyzing") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-foreground px-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-sm text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 font-display text-xl font-semibold text-background sm:text-2xl"
          >
            Building your Once Profile...
          </motion.p>

          <div className="space-y-4">
            {[
              { label: "Money", color: "#F59E0B", delay: 0.3 },
              { label: "Mind", color: "#A78BFA", delay: 0.6 },
              { label: "Body", color: "#34D399", delay: 0.9 },
              { label: "Spirit", color: "#60A5FA", delay: 1.2 },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="mb-1 flex justify-between text-xs text-background/50">
                  <span>{bar.label}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-background/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: bar.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${40 + Math.random() * 50}%` }}
                    transition={{ duration: 2, delay: bar.delay, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-8 text-sm text-background/40"
          >
            Your path is ready.
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // QUESTION FLOW
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Progress bar */}
      <div className="px-5 pt-4 pb-2">
        <div className="mx-auto max-w-lg">
          <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Question {currentStep + 1} of {totalSteps}</span>
            <span className="capitalize">{question.phase} phase</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 items-center justify-center px-5 py-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Once "message" bubble */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-4 py-3"
              >
                <p className="text-sm font-medium leading-relaxed">
                  {question.prompt}
                </p>
              </motion.div>

              {/* Answer cards */}
              <div className="space-y-2">
                {question.options.map((option, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                    onClick={() => handleSelect(i)}
                    disabled={selectedOption !== null}
                    className={`w-full rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-200 ${
                      selectedOption === i
                        ? "border-primary bg-primary/10 font-medium scale-[0.98]"
                        : selectedOption !== null
                          ? "opacity-30"
                          : "border-border bg-card hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {option.emoji && <span className="text-base">{option.emoji}</span>}
                      <span>{option.label}</span>
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Once response after selection */}
              <AnimatePresence>
                {response && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="mt-4 max-w-[80%] rounded-2xl rounded-bl-md bg-primary/10 px-4 py-3"
                  >
                    <p className="text-xs italic text-primary">{response}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
