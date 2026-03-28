"use client";

interface TakeawaySlideProps {
  data: { items: string[] };
  pillarColor: string;
  isActive: boolean;
}

export default function TakeawaySlide({ data, pillarColor, isActive }: TakeawaySlideProps) {
  return (
    <div className="flex h-full flex-col justify-center px-6">
      <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
        What You Will Learn
      </p>

      <div className="space-y-5">
        {data.items.map((item: string, i: number) => (
          <div
            key={i}
            className="flex items-start gap-4"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
            }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: pillarColor }}
            >
              {i + 1}
            </span>
            <p className="text-base leading-relaxed text-gray-700 pt-1">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
