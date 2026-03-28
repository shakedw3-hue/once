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
}

export default function ToolSlide({ data, pillarColor }: ToolSlideProps) {
  return (
    <div className="flex h-full flex-col justify-center px-6">
      <div className="flex items-center gap-2 mb-5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: pillarColor }}
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Tools You Will Use
        </p>
        <span
          className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
          style={{ backgroundColor: pillarColor }}
        >
          PRO
        </span>
      </div>

      <div className="space-y-3">
        {data.tools.map((tool: Tool) => (
          <div
            key={tool.name}
            className="rounded-xl border bg-white p-4"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {tool.name}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {tool.description}
                </p>
                <p
                  className="mt-1 text-[11px] font-medium"
                  style={{ color: pillarColor }}
                >
                  {tool.cost}
                </p>
              </div>
              {tool.url && (
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-gray-50"
                  style={{ color: pillarColor, borderColor: `${pillarColor}40` }}
                >
                  Open
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
