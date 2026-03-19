"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PillarOrbs from "./PillarOrbs";

const headline = "One decision away from a completely different life.";
const words = headline.split(" ");

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-14">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-label text-primary"
            >
              Once. The decision that changes everything.
            </motion.p>

            <h1 className="mb-6 text-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              You&apos;ve been working hard. You&apos;ve tried everything. But nothing
              was built for you. Once diagnoses exactly where you are, then
              builds one path that actually fits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button
                render={<Link href="/auth/signup" />}
                size="lg"
                className="h-13 px-8 text-base font-semibold shadow-lg shadow-primary/10 transition-all hover:scale-[1.02]"
              >
                Do It Once
              </Button>
              <span className="text-xs text-muted-foreground">
                Free assessment · 3 minutes
              </span>
            </motion.div>
          </div>

          {/* Right — pillar orbs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden lg:flex items-center justify-center"
          >
            <PillarOrbs />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
