"use client";

import { useEffect, useState, useRef } from "react";

type Platform = "android" | "ios" | null;

const DISMISS_KEY = "once-install-dismissed";
const DISMISS_DAYS = 7;

export default function InstallBanner() {
  const [platform, setPlatform] = useState<Platform>(null);
  const [show, setShow] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Already installed as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Dismissed recently
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) {
      const elapsed = Date.now() - Number(dismissed);
      if (elapsed < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
    }

    // Detect iOS
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua) && !(window as any).MSStream;

    // Detect desktop — don't show on desktop
    const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    if (!isMobile) return;

    if (isIOS) {
      setPlatform("ios");
      setShow(true);
      return;
    }

    // Android / Chrome — listen for beforeinstallprompt
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setPlatform("android");
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShow(false);
  };

  const install = async () => {
    if (!deferredPrompt.current) return;
    await deferredPrompt.current.prompt();
    const { outcome } = await deferredPrompt.current.userChoice;
    if (outcome === "accepted") setShow(false);
    deferredPrompt.current = null;
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md rounded-2xl p-5"
      style={{
        background: "#111111",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* Dismiss button */}
      <button
        onClick={dismiss}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white"
        aria-label="Dismiss"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {platform === "android" && (
        <>
          <p className="mb-1 text-sm font-semibold text-white">
            Get the Once. app
          </p>
          <p className="mb-4 text-xs leading-relaxed text-white/60">
            Open faster. Get daily reminders. No download needed.
          </p>
          <button
            onClick={install}
            className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#6366F1" }}
          >
            Install
          </button>
        </>
      )}

      {platform === "ios" && (
        <>
          <p className="mb-1 text-sm font-semibold text-white">
            Add Once. to your home screen
          </p>
          <p className="mb-4 text-xs leading-relaxed text-white/60">
            Tap the share button{" "}
            <svg
              className="mb-0.5 inline-block"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>{" "}
            below, then &ldquo;Add to Home Screen&rdquo;
          </p>
          <button
            onClick={dismiss}
            className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#6366F1" }}
          >
            Got it
          </button>
        </>
      )}
    </div>
  );
}
