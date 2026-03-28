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
}: CompleteSlideProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setShowContent(true), 600);
      return () => clearTimeout(t);
    } else {
      setShowContent(false);
    }
  }, [isActive]);

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Confetti */}
      {isActive &&
        CONFETTI.map((c) => (
          <div
            key={c.id}
            className="absolute rounded-sm pointer-events-none"
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
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className="mb-6"
      >
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
            transition: "stroke-dashoffset 0.6s 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
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
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.4s ease",
        }}
      >
        Lesson Complete!
      </h2>

      {/* XP */}
      <p
        className="mb-6 text-lg font-bold"
        style={{
          color: pillarColor,
          opacity: showContent ? 1 : 0,
          transform: showContent ? "scale(1)" : "scale(0.8)",
          transition: "all 0.3s 0.15s ease",
        }}
      >
        +35 XP
      </p>

      {/* Stats */}
      <div
        className="mb-8 flex flex-col items-center gap-2 text-sm text-gray-500"
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.3s 0.3s ease",
        }}
      >
        <span>
          Action steps: {actionStepsDone}/{actionStepsTotal}{" "}
          {actionStepsDone === actionStepsTotal && actionStepsTotal > 0
            ? "\u2713"
            : ""}
        </span>
        <span>Reflection: {hasReflection ? "\u2713" : "\u2014"}</span>
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        className="rounded-xl px-8 py-3 text-sm font-semibold text-white transition-transform active:scale-95"
        style={{
          backgroundColor: pillarColor,
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.3s 0.4s ease",
        }}
      >
        {isLastLesson ? "Back to Module" : "Next Lesson \u2192"}
      </button>

      {/* Signature */}
      <p
        className="absolute bottom-6 text-sm text-gray-300"
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
      `}</style>
    </div>
  );
}
