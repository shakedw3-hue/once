"use client";

import { motion } from "framer-motion";
import {
  IconTarget,
  IconPerson,
  IconCards,
  IconBookSpark,
  IconCoinsUp,
  IconChartUp,
} from "@/components/ui/icons";

const stages = [
  {
    step: "1",
    title: "Find Out Where You Stand",
    time: "10 minutes",
    desc: "Answer 15 honest questions. Once maps exactly where you are in Money, Mind, Body, and Spirit.",
    icon: <IconTarget size="md" />,
  },
  {
    step: "2",
    title: "Get Your Personal Profile",
    time: "Instant",
    desc: "See your scores. Understand what\u2019s holding you back. Get your path \u2014 built for you alone.",
    icon: <IconPerson size="md" />,
  },
  {
    step: "3",
    title: "Choose How Far You Want to Go",
    time: "1 minute",
    desc: "Core \u20B11,499 \u2014 Fix the foundation. Pro \u20B12,350 \u2014 Build your first income. AI Careers \u20B13,950 \u2014 Learn the skills of the future.",
    icon: <IconCards size="md" />,
  },
  {
    step: "4",
    title: "Learn What Actually Works",
    time: "10 min/day",
    desc: "Short, practical lessons. Each one built from the world\u2019s most successful people. Each one actionable today.",
    icon: <IconBookSpark size="md" />,
  },
  {
    step: "5",
    title: "Start Earning on the Side",
    time: "Week 3 onwards",
    desc: "Pro and AI Careers users get real income skills \u2014 not theory. Real tools. Real clients. Real money.",
    icon: <IconCoinsUp size="md" />,
  },
  {
    step: "6",
    title: "See Yourself Change",
    time: "Week 10",
    desc: "Retake the assessment. See exactly how far you\u2019ve come. Once shows you the proof.",
    icon: <IconChartUp size="md" />,
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-6 bottom-6 w-px bg-border sm:left-6" />

      <div className="space-y-1">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.step}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex gap-4 pb-6 last:pb-0 sm:gap-5"
          >
            {/* Icon node */}
            <div className="relative z-10">
              {stage.icon}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1 sm:pt-2">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <h3 className="text-sm font-semibold sm:text-base">{stage.title}</h3>
                <span className="text-[10px] font-medium text-primary sm:text-xs">
                  {stage.time}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {stage.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Promise signature */}
      <p className="mt-6 text-center once-signature">Once<span className="once-dot">.</span></p>
    </div>
  );
}
