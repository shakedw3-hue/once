"use client";

import { motion } from "framer-motion";

const stages = [
  {
    step: "1",
    title: "Assessment",
    time: "10 min",
    desc: "Answer 15 questions about where you are right now",
    color: "#4F46E5",
  },
  {
    step: "2",
    title: "Your Profile",
    time: "Instant",
    desc: "See your scores across Money, Mind, Body, Spirit",
    color: "#4F46E5",
  },
  {
    step: "3",
    title: "Choose Your Plan",
    time: "1 min",
    desc: "Core ₱1,499, Pro ₱2,350, or AI Careers ₱3,950, all one-time",
    color: "#4F46E5",
  },
  {
    step: "4",
    title: "Module 1",
    time: "Week 1–2",
    desc: "5–7 lessons with daily action steps",
    color: "#F59E0B",
  },
  {
    step: "5",
    title: "Modules 2–3",
    time: "Week 3–6",
    desc: "Building on what you learned, going deeper",
    color: "#A78BFA",
  },
  {
    step: "6",
    title: "Modules 4–5",
    time: "Week 7–10",
    desc: "Advanced skills + reflection on your growth",
    color: "#34D399",
  },
  {
    step: "✓",
    title: "Path Complete",
    time: "",
    desc: "Retake the assessment. See how your scores shifted",
    color: "#4F46E5",
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border sm:left-[23px]" />

      <div className="space-y-0">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.step}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex gap-4 pb-6 last:pb-0 sm:gap-5"
          >
            {/* Node */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-background text-xs font-bold sm:h-12 sm:w-12 sm:text-sm"
                style={{
                  borderColor: stage.color,
                  color: stage.color,
                }}
              >
                {stage.step}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-1.5 sm:pt-2.5">
              <div className="flex items-baseline gap-2">
                <h3 className="text-sm font-semibold sm:text-base">{stage.title}</h3>
                {stage.time && (
                  <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">
                    {stage.time}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {stage.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
