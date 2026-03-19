"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QUESTIONS } from "@/lib/questionnaire";
import { submitQuestionnaire } from "@/app/questionnaire/actions";

export default function QuestionnaireFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const question = QUESTIONS[currentStep];
  const totalSteps = QUESTIONS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLast = currentStep === totalSteps - 1;

  function handleSelect(optionIndex: number) {
    setSelectedOption(optionIndex);
  }

  async function handleNext() {
    if (selectedOption === null) return;

    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);

    if (isLast) {
      setSubmitting(true);
      setError(null);
      const result = await submitQuestionnaire(newAnswers);
      if (result?.error) {
        setError(result.error);
        setSubmitting(false);
      }
    } else {
      setSelectedOption(null);
      setCurrentStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setSelectedOption(answers[QUESTIONS[currentStep - 1].id] ?? null);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <div className="border-b px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-foreground">
            Once
          </span>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <div className="mx-auto mt-3 max-w-2xl">
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Question area */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {question.text}
              </h2>
              {question.subtitle && (
                <p className="mb-8 text-muted-foreground">
                  {question.subtitle}
                </p>
              )}
              {!question.subtitle && <div className="mb-8" />}

              <div className="space-y-3">
                {question.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full rounded-xl border-2 px-5 py-4 text-left transition-all ${
                      selectedOption === i
                        ? "border-primary/60 bg-primary/10 shadow-sm shadow-primary/10"
                        : "border-border bg-card hover:border-border/80 hover:bg-muted"
                    }`}
                  >
                    <span className={`text-base font-medium ${selectedOption === i ? "text-foreground" : "text-muted-foreground"}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>

              {error && (
                <p className="mt-4 text-sm text-destructive">{error}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="border-t px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedOption === null || submitting}
            className="font-semibold"
          >
            {submitting
              ? "Analyzing..."
              : isLast
                ? "See My Results"
                : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
