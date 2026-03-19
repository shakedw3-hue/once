"use client";

import { motion } from "framer-motion";

const pillars = [
  { label: "Money", color: "#F59E0B", x: 0, y: -90, delay: 0 },
  { label: "Mind", color: "#A78BFA", x: 90, y: 0, delay: 0.5 },
  { label: "Body", color: "#34D399", x: 0, y: 90, delay: 1.0 },
  { label: "Spirit", color: "#60A5FA", x: -90, y: 0, delay: 1.5 },
];

export default function PillarOrbs() {
  return (
    <div className="relative h-[320px] w-[320px]">
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-primary/5 blur-[40px]" />
      </div>

      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-primary/40" />
      </div>

      {/* Connecting lines */}
      <svg className="absolute inset-0" viewBox="0 0 320 320">
        {pillars.map((p) => (
          <motion.line
            key={p.label}
            x1="160"
            y1="160"
            x2={160 + p.x}
            y2={160 + p.y}
            stroke="white"
            strokeOpacity={0.06}
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: p.delay + 0.3 }}
          />
        ))}
      </svg>

      {/* Orbs */}
      {pillars.map((p) => (
        <motion.div
          key={p.label}
          className="absolute"
          style={{
            left: `calc(50% + ${p.x}px - 28px)`,
            top: `calc(50% + ${p.y}px - 28px)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: p.delay },
            scale: { duration: 0.5, delay: p.delay, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 3 + p.delay, repeat: Infinity, ease: "easeInOut", delay: p.delay + 1 },
          }}
        >
          <div className="flex flex-col items-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                backgroundColor: `${p.color}18`,
                boxShadow: `0 0 30px ${p.color}20, inset 0 0 20px ${p.color}10`,
                border: `1px solid ${p.color}30`,
              }}
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor: p.color,
                  boxShadow: `0 0 12px ${p.color}60`,
                }}
              />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: p.delay + 0.5 }}
              className="mt-2 text-[11px] font-medium text-muted-foreground"
            >
              {p.label}
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
