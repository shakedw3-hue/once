"use client";

interface QuoteSlideProps {
  data: { text: string; author: string; role: string };
  pillarColor: string;
}

export default function QuoteSlide({ data, pillarColor }: QuoteSlideProps) {
  const initials = data.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      {/* Decorative quote mark */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mb-4"
        style={{ color: pillarColor, opacity: 0.1 }}
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <p
        className="max-w-lg text-center italic leading-relaxed text-gray-800"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: 20 }}
      >
        &ldquo;{data.text}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: pillarColor }}
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{data.author}</p>
          <p className="text-xs text-gray-500">{data.role}</p>
        </div>
      </div>
    </div>
  );
}
