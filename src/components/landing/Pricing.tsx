"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="border-t px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            ₱649. One time. That&apos;s it.
          </h2>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            The assessment is free. You can see your score and profile without
            paying anything. If what you see makes sense and you want the full
            path with all modules and lessons, it&apos;s ₱649. No subscription.
            No upsell. You pay once and you have it forever.
          </p>

          <div className="mb-8 rounded-xl border bg-card p-5 sm:p-6">
            <p className="mb-4 text-sm font-semibold">What ₱649 includes:</p>
            <ul className="space-y-2.5">
              {[
                "Your personalized BetterLife profile and pillar scores",
                "5 structured modules matched to your primary path",
                "5–7 lessons per module with action steps and reflection prompts",
                "Progress tracking across everything you do",
                "Lifetime access. No expiration, no recurring charges",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              render={<Link href="/auth/signup" />}
              size="lg"
              className="h-12 px-6 text-sm font-semibold sm:w-auto"
            >
              Start with the free assessment
            </Button>
            <span className="text-xs text-muted-foreground">
              GCash and Maya accepted.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
