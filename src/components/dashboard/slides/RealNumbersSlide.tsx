"use client";

interface RealNumbersSlideProps {
  data: { text: string };
  pillarColor: string;
}

export default function RealNumbersSlide({ data, pillarColor }: RealNumbersSlideProps) {
  return (
    <div className="flex h-full flex-col justify-center px-6">
      <div
        className="h-1 w-16 rounded-full mb-5"
        style={{ backgroundColor: pillarColor }}
      />

      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Real Numbers
      </p>

      <p
        className="text-xl font-bold leading-relaxed"
        style={{ color: "#10B981" }}
      >
        {data.text}
      </p>

      <p className="mt-4 text-xs text-gray-400">
        Philippine market data
      </p>
    </div>
  );
}
