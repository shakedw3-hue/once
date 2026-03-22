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

  return (
    <div
      className={`sm:hidden fixed left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        bottom: 0,
        padding: "12px 16px calc(12px + env(safe-area-inset-bottom, 0px)) 16px",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Button
        render={<Link href="/auth/signup" />}
        className="h-12 w-full text-sm font-semibold shadow-lg shadow-primary/15"
      >
        Do It Once — Free Assessment
      </Button>
      <div className="mt-1.5 flex items-center justify-center gap-3">
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          Secure
        </span>
        <span className="h-2.5 w-px bg-border" />
        <span className="text-[10px] text-muted-foreground">10 min</span>
        <span className="h-2.5 w-px bg-border" />
        <span className="text-[10px] text-muted-foreground">Free</span>
      </div>
    </div>
  );
}
