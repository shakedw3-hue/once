"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "78%", label: "identified a blind spot they had ignored for years" },
  { value: "48hrs", label: "average time to complete the first module" },
  { value: "92%", label: "said the assessment was more accurate than expected" },
];

const testimonials = [
  {
    quote: "I kept buying financial courses. Turns out my real problem was focus and discipline, the Mind pillar. BetterLife showed me that in 3 minutes.",
    name: "Marco R.",
    detail: "28, Cebu · BPO Team Lead",
  },
  {
    quote: "Nag-spend na ako ng ₱12,000 sa courses last year. Wala natapos. This one actually started with ME, not with content. First time I finished something.",
    name: "Jessa D.",
    detail: "24, Manila · VA & Freelancer",
  },
  {
    quote: "I thought I needed a gym plan. The assessment showed my Spirit score was at 31. I had no sense of direction. That was the real issue. Now I train AND I know why.",
    name: "Paolo M.",
    detail: "32, Davao · Small Business Owner",
  },
];

export default function SocialProof() {
  return (
    <section id="proof" className="relative px-5 py-16 sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Warm section break */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-amber-400/70">
            Real results
          </p>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            What happens when people actually understand themselves
          </h2>
        </motion.div>

        {/* Stats row */}
        <div className="mb-12 grid grid-cols-3 gap-3 sm:mb-16 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="mb-1 font-display text-2xl font-bold text-amber-400 sm:text-4xl md:text-5xl">
                {stat.value}
              </p>
              <p className="text-xs text-white/40 sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid gap-4 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <p className="mb-5 text-sm leading-relaxed text-white/50">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/30">{t.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
