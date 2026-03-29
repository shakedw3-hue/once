"use client";

interface QuoteSlideProps {
  data: { text: string; author: string; role: string };
  pillarColor: string;
  isActive?: boolean;
}

export default function QuoteSlide({
  data,
  pillarColor,
  isActive = false,
}: QuoteSlideProps) {
  const initials = data.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-8 overflow-hidden">
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

      {/* Large decorative quotation mark — top left */}
      <svg
        className="absolute pointer-events-none"
        style={{ top: 80, left: 24, opacity: 0.08 }}
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill={pillarColor}
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Quote text */}
      <p
        className="relative z-10 max-w-lg text-center leading-relaxed"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(20px, 4vw, 24px)",
          fontWeight: 400,
          color: "#ffffff",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
        }}
      >
        &ldquo;{data.text}&rdquo;
      </p>

      {/* Gradient separator line */}
      <div
        className="relative z-10 mt-8 mb-6"
        style={{
          width: 120,
          height: 1,
          background: `linear-gradient(to right, ${pillarColor}, transparent)`,
          opacity: isActive ? 0.6 : 0,
          transition: "opacity 0.5s ease 0.4s",
        }}
      />

      {/* Author section */}
      <div
        className="relative z-10 flex items-center gap-3"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease 0.55s, transform 0.5s ease 0.55s",
        }}
      >
        {/* Avatar circle */}
        <div
          className="flex items-center justify-center rounded-full text-sm font-bold"
          style={{
            width: 48,
            height: 48,
            backgroundColor: pillarColor,
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {initials}
        </div>

        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {data.author}
          </p>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {data.role}
          </p>
        </div>
      </div>
    </div>
  );
}
