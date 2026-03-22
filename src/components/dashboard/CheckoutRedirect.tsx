"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { initiateCheckout } from "@/app/checkout/actions";
import type { Plan } from "@/lib/stripe";

export default function CheckoutRedirect({ plan = "core" }: { plan?: Plan }) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function doCheckout() {
      try {
        const result = await initiateCheckout(plan);
        if (result?.error) {
          setError(result.error);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not connect to payment provider. Please try again.");
      }
    }
    doCheckout();
  }, [plan]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <p className="mb-2 font-display text-2xl font-semibold">
            Once<span style={{color:"#4F46E5"}}>.</span>
          </p>
          <p className="mb-4 text-lg font-semibold text-foreground">Payment not available yet</p>
          <p className="mb-6 text-sm text-muted-foreground">
            {error}
          </p>
          <div className="flex flex-col gap-3">
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
