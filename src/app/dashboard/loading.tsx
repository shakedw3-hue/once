export default function DashboardLoading() {
  return (
    <div className="min-h-screen">
      <div className="border-b px-6 py-4">
        <div className="mx-auto flex h-8 max-w-5xl items-center justify-between">
          <div className="h-5 w-28 animate-pulse rounded bg-muted" />
          <div className="h-5 w-20 animate-pulse rounded bg-muted" />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-10">
          <div className="mb-2 h-8 w-64 animate-pulse rounded bg-muted" />
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-28 animate-pulse rounded-2xl border bg-card" />
          <div className="h-28 animate-pulse rounded-2xl border bg-card lg:col-span-2" />
        </div>

        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl border bg-card" />
          ))}
        </div>
      </div>
    </div>
  );
}
