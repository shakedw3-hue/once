"use client";

import { useEffect, useRef, useState } from "react";

interface StatSlideProps {
  data: { text: string; number: string | null; suffix: string };
  pillarColor: string;
  isActive: boolean;
}

export default function StatSlide({ data, pillarColor, isActive }: StatSlideProps) {
  const [displayNum, setDisplayNum] = useState(0);
  const rafRef = useRef<number>(0);
  const targetNum = data.number ? parseFloat(data.number.replace(/,/g, "")) : 0;
  const hasNumber = data.number && !isNaN(targetNum);

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

  const circumference = 2 * Math.PI * 52;
  const strokeOffset = isActive ? circumference * 0.2 : circumference;

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      {hasNumber ? (
        <div className="relative flex items-center justify-center">
          {/* SVG ring */}
          <svg width="140" height="140" className="absolute">
            <circle
              cx="70"
              cy="70"
              r="52"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
            />
            <circle
              cx="70"
              cy="70"
              r="52"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                stroke: pillarColor,
                strokeDasharray: circumference,
                strokeDashoffset: strokeOffset,
                transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: "rotate(-90deg)",
                transformOrigin: "center",
              }}
            />
          </svg>
          <span
            className="text-center font-bold"
            style={{ fontSize: 48, color: pillarColor }}
          >
            {displayNum.toLocaleString()}
            {data.suffix}
          </span>
        </div>
      ) : null}

      <p className="mt-6 max-w-md text-center text-base text-gray-600 leading-relaxed">
        {data.text}
      </p>

      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Did You Know
      </p>
    </div>
  );
}
