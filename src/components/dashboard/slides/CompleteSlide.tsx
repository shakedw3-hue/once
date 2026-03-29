"use client";

import { useEffect, useState } from "react";

interface CompleteSlideProps {
  data: Record<string, any>;
  pillarColor: string;
  actionStepsDone: number;
  actionStepsTotal: number;
  hasReflection: boolean;
  onNext: () => void;
  isLastLesson: boolean;
  isActive: boolean;
  nextLessonTitle?: string;
}

// Generate confetti particles once
const CONFETTI = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 0.8,
  duration: 1.5 + Math.random() * 1,
  color: ["#F59E0B", "#A78BFA", "#34D399", "#60A5FA", "#F472B6", "#FB923C"][
    Math.floor(Math.random() * 6)
  ],
  rotation: Math.random() * 360,
  size: 6 + Math.random() * 6,
}));

export default function CompleteSlide({
  pillarColor,
  actionStepsDone,
  actionStepsTotal,
  hasReflection,
  onNext,
  isLastLesson,
  isActive,
  nextLessonTitle,
}: CompleteSlideProps) {
  const [phase, setPhase] = useState(0);
  // phase 0: nothing, 1: title, 2: xp, 3: stats, 4: cta

  useEffect(() => {
    if (isActive) {
      const t1 = setTimeout(() => setPhase(1), 1000);
      const t2 = setTimeout(() => setPhase(2), 1300);
      const t3 = setTimeout(() => setPhase(3), 1600);
      const t4 = setTimeout(() => setPhase(4), 1900);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else {
      setPhase(0);
    }
  }, [isActive]);

  const stepsAllDone = actionStepsDone === actionStepsTotal && actionStepsTotal > 0;

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: `linear-gradient(180deg, ${pillarColor}14 0%, #FFFFFF 100%)`,
      }}
    >
      {/* Confetti */}
      {isActive &&
        CONFETTI.map((c) => (
          <div
            key={c.id}
            className="pointer-events-none absolute rounded-sm"
            style={{
              left: `${c.left}%`,
              top: -20,
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              transform: `rotate(${c.rotation}deg)`,
              animation: isActive
                ? `confettiFall ${c.duration}s ${c.delay}s ease-in forwards`
                : "none",
              opacity: 0,
            }}
          />
        ))}

      {/* Animated checkmark */}
      <svg width="80" height="80" viewBox="0 0 80 80" className="mb-6">
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          strokeWidth="4"
          style={{
            stroke: pillarColor,
            strokeDasharray: 226,
            strokeDashoffset: isActive ? 0 : 226,
            transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        <polyline
          points="26,42 36,52 56,30"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            stroke: pillarColor,
            strokeDasharray: 60,
            strokeDashoffset: isActive ? 0 : 60,
            transition:
              "stroke-dashoffset 0.6s 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </svg>

      {/* Title */}
      <h2
        className="mb-3 text-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 28,
          fontWeight: 700,
          color: "#1F2937",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        Lesson Complete
      </h2>

      {/* XP with scale pop */}
      <p
        className="mb-6 font-bold"
        style={{
          color: pillarColor,
          fontSize: 32,
          opacity: phase >= 2 ? 1 : 0,
          transform:
            phase >= 2 ? "scale(1)" : "scale(0)",
          animation: phase >= 2 ? "xpPop 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        +35 XP
      </p>

      {/* Stats row */}
      <div
        className="mb-6 flex items-center gap-4 text-sm"
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span className="flex items-center gap-1.5 text-gray-500">
          Steps: {actionStepsDone}/{actionStepsTotal}
          {stepsAllDone && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10B981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
        <span className="text-gray-300">|</span>
        <span className="flex items-center gap-1.5 text-gray-500">
          Reflection:
          {hasReflection ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10B981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <span className="text-gray-400">&mdash;</span>
          )}
        </span>
      </div>

      {/* Divider */}
      <div
        className="mb-6 h-px w-16"
        style={{
          backgroundColor: `${pillarColor}30`,
          opacity: phase >= 3 ? 1 : 0,
          transition: "opacity 0.3s 0.1s ease",
        }}
      />

      {/* Next section + CTA */}
      <div
        className="flex flex-col items-center"
        style={{
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {isLastLesson ? (
          <>
            <p
              className="mb-4 text-center text-sm font-semibold"
              style={{ color: pillarColor }}
            >
              Module complete!
            </p>
            <button
              onClick={onNext}
              className="rounded-xl px-8 py-3.5 text-sm font-semibold text-white transition-transform active:scale-95"
              style={{ backgroundColor: pillarColor }}
            >
              Back to Dashboard
            </button>
          </>
        ) : (
          <>
            {nextLessonTitle && (
              <div className="mb-4 text-center">
                <p className="mb-1 text-xs text-gray-400">Up next:</p>
                <p className="text-sm font-bold text-gray-700">
                  {nextLessonTitle}
                </p>
              </div>
            )}
            <button
              onClick={onNext}
              className="rounded-xl px-10 py-3.5 text-sm font-semibold text-white transition-transform active:scale-95"
              style={{
                backgroundColor: pillarColor,
                boxShadow: `0 4px 14px ${pillarColor}40`,
              }}
            >
              Continue &rarr;
            </button>
          </>
        )}
      </div>

      {/* Once. signature */}
      <p
        className="absolute bottom-6 text-xs text-gray-300"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Once<span style={{ color: "#4F46E5" }}>.</span>
      </p>

      <style jsx>{`
        @keyframes confettiFall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(calc(100dvh + 20px)) rotate(720deg);
          }
        }
        @keyframes xpPop {
          0% {
            transform: scale(0);
          }
          60% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
