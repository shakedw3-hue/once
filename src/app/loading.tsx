export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-fade-in text-center">
        <p className="font-display text-3xl font-semibold tracking-[-0.04em]">
          <span className="text-foreground">Once</span>
          <span className="text-primary">.</span>
        </p>
      </div>
    </div>
  );
}
