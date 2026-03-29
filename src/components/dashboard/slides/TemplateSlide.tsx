"use client";

interface TemplateSlideProps {
  data: {
    name: string;
    description: string;
    items: string[];
    url: string;
    proOnly?: boolean;
  };
  pillarColor: string;
  isActive?: boolean;
}

export default function TemplateSlide({ data, pillarColor, isActive = true }: TemplateSlideProps) {
  return (
    <div className="flex h-full flex-col justify-center px-6">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={pillarColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#1a1a2e",
          }}
        >
          Your Template
        </h2>
        {data.proOnly && (
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: pillarColor }}
          >
            PRO
          </span>
        )}
      </div>

      {/* Template card */}
      <div
        className="relative overflow-hidden rounded-2xl bg-white p-5"
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {/* Decorative document icon in corner */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke={pillarColor}
          strokeWidth="0.5"
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            opacity: 0.08,
          }}
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>

        {/* Template name */}
        <p
          className="mb-1.5"
          style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}
        >
          {data.name}
        </p>

        {/* Description */}
        <p
          className="mb-4 leading-relaxed"
          style={{ fontSize: 14, color: "#6b7280" }}
        >
          {data.description}
        </p>

        {/* Includes checklist */}
        <p
          className="mb-2"
          style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}
        >
          Includes:
        </p>
        <div className="mb-5 space-y-2">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 0.3s ease ${i * 0.08}s, transform 0.3s ease ${i * 0.08}s`,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Download button */}
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-center font-semibold text-white transition-opacity hover:opacity-90"
          style={{
            backgroundColor: pillarColor,
            fontSize: 15,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Open Template
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  );
}
