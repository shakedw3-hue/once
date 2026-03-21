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
      className={`sm:hidden fixed left-0 right-0 z-50 border-t bg-background transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        bottom: 0,
        padding: "8px 16px calc(8px + env(safe-area-inset-bottom, 0px)) 16px",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <Button
        render={<Link href="/auth/signup" />}
        className="h-11 w-full text-sm font-semibold"
      >
        Do It Once
      </Button>
    </div>
  );
}
