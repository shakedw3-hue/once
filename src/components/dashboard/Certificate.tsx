"use client";

import { useState } from "react";

interface CertificateProps {
  userName: string;
  trackName: string;
  completionDate: string;
  pillarColor: string;
}

export default function Certificate({
  userName,
  trackName,
  completionDate,
  pillarColor,
}: CertificateProps) {
  const [shared, setShared] = useState(false);

  async function handleShare() {
    const shareData = {
      title: "Once. Certificate of Completion",
      text: `I completed ${trackName} on Once. — the platform that diagnoses your life, then builds your path.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or share failed — fall through to copy
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      } catch {
        // Clipboard API not available
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8"
      style={{ background: "linear-gradient(165deg, #0c0a1a 0%, #111029 50%, #08071a 100%)" }}
    >
      {/* Certificate card */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          maxWidth: 600,
          aspectRatio: "16 / 9",
          background: "linear-gradient(165deg, #0c0a1a 0%, #161333 50%, #0c0a1a 100%)",
        }}
      >
        {/* Gold double border */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            border: "2px solid #D4AF37",
            boxShadow: "inset 0 0 0 5px transparent, inset 0 0 0 6px rgba(212,175,55,0.3)",
          }}
        />

        {/* Corner decorations — top left */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          style={{ position: "absolute", top: 12, left: 12, opacity: 0.15 }}
        >
          <path d="M0 0 L30 0 L30 4 L4 4 L4 30 L0 30 Z" fill="#D4AF37" />
          <path d="M8 8 L22 8 L22 10 L10 10 L10 22 L8 22 Z" fill="#D4AF37" />
        </svg>

        {/* Corner decorations — top right */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          style={{ position: "absolute", top: 12, right: 12, opacity: 0.15, transform: "scaleX(-1)" }}
        >
          <path d="M0 0 L30 0 L30 4 L4 4 L4 30 L0 30 Z" fill="#D4AF37" />
          <path d="M8 8 L22 8 L22 10 L10 10 L10 22 L8 22 Z" fill="#D4AF37" />
        </svg>

        {/* Corner decorations — bottom left */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          style={{ position: "absolute", bottom: 12, left: 12, opacity: 0.15, transform: "scaleY(-1)" }}
        >
          <path d="M0 0 L30 0 L30 4 L4 4 L4 30 L0 30 Z" fill="#D4AF37" />
          <path d="M8 8 L22 8 L22 10 L10 10 L10 22 L8 22 Z" fill="#D4AF37" />
        </svg>

        {/* Corner decorations — bottom right */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          style={{ position: "absolute", bottom: 12, right: 12, opacity: 0.15, transform: "scale(-1, -1)" }}
        >
          <path d="M0 0 L30 0 L30 4 L4 4 L4 30 L0 30 Z" fill="#D4AF37" />
          <path d="M8 8 L22 8 L22 10 L10 10 L10 22 L8 22 Z" fill="#D4AF37" />
        </svg>

        {/* Certificate content */}
        <div className="relative flex h-full flex-col items-center justify-center px-8 py-6 text-center">
          {/* Once. logo */}
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: "#ffffff", marginBottom: 6 }}>
            Once<span style={{ color: "#4F46E5" }}>.</span>
          </p>

          {/* Certificate of Completion */}
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#D4AF37",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: 10,
          }}>
            Certificate of Completion
          </p>

          {/* Gold line separator */}
          <div style={{
            width: 180,
            height: 1,
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            marginBottom: 14,
          }} />

          {/* User name */}
          <p style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 32,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: 6,
          }}>
            {userName}
          </p>

          {/* has successfully completed */}
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            has successfully completed
          </p>

          {/* Track name */}
          <p style={{
            fontSize: 24,
            fontWeight: 700,
            color: pillarColor,
            lineHeight: 1.2,
            marginBottom: 8,
          }}>
            {trackName}
          </p>

          {/* Date */}
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            on {completionDate}
          </p>

          {/* Bottom tagline */}
          <p style={{
            position: "absolute",
            bottom: 14,
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.05em",
          }}>
            Once. The decision that changes everything.
          </p>
        </div>
      </div>

      {/* Share button */}
      <button
        onClick={handleShare}
        className="mt-6 flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: pillarColor }}
      >
        {shared ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Link Copied
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share Certificate
          </>
        )}
      </button>
    </div>
  );
}
