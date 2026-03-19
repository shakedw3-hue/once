"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Answer 10 honest questions",
    description:
      "About your goals, daily habits, and what frustrates you. Takes about 3 minutes. We don't ask for anything personal, just where you're at.",
  },
  {
    number: "2",
    title: "Get your score across 4 pillars",
    description:
      "Money, Mind, Body, Spirit. You'll see exactly where you're strong and where you're not. Most people are surprised. The area they thought was fine usually isn't.",
  },
  {
    number: "3",
    title: "Follow the path that matches you",
    description:
      "Each path has 5 modules with practical lessons. Not video lectures. Short worksheets with a clear action step and a reflection question. Things you can actually do today.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Here&apos;s what actually happens
        </motion.h2>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {step.number}
              </span>
              <div>
                <h3 className="mb-1 text-base font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
