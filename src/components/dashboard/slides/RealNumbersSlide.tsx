"use client";

import { useMemo } from "react";

interface RealNumbersSlideProps {
  data: { text: string };
  pillarColor: string;
  isActive?: boolean;
}

export default function RealNumbersSlide({ data, pillarColor, isActive = true }: RealNumbersSlideProps) {
  // Try to extract a peso amount from the text for the hero number
  const { heroAmount, contextText } = useMemo(() => {
    const match = data.text.match(/[₱P][\d,]+/);
    if (match) {
      return {
        heroAmount: match[0],
        contextText: data.text,
      };
    }
    return { heroAmount: null, contextText: data.text };
  }, [data.text]);

  return (
    <div
      className="flex h-full flex-col justify-center px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, transparent 60%)",
      }}
    >
      {/* Decorative peso sign */}
      <span
        className="pointer-events-none absolute select-none"
        style={{
          right: -10,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 120,
          fontWeight: 800,
          color: "rgba(16,185,129,0.08)",
          lineHeight: 1,
          fontFamily: "Inter, sans-serif",
        }}
      >
        &#8369;
      </span>

      {/* PRO badge */}
      <div
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: "#10B981" }}
        >
          PRO
        </span>
      </div>

      {/* Main content */}
      <div
        className="mt-4 relative z-10"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
        }}
      >
        {heroAmount ? (
          <>
            <p
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#10B981",
                fontFamily: "Inter, sans-serif",
                lineHeight: 1.2,
              }}
            >
              {heroAmount}
            </p>
            <p
              className="mt-3"
              style={{ fontSize: 15, color: "#1a1a2e", lineHeight: 1.7 }}
            >
              {contextText}
            </p>
          </>
        ) : (
          <p
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#10B981",
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.4,
            }}
          >
            {data.text}
          </p>
        )}
      </div>

      {/* Comparison bar */}
      <div
        className="mt-6 relative z-10"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.5s ease 0.35s",
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-semibold" style={{ color: "#10B981" }}>
            You (with Once.)
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              backgroundColor: "#10B981",
              width: isActive ? "78%" : "0%",
              transition: "width 0.8s ease 0.5s",
            }}
          />
        </div>

        <div className="flex items-center gap-3 mt-3 mb-2">
          <span className="text-xs font-semibold text-gray-400">
            Average
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gray-300"
            style={{
              width: isActive ? "32%" : "0%",
              transition: "width 0.8s ease 0.6s",
            }}
          />
        </div>
      </div>

      {/* Attribution */}
      <p
        className="mt-5 text-[11px] text-gray-400 relative z-10"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.5s ease 0.7s",
        }}
      >
        Philippine market, 2025
      </p>
    </div>
  );
}
