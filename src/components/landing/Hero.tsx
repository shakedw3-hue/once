"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PillarOrbs from "./PillarOrbs";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-14">
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              Once<span style={{color:"#4F46E5"}}>.</span>{" "}
              <span className="text-muted-foreground">
                The decision that changes everything.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              We studied what the world&apos;s most successful people actually
              do and built one path. Yours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                render={<Link href="/auth/signup" />}
                size="lg"
                className="h-14 w-full px-8 text-base font-semibold shadow-lg shadow-primary/10 transition-all hover:scale-[1.02] sm:w-auto"
              >
                Do It Once
              </Button>
              <span className="text-xs text-muted-foreground">
                Free assessment. 10 minutes.
              </span>
            </motion.div>

            {/* Credibility line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mb-4 max-w-md text-xs leading-relaxed text-muted-foreground"
            >
              Built from the principles of Warren Buffett, Kobe Bryant, Elon
              Musk, the Dalai Lama, and hundreds of the world&apos;s most
              successful people.
            </motion.p>

            {/* Trust strip with logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <p className="mb-3 text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                Research sources include
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {/* Harvard */}
                <svg className="h-5 text-muted-foreground/35" viewBox="0 0 120 24" fill="currentColor">
                  <text x="0" y="18" fontFamily="Georgia, serif" fontSize="16" fontWeight="700" letterSpacing="-0.5">HARVARD</text>
                </svg>
                {/* WHO */}
                <svg className="h-5 text-muted-foreground/35" viewBox="0 0 60 24" fill="currentColor">
                  <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700" letterSpacing="1">WHO</text>
                </svg>
                {/* McKinsey */}
                <svg className="h-5 text-muted-foreground/35" viewBox="0 0 130 24" fill="currentColor">
                  <text x="0" y="18" fontFamily="Georgia, serif" fontSize="14" fontWeight="400" letterSpacing="0">McKinsey</text>
                </svg>
                {/* MIT */}
                <svg className="h-5 text-muted-foreground/35" viewBox="0 0 50 24" fill="currentColor">
                  <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700" letterSpacing="1">MIT</text>
                </svg>
                {/* Forbes */}
                <svg className="h-5 text-muted-foreground/35" viewBox="0 0 100 24" fill="currentColor">
                  <text x="0" y="18" fontFamily="Georgia, serif" fontSize="16" fontWeight="700" fontStyle="italic" letterSpacing="-0.5">Forbes</text>
                </svg>
              </div>
            </motion.div>
          </div>

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
