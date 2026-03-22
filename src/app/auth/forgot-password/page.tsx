"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { forgotPassword } from "../actions";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await forgotPassword(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-2xl font-semibold tracking-[-0.04em]">
            <span className="text-foreground">Once</span>
            <span className="text-primary">.</span>
          </Link>
          <p className="mt-1 text-xs text-muted-foreground/60">
            The decision that changes everything.
          </p>
          <p className="mt-3 text-muted-foreground">Reset your password</p>
        </div>

        <Card>
          <CardContent className="p-6">
            {sent ? (
              <div className="text-center py-4">
                <p className="mb-2 text-sm font-semibold">Check your email</p>
                <p className="text-sm text-muted-foreground">
                  If this email is registered, you&apos;ll receive a reset link. Check your spam folder.
                </p>
                <Link href="/auth/login" className="mt-4 inline-block text-sm text-primary hover:underline">
                  Back to login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="w-full font-semibold" disabled={loading}>
                  {loading ? "Sending..." : "Send reset link"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  <Link href="/auth/login" className="text-primary hover:underline">
                    Back to login
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
