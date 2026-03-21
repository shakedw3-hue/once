export default function AdminLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <p className="font-display text-2xl font-semibold tracking-[-0.04em]">
          <span className="text-foreground">Once</span>
          <span className="text-primary">.</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Loading admin...</p>
      </div>
    </div>
  );
}
