"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="sm:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.1)",
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: "calc(10px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <Button
        render={<Link href="/auth/signup" />}
        className="h-12 w-full text-sm font-semibold shadow-lg shadow-primary/15"
      >
        Do It Once — Free Assessment
      </Button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginTop: 6,
          paddingBottom: 2,
        }}
      >
        <span style={{ fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 3 }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          Secure
        </span>
        <span style={{ width: 1, height: 10, backgroundColor: "#ddd" }} />
        <span style={{ fontSize: 10, color: "#888" }}>10 min</span>
        <span style={{ width: 1, height: 10, backgroundColor: "#ddd" }} />
        <span style={{ fontSize: 10, color: "#888" }}>Free</span>
      </div>
    </div>
  );
}
