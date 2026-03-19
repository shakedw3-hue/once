"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-2 text-4xl font-bold text-destructive">Oops</p>
        <h1 className="mb-2 text-lg font-semibold text-foreground">Something went wrong</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred."}
        </p>
        <Button
          onClick={reset}
          className="font-semibold"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
