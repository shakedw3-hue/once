"use client";

import { useRouter, useSearchParams } from "next/navigation";

const RANGES = [
  { label: "Today", value: "1d" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
];

export default function AdminDateFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("range") || "7d";
  const from = params.get("from");
  const to = params.get("to");

  function setRange(range: string) {
    router.push(`/admin?range=${range}`);
  }

  function setCustom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const f = fd.get("from") as string;
    const t = fd.get("to") as string;
    if (f && t) router.push(`/admin?from=${f}&to=${t}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {RANGES.map(r => (
        <button
          key={r.value}
          onClick={() => setRange(r.value)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            current === r.value && !from
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {r.label}
        </button>
      ))}
      <form onSubmit={setCustom} className="flex items-center gap-1.5">
        <input type="date" name="from" defaultValue={from ?? ""} className="rounded border px-2 py-1 text-xs bg-background" />
        <span className="text-xs text-muted-foreground">to</span>
        <input type="date" name="to" defaultValue={to ?? ""} className="rounded border px-2 py-1 text-xs bg-background" />
        <button type="submit" className="rounded bg-muted px-2 py-1 text-xs font-medium hover:bg-muted/80">Go</button>
      </form>
    </div>
  );
}
