"use client";

import { useState, useEffect } from "react";

const BOOKMARK_KEY = "once_saved_insights";

interface InsightSlideProps {
  data: { text: string };
  pillarColor: string;
  isActive?: boolean;
}

export default function InsightSlide({ data, pillarColor, isActive = true }: InsightSlideProps) {
  const [saved, setSaved] = useState(false);
  const [showSavedPop, setShowSavedPop] = useState(false);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
      if (list.includes(data.text)) setSaved(true);
    } catch {
      /* ignore */
    }
  }, [data.text]);

  function toggle() {
    try {
      const list: string[] = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
      const idx = list.indexOf(data.text);
      if (idx >= 0) {
        list.splice(idx, 1);
        setSaved(false);
      } else {
        list.push(data.text);
        setSaved(true);
        setShowSavedPop(true);
        setTimeout(() => setShowSavedPop(false), 800);
      }
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className="flex h-full flex-col items-center justify-center px-6 text-center relative"
      style={{
        background: `linear-gradient(180deg, ${pillarColor}1F 0%, #ffffff 70%)`,
      }}
    >
      {/* Lightbulb icon — appears first */}
      <div
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: pillarColor }}
        >
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
        </svg>
      </div>

      {/* Insight text — fades in after icon */}
      <div
        className="mt-6 max-w-md"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
        }}
      >
        <p
          style={{
            fontSize: 20,
            fontFamily: "Playfair Display, serif",
            fontWeight: 700,
            color: "#1a1a2e",
            lineHeight: 1.5,
          }}
        >
          {data.text}
        </p>
      </div>

      {/* Bookmark pill */}
      <div
        className="mt-8"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.5s ease 0.4s",
        }}
      >
        <button
          onClick={toggle}
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all"
          style={{
            backgroundColor: saved ? pillarColor : "white",
            color: saved ? "white" : "#6b7280",
            boxShadow: saved
              ? `0 2px 8px ${pillarColor}40`
              : "0 1px 4px rgba(0,0,0,0.08)",
            transform: showSavedPop ? "scale(1.08)" : "scale(1)",
            transition: "all 0.25s ease",
          }}
        >
          {/* Heart icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {showSavedPop ? "Saved!" : saved ? "Saved" : "Save this insight"}
        </button>
      </div>
    </div>
  );
}
