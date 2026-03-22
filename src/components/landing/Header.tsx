"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pillars", label: "Pillars" },
  { href: "/method", label: "Method" },
  { href: "/pricing", label: "Pricing" },
];

const SCROLL_THRESHOLD = 80;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  return (
    <motion.header
      className="fixed top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-300"
      animate={
        scrolled
          ? {
              backgroundColor: "rgba(255, 255, 255, 0.82)",
              borderBottomColor: "rgba(0, 0, 0, 0.06)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.04)",
            }
          : {
              backgroundColor: "rgba(255, 255, 255, 0)",
              borderBottomColor: "rgba(0, 0, 0, 0)",
              boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0)",
            }
      }
      style={{
        backdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
        borderBottom: "1px solid transparent",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        {/* Logo — inline so we control color per scroll state */}
        <Link
          href="/"
          className="font-display text-base font-semibold tracking-[-0.04em]"
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
              className={`rounded-md px-3 py-1.5 text-sm transition-colors duration-300 ${
                pathname === link.href
                  ? scrolled
                    ? "text-foreground"
                    : "text-white"
                  : scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/70 hover:text-white"
              }`}
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
              <Button
                render={<Link href="/auth/signup" />}
                size="sm"
                className="border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-sm hover:bg-white/20"
              >
                Do It Once
              </Button>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={<Button variant="ghost" size="sm" />}
            className="md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={scrolled ? "currentColor" : "#fff"}
              strokeWidth="2"
              className="transition-colors duration-300"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </SheetTrigger>

          {/* Mobile sheet — always light/normal since it's an overlay */}
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
    </motion.header>
  );
}
