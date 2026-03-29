"use client";

import { useState, useEffect } from "react";

interface ActionSlideProps {
  data: { steps: string[] };
  pillarColor: string;
  onCheckedChange?: (checked: Record<number, boolean>) => void;
  initialChecked?: Record<number, boolean>;
}

export default function ActionSlide({
  data,
  pillarColor,
  onCheckedChange,
  initialChecked,
}: ActionSlideProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>(initialChecked || {});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (initialChecked) setChecked(initialChecked);
  }, [initialChecked]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  function toggle(idx: number) {
    const next = { ...checked, [idx]: !checked[idx] };
    setChecked(next);
    onCheckedChange?.(next);
  }

  const doneCount = Object.values(checked).filter(Boolean).length;
  const totalSteps = data.steps.length;
  const allDone = doneCount === totalSteps && totalSteps > 0;
  const progressPct = totalSteps > 0 ? (doneCount / totalSteps) * 100 : 0;

  return (
    <div
      className="flex h-full flex-col justify-center px-6 py-8 transition-colors duration-700"
      style={{
        background: `linear-gradient(180deg, ${pillarColor}08 0%, ${pillarColor}03 100%)`,
      }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-2.5">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={pillarColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#1F2937",
          }}
        >
          Do This Today
        </h2>
      </div>

      {/* Step Cards */}
      <div className="space-y-3">
        {data.steps.map((step: string, idx: number) => (
          <label
            key={idx}
            className="flex cursor-pointer items-start gap-3.5 rounded-xl p-4 transition-all duration-300"
            style={{
              backgroundColor: allDone ? "#10B98110" : "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
              borderLeft: `3px solid ${pillarColor}`,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: `all 0.4s ${idx * 0.1}s cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
          >
            {/* Checkbox */}
            <div className="mt-0.5 shrink-0">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: checked[idx] ? pillarColor : "transparent",
                  border: checked[idx] ? `2px solid ${pillarColor}` : `2px solid ${pillarColor}60`,
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: checked[idx] ? "scale(1)" : "scale(1)",
                  animation: checked[idx] ? "checkPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
                }}
              >
                {checked[idx] && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={checked[idx] || false}
                onChange={() => toggle(idx)}
                className="sr-only"
              />
            </div>

            {/* Step content */}
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ backgroundColor: pillarColor }}
                >
                  {idx + 1}
                </span>
                <span
                  className="text-sm leading-relaxed transition-all duration-200"
                  style={{
                    color: checked[idx] ? "#9CA3AF" : "#374151",
                    textDecoration: checked[idx] ? "line-through" : "none",
                  }}
                >
                  {step}
                </span>
              </div>
              <span className="ml-7 text-[11px] text-gray-400">~5 min</span>
            </div>
          </label>
        ))}
      </div>

      {/* Progress Section */}
      <div className="mt-6">
        {/* Progress bar */}
        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: `${pillarColor}15` }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPct}%`,
              backgroundColor: allDone ? "#10B981" : pillarColor,
            }}
          />
        </div>

        {/* Progress text */}
        <div className="mt-2.5 flex items-center gap-1.5">
          {allDone ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: "#10B981" }}>
                All steps complete!
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-400">
              {doneCount} of {totalSteps} done
            </span>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes checkPop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
