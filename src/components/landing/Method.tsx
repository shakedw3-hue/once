"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    name: "Money",
    color: "bg-amber-500",
    glow: "shadow-amber-500/20",
    description: "Financial clarity, opportunity recognition, and risk intelligence. Not get-rich-quick. A framework for decisions that compound.",
  },
  {
    name: "Mind",
    color: "bg-violet-400",
    glow: "shadow-violet-400/20",
    description: "Focus, emotional regulation, and mental resilience. The operating system that everything else runs on.",
  },
  {
    name: "Body",
    color: "bg-emerald-400",
    glow: "shadow-emerald-400/20",
    description: "Energy, movement, nutrition, and recovery. You can't outperform a body that's working against you.",
  },
  {
    name: "Spirit",
    color: "bg-sky-400",
    glow: "shadow-sky-400/20",
    description: "Purpose, values alignment, and inner peace. The pillar most people ignore until everything else stops working.",
  },
];

export default function Method() {
  return (
    <section id="method" className="relative px-5 py-16 sm:px-6 sm:py-28">
      {/* Warm divider glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-amber-400/70">
            The BetterLife Method
          </p>
          <h2 className="mb-6 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Four pillars. One system.{" "}
            <span className="text-white/30">Built around you.</span>
          </h2>
          <p className="text-base leading-relaxed text-white/45 sm:text-lg">
            Most self-improvement fails because it&apos;s generic. A money course
            won&apos;t help if your real bottleneck is mental clarity. A fitness
            plan falls apart without the discipline pillar underneath it.
            BetterLife maps all four dimensions of your life, then tells you
            exactly where to start.
          </p>
        </motion.div>

        {/* Pillar grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${pillar.color} shadow-lg ${pillar.glow}`} />
                <h3 className="text-lg font-semibold text-white">{pillar.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/40">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interconnection message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-2xl border border-amber-500/10 bg-amber-500/[0.03] p-6 sm:p-8"
        >
          <p className="text-center text-base leading-relaxed text-white/50 sm:text-lg">
            <span className="font-medium text-amber-400">Here&apos;s what nobody tells you:</span>{" "}
            weakness in one pillar quietly drains the others. Low energy kills
            your focus. Poor finances create anxiety. Anxiety destroys sleep. The
            BetterLife assessment finds the root, so you stop treating symptoms
            and fix the actual problem.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
