import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Once. All rights reserved.
        </p>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}
