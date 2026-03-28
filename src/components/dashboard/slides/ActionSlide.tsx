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

  useEffect(() => {
    if (initialChecked) setChecked(initialChecked);
  }, [initialChecked]);

  function toggle(idx: number) {
    const next = { ...checked, [idx]: !checked[idx] };
    setChecked(next);
    onCheckedChange?.(next);
  }

  const doneCount = Object.values(checked).filter(Boolean).length;
  const allDone = doneCount === data.steps.length;

  return (
    <div className="flex h-full flex-col justify-center px-6">
      <p
        className="mb-5 text-xs font-semibold uppercase tracking-wider"
        style={{ color: pillarColor }}
      >
        Do This Today
      </p>

      <div
        className="space-y-4 rounded-xl p-5 transition-colors duration-500"
        style={{
          backgroundColor: allDone ? "#f0fdf4" : "#fafafa",
        }}
      >
        {data.steps.map((step: string, idx: number) => (
          <label
            key={idx}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <div className="mt-0.5 shrink-0">
              <div
                className="flex h-6 w-6 items-center justify-center rounded border-2"
                style={{
                  backgroundColor: checked[idx] ? pillarColor : "transparent",
                  borderColor: checked[idx] ? pillarColor : `${pillarColor}50`,
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: checked[idx] ? "scale(1.15)" : "scale(1)",
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
            <span
              className="text-sm leading-relaxed transition-all duration-200"
              style={{
                color: checked[idx] ? "#9ca3af" : "#374151",
                textDecoration: checked[idx] ? "line-through" : "none",
              }}
            >
              {step}
            </span>
          </label>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-400">
        {allDone ? (
          <span style={{ color: "#10B981", fontWeight: 600 }}>All done!</span>
        ) : (
          `${doneCount} of ${data.steps.length} steps done`
        )}
      </p>
    </div>
  );
}
