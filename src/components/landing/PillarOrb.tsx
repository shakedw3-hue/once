"use client";

import { motion } from "framer-motion";

const pillars = [
  { label: "Money", angle: -90, score: 78, color: "#F59E0B" },
  { label: "Mind", angle: 0, score: 54, color: "#A78BFA" },
  { label: "Body", angle: 90, score: 41, color: "#34D399" },
  { label: "Spirit", angle: 180, score: 63, color: "#60A5FA" },
];

export default function PillarOrb() {
  const size = 280;
  const center = size / 2;
  const maxRadius = 100;

  function polar(angleDeg: number, radius: number) {
    const r = (angleDeg * Math.PI) / 180;
    return { x: center + radius * Math.cos(r), y: center + radius * Math.sin(r) };
  }

  const points = pillars.map((p) => polar(p.angle, (p.score / 100) * maxRadius));
  const pathD = points.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ") + " Z";

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-amber-500/[0.08] blur-[60px] animate-[pulse-glow_4s_ease-in-out_infinite]" />

      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-10 w-full h-auto"
      >
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map((r) => (
          <circle
            key={r}
            cx={center}
            cy={center}
            r={maxRadius * r}
            fill="none"
            stroke="white"
            strokeOpacity={0.04}
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {pillars.map((p) => {
          const end = polar(p.angle, maxRadius);
          return (
            <line
              key={p.label}
              x1={center} y1={center} x2={end.x} y2={end.y}
              stroke="white" strokeOpacity={0.06} strokeWidth={1}
            />
          );
        })}

        {/* Score shape — animated */}
        <motion.path
          d={pathD}
          fill="url(#orbGrad)"
          stroke="#F59E0B"
          strokeWidth={2}
          strokeOpacity={0.6}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Dots on vertices */}
        {points.map((pt, i) => (
          <motion.circle
            key={pillars[i].label}
            cx={pt.x} cy={pt.y} r={4.5}
            fill={pillars[i].color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1 + i * 0.15 }}
          />
        ))}

        {/* Labels */}
        {pillars.map((p) => {
          const labelPt = polar(p.angle, maxRadius + 26);
          return (
            <motion.g
              key={p.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + pillars.indexOf(p) * 0.1 }}
            >
              <text
                x={labelPt.x} y={labelPt.y - 7}
                textAnchor="middle"
                className="fill-white/70 text-[10px] font-semibold"
              >
                {p.label}
              </text>
              <text
                x={labelPt.x} y={labelPt.y + 8}
                textAnchor="middle"
                className="text-[12px] font-bold"
                fill={p.color}
              >
                {p.score}
              </text>
            </motion.g>
          );
        })}

        {/* Gradient definition */}
        <defs>
          <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.03" />
          </radialGradient>
        </defs>
      </svg>

      {/* Center label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-[9px] font-medium uppercase tracking-widest text-white/30">
            Your Score
          </p>
          <p className="text-xl font-bold text-amber-400">59</p>
        </div>
      </motion.div>
    </div>
  );
}
