import Link from "next/link";

export default function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
  const textClass = size === "lg"
    ? "text-2xl sm:text-3xl"
    : "text-base";

  return (
    <Link href="/" className={`font-display font-semibold tracking-[-0.04em] ${textClass}`}>
      <span className="text-foreground">Once</span>
      <span className="text-primary">.</span>
    </Link>
  );
}
