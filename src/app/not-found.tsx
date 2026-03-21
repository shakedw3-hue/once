import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-6 font-display text-3xl font-semibold tracking-[-0.04em]">
          <span className="text-foreground">Once</span>
          <span className="text-primary">.</span>
        </p>
        <p className="mb-2 text-6xl font-bold text-primary">404</p>
        <h1 className="mb-2 text-xl font-semibold text-foreground">This page does not exist.</h1>
        <p className="mb-8 text-muted-foreground">
          But your path does. Go back and find it.
        </p>
        <Button
          render={<Link href="/" />}
          size="lg"
          className="h-14 w-full px-8 text-base font-semibold sm:w-auto"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
