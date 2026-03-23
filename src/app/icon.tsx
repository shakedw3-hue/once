import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4F46E5",
          borderRadius: 96,
          fontFamily: "system-ui",
        }}
      >
        <span
          style={{
            fontSize: 280,
            fontWeight: 800,
            color: "white",
            letterSpacing: -10,
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
