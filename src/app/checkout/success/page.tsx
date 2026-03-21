"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md text-center"
      >
        {/* Brand moment */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 font-display text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
        >
          You made the decision.{" "}
          <span className="text-primary">Once.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 1.0, stiffness: 200 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"
          >
            <svg
              className="h-8 w-8 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>

          <p className="mb-2 text-lg font-semibold text-foreground">Your path is unlocked.</p>
          <p className="mb-8 text-sm text-muted-foreground">
            All modules and lessons are ready. Your journey starts now.
          </p>

          <Button
            render={<Link href="/dashboard" />}
            size="lg"
            className="h-14 w-full px-8 text-base font-semibold"
          >
            Start Your Path
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
