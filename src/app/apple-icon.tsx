import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4F46E5",
          borderRadius: 34,
          fontFamily: "system-ui",
        }}
      >
        <span
          style={{
            fontSize: 98,
            fontWeight: 800,
            color: "white",
            letterSpacing: -4,
          }}
        >
          O
          <span style={{ color: "rgba(255,255,255,0.7)" }}>.</span>
        </span>
      </div>
    ),
    { ...size },
  );
}
