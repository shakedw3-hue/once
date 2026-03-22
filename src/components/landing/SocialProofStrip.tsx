"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "100+", label: "Books, studies & insights from the world's smartest minds — summarized into lessons" },
  { number: "275+", label: "Lessons built for you. Only you." },
  { number: "5–10x", label: "Return on investment by the time you finish" },
  { number: "10 min", label: "A day. That's all it takes." },
];

export default function SocialProofStrip() {
  return (
    <div
      className="rounded-2xl border p-6 sm:p-8"
      style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.03) 0%, rgba(99,102,241,0.06) 100%)" }}
    >
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center"
          >
            <p
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: "#4F46E5" }}
            >
              {stat.number}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
