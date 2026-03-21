"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-6 font-display text-3xl font-semibold tracking-[-0.04em]">
          <span className="text-foreground">Once</span>
          <span className="text-primary">.</span>
        </p>
        <h1 className="mb-2 text-lg font-semibold text-foreground">Something went wrong.</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {error.message || "Could not load your dashboard."}
        </p>
        <Button
          onClick={reset}
          size="lg"
          className="h-14 w-full px-8 text-base font-semibold sm:w-auto"
        >
          Try Once More
        </Button>
      </div>
    </div>
  );
}
