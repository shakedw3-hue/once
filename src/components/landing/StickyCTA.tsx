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
      className={`fixed bottom-0 left-0 right-0 z-40 flex h-[60px] items-center justify-center border-t bg-background px-5 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button
        render={<Link href="/auth/signup" />}
        className="h-11 w-full max-w-sm text-sm font-semibold"
      >
        Do It Once
      </Button>
    </div>
  );
}
