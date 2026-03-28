"use client";

interface HookSlideProps {
  data: { text: string };
  pillarColor: string;
}

export default function HookSlide({ data, pillarColor }: HookSlideProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      {/* Top gradient strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(to right, ${pillarColor}, transparent)` }}
      />

      {/* Radial bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${pillarColor}0D 0%, transparent 70%)`,
        }}
      />

      <p
        className="relative text-center leading-relaxed"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(24px, 5vw, 32px)",
          fontWeight: 600,
          maxWidth: 560,
        }}
      >
        {data.text}
      </p>

      <p className="absolute bottom-8 text-sm text-gray-400">
        Swipe to begin &rarr;
      </p>
    </div>
  );
}
