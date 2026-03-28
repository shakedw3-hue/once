"use client";

import { useState, useEffect } from "react";

const BOOKMARK_KEY = "once_saved_insights";

interface InsightSlideProps {
  data: { text: string };
  pillarColor: string;
}

export default function InsightSlide({ data, pillarColor }: InsightSlideProps) {
  const [saved, setSaved] = useState(false);

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
      }
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex h-full flex-col justify-center px-6">
      <div className="flex items-center gap-2 mb-4">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: pillarColor }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: pillarColor }}
        >
          Key Insight
        </p>
      </div>

      <div className="flex items-start gap-0 overflow-hidden rounded-xl border">
        <div
          className="w-1 shrink-0 self-stretch"
          style={{ backgroundColor: pillarColor }}
        />
        <div className="flex-1 p-5">
          <p className="text-lg font-semibold leading-relaxed text-gray-800">
            {data.text}
          </p>
        </div>
      </div>

      <button
        onClick={toggle}
        className="mt-5 flex items-center gap-2 self-start rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-gray-50"
        style={{ color: saved ? pillarColor : "#9ca3af" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        {saved ? "Saved" : "Save this insight"}
      </button>
    </div>
  );
}
