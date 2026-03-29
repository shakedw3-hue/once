"use client";

import { useMemo } from "react";

interface ContentSlideProps {
  data: { text: string; part: number | null; totalParts: number | null };
  pillarColor: string;
  isActive: boolean;
}

export default function ContentSlide({ data, pillarColor, isActive }: ContentSlideProps) {
  const showPartHeader = data.part && data.totalParts && data.totalParts > 1;

  // Split text into first letter and rest, and find pull-quote sentence
  const { firstLetter, restOfFirstSentence, remainingText, pullQuoteIndex, sentences } =
    useMemo(() => {
      const text = data.text || "";
      const fl = text.charAt(0);
      const rest = text.slice(1);

      // Split into sentences for pull-quote detection
      const sentenceList = text.match(/[^.!?]+[.!?]+/g) || [text];
      const keywords = /\b(should|must|key|important)\b/i;
      const pqIdx = sentenceList.findIndex((s) => keywords.test(s));

      return {
        firstLetter: fl,
        restOfFirstSentence: rest,
        remainingText: "",
        pullQuoteIndex: pqIdx,
        sentences: sentenceList,
      };
    }, [data.text]);

  // Build content segments: before pull-quote, pull-quote, after pull-quote
  const segments = useMemo(() => {
    if (pullQuoteIndex < 0) {
      return { before: data.text, quote: null, after: null };
    }
    const before = sentences.slice(0, pullQuoteIndex).join("");
    const quote = sentences[pullQuoteIndex].trim();
    const after = sentences.slice(pullQuoteIndex + 1).join("");
    return { before, quote, after };
  }, [sentences, pullQuoteIndex, data.text]);

  const textStyle = {
    fontSize: 17,
    lineHeight: 1.8,
    color: "#1a1a2e",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div
      className="flex h-full flex-col justify-center px-6 relative"
      style={{
        background: `linear-gradient(180deg, ${pillarColor}08 0%, transparent 40%)`,
        opacity: isActive ? 1 : 0,
        transform: isActive ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Part header — only if multiple content slides */}
      {showPartHeader && (
        <p className="mb-4 text-[11px] text-gray-400" style={{ letterSpacing: "0.05em" }}>
          Part {data.part} of {data.totalParts}
        </p>
      )}

      {/* Scrollable content */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100dvh - 180px)" }}
      >
        {/* Content with dropcap */}
        {segments.quote ? (
          <>
            {/* Text before pull-quote */}
            <p style={textStyle}>
              {/* Dropcap on the very first letter */}
              {segments.before.length > 0 && (
                <span
                  style={{
                    float: "left",
                    fontSize: 48,
                    lineHeight: 1,
                    fontFamily: "Playfair Display, serif",
                    color: pillarColor,
                    fontWeight: 700,
                    marginRight: 8,
                    marginTop: 4,
                  }}
                >
                  {segments.before.charAt(0)}
                </span>
              )}
              {segments.before.slice(1)}
            </p>

            {/* Pull-quote callout */}
            <div
              className="my-5 rounded-r-lg py-3 pr-4"
              style={{
                borderLeft: `4px solid ${pillarColor}`,
                paddingLeft: 16,
                marginLeft: 4,
              }}
            >
              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.7,
                  color: "#1a1a2e",
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {segments.quote}
              </p>
            </div>

            {/* Text after pull-quote */}
            {segments.after && (
              <p style={textStyle}>{segments.after}</p>
            )}
          </>
        ) : (
          /* No pull-quote found — render with dropcap only */
          <p style={textStyle}>
            <span
              style={{
                float: "left",
                fontSize: 48,
                lineHeight: 1,
                fontFamily: "Playfair Display, serif",
                color: pillarColor,
                fontWeight: 700,
                marginRight: 8,
                marginTop: 4,
              }}
            >
              {firstLetter}
            </span>
            {restOfFirstSentence}
          </p>
        )}
      </div>
    </div>
  );
}
