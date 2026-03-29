"use client";

interface Tool {
  name: string;
  description: string;
  cost: string;
  url: string;
}

interface ToolSlideProps {
  data: { tools: Tool[] };
  pillarColor: string;
  isActive?: boolean;
}

export default function ToolSlide({ data, pillarColor, isActive = true }: ToolSlideProps) {
  const isFree = (cost: string) =>
    cost.toLowerCase().includes("free");

  return (
    <div className="flex h-full flex-col justify-center px-6">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#1a1a2e",
          }}
        >
          Your Toolkit
        </h2>
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: pillarColor }}
        >
          PRO
        </span>
      </div>

      {/* Tool cards */}
      <div className="flex flex-col gap-3">
        {data.tools.map((tool: Tool, i: number) => (
          <div
            key={tool.name}
            className="rounded-xl bg-white p-4 transition-shadow hover:shadow-lg"
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s, box-shadow 0.2s ease`,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>
                    {tool.name}
                  </p>

                  {/* Cost badge */}
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor: isFree(tool.cost) ? "#D1FAE5" : "#FEF3C7",
                      color: isFree(tool.cost) ? "#065F46" : "#92400E",
                    }}
                  >
                    {isFree(tool.cost) ? "Free" : "Paid"}
                  </span>
                </div>

                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  {tool.description}
                </p>
              </div>

              {tool.url && (
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                  style={{
                    color: pillarColor,
                    backgroundColor: `${pillarColor}10`,
                  }}
                >
                  Open &rarr;
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
