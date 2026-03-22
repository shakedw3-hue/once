"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PillarOrbs from "./PillarOrbs";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const names = [
  "Warren Buffett",
  "Kobe Bryant",
  "Elon Musk",
  "Dalai Lama",
] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-20 pb-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ── Left column: messaging ── */}
          <div className="flex flex-col">
            {/* ─ Eyebrow ─ */}
            <motion.div {...fade(0.05)}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-muted-foreground backdrop-blur-sm">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "#4F46E5" }}
                />
                The only platform that diagnoses your life — then builds your path
              </span>
            </motion.div>

            {/* ─ Headline ─ */}
            <motion.h1
              {...fade(0.15)}
              className="mt-7 text-display text-[2.75rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              Once<span style={{ color: "#4F46E5" }}>.</span>
              <br />
              <span className="text-muted-foreground">
                The decision that
                <br className="hidden sm:block" /> changes everything.
              </span>
            </motion.h1>

            {/* ─ Value proposition ─ */}
            <motion.p
              {...fade(0.35)}
              className="mt-7 max-w-[28rem] text-[1.05rem] leading-[1.7] text-muted-foreground sm:text-lg"
            >
              We built{" "}
              <span className="font-semibold text-foreground">
                one personalized path
              </span>{" "}
              from the world&apos;s best minds&nbsp;&mdash; that takes you from
              knowledge to{" "}
              <span className="font-semibold text-foreground">
                real income
              </span>
              .
            </motion.p>

            {/* ─ Income highlight — marker style ─ */}
            <motion.p
              {...fade(0.5)}
              className="mt-5 max-w-[28rem] text-[0.95rem] leading-[1.7] text-foreground/85 sm:text-base"
            >
              At the end of your path you don&apos;t just know more &mdash; you{" "}
              <span
                className="font-semibold"
                style={{
                  backgroundImage: "linear-gradient(to top, rgba(79,70,229,0.18) 40%, transparent 40%)",
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              >
                earn more
              </span>
              . Real, practical income skills built for the Philippine market.
            </motion.p>

            {/* ─ CTA row ─ */}
            <motion.div
              {...fade(0.65)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                render={<Link href="/auth/signup" />}
                size="lg"
                className="h-[3.25rem] w-full cursor-pointer px-8 text-[0.95rem] font-semibold shadow-lg shadow-primary/10 transition-all hover:scale-[1.02] sm:w-auto"
              >
                Do It Once
              </Button>
              <span className="text-[0.8rem] text-muted-foreground sm:ml-1">
                Free assessment&ensp;·&ensp;10 minutes
              </span>
            </motion.div>

            {/* ─ Credibility strip ─ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-11"
            >
              <p className="mb-2.5 text-[10px] font-medium tracking-[0.15em] text-muted-foreground/60 uppercase">
                Built from the principles of
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {names.map((name, i) => (
                  <span key={name} className="flex items-center">
                    <span className="text-[0.8rem] font-medium tracking-tight text-muted-foreground sm:text-[0.85rem]">
                      {name}
                    </span>
                    {i < names.length - 1 && (
                      <span className="ml-2 inline-block h-3.5 w-px bg-border/70" />
                    )}
                  </span>
                ))}
                <span className="text-[0.8rem] text-muted-foreground/50">
                  &amp; hundreds more
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Right column: PillarOrbs (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden items-center justify-center lg:flex"
          >
            <PillarOrbs />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
