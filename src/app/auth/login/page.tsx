"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { login } from "../actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (attempts >= 5) {
      setError("Too many login attempts. Please wait a moment before trying again.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setAttempts((prev) => prev + 1);
      setLoading(false);
      // Clear password field on error for security
      if (passwordRef.current) {
        passwordRef.current.value = "";
      }
    }
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
          <p className="mt-3 text-muted-foreground">
            Welcome back
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-muted-foreground">Password</Label>
                <Input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  required
                />
              </div>

              <div className="text-right">
                <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              {attempts >= 3 && attempts < 5 && (
                <p className="text-xs text-muted-foreground text-center">
                  Multiple failed attempts detected. Please double-check your credentials.
                </p>
              )}

              <Button
                type="submit"
                className="w-full font-semibold"
                disabled={loading || attempts >= 5}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/80">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
