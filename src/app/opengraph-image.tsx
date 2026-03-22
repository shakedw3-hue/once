import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Once — The decision that changes everything";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0f0f23 0%, #1a1a3e 40%, #0f0f23 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,70,229,0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* 4 pillar dots */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {[
            { color: "#F59E0B", label: "Money" },
            { color: "#A78BFA", label: "Mind" },
            { color: "#34D399", label: "Body" },
            { color: "#60A5FA", label: "Spirit" },
          ].map((p) => (
            <div
              key={p.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: p.color }} />
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: 16 }}>
          <span style={{ fontSize: 80, fontWeight: 800, color: "white", letterSpacing: "-0.03em" }}>
            Once
          </span>
          <span style={{ fontSize: 80, fontWeight: 800, color: "#4F46E5" }}>.</span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "-0.01em",
            marginBottom: 40,
          }}
        >
          The decision that changes everything.
        </p>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            once.ph
          </span>
          <div style={{ width: 1, height: 16, backgroundColor: "rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>
            Free Assessment
          </span>
          <div style={{ width: 1, height: 16, backgroundColor: "rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>
            Money · Mind · Body · Spirit
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
