"use client";

interface ContentSlideProps {
  data: { text: string; part: number | null; totalParts: number | null };
}

export default function ContentSlide({ data }: ContentSlideProps) {
  const heading = data.part
    ? `Part ${data.part} of ${data.totalParts}`
    : "The Lesson";

  return (
    <div className="flex h-full flex-col justify-center px-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
        {heading}
      </p>

      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100dvh - 200px)" }}
      >
        <p
          className="text-gray-700"
          style={{ fontSize: 18, lineHeight: 1.8 }}
        >
          {data.text}
        </p>
      </div>
    </div>
  );
}
