import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-2 text-6xl font-bold text-primary">404</p>
        <h1 className="mb-2 text-xl font-semibold text-foreground">Page not found</h1>
        <p className="mb-8 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button
          render={<Link href="/" />}
          className="font-semibold"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
