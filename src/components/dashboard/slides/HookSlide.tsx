"use client";

interface HookSlideProps {
  data: { text: string };
  pillarColor: string;
  isActive?: boolean;
  moduleTitle?: string;
  lessonNumber?: number;
}

export default function HookSlide({
  data,
  pillarColor,
  isActive = false,
  moduleTitle,
  lessonNumber,
}: HookSlideProps) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6 overflow-hidden">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Decorative blob — top right */}
      <svg
        className="absolute pointer-events-none"
        style={{ top: -40, right: -40, opacity: 0.08 }}
        width="280"
        height="280"
        viewBox="0 0 280 280"
        fill="none"
      >
        <circle cx="140" cy="140" r="130" fill={pillarColor} />
        <circle cx="180" cy="100" r="80" fill={pillarColor} />
      </svg>

      {/* Module + lesson label */}
      {(moduleTitle || lessonNumber) && (
        <p
          className="absolute z-10"
          style={{
            top: 72,
            left: 24,
            right: 24,
            textAlign: "center",
            letterSpacing: "0.2em",
            fontSize: 11,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "Inter, sans-serif",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          {moduleTitle}
          {moduleTitle && lessonNumber ? " — " : ""}
          {lessonNumber ? `Lesson ${lessonNumber}` : ""}
        </p>
      )}

      {/* Main hook text */}
      <p
        className="relative z-10 text-center leading-snug"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 6vw, 40px)",
          fontWeight: 700,
          maxWidth: 560,
          color: "#ffffff",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
        }}
      >
        {data.text}
      </p>

      {/* Pulsing chevron */}
      <div
        className="absolute z-10"
        style={{
          bottom: 56,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: isActive ? 0.5 : 0,
          transition: "opacity 0.5s ease 0.8s",
          animation: isActive ? "hookChevronPulse 2s ease-in-out infinite" : "none",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <style>{`
        @keyframes hookChevronPulse {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.4; }
          50% { transform: translateX(-50%) translateY(6px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
