"use client";

import { useState } from "react";

interface QuizSlideProps {
  data: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  pillarColor: string;
  isActive?: boolean;
}

const LETTERS = ["A", "B", "C", "D"];

export default function QuizSlide({ data, pillarColor, isActive = true }: QuizSlideProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showXP, setShowXP] = useState(false);

  const isAnswered = selected !== null;
  const isCorrect = selected === data.correctIndex;

  function handleSelect(index: number) {
    if (isAnswered) return;
    setSelected(index);
    if (index === data.correctIndex) {
      setShowXP(true);
    }
  }

  function getOptionStyle(index: number): React.CSSProperties {
    if (!isAnswered) {
      return {
        backgroundColor: "white",
        borderLeft: `4px solid ${pillarColor}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      };
    }

    if (index === data.correctIndex) {
      return {
        backgroundColor: "rgba(16, 185, 129, 0.10)",
        borderLeft: "4px solid #10B981",
        boxShadow: "0 1px 4px rgba(16, 185, 129, 0.12)",
      };
    }

    if (index === selected && index !== data.correctIndex) {
      return {
        backgroundColor: "rgba(239, 68, 68, 0.10)",
        borderLeft: "4px solid #EF4444",
        boxShadow: "0 1px 4px rgba(239, 68, 68, 0.12)",
        animation: "quizShake 0.3s ease",
      };
    }

    return {
      backgroundColor: "white",
      borderLeft: "4px solid #e5e7eb",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      opacity: 0.5,
    };
  }

  function getBadgeStyle(index: number): React.CSSProperties {
    if (!isAnswered) {
      return {
        backgroundColor: `${pillarColor}18`,
        color: pillarColor,
      };
    }
    if (index === data.correctIndex) {
      return {
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        color: "#059669",
      };
    }
    if (index === selected) {
      return {
        backgroundColor: "rgba(239, 68, 68, 0.15)",
        color: "#DC2626",
      };
    }
    return {
      backgroundColor: "#f3f4f6",
      color: "#9ca3af",
    };
  }

  return (
    <div
      className="flex h-full flex-col items-center justify-center px-5"
      style={{
        background: `linear-gradient(180deg, ${pillarColor}12 0%, #ffffff 50%)`,
      }}
    >
      {/* Quick Check label */}
      <div
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: pillarColor,
            marginBottom: 12,
          }}
        >
          Quick Check
        </p>
      </div>

      {/* Question */}
      <div
        className="max-w-md text-center"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
        }}
      >
        <p
          style={{
            fontSize: 20,
            fontFamily: "Playfair Display, serif",
            fontWeight: 700,
            color: "#1a1a2e",
            lineHeight: 1.4,
            marginBottom: 24,
          }}
        >
          {data.question}
        </p>
      </div>

      {/* Options */}
      <div
        className="w-full max-w-md flex flex-col gap-3"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s",
        }}
      >
        {data.options.map((option, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); handleSelect(i); }}
            disabled={isAnswered}
            className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200"
            style={{
              ...getOptionStyle(i),
              cursor: isAnswered ? "default" : "pointer",
            }}
          >
            {/* Letter badge */}
            <span
              className="flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: 30,
                height: 30,
                ...getBadgeStyle(i),
                transition: "all 0.3s ease",
              }}
            >
              {isAnswered && i === data.correctIndex ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : isAnswered && i === selected && i !== data.correctIndex ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                LETTERS[i]
              )}
            </span>

            {/* Option text */}
            <span
              style={{
                fontSize: 15,
                fontFamily: "Inter, sans-serif",
                color: "#1a1a2e",
                lineHeight: 1.4,
              }}
            >
              {option}
            </span>
          </button>
        ))}
      </div>

      {/* +5 XP pop */}
      {showXP && (
        <div
          className="mt-4"
          style={{
            animation: "quizXPPop 0.5s ease forwards",
          }}
        >
          <span
            className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-bold"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              color: "#059669",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            +5 XP
          </span>
        </div>
      )}

      {/* Explanation */}
      {isAnswered && (
        <div
          className="mt-5 w-full max-w-md"
          style={{
            animation: "quizFadeIn 0.4s ease forwards",
          }}
        >
          <div
            className="rounded-xl px-5 py-4"
            style={{
              backgroundColor: "#f9fafb",
              border: "1px solid #f3f4f6",
            }}
          >
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "#6b7280",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {data.explanation}
            </p>
          </div>
        </div>
      )}

      {/* CSS animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes quizShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes quizXPPop {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes quizFadeIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
