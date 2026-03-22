"use client";

import { motion } from "framer-motion";

const institutions = [
  {
    name: "HARVARD",
    font: "Georgia, 'Times New Roman', serif",
    weight: 700,
    spacing: "0.02em",
    size: "0.8rem",
  },
  {
    name: "WHO",
    font: "'Arial Black', Arial, sans-serif",
    weight: 900,
    spacing: "0.12em",
    size: "0.75rem",
  },
  {
    name: "McKinsey",
    font: "Georgia, 'Times New Roman', serif",
    weight: 400,
    spacing: "0.01em",
    size: "0.85rem",
  },
  {
    name: "MIT",
    font: "'Arial Black', Arial, sans-serif",
    weight: 900,
    spacing: "0.1em",
    size: "0.85rem",
  },
  {
    name: "Forbes",
    font: "Georgia, 'Times New Roman', serif",
    weight: 700,
    spacing: "-0.01em",
    size: "0.9rem",
    italic: true,
  },
];

export default function CredibilityStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="mb-4 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium">
        Research sources include
      </p>
      <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
        {institutions.map((inst, i) => (
          <motion.div
            key={inst.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            <span
              className="select-none text-foreground/25 transition-colors hover:text-foreground/40"
              style={{
                fontFamily: inst.font,
                fontWeight: inst.weight,
                letterSpacing: inst.spacing,
                fontSize: inst.size,
                fontStyle: inst.italic ? "italic" : "normal",
                lineHeight: 1,
              }}
            >
              {inst.name}
            </span>
            {i < institutions.length - 1 && (
              <span className="hidden sm:block h-4 w-px bg-border" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
