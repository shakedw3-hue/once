"use client";

import { useEffect, useState } from "react";
import { initiateCheckout } from "@/app/checkout/actions";

export default function CheckoutRedirect() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function doCheckout() {
      const result = await initiateCheckout();
      if (result?.error) {
        setError(result.error);
      }
    }
    doCheckout();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-destructive">
            Something went wrong
          </p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-muted-foreground">
          Redirecting to payment...
        </p>
      </div>
    </div>
  );
}
