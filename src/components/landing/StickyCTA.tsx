"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="sticky-cta-float"
      style={{
        position: "fixed",
        right: 16,
        bottom: 24,
        zIndex: 99999,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <Link
        href="/auth/signup"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: "#4F46E5",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          padding: "14px 24px",
          borderRadius: 999,
          boxShadow:
            "0 8px 30px rgba(79,70,229,0.4), 0 2px 8px rgba(0,0,0,0.12)",
          textDecoration: "none",
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        Do It Once
      </Link>
    </div>
  );
}
