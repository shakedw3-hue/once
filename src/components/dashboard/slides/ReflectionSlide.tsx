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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialText !== undefined) setText(initialText);
  }, [initialText]);

  function handleChange(value: string) {
    setText(value);
    onReflectionChange?.(value);
    // Auto-expand
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }

  return (
    <div className="flex h-full flex-col justify-center px-6">
      <div className="flex items-center gap-2 mb-5">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: pillarColor }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Reflect
        </p>
      </div>

      <div className="mb-5 rounded-xl bg-gray-50 p-4">
        <p className="text-sm italic leading-relaxed text-gray-600">
          &ldquo;{data.prompt}&rdquo;
        </p>
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={3}
          className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-700 placeholder-gray-400 outline-none transition-colors focus:border-gray-300"
          style={{ minHeight: 96 }}
        />
        <span className="absolute bottom-3 right-3 text-[10px] text-gray-300">
          {text.length}
        </span>
      </div>
    </div>
  );
}
