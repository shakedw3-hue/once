"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-green-500" />
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
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

            <h1 className="mb-2 text-2xl font-bold text-foreground">You&apos;re In!</h1>
            <p className="mb-8 text-muted-foreground">
              Your path is now fully unlocked. All modules and lessons
              are ready for you.
            </p>

            <Button
              render={<Link href="/dashboard" />}
              size="lg"
              className="h-12 w-full font-semibold"
            >
              Start Your Journey
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
