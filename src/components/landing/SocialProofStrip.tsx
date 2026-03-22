const stats = [
  { number: "100+", label: "Books, studies & insights from the world's smartest minds. Summarized into lessons." },
  { number: "275+", label: "Lessons built for you. Only you." },
  { number: "5-10x", label: "Return on investment by the time you finish" },
  { number: "10 min", label: "A day. That's all it takes." },
];

export default function SocialProofStrip() {
  return (
    <div
      className="rounded-2xl p-8 sm:p-10"
      style={{
        background: "linear-gradient(135deg, rgba(79,70,229,0.02) 0%, rgba(99,102,241,0.05) 100%)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center"
          >
            <p
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
              style={{
                color: "#4F46E5",
                textShadow: "0 0 20px rgba(79,70,229,0.25), 0 0 8px rgba(79,70,229,0.15)",
              }}
            >
              {stat.number}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
