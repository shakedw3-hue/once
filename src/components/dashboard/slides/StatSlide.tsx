"use client";

import { useEffect, useRef, useState } from "react";

interface StatSlideProps {
  data: { text: string; number: string | null; suffix: string };
  pillarColor: string;
  isActive: boolean;
}

export default function StatSlide({
  data,
  pillarColor,
  isActive,
}: StatSlideProps) {
  const [displayNum, setDisplayNum] = useState(0);
  const rafRef = useRef<number>(0);
  const targetNum = data.number
    ? parseFloat(data.number.replace(/,/g, ""))
    : 0;
  const hasNumber = data.number && !isNaN(targetNum);
  const isPercent = data.suffix === "%";
  const barWidth = isPercent ? Math.min(targetNum, 100) : 0;

  useEffect(() => {
    if (!isActive || !hasNumber) return;
    setDisplayNum(0);
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(Math.round(eased * targetNum));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, hasNumber, targetNum]);

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6 overflow-hidden">
      {/* Subtle grid dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23000'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "24px 24px",
        }}
      />

      {hasNumber ? (
        <div className="relative z-10 flex flex-col items-center">
          {/* Large number */}
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: pillarColor,
              fontFamily: "Inter, sans-serif",
              lineHeight: 1,
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {displayNum.toLocaleString()}
            {data.suffix}
          </span>

          {/* Percentage bar */}
          {isPercent && (
            <div
              className="relative mt-5"
              style={{
                width: "100%",
                maxWidth: 280,
                height: 6,
                borderRadius: 3,
                backgroundColor: `${pillarColor}15`,
                overflow: "hidden",
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.4s ease 0.3s",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: pillarColor,
                  width: isActive ? `${barWidth}%` : "0%",
                  transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
                }}
              />
            </div>
          )}

          {/* Context line */}
          <p
            className="mt-5 max-w-md text-center leading-relaxed"
            style={{
              fontSize: 16,
              color: "#4b5563",
              fontFamily: "Inter, sans-serif",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s",
            }}
          >
            {data.text}
          </p>

          {/* Source attribution */}
          <p
            className="mt-3"
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(156,163,175,0.6)",
              fontFamily: "Inter, sans-serif",
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.4s ease 0.7s",
            }}
          >
            Source: Research Data
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center">
          <p
            className="max-w-md text-center leading-relaxed"
            style={{
              fontSize: 16,
              color: "#4b5563",
              fontFamily: "Inter, sans-serif",
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            {data.text}
          </p>
        </div>
      )}
    </div>
  );
}
