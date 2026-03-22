/**
 * Client-side tracking helpers
 * Captures UTM params, referrer, and device info
 */

export function captureUTM() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const data: Record<string, string> = {};

  if (params.get("utm_source")) data.utm_source = params.get("utm_source")!;
  if (params.get("utm_medium")) data.utm_medium = params.get("utm_medium")!;
  if (params.get("utm_campaign")) data.utm_campaign = params.get("utm_campaign")!;
  if (document.referrer) data.referrer = new URL(document.referrer).hostname;
  data.device_type = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop";
  data.signup_page = window.location.pathname;

  // Store in sessionStorage so signup action can read it
  try {
    sessionStorage.setItem("once_tracking", JSON.stringify(data));
  } catch { /* ignore */ }

  return data;
}

export function getStoredTracking(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("once_tracking") || "{}");
  } catch { return {}; }
}
