const badges = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Secure Payment",
    sub: "Visa, Mastercard, GCash, Maya",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: "Lifetime Access",
    sub: "Pay once, keep forever",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4l3 3" />
        <path d="M3.05 11a9 9 0 1117.9 0" />
        <path d="M3.05 11a9 9 0 000 2" />
        <path d="M20.95 13a9 9 0 01-17.9 0" />
      </svg>
    ),
    title: "7-Day Guarantee",
    sub: "Full refund, no questions",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    title: "Research-Backed",
    sub: "50+ published studies",
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {badges.map((badge) => (
        <div
          key={badge.title}
          className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full"
            style={{
              backgroundColor: "rgba(79,70,229,0.08)",
              color: "#4F46E5",
              boxShadow: "0 0 12px rgba(79,70,229,0.2), 0 0 4px rgba(79,70,229,0.1)",
            }}
          >
            {badge.icon}
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">{badge.title}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              {badge.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
