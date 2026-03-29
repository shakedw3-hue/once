"use client";

import { useState, useRef, useEffect } from "react";

interface ReflectionSlideProps {
  data: { prompt: string };
  pillarColor: string;
  onReflectionChange?: (text: string) => void;
  initialText?: string;
}

export default function ReflectionSlide({
  data,
  pillarColor,
  onReflectionChange,
  initialText,
}: ReflectionSlideProps) {
  const [text, setText] = useState(initialText || "");
  const [mounted, setMounted] = useState(false);
  const [textareaVisible, setTextareaVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialText !== undefined) setText(initialText);
  }, [initialText]);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 50);
    const t2 = setTimeout(() => setTextareaVisible(true), 350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  function handleChange(value: string) {
    setText(value);
    onReflectionChange?.(value);
    // Auto-expand
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const reachedGoal = wordCount >= 50;

  return (
    <div
      className="flex h-full flex-col justify-center px-6 py-8"
      style={{
        background: "linear-gradient(180deg, #FDFBF7 0%, #F8F5EE 100%)",
      }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-2.5">
        {/* Feather pen icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={pillarColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.6 }}
        >
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#1F2937",
          }}
        >
          Reflect
        </h2>
      </div>

      {/* Prompt card */}
      <div
        className="mb-6 rounded-2xl p-5"
        style={{
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          borderLeft: `2px solid ${pillarColor}`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <p
          className="leading-relaxed"
          style={{
            fontStyle: "italic",
            fontSize: 16,
            color: "#4B5563",
          }}
        >
          &ldquo;{data.prompt}&rdquo;
        </p>
      </div>

      {/* Textarea */}
      <div
        className="relative"
        style={{
          opacity: textareaVisible ? 1 : 0,
          transform: textareaVisible ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={5}
          className="w-full resize-none rounded-xl p-4 leading-relaxed text-gray-700 placeholder-gray-400 outline-none"
          style={{
            minHeight: 150,
            fontSize: 16,
            backgroundColor: "#FEFDFB",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)",
            border: "none",
          }}
        />

        {/* Word count section */}
        <div className="mt-2.5 flex items-center justify-between px-1">
          <span className="text-[11px] text-gray-400">
            Aim for 50+ words
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            {wordCount} {wordCount === 1 ? "word" : "words"}
            {reachedGoal && (
              <svg
                width="12"
                height="12"
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
        </div>
      </div>
    </div>
  );
}
