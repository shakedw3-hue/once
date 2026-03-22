"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { initiateCheckout } from "@/app/checkout/actions";
import type { Plan } from "@/lib/stripe";

const TIMEOUT_MS = 15_000;

export default function CheckoutRedirect({ plan = "core" }: { plan?: Plan }) {
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<"provider" | "plan" | "generic">("generic");
  const [retrying, setRetrying] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortedRef = useRef(false);

  async function doCheckout() {
    setError(null);
    abortedRef.current = false;

    // Start timeout
    timeoutRef.current = setTimeout(() => {
      abortedRef.current = true;
      setErrorType("provider");
      setError("Payment provider is taking too long to respond. Please try again.");
    }, TIMEOUT_MS);

    try {
      const result = await initiateCheckout(plan);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortedRef.current) return;

      if (result?.error) {
        // Differentiate error types
        const msg = result.error.toLowerCase();
        if (msg.includes("invalid") || msg.includes("plan")) {
          setErrorType("plan");
          setError("The selected plan is not available. Please go back and choose a valid plan.");
        } else {
          setErrorType("provider");
          setError(result.error);
        }
      }
    } catch (e) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortedRef.current) return;

      const msg = e instanceof Error ? e.message.toLowerCase() : "";
      if (msg.includes("invalid") || msg.includes("plan")) {
        setErrorType("plan");
        setError("Invalid plan selected. Please go back and choose a valid plan.");
      } else {
        setErrorType("provider");
        setError("Could not connect to payment provider. Please try again.");
      }
    }
  }

  useEffect(() => {
    doCheckout();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  async function handleRetry() {
    setRetrying(true);
    await doCheckout();
    setRetrying(false);
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <p className="mb-2 font-display text-2xl font-semibold">
            Once<span style={{color:"#4F46E5"}}>.</span>
          </p>
          <p className="mb-4 text-lg font-semibold text-foreground">
            {errorType === "provider"
              ? "Payment provider unavailable"
              : errorType === "plan"
                ? "Invalid plan"
                : "Payment not available yet"}
          </p>
          <p className="mb-6 text-sm text-muted-foreground">
            {error}
          </p>
          <div className="flex flex-col gap-3">
            {errorType !== "plan" && (
              <Button
                onClick={handleRetry}
                disabled={retrying}
                className="h-12 w-full font-semibold"
              >
                {retrying ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Retrying...
                  </span>
                ) : (
                  "Try Again"
                )}
              </Button>
            )}
            <Button
              render={<Link href="/profile" />}
              variant="outline"
              className="h-12 w-full"
            >
              Back to Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-muted-foreground">Redirecting to payment...</p>
      </div>
    </div>
  );
}
