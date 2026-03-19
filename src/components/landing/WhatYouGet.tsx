"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "A real assessment, not a personality quiz",
    description:
      "10 questions that score you across Money, Mind, Body, and Spirit. You get a number for each, not a vague label. You'll know exactly where you stand.",
  },
  {
    title: "A path that's built around your score",
    description:
      "Your highest-scoring pillar becomes your primary path. You get 5 modules with 5–7 lessons each. The content matches where you actually are, not where some course assumes you are.",
  },
  {
    title: "Lessons that are worksheets, not videos",
    description:
      "Every lesson has a teaching section, an action step you do today, and a reflection question. It's practical. You won't sit and watch someone talk for 45 minutes.",
  },
  {
    title: "Progress you can see",
    description:
      "Track what you've done, what's next, and how far you've come. No gamification or streaks. Just a clear view of your work.",
  },
];

export default function WhatYouGet() {
  return (
    <section className="border-t px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          What you&apos;re getting
        </motion.h2>

        <div className="space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <h3 className="mb-1 text-base font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
