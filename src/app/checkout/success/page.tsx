"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PLAN_DISPLAY: Record<string, { name: string; price: string }> = {
  core: { name: "Once Core", price: "1,499" },
  pro: { name: "Once Pro", price: "2,350" },
  ai: { name: "Once AI Careers", price: "3,950" },
};

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const planKey = searchParams.get("plan") || "core";
  const planInfo = PLAN_DISPLAY[planKey] || PLAN_DISPLAY.core;

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md text-center animate-fade-in">
        {/* Brand moment */}
        <p className="mb-8 font-display text-2xl font-semibold tracking-[-0.04em] sm:text-3xl animate-scale-in">
          You made the decision.{" "}
          <span className="once-signature">Once<span style={{color:"#4F46E5"}}>.</span></span>
        </p>

        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 animate-pop" style={{ animationDelay: "0.6s" }}>
            <svg
              className="h-8 w-8 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="mb-1 text-lg font-semibold text-foreground">Your path is unlocked.</p>
          <p className="mb-2 text-sm font-medium text-foreground">
            You purchased {planInfo.name} for &#8369;{planInfo.price}
          </p>
          <p className="mb-2 text-sm text-muted-foreground">
            All modules and lessons are ready. Your journey starts now.
          </p>
          <p className="mb-8 text-xs text-muted-foreground">
            Check your email for your receipt.
          </p>

          <Button
            render={<Link href="/dashboard" />}
            size="lg"
            className="h-14 w-full px-8 text-base font-semibold"
          >
            Start Your First Lesson
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          from { transform: scale(0); }
          50% { transform: scale(1.1); }
          to { transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out 0.2s both;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out both;
        }
        .animate-pop {
          animation: pop 0.4s ease-out both;
        }
      `}</style>
    </div>
  );
}
