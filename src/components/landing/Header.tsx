"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pillars", label: "Pillars" },
  { href: "/pricing", label: "Pricing" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          <span style={{ color: scrolled ? "#111" : "#fff", transition: "color 0.3s" }}>Once</span>
          <span style={{ color: "#4F46E5" }}>.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm transition-colors duration-300"
              style={{ color: scrolled ? "#666" : "rgba(255,255,255,0.7)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/signup"
            className="ml-4 rounded-md px-4 py-1.5 text-sm font-medium transition-all"
            style={scrolled
              ? { backgroundColor: "#4F46E5", color: "#fff" }
              : { backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }
            }
          >
            Do It Once
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" style={{ stroke: scrolled ? "#111" : "#fff" }}>
            {menuOpen
              ? <path d="M6 6l12 12M6 18L18 6" />
              : <path d="M3 12h18M3 6h18M3 18h18" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-5 py-4"
          style={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(12,10,26,0.95)",
            backdropFilter: "blur(12px)",
            borderColor: scrolled ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.1)",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-base"
              style={{ color: scrolled ? "#333" : "rgba(255,255,255,0.7)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/signup"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block rounded-lg py-2.5 text-center text-sm font-semibold"
            style={{ backgroundColor: "#4F46E5", color: "#fff" }}
          >
            Do It Once
          </Link>
        </div>
      )}
    </header>
  );
}
