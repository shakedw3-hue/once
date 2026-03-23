"use client";

import { useState, useRef } from "react";
import Link from "next/link";
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
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFF] px-5">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block">
            <span
              className="text-3xl font-bold tracking-tight text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Once
            </span>
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#4F46E5" }}
            >
              .
            </span>
          </Link>
          <p className="mt-1.5 text-xs tracking-wide text-gray-400">
            The decision that changes everything.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl bg-white px-8 py-10 sm:px-10"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(79,70,229,0.06), 0 20px 48px rgba(0,0,0,0.03)",
          }}
        >
          <h1 className="text-center text-xl font-semibold text-gray-900">
            Welcome back
          </h1>
          <p className="mt-1.5 text-center text-sm text-gray-400">
            Sign in to continue your journey.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-indigo-600 transition-colors hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            {attempts >= 3 && attempts < 5 && (
              <p className="text-center text-xs text-amber-600">
                Multiple failed attempts detected. Please double-check your credentials.
              </p>
            )}

            <button
              type="submit"
              disabled={loading || attempts >= 5}
              className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
              }}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div
            className="my-8"
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(0,0,0,0.06) 50%, transparent)",
            }}
          />

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-indigo-600 transition-colors hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
