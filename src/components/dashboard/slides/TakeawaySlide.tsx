"use client";

interface TakeawaySlideProps {
  data: { items: string[] };
  pillarColor: string;
  isActive: boolean;
}

export default function TakeawaySlide({ data, pillarColor, isActive }: TakeawaySlideProps) {
  const items = data.items.slice(0, 3);

  return (
    <div
      className="flex h-full flex-col justify-center px-6 relative"
      style={{
        background: `linear-gradient(135deg, ${pillarColor}0D 0%, transparent 60%)`,
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <p
          style={{ letterSpacing: "0.2em" }}
          className="text-xs font-semibold uppercase text-gray-500"
        >
          In this lesson
        </p>
        <div
          className="mt-2 h-0.5 w-12 rounded-full"
          style={{ backgroundColor: pillarColor }}
        />
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {items.map((item: string, i: number) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-2xl bg-white p-4"
            style={{
              boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.4s ease ${i * 0.15}s, transform 0.4s ease ${i * 0.15}s`,
            }}
          >
            {/* Number badge */}
            <span
              className="flex shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{
                backgroundColor: pillarColor,
                width: 32,
                height: 32,
              }}
            >
              {i + 1}
            </span>

            {/* Text */}
            <p
              className="pt-1 leading-relaxed"
              style={{ fontSize: 16, color: "#374151", fontFamily: "Inter, sans-serif" }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
