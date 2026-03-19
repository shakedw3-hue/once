"use client";

import { motion } from "framer-motion";
import { normalizeScores } from "@/lib/questionnaire";
import { PILLARS } from "@/lib/constants";
import type { PillarScores } from "@/types/database";

interface PillarRadarProps {
  scores: PillarScores;
}

export default function PillarRadar({ scores }: PillarRadarProps) {
  const normalized = normalizeScores(scores);
  const size = 220;
  const center = size / 2;
  const maxRadius = size / 2 - 30;

  // Positions: top, right, bottom, left
  const pillars = [
    { key: "mind" as const, angle: -90, label: "Mind" },
    { key: "money" as const, angle: 0, label: "Money" },
    { key: "body" as const, angle: 90, label: "Body" },
    { key: "spirit" as const, angle: 180, label: "Spirit" },
  ];

  function polarToCartesian(angleDeg: number, radius: number) {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad),
    };
  }

  const points = pillars.map((p) => {
    const radius = (normalized[p.key] / 100) * maxRadius;
    return polarToCartesian(p.angle, radius);
  });

  const pathD = points
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`)
    .join(" ") + " Z";

  // Grid rings at 25%, 50%, 75%, 100%
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto"
      >
        {/* Grid rings */}
        {rings.map((r) => (
          <polygon
            key={r}
            points={pillars
              .map((p) => {
                const pt = polarToCartesian(p.angle, maxRadius * r);
                return `${pt.x},${pt.y}`;
              })
              .join(" ")}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {pillars.map((p) => {
          const end = polarToCartesian(p.angle, maxRadius);
          return (
            <line
              key={p.key}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="currentColor"
              strokeOpacity={0.08}
              strokeWidth={1}
            />
          );
        })}

        {/* Score shape */}
        {/* Gradient definition */}
        <defs>
          <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
          </radialGradient>
        </defs>

        <motion.path
          d={pathD}
          fill="url(#orbGrad)"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Score dots */}
        {points.map((pt, i) => (
          <motion.circle
            key={pillars[i].key}
            cx={pt.x}
            cy={pt.y}
            r={4}
            fill="hsl(var(--primary))"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {/* Labels */}
        {pillars.map((p) => {
          const labelOffset = maxRadius + 20;
          const pt = polarToCartesian(p.angle, labelOffset);
          return (
            <text
              key={p.key}
              x={pt.x}
              y={pt.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-muted-foreground text-[11px] font-medium"
            >
              {p.label}
            </text>
          );
        })}
      </svg>

      {/* Score values */}
      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        {pillars.map((p) => {
          const pillarInfo = PILLARS[p.key];
          return (
            <div key={p.key}>
              <span className="text-lg font-bold">{normalized[p.key]}</span>
              <div
                className={`mx-auto mt-1 h-1 w-6 rounded-full bg-gradient-to-r ${pillarInfo.color}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
