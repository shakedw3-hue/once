"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "../actions";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
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
            Create your account
          </h1>
          <p className="mt-1.5 text-center text-sm text-gray-400">
            Free assessment. No payment required.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Juan Dela Cruz"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

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
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
                minLength={6}
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            <p className="text-center text-[11px] text-gray-400">
              We don&apos;t share your data. No spam.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
              }}
            >
              {loading ? "Creating account..." : "Begin Once"}
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
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-indigo-600 transition-colors hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
