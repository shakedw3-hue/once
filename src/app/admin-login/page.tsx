"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Wrong password.");
      setPassword("");
    }
    setLoading(false);
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-5"
      style={{ background: "linear-gradient(165deg, #0c0a1a 0%, #111029 35%, #08071a 100%)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white/5 p-8 backdrop-blur-sm"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p
          className="mb-1 text-center text-2xl font-semibold"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff" }}
        >
          Once<span style={{ color: "#4F46E5" }}>.</span>
        </p>
        <p className="mb-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Admin Access
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-2 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          autoFocus
        />

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all"
          style={{
            background: loading ? "rgba(79,70,229,0.5)" : "#4F46E5",
            opacity: !password ? 0.5 : 1,
          }}
        >
          {loading ? "..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
