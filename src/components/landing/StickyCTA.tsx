"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <Link
      href="/auth/signup"
      style={{
        position: "fixed",
        right: 20,
        bottom: 28,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#4F46E5",
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        padding: "14px 22px",
        borderRadius: 999,
        boxShadow: "0 8px 30px rgba(79,70,229,0.35), 0 2px 8px rgba(0,0,0,0.1)",
        textDecoration: "none",
        transition: "transform 0.2s, box-shadow 0.2s",
        letterSpacing: "-0.01em",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(79,70,229,0.45), 0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(79,70,229,0.35), 0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      Do It Once
    </Link>
  );
}
