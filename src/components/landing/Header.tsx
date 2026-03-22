"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pillars", label: "Pillars" },
  { href: "/method", label: "Method" },
  { href: "/pricing", label: "Pricing" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 z-50 w-full transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
      }}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-semibold tracking-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          <span
            className="transition-colors duration-300"
            style={{ color: scrolled ? "#111" : "#fff" }}
          >
            Once
          </span>
          <span style={{ color: "#4F46E5" }}>.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm transition-colors duration-300"
              style={{
                color: scrolled
                  ? pathname === link.href ? "#111" : "#666"
                  : pathname === link.href ? "#fff" : "rgba(255,255,255,0.7)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-4">
            {scrolled ? (
              <Button
                render={<Link href="/auth/signup" />}
                size="sm"
                className="shadow-sm shadow-primary/10"
              >
                Do It Once
              </Button>
            ) : (
              <Link
                href="/auth/signup"
                className="rounded-md px-4 py-1.5 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Do It Once
              </Link>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden rounded-md p-1.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              className="transition-colors duration-300"
              style={{ stroke: scrolled ? "#111" : "#fff" }}
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </SheetTrigger>

          <SheetContent side="right" className="w-64">
            <div className="mt-8 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-base transition-colors ${
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                render={<Link href="/auth/signup" />}
                className="mt-4 shadow-sm shadow-primary/10"
              >
                Do It Once
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
