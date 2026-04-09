"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PILLARS } from "@/lib/constants";
import type { TrackMeta } from "@/lib/tracks";
import type { Pillar, PillarScores } from "@/types/database";
import { logout } from "@/app/auth/actions";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface LessonItem {
  id: string;
  title: string;
  order: number;
  moduleId: string;
  completed: boolean;
}

interface ModuleGroup {
  id: string;
  title: string;
  order: number;
  lessons: LessonItem[];
}

interface PathData {
  pillar: Pillar;
  title: string;
  modules: ModuleGroup[];
  totalLessons: number;
  completedLessons: number;
}

interface TrackingEntry {
  metric_type: string;
  metric_value: number | null;
  metric_text: string | null;
}

interface TrackingHistoryEntry extends TrackingEntry {
  entry_date: string;
}

interface IncomeTrackData {
  meta: TrackMeta;
  modules: {
    id: string;
    title: string;
    lessons: { id: string; title: string; order: number; completed: boolean; moduleId: string }[];
  }[];
  totalLessons: number;
  completedLessons: number;
  nextLessonLink: string | null;
}

interface DashboardViewProps {
  fullName: string;
  primaryPath: Pillar;
  secondaryPath: Pillar;
  scores: PillarScores;
  pathData: PathData[];
  plan: string | null;
  recommendationTrack: string | null;
  firstLessonLink: string | null;
  firstModuleTitle: string | null;
  streak: number;
  longestStreak: number;
  todayTracking: TrackingEntry[];
  trackingHistory: TrackingHistoryEntry[];
  weeklyCompleted: number;
  incomeTracks?: IncomeTrackData[];
  /** Currently selected track id (matches incomeTracks[].meta.id). Null = not yet chosen. */
  activeTrackId?: string | null;
  /** When true, internal links become inert (used by /preview/dashboard) */
  previewMode?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Theme tokens (inline because Tailwind v4 doesn't reliably render arbitrary hex)
// ─────────────────────────────────────────────────────────────

const C = {
  paper:   "#FAFAF7",
  ink:     "#0A0A0F",
  border:  "#EAE8E0",
  borderSoft: "#EFEDE6",
  stone50: "#F7F6F2",
  stone100:"#EFEDE6",
  stone200:"#E2DFD4",
  stone300:"#C8C3B2",
  stone400:"#9A937D",
  stone500:"#6B6452",
  stone600:"#48433A",
  stone700:"#2D2A24",
  indigo:  "#4F46E5",
  indigoSoft: "#EEF0FF",
  money:   "#C9A227",
  mind:    "#7C5BD9",
  body:    "#2F8F6F",
  spirit:  "#3B7DD8",
};

const PILLAR_COLOR: Record<Pillar, string> = {
  money: C.money,
  mind: C.mind,
  body: C.body,
  spirit: C.spirit,
};

// ─── Plan-based theming ───
type PlanKey = "core" | "pro" | "ai";

const PLAN_THEMES: Record<PlanKey, {
  label: string;
  accent: string;
  accentSoft: string;
  greeting: string;
  badgeBg: string;
  badgeText: string;
}> = {
  core: {
    label: "Core",
    accent: "#4F46E5",
    accentSoft: "#EEF0FF",
    greeting: "",
    badgeBg: "#EEF0FF",
    badgeText: "#4F46E5",
  },
  pro: {
    label: "Pro",
    accent: "#C9A227",
    accentSoft: "#FBF3DC",
    greeting: "Your premium path is open.",
    badgeBg: "#FBF3DC",
    badgeText: "#7A5F0F",
  },
  ai: {
    label: "AI Careers",
    accent: "#4F46E5",
    accentSoft: "#EDE9FE",
    greeting: "The future belongs to you.",
    badgeBg: "#0A0A0F",
    badgeText: "#FAFAF7",
  },
};

function planKey(plan: string | null | undefined): PlanKey {
  if (plan === "pro") return "pro";
  if (plan === "ai") return "ai";
  return "core";
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function tagalogGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Magandang umaga";
  if (h >= 12 && h < 18) return "Magandang hapon";
  return "Magandang gabi";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function avgScore(scores: PillarScores) {
  const vals = [scores.money, scores.mind, scores.body, scores.spirit];
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

// Pentagon (5 axes) coordinates for radar — center 110,110, outer radius 80
function radarPoint(idx: number, value: number) {
  const angle = (Math.PI * 2 * idx) / 5 - Math.PI / 2;
  const r = (value / 100) * 80;
  return {
    x: 110 + r * Math.cos(angle),
    y: 110 + r * Math.sin(angle),
  };
}

// Build smooth area chart path from values 0-100 normalized
function areaChartPath(values: number[]) {
  if (values.length === 0) return { line: "", area: "" };
  const max = Math.max(...values, 1);
  const w = 600;
  const h = 140;
  const stepX = w / Math.max(values.length - 1, 1);
  const points = values.map((v, i) => ({
    x: i * stepX,
    y: h - (v / max) * (h - 20) - 10,
  }));
  // Build line path
  let line = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    line += ` C${cpX},${prev.y} ${cpX},${curr.y} ${curr.x},${curr.y}`;
  }
  const area = `${line} L${w},${h + 20} L0,${h + 20} Z`;
  return { line, area, points };
}

// Pull next N incomplete lessons across all paths in order
function nextIncompleteLessons(pathData: PathData[], n: number) {
  const out: { id: string; title: string; moduleId: string; pillar: Pillar; pillarLabel: string }[] = [];
  for (const p of pathData) {
    for (const m of p.modules) {
      for (const l of m.lessons) {
        if (!l.completed && out.length < n) {
          out.push({
            id: l.id,
            title: l.title,
            moduleId: m.id,
            pillar: p.pillar,
            pillarLabel: PILLARS[p.pillar].title,
          });
        }
      }
    }
  }
  return out;
}

// Build last 7 days activity from tracking history
function lastSevenDaysActivity(history: TrackingHistoryEntry[]) {
  const days: { date: string; count: number; label: string }[] = [];
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().split("T")[0];
    const count = history.filter((h) => h.entry_date === iso).length;
    days.push({
      date: iso,
      count,
      label: i === 0 ? "Today" : dayLabels[d.getDay()],
    });
  }
  return days;
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────

export default function DashboardView({
  fullName,
  primaryPath,
  secondaryPath,
  scores,
  pathData,
  plan,
  firstLessonLink,
  firstModuleTitle,
  streak,
  longestStreak,
  todayTracking,
  trackingHistory,
  weeklyCompleted,
  incomeTracks = [],
  activeTrackId = null,
  previewMode = false,
}: DashboardViewProps) {
  const pk = planKey(plan);
  const theme = PLAN_THEMES[pk];

  // Split tracks into active vs locked
  const activeTrack = activeTrackId ? incomeTracks.find((t) => t.meta.id === activeTrackId) : null;
  const lockedTracks = activeTrack
    ? incomeTracks.filter((t) => t.meta.id !== activeTrack.meta.id)
    : [];

  // Income tracks unlock gate: user must finish ≥50% of their primary path's Core lessons
  const primaryDataForGate = pathData.find((p) => p.pillar === primaryPath);
  const primaryTotalForGate = primaryDataForGate?.totalLessons ?? 0;
  const primaryCompletedForGate = primaryDataForGate?.completedLessons ?? 0;
  const primaryProgressPct =
    primaryTotalForGate > 0 ? primaryCompletedForGate / primaryTotalForGate : 0;
  const incomeUnlocked = primaryProgressPct >= 0.5;
  const lessonsToUnlock = Math.max(
    0,
    Math.ceil(primaryTotalForGate * 0.5) - primaryCompletedForGate
  );
  // In preview mode, swallow link clicks so the design can be explored without auth
  const safeHref = (href: string | null | undefined) => {
    if (!href) return "#";
    if (previewMode && href.startsWith("/dashboard")) return "#";
    return href;
  };
  const firstName = fullName.split(" ")[0] || "friend";
  const initials = fullName
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "??";

  const totalLessons = pathData.reduce((s, p) => s + p.totalLessons, 0);
  const totalCompleted = pathData.reduce((s, p) => s + p.completedLessons, 0);
  const lessonProgress = totalLessons > 0 ? totalCompleted / totalLessons : 0;

  const lifeScore = avgScore(scores);

  // Money saved (today + lifetime estimate from tracking history)
  const savedToday = todayTracking.find((t) => t.metric_type === "savings")?.metric_value || 0;
  const savedHistorical = trackingHistory
    .filter((h) => h.metric_type === "savings" && h.metric_value != null)
    .reduce((s, h) => s + (h.metric_value || 0), 0);

  // Reflection count
  const reflectionCount = trackingHistory.filter(
    (h) => h.metric_type === "gratitude" && (h.metric_text || h.metric_value)
  ).length;

  // Activity for the area chart — count of any tracking entries per day
  const days = lastSevenDaysActivity(trackingHistory);
  const activityCounts = days.map((d) => d.count);
  const { line: activityLine, area: activityArea, points: activityPoints } = areaChartPath(activityCounts);

  // Pillar radar — 5th axis is "balance" = average
  const radarValues = [
    scores.mind,                // top (idx 0)
    scores.money,               // upper-right (idx 1)
    scores.spirit,              // lower-right (idx 2)
    scores.body,                // lower-left (idx 3)
    avgScore(scores),           // upper-left (idx 4) - balance
  ];
  const radarCoords = radarValues.map((v, i) => radarPoint(i, v));
  const radarPolygonPoints = radarCoords.map((p) => `${p.x},${p.y}`).join(" ");

  // Up next lessons (next 3 incomplete)
  const upNext = nextIncompleteLessons(pathData, 3);

  // Today's hero lesson — first incomplete from primary path
  const primaryData = pathData.find((p) => p.pillar === primaryPath);
  const heroLesson = (() => {
    if (!primaryData) return null;
    for (const m of primaryData.modules) {
      const l = m.lessons.find((x) => !x.completed);
      if (l) return { lesson: l, module: m };
    }
    return null;
  })();
  const heroTitle = heroLesson?.lesson.title || firstModuleTitle || "Begin your journey";
  const heroLink = heroLesson ? `/dashboard/module/${heroLesson.module.id}/lesson/${heroLesson.lesson.id}` : firstLessonLink;
  const heroPillarColor = PILLAR_COLOR[primaryPath];
  const primaryPillarLabel = PILLARS[primaryPath].title;
  const heroLessonNumber = heroLesson
    ? `Lesson ${heroLesson.lesson.order} of 25`
    : `${totalCompleted} of ${totalLessons}`;

  // Recent reflections — last 3 entries from tracking history
  const recentReflections = [...trackingHistory]
    .sort((a, b) => b.entry_date.localeCompare(a.entry_date))
    .slice(0, 3);

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: C.paper,
        color: C.ink,
        fontFamily: "var(--font-sans), Inter, system-ui, sans-serif",
      }}
    >
      {/* ============ SIDEBAR ============ */}
      <aside
        className="hidden lg:flex w-[260px] shrink-0 flex-col px-5 py-6"
        style={{ borderRight: `1px solid ${C.stone200}`, backgroundColor: C.paper }}
      >
        {/* Logo */}
        <Link href={safeHref("/dashboard")} className="flex items-center gap-2 px-2 mb-10">
          <span className="font-display text-3xl font-semibold tracking-tight">
            Once<span style={{ color: C.indigo }}>.</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          <SectionLabel>Today</SectionLabel>

          <NavItem href="#top" active label="Dashboard">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h2l3-9 4 18 3-9h6"/></svg>
          </NavItem>

          <NavItem href="#pillars" label="Pillars">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>
          </NavItem>

          <NavItem href="#lessons" label="Lessons">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </NavItem>

          <NavItem href="#tracking" label="Tracking">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg>
          </NavItem>

          {incomeTracks.length > 0 && (
            <NavItem href="#income" label={pk === "ai" ? "Career tracks" : "Income tracks"}>
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </NavItem>
          )}

          <SectionLabel className="mt-6">Library</SectionLabel>

          <NavItem href={previewMode ? "#" : "/method"} label="Method">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </NavItem>

          <NavItem href={previewMode ? "#" : "/pillars"} label="Pillars overview">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </NavItem>
        </nav>

        {/* User card at bottom */}
        <div className="mt-auto pt-6">
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.stone200}` }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
              style={{ background: `linear-gradient(135deg, ${theme.accent}, ${pk === "ai" ? C.mind : pk === "pro" ? "#8A6B14" : C.mind})` }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate" style={{ color: C.ink }}>
                {fullName}
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span
                  className="font-semibold tracking-wide px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, fontSize: "9px", letterSpacing: "0.04em" }}
                >
                  {theme.label.toUpperCase()}
                </span>
              </div>
            </div>
            {previewMode ? (
              <button
                type="button"
                className="text-xs hover:opacity-100 opacity-60 transition"
                style={{ color: C.stone500 }}
                aria-label="Log out (disabled in preview)"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
              </button>
            ) : (
              <form action={logout}>
                <button
                  type="submit"
                  className="text-xs hover:opacity-100 opacity-60 transition"
                  style={{ color: C.stone500 }}
                  aria-label="Log out"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </aside>

      {/* ============ MAIN ============ */}
      <main className="flex-1 min-w-0" id="top">
        {/* Mobile-only top bar with logo */}
        <div
          className="lg:hidden flex items-center justify-between px-5 py-4 sticky top-0 z-20"
          style={{ borderBottom: `1px solid ${C.stone200}`, backgroundColor: C.paper }}
        >
          <Link href={safeHref("/dashboard")} className="font-display text-2xl font-semibold tracking-tight">
            Once<span style={{ color: C.indigo }}>.</span>
          </Link>
          {previewMode ? (
            <button
              type="button"
              className="text-xs px-3 py-1.5 rounded-full"
              style={{ color: C.stone500, border: `1px solid ${C.stone200}` }}
            >
              Log out
            </button>
          ) : (
            <form action={logout}>
              <button
                type="submit"
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ color: C.stone500, border: `1px solid ${C.stone200}` }}
              >
                Log out
              </button>
            </form>
          )}
        </div>

        {/* Top bar */}
        <header className="px-5 lg:px-10 pt-8 pb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="text-xs" style={{ color: C.stone500 }}>
                {formatDate()}{streak > 0 ? ` · Day ${streak} of your streak` : ""}
              </div>
              {pk !== "core" && (
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
                >
                  {theme.label}
                </span>
              )}
            </div>
            <h1 className="font-display text-[28px] sm:text-[34px] leading-tight font-semibold">
              {tagalogGreeting()}, {firstName}.
            </h1>
            {pk !== "core" && theme.greeting && (
              <div className="text-sm mt-1" style={{ color: theme.accent, fontStyle: "italic" }}>
                {theme.greeting}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.stone200}` }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: C.indigo,
                  boxShadow: streak > 0 ? `0 0 0 4px ${C.indigo}25` : "none",
                }}
              />
              <span className="text-xs" style={{ color: C.stone500 }}>Streak</span>
              <span className="text-sm font-semibold lining-nums tabular-nums">
                {streak} {streak === 1 ? "day" : "days"}
              </span>
            </div>
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-50 transition"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.stone200}` }}
              aria-label="Notifications"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke={C.stone600} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
          </div>
        </header>

        <div className="px-5 lg:px-10 pb-12 space-y-6">

          {/* ===== METRIC ROW ===== */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {/* Card 1 — Lessons */}
            <MetricCard
              label="Lessons completed"
              value={totalCompleted}
              suffix={`/ ${totalLessons}`}
              progress={lessonProgress}
            />

            {/* Card 2 — Money saved */}
            <MetricCard
              label="Money saved"
              value={`₱${(savedHistorical + savedToday).toLocaleString()}`}
              chip={savedToday > 0 ? `+₱${savedToday.toLocaleString()} today` : undefined}
              chipColor={C.money}
              footnote="Tracked through Once."
            />

            {/* Card 3 — Reflections */}
            <MetricCard
              label="Reflections"
              value={reflectionCount}
              footnote={
                weeklyCompleted > 0
                  ? `${weeklyCompleted} lesson${weeklyCompleted === 1 ? "" : "s"} this week`
                  : "Start your first reflection"
              }
            />

            {/* Card 4 — Life score (dark) */}
            <div
              className="p-6 relative overflow-hidden"
              style={{
                backgroundColor: C.ink,
                color: C.paper,
                borderRadius: 20,
              }}
            >
              <div
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full"
                style={{ backgroundColor: theme.accent, opacity: 0.22, filter: "blur(40px)" }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "#C8C3B2" }}>
                    Life score
                  </div>
                  <span
                    className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#FAFAF7" }}
                  >
                    Day {streak || 1}
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <div className="font-display text-5xl font-medium lining-nums tabular-nums">{lifeScore}</div>
                  <div className="text-sm pb-2" style={{ color: "#9A937D" }}>/ 100</div>
                </div>
                <div className="mt-4 text-xs" style={{ color: "#9A937D" }}>
                  {longestStreak > 0
                    ? `Best streak: ${longestStreak} day${longestStreak === 1 ? "" : "s"}`
                    : "Build your first streak today"}
                </div>
              </div>
            </div>
          </section>

          {/* ===== HERO LESSON + PILLAR RADAR ===== */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Today's lesson — spans 2 */}
            <div
              className="lg:col-span-2 overflow-hidden"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: 20 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-5 h-full">
                <div className="sm:col-span-3 p-8 flex flex-col">
                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <span
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${heroPillarColor}15`,
                        color: heroPillarColor,
                      }}
                    >
                      {primaryPillarLabel} pillar
                    </span>
                    <span className="text-xs" style={{ color: C.stone400 }}>{heroLessonNumber}</span>
                  </div>
                  <h2 className="font-display text-[26px] sm:text-[32px] leading-[1.15] font-medium mb-3 max-w-md">
                    {heroTitle}
                  </h2>
                  <p className="text-sm leading-relaxed max-w-md mb-6" style={{ color: C.stone500 }}>
                    {heroLesson
                      ? "Your next step. 12 minutes, one action you can take today."
                      : "Welcome back. Pick up where you left off and keep building momentum."}
                  </p>

                  <div className="mt-auto flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      {heroLink ? (
                        <Link href={safeHref(heroLink)}>
                          <Button
                            className="text-sm font-medium px-5 py-3 rounded-full hover:opacity-90 transition flex items-center gap-2 h-auto"
                            style={{ backgroundColor: C.ink, color: C.paper }}
                          >
                            {heroLesson ? "Start lesson" : "Continue"}
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                          </Button>
                        </Link>
                      ) : null}
                    </div>
                    <div className="text-xs lining-nums tabular-nums" style={{ color: C.stone400 }}>
                      12 min · 1 action step
                    </div>
                  </div>
                </div>

                <div
                  className="sm:col-span-2 relative min-h-[200px] sm:min-h-0"
                  style={{
                    background: `linear-gradient(135deg, ${C.stone50} 0%, #FAF6E8 50%, ${C.paper} 100%)`,
                    borderLeft: `1px solid ${C.stone100}`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PillarHeroIllustration pillar={primaryPath} />
                  </div>
                  <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest" style={{ color: C.stone400 }}>
                    Today&apos;s lesson
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar Radar */}
            <div className="p-6" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: 20 }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: C.stone500 }}>
                    Four pillars
                  </div>
                  <div className="font-display text-xl font-medium mt-1">Where you stand</div>
                </div>
              </div>

              <div className="flex items-center justify-center my-2">
                <svg width="220" height="220" viewBox="0 0 220 220">
                  {/* Grid rings */}
                  <g stroke={C.borderSoft} fill="none" strokeWidth="1">
                    {[80, 60, 40, 20].map((r, i) => {
                      const pts = [0, 1, 2, 3, 4]
                        .map((idx) => {
                          const angle = (Math.PI * 2 * idx) / 5 - Math.PI / 2;
                          return `${110 + r * Math.cos(angle)},${110 + r * Math.sin(angle)}`;
                        })
                        .join(" ");
                      return <polygon key={i} points={pts} />;
                    })}
                  </g>
                  {/* Axes */}
                  <g stroke={C.borderSoft} strokeWidth="1">
                    {[0, 1, 2, 3, 4].map((idx) => {
                      const angle = (Math.PI * 2 * idx) / 5 - Math.PI / 2;
                      return (
                        <line
                          key={idx}
                          x1="110"
                          y1="110"
                          x2={110 + 80 * Math.cos(angle)}
                          y2={110 + 80 * Math.sin(angle)}
                        />
                      );
                    })}
                  </g>
                  {/* Data shape */}
                  <polygon
                    points={radarPolygonPoints}
                    fill={C.indigo}
                    fillOpacity="0.10"
                    stroke={C.indigo}
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  {/* Vertices */}
                  {radarCoords.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={C.indigo} />
                  ))}
                  {/* Labels */}
                  <text x="110" y="20" textAnchor="middle" fontSize="10" fontWeight="500" fill={C.stone500} letterSpacing="0.05em">
                    MIND · {scores.mind}
                  </text>
                  <text x="200" y="80" textAnchor="middle" fontSize="10" fontWeight="500" fill={C.stone500} letterSpacing="0.05em">
                    MONEY · {scores.money}
                  </text>
                  <text x="170" y="190" textAnchor="middle" fontSize="10" fontWeight="500" fill={C.stone500} letterSpacing="0.05em">
                    SPIRIT · {scores.spirit}
                  </text>
                  <text x="50" y="190" textAnchor="middle" fontSize="10" fontWeight="500" fill={C.stone500} letterSpacing="0.05em">
                    BODY · {scores.body}
                  </text>
                  <text x="20" y="80" textAnchor="middle" fontSize="10" fontWeight="500" fill={C.stone500} letterSpacing="0.05em">
                    BALANCE
                  </text>
                </svg>
              </div>

              <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.stone200}, transparent)` }} className="my-3" />

              <p className="text-xs leading-relaxed" style={{ color: C.stone500 }}>
                {weakestPillarMessage(scores)}
              </p>
            </div>
          </section>

          {/* ===== ACTIVITY + UP NEXT ===== */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Activity card */}
            <div
              className="lg:col-span-2 p-6"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: 20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: C.stone500 }}>
                    This week
                  </div>
                  <div className="font-display text-xl font-medium mt-1">Your activity</div>
                </div>
              </div>

              {/* Area chart */}
              <div className="relative h-[160px] mb-2">
                <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="onceAreaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={C.indigo} stopOpacity="0.22" />
                      <stop offset="100%" stopColor={C.indigo} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g stroke={C.borderSoft} strokeDasharray="3,3">
                    <line x1="0" y1="40" x2="600" y2="40" />
                    <line x1="0" y1="80" x2="600" y2="80" />
                    <line x1="0" y1="120" x2="600" y2="120" />
                  </g>
                  {activityCounts.some((c) => c > 0) ? (
                    <>
                      <path d={activityArea} fill="url(#onceAreaGrad)" />
                      <path d={activityLine} fill="none" stroke={C.indigo} strokeWidth="2" strokeLinecap="round" />
                      {activityPoints?.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="3" fill={C.indigo} />
                      ))}
                    </>
                  ) : (
                    <text x="300" y="80" textAnchor="middle" fontSize="12" fill={C.stone400}>
                      Start tracking to see your activity here
                    </text>
                  )}
                </svg>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center">
                {days.map((d, i) => (
                  <div
                    key={i}
                    className="text-[10px] uppercase"
                    style={{
                      color: d.label === "Today" ? C.ink : C.stone400,
                      fontWeight: d.label === "Today" ? 600 : 400,
                    }}
                  >
                    {d.label}
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.stone200}, transparent)` }} className="my-5" />

              {/* Recent reflections */}
              <div className="space-y-3">
                {recentReflections.length > 0 ? (
                  recentReflections.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 -m-2 rounded-lg transition hover:bg-stone-50">
                      <div
                        className="w-1 self-stretch rounded-full"
                        style={{ backgroundColor: heroPillarColor }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5 gap-3">
                          <div className="text-sm font-medium">
                            {r.metric_text || `${r.metric_type.replace("_", " ")}: ${r.metric_value}`}
                          </div>
                          <div className="text-[11px] lining-nums tabular-nums shrink-0" style={{ color: C.stone400 }}>
                            {formatRelativeDate(r.entry_date)}
                          </div>
                        </div>
                        <div className="text-xs capitalize" style={{ color: C.stone500 }}>
                          {r.metric_type.replace("_", " ")}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-sm" style={{ color: C.stone400 }}>
                    Your reflections will appear here as you complete lessons.
                  </div>
                )}
              </div>
            </div>

            {/* Up next */}
            <div className="p-6" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: 20 }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: C.stone500 }}>
                    Up next
                  </div>
                  <div className="font-display text-xl font-medium mt-1">For your week</div>
                </div>
              </div>

              <div className="space-y-4">
                {upNext.length > 0 ? (
                  upNext.map((l, i) => (
                    <div key={l.id}>
                      <Link href={safeHref(`/dashboard/module/${l.moduleId}/lesson/${l.id}`)} className="block group">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${PILLAR_COLOR[l.pillar]}15` }}
                          >
                            <span
                              className="font-display text-base"
                              style={{ color: PILLAR_COLOR[l.pillar] }}
                            >
                              {l.pillarLabel[0]}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium leading-snug group-hover:opacity-70 transition">
                              {l.title}
                            </div>
                            <div className="text-[11px] mt-1 lining-nums tabular-nums" style={{ color: C.stone400 }}>
                              {l.pillarLabel} · 12 min
                            </div>
                          </div>
                        </div>
                      </Link>
                      {i < upNext.length - 1 && (
                        <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.stone200}, transparent)` }} className="my-4" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-sm" style={{ color: C.stone400 }}>
                    You&apos;ve completed every lesson. 🎉
                  </div>
                )}
              </div>

              {primaryData && primaryData.modules[0] && (
                <Link
                  href={safeHref(`/dashboard/module/${primaryData.modules[0].id}`)}
                  className="mt-6 w-full text-sm font-medium hover:opacity-100 opacity-70 py-2 pt-4 transition flex items-center justify-center"
                  style={{ borderTop: `1px solid ${C.stone100}`, color: C.stone600 }}
                >
                  See full library →
                </Link>
              )}
            </div>
          </section>

          {/* ===== INCOME / CAREER TRACKS (Pro & AI plans) ===== */}
          {incomeTracks.length > 0 && (
            <section id="income" className="scroll-mt-8">
              <SectionHeader
                eyebrow={pk === "ai" ? "Your career library" : "Your income paths"}
                title={
                  !incomeUnlocked
                    ? pk === "ai"
                      ? "AI careers — locked"
                      : "Income tracks — locked"
                    : activeTrack
                    ? "Your track"
                    : pk === "ai"
                    ? "Choose your AI career"
                    : "Choose your income path"
                }
                subtitle={
                  !incomeUnlocked
                    ? `Finish at least 50% of your ${PILLARS[primaryPath].title} core lessons to unlock the ${pk === "ai" ? "AI career" : "income"} library.`
                    : activeTrack
                    ? "This is the track you committed to. Stay focused — finishing one beats starting many."
                    : pk === "ai"
                    ? `Six AI career tracks built for the Filipino market. Pick the one that matches your strengths — you can add more later.`
                    : `Four proven income paths. Pick the one that matches your strengths — you can add more later.`
                }
              />

              {/* LOCKED STATE — under 50% Core progress */}
              {!incomeUnlocked && (
                <IncomeLockedTeaser
                  tracks={incomeTracks}
                  lessonsToUnlock={lessonsToUnlock}
                  primaryProgress={primaryProgressPct}
                  pillarTitle={PILLARS[primaryPath].title}
                  tier={pk}
                />
              )}

              {/* CHOSEN TRACK — full hero card */}
              {incomeUnlocked && activeTrack && (
                <ActiveTrackHero track={activeTrack} previewMode={previewMode} />
              )}

              {/* LOCKED TRACKS — small cards with "available as add-on" */}
              {incomeUnlocked && activeTrack && lockedTracks.length > 0 && (
                <div className="mt-8">
                  <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: C.stone400 }}>
                    Other tracks · available as add-on
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lockedTracks.map((tr) => (
                      <LockedTrackCard key={tr.meta.id} track={tr} />
                    ))}
                  </div>
                </div>
              )}

              {/* NO ACTIVE TRACK — "choose your path" grid */}
              {incomeUnlocked && !activeTrack && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                  {incomeTracks.map((tr) => {
                  const progress = tr.totalLessons > 0 ? tr.completedLessons / tr.totalLessons : 0;
                  const started = tr.completedLessons > 0;
                  const finished = tr.totalLessons > 0 && tr.completedLessons === tr.totalLessons;
                  return (
                    <div
                      key={tr.meta.id}
                      className="relative overflow-hidden p-7"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: `1px solid ${C.border}`,
                        borderRadius: 22,
                      }}
                    >
                      {/* Subtle accent halo */}
                      <div
                        className="absolute -right-12 -top-12 w-48 h-48 rounded-full pointer-events-none"
                        style={{ backgroundColor: tr.meta.color, opacity: 0.06, filter: "blur(40px)" }}
                      />
                      <div className="relative">
                        <div className="flex items-start justify-between mb-4 gap-4">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${tr.meta.color}15` }}
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tr.meta.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[10px] uppercase tracking-widest font-medium" style={{ color: C.stone400 }}>
                              {tr.meta.tier === "ai" ? "AI Career" : "Income"}
                            </div>
                            <div className="text-sm font-semibold lining-nums tabular-nums mt-0.5" style={{ color: tr.meta.color }}>
                              {tr.meta.earning}
                            </div>
                          </div>
                        </div>

                        <h3 className="font-display text-2xl font-medium mb-1.5 leading-tight">
                          {tr.meta.name}
                        </h3>
                        <p className="text-sm mb-1" style={{ color: C.stone600 }}>
                          {tr.meta.tagline}
                        </p>
                        <p className="text-xs leading-relaxed mb-5" style={{ color: C.stone500 }}>
                          {tr.meta.description}
                        </p>

                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="text-[11px] uppercase tracking-widest font-medium" style={{ color: C.stone500 }}>
                              {finished ? "Completed" : started ? "In progress" : "Not started"}
                            </div>
                            <div className="text-xs font-semibold lining-nums tabular-nums" style={{ color: C.ink }}>
                              {tr.completedLessons} / {tr.totalLessons}
                            </div>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.stone100 }}>
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${progress * 100}%`, backgroundColor: tr.meta.color }}
                            />
                          </div>
                        </div>

                        {/* Modules preview */}
                        <div className="mb-5 space-y-1.5">
                          {tr.modules.slice(0, 5).map((mod, i) => {
                            const modCompleted = mod.lessons.filter((l) => l.completed).length;
                            const modDone = modCompleted === mod.lessons.length && mod.lessons.length > 0;
                            return (
                              <div key={mod.id} className="flex items-center gap-2.5 text-xs">
                                <span
                                  className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[8px] font-bold"
                                  style={{
                                    backgroundColor: modDone ? tr.meta.color : "transparent",
                                    border: modDone ? "none" : `1.5px solid ${C.stone300}`,
                                    color: "#FFFFFF",
                                  }}
                                >
                                  {modDone ? "✓" : i + 1}
                                </span>
                                <span
                                  className="truncate flex-1"
                                  style={{ color: modDone ? C.stone400 : C.stone600 }}
                                >
                                  {mod.title}
                                </span>
                                <span className="text-[10px] lining-nums tabular-nums shrink-0" style={{ color: C.stone400 }}>
                                  {modCompleted}/{mod.lessons.length}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* CTA — pick this path */}
                        <PickPathButton trackId={tr.meta.id} previewMode={previewMode} />
                      </div>
                    </div>
                  );
                })}
                </div>
              )}
            </section>
          )}

          {/* ===== PILLARS DETAIL ===== */}
          <section id="pillars" className="scroll-mt-8">
            <SectionHeader
              eyebrow="Four pillars"
              title="The full picture"
              subtitle="Each score reflects how you answered the diagnostic. Lower scores get more lessons, higher scores get refinements."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-5">
              {(["money", "mind", "body", "spirit"] as Pillar[]).map((p) => {
                const isPrimary = p === primaryPath;
                const isSecondary = p === secondaryPath && p !== primaryPath;
                const score = scores[p];
                const meta = PILLARS[p];
                const data = pathData.find((x) => x.pillar === p);
                return (
                  <div
                    key={p}
                    className="p-6 relative overflow-hidden"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: `1px solid ${isPrimary ? PILLAR_COLOR[p] + "55" : C.border}`,
                      borderRadius: 20,
                    }}
                  >
                    {(isPrimary || isSecondary) && (
                      <div
                        className="absolute top-0 right-0 text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1"
                        style={{
                          backgroundColor: PILLAR_COLOR[p],
                          color: "#FFFFFF",
                          borderBottomLeftRadius: 10,
                        }}
                      >
                        {isPrimary ? "Primary" : "Secondary"}
                      </div>
                    )}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${PILLAR_COLOR[p]}15` }}
                    >
                      <span className="font-display text-2xl font-semibold" style={{ color: PILLAR_COLOR[p] }}>
                        {meta.title[0]}
                      </span>
                    </div>
                    <div className="font-display text-xl font-medium mb-1">{meta.title}</div>
                    <div className="flex items-end gap-1.5 mb-3">
                      <div className="font-display text-3xl font-medium lining-nums tabular-nums">{score}</div>
                      <div className="text-xs pb-1" style={{ color: C.stone400 }}>/ 100</div>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden mb-4" style={{ backgroundColor: C.stone100 }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${score}%`, backgroundColor: PILLAR_COLOR[p] }}
                      />
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: C.stone500 }}>
                      {meta.description}
                    </p>
                    {data && (
                      <div className="mt-4 text-[11px] lining-nums tabular-nums" style={{ color: C.stone400 }}>
                        {data.completedLessons} / {data.totalLessons} lessons completed
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ===== LESSONS — full module list ===== */}
          <section id="lessons" className="scroll-mt-8">
            <SectionHeader
              eyebrow="Your library"
              title="All lessons"
              subtitle={`${totalCompleted} of ${totalLessons} completed across your paths.`}
            />

            <div className="mt-5 space-y-6">
              {pathData.map((path) => (
                <div
                  key={path.pillar}
                  className="p-6"
                  style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: 20 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${PILLAR_COLOR[path.pillar]}15` }}
                    >
                      <span className="font-display text-lg font-semibold" style={{ color: PILLAR_COLOR[path.pillar] }}>
                        {PILLARS[path.pillar].title[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-display text-xl font-medium">{path.title} path</div>
                      <div className="text-xs lining-nums tabular-nums" style={{ color: C.stone500 }}>
                        {path.completedLessons} / {path.totalLessons} lessons
                      </div>
                    </div>
                    <div
                      className="text-xs font-medium lining-nums tabular-nums px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: path.pillar === primaryPath ? C.ink : C.stone100,
                        color: path.pillar === primaryPath ? C.paper : C.stone600,
                      }}
                    >
                      {path.totalLessons > 0 ? Math.round((path.completedLessons / path.totalLessons) * 100) : 0}%
                    </div>
                  </div>

                  <div className="space-y-4">
                    {path.modules.map((mod) => {
                      const modCompleted = mod.lessons.filter((l) => l.completed).length;
                      const modTotal = mod.lessons.length;
                      const modDone = modCompleted === modTotal && modTotal > 0;
                      return (
                        <div key={mod.id}>
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center lining-nums tabular-nums"
                                style={{
                                  backgroundColor: modDone ? `${PILLAR_COLOR[path.pillar]}20` : C.stone100,
                                  color: modDone ? PILLAR_COLOR[path.pillar] : C.stone500,
                                }}
                              >
                                {modDone ? "✓" : mod.order}
                              </span>
                              <div className="text-sm font-medium">{mod.title}</div>
                            </div>
                            <div className="text-[11px] lining-nums tabular-nums" style={{ color: C.stone400 }}>
                              {modCompleted}/{modTotal}
                            </div>
                          </div>
                          <div className="space-y-1 pl-7">
                            {mod.lessons.map((lesson) => (
                              <Link
                                key={lesson.id}
                                href={safeHref(`/dashboard/module/${mod.id}/lesson/${lesson.id}`)}
                                className="flex items-center justify-between py-2 px-3 -mx-3 rounded-lg transition hover:bg-stone-50"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <span
                                    className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[8px] font-bold"
                                    style={{
                                      backgroundColor: lesson.completed ? PILLAR_COLOR[path.pillar] : "transparent",
                                      border: lesson.completed ? "none" : `1.5px solid ${C.stone300}`,
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    {lesson.completed ? "✓" : ""}
                                  </span>
                                  <span
                                    className="text-sm truncate"
                                    style={{
                                      color: lesson.completed ? C.stone500 : C.ink,
                                      textDecoration: lesson.completed ? "line-through" : "none",
                                    }}
                                  >
                                    {lesson.title}
                                  </span>
                                </div>
                                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke={C.stone300} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M9 18l6-6-6-6" />
                                </svg>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===== TRACKING ===== */}
          <section id="tracking" className="scroll-mt-8">
            <SectionHeader
              eyebrow="Daily check-in"
              title="Track today"
              subtitle="What you measure, you move. Two minutes a day."
            />
            <DailyTrackingCard
              primaryPath={primaryPath}
              todayTracking={todayTracking}
              previewMode={previewMode}
            />
          </section>

          {/* ===== FOOTER NOTE ===== */}
          {streak > 0 && (
            <section
              className="p-6 flex items-center justify-between flex-wrap gap-4"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: 20 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: C.indigoSoft }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={C.indigo} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                </div>
                <div>
                  <div className="font-display text-base font-medium">A small note from Once.</div>
                  <div className="text-xs mt-0.5" style={{ color: C.stone500 }}>
                    {streakNote(streak)}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`text-[10px] font-medium uppercase tracking-widest px-3 mb-2 ${className}`}
      style={{ color: C.stone400 }}
    >
      {children}
    </div>
  );
}

function PickPathButton({ trackId, previewMode }: { trackId: string; previewMode: boolean }) {
  const [pending, setPending] = useState(false);
  async function pick() {
    if (previewMode) {
      alert("Preview mode — selection is disabled.");
      return;
    }
    setPending(true);
    try {
      const { setActiveTrack } = await import("@/app/dashboard/track-actions");
      await setActiveTrack(trackId);
      // revalidatePath in action will refresh the dashboard
    } finally {
      setPending(false);
    }
  }
  return (
    <button
      type="button"
      onClick={pick}
      disabled={pending}
      className="w-full rounded-full text-sm font-medium py-3 hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
      style={{ backgroundColor: C.ink, color: C.paper }}
    >
      {pending ? "Saving…" : "Pick this path"}
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  );
}

function ActiveTrackHero({ track, previewMode }: { track: IncomeTrackData; previewMode: boolean }) {
  const progress = track.totalLessons > 0 ? track.completedLessons / track.totalLessons : 0;
  const finished = track.totalLessons > 0 && track.completedLessons === track.totalLessons;
  const started = track.completedLessons > 0;
  const safe = (href: string | null) => (previewMode && href ? "#" : href);

  return (
    <div
      className="relative overflow-hidden mt-5"
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${track.meta.color}40`,
        borderRadius: 24,
      }}
    >
      <div
        className="absolute -right-20 -top-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ backgroundColor: track.meta.color, opacity: 0.08, filter: "blur(60px)" }}
      />
      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0">
        {/* Left — meta + CTA */}
        <div className="lg:col-span-3 p-8">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${track.meta.color}18` }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={track.meta.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-medium" style={{ color: C.stone400 }}>
                {track.meta.tier === "ai" ? "AI Career Track" : "Income Track"}
              </div>
              <div className="text-sm font-semibold lining-nums tabular-nums" style={{ color: track.meta.color }}>
                {track.meta.earning}
              </div>
            </div>
          </div>

          <h3 className="font-display text-[32px] leading-tight font-semibold mb-2">
            {track.meta.name}
          </h3>
          <p className="text-base mb-2" style={{ color: C.stone600 }}>
            {track.meta.tagline}
          </p>
          <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: C.stone500 }}>
            {track.meta.description}
          </p>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] uppercase tracking-widest font-medium" style={{ color: C.stone500 }}>
                {finished ? "Completed" : started ? "In progress" : "Ready to start"}
              </div>
              <div className="text-sm font-semibold lining-nums tabular-nums" style={{ color: C.ink }}>
                {track.completedLessons} / {track.totalLessons} lessons
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: C.stone100 }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress * 100}%`, backgroundColor: track.meta.color }}
              />
            </div>
          </div>

          {track.nextLessonLink ? (
            <Link href={safe(track.nextLessonLink) || "#"}>
              <Button
                className="rounded-full text-sm font-medium px-6 py-3 hover:opacity-90 transition flex items-center gap-2 h-auto"
                style={{ backgroundColor: C.ink, color: C.paper }}
              >
                {started ? "Continue track" : "Start track"}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Button>
            </Link>
          ) : (
            <div
              className="rounded-full text-sm font-medium py-3 px-5 inline-block"
              style={{ backgroundColor: C.stone100, color: C.stone500 }}
            >
              ✓ Track completed
            </div>
          )}
        </div>

        {/* Right — module list */}
        <div className="lg:col-span-2 p-8 lg:border-l" style={{ borderColor: C.stone100, backgroundColor: C.stone50 }}>
          <div className="text-[10px] uppercase tracking-widest font-medium mb-4" style={{ color: C.stone500 }}>
            5 Modules · 25 Lessons
          </div>
          <div className="space-y-2.5">
            {track.modules.map((mod, i) => {
              const modCompleted = mod.lessons.filter((l) => l.completed).length;
              const modTotal = mod.lessons.length;
              const modDone = modCompleted === modTotal && modTotal > 0;
              const modActive = !modDone && mod.lessons.some((l) => !l.completed);
              return (
                <Link
                  key={mod.id}
                  href={safe(`/dashboard/module/${mod.id}`) || "#"}
                  className="flex items-center gap-3 group"
                >
                  <span
                    className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold"
                    style={{
                      backgroundColor: modDone ? track.meta.color : "#FFFFFF",
                      border: modDone ? "none" : `1.5px solid ${C.stone200}`,
                      color: modDone ? "#FFFFFF" : C.stone500,
                    }}
                  >
                    {modDone ? "✓" : i + 1}
                  </span>
                  <span
                    className="text-sm flex-1 group-hover:text-black transition truncate"
                    style={{
                      color: modDone ? C.stone400 : modActive ? C.ink : C.stone600,
                      textDecoration: modDone ? "line-through" : "none",
                    }}
                  >
                    {mod.title}
                  </span>
                  <span className="text-[10px] lining-nums tabular-nums shrink-0" style={{ color: C.stone400 }}>
                    {modCompleted}/{modTotal}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function IncomeLockedTeaser({
  tracks,
  lessonsToUnlock,
  primaryProgress,
  pillarTitle,
  tier,
}: {
  tracks: IncomeTrackData[];
  lessonsToUnlock: number;
  primaryProgress: number;
  pillarTitle: string;
  tier: PlanKey;
}) {
  return (
    <div className="mt-5 space-y-5">
      {/* Lock card with progress + CTA */}
      <div
        className="relative overflow-hidden p-7 lg:p-8"
        style={{
          backgroundColor: "#FFFFFF",
          border: `1px dashed ${C.stone300}`,
          borderRadius: 22,
        }}
      >
        <div
          className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ backgroundColor: C.indigo, opacity: 0.06, filter: "blur(50px)" }}
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: C.stone100 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={C.stone500} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-medium" style={{ color: C.stone500 }}>
                  Locked · finish core first
                </div>
                <div className="font-display text-xl font-medium mt-0.5">
                  {tier === "ai" ? "AI career library" : "Income library"}
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-md" style={{ color: C.stone600 }}>
              {lessonsToUnlock === 0 ? (
                <>You&apos;re right at the threshold. One more {pillarTitle} lesson and the {tier === "ai" ? "AI careers" : "income tracks"} unlock.</>
              ) : (
                <>
                  Complete <span style={{ color: C.ink, fontWeight: 600 }}>{lessonsToUnlock} more {pillarTitle} {lessonsToUnlock === 1 ? "lesson" : "lessons"}</span> to unlock {tier === "ai" ? "the AI career library" : "your income tracks"}. The foundation comes first — then the income skills make sense.
                </>
              )}
            </p>

            <div className="mb-2 flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: C.stone500 }}>
                {pillarTitle} progress
              </div>
              <div className="text-xs font-semibold lining-nums tabular-nums">
                {Math.round(primaryProgress * 100)}% / 50%
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden relative" style={{ backgroundColor: C.stone100 }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, primaryProgress * 100)}%`, backgroundColor: C.ink }}
              />
              {/* 50% marker */}
              <div
                className="absolute top-0 bottom-0 w-px"
                style={{ left: "50%", backgroundColor: C.indigo, opacity: 0.6 }}
              />
            </div>
            <div className="mt-1 text-[10px]" style={{ color: C.stone400 }}>
              ↑ Unlock threshold
            </div>
          </div>

          {/* Right — small icon stack of locked tracks */}
          <div className="lg:col-span-1">
            <div className="text-[10px] uppercase tracking-widest font-medium mb-3" style={{ color: C.stone500 }}>
              Waiting for you
            </div>
            <div className="space-y-2">
              {tracks.slice(0, 5).map((tr) => (
                <div key={tr.meta.id} className="flex items-center gap-2.5 opacity-60">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${tr.meta.color}15` }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={tr.meta.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div className="text-xs truncate" style={{ color: C.stone600 }}>
                    {tr.meta.name}
                  </div>
                </div>
              ))}
              {tracks.length > 5 && (
                <div className="text-[10px] pl-8" style={{ color: C.stone400 }}>
                  + {tracks.length - 5} more
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LockedTrackCard({ track }: { track: IncomeTrackData }) {
  return (
    <div
      className="relative p-5"
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px dashed ${C.stone200}`,
        borderRadius: 16,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 opacity-60"
          style={{ backgroundColor: `${track.meta.color}15` }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={track.meta.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium leading-tight" style={{ color: C.stone600 }}>
            {track.meta.name}
          </div>
          <div className="text-xs mt-1 lining-nums tabular-nums" style={{ color: C.stone400 }}>
            {track.meta.earning}
          </div>
          <div className="text-[10px] mt-3 uppercase tracking-widest font-medium" style={{ color: C.stone400 }}>
            Coming soon · Add-on
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="pt-4">
      <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: C.stone500 }}>
        {eyebrow}
      </div>
      <h2 className="font-display text-[26px] leading-tight font-semibold mt-1">{title}</h2>
      {subtitle && (
        <p className="text-sm mt-1 max-w-xl" style={{ color: C.stone500 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

const TRACKING_FIELDS: Record<Pillar, { type: string; label: string; placeholder: string; unit: string; isText?: boolean }[]> = {
  money: [
    { type: "savings", label: "Saved today", placeholder: "500", unit: "₱" },
    { type: "income", label: "Earned today", placeholder: "0", unit: "₱" },
  ],
  mind: [
    { type: "reading_minutes", label: "Learning time", placeholder: "15", unit: "min" },
    { type: "focus_score", label: "Focus today (1-10)", placeholder: "7", unit: "/10" },
  ],
  body: [
    { type: "sleep_hours", label: "Sleep last night", placeholder: "7", unit: "hrs" },
    { type: "water_glasses", label: "Water intake", placeholder: "8", unit: "glasses" },
    { type: "weight", label: "Weight", placeholder: "65", unit: "kg" },
  ],
  spirit: [
    { type: "gratitude", label: "Grateful for", placeholder: "Something good today…", unit: "", isText: true },
    { type: "mood_score", label: "Mood (1-10)", placeholder: "7", unit: "/10" },
  ],
};

function DailyTrackingCard({
  primaryPath,
  todayTracking,
  previewMode,
}: {
  primaryPath: Pillar;
  todayTracking: TrackingEntry[];
  previewMode: boolean;
}) {
  const fields = TRACKING_FIELDS[primaryPath] || TRACKING_FIELDS.money;
  const initialValues: Record<string, string> = {};
  for (const f of fields) {
    const ex = todayTracking.find((t) => t.metric_type === f.type);
    initialValues[f.type] = ex ? (f.isText ? ex.metric_text || "" : String(ex.metric_value || "")) : "";
  }
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(todayTracking.length > 0 ? new Date() : null);

  async function handleSave() {
    if (previewMode) {
      setSavedAt(new Date());
      return;
    }
    setSaving(true);
    try {
      const { saveTrackingEntry } = await import("@/app/dashboard/tracking-actions");
      for (const f of fields) {
        const v = values[f.type];
        if (!v) continue;
        await saveTrackingEntry(f.type, f.isText ? null : Number(v), f.isText ? v : null);
      }
      setSavedAt(new Date());
    } finally {
      setSaving(false);
    }
  }

  const anyFilled = fields.some((f) => values[f.type]);

  return (
    <div
      className="p-6 mt-5"
      style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: 20 }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-sm font-medium">Today&apos;s metrics</div>
          <div className="text-xs mt-0.5" style={{ color: C.stone500 }}>
            {PILLARS[primaryPath].title} pillar focus
          </div>
        </div>
        {savedAt && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: C.body }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Saved
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((f) => (
          <label key={f.type} className="flex flex-col gap-2">
            <span className="text-xs font-medium" style={{ color: C.stone600 }}>
              {f.label}
            </span>
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
              style={{ border: `1px solid ${C.stone200}`, backgroundColor: C.stone50 }}
            >
              <input
                type={f.isText ? "text" : "number"}
                inputMode={f.isText ? "text" : "numeric"}
                value={values[f.type]}
                onChange={(e) => setValues({ ...values, [f.type]: e.target.value })}
                placeholder={f.placeholder}
                className="bg-transparent outline-none flex-1 text-sm"
                style={{ color: C.ink }}
              />
              {f.unit && (
                <span className="text-xs lining-nums tabular-nums" style={{ color: C.stone400 }}>
                  {f.unit}
                </span>
              )}
            </div>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
        <div className="text-[11px]" style={{ color: C.stone400 }}>
          {previewMode ? "Preview mode — saving is disabled" : "Updates throughout the day. Take your time."}
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !anyFilled}
          className="text-sm font-medium px-5 py-2.5 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: C.ink, color: C.paper }}
        >
          {saving ? "Saving…" : savedAt ? "Update" : "Save check-in"}
        </button>
      </div>
    </div>
  );
}

function NavItem({
  children,
  label,
  href,
  active = false,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  const className = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition";
  const style = {
    backgroundColor: active ? C.ink : "transparent",
    color: active ? C.paper : C.stone700,
  };
  const inner = (
    <>
      <span style={{ color: active ? C.paper : C.stone500 }}>{children}</span>
      {label}
    </>
  );
  // Hash links scroll within the page — use plain anchor, not Next.js Link
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} style={style}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {inner}
    </Link>
  );
}

function MetricCard({
  label,
  value,
  suffix,
  chip,
  chipColor,
  progress,
  footnote,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  chip?: string;
  chipColor?: string;
  progress?: number;
  footnote?: string;
}) {
  return (
    <div
      className="p-6"
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${C.border}`,
        borderRadius: 20,
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: C.stone500 }}>
          {label}
        </div>
        {chip && (
          <span
            className="text-[10px] font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${chipColor || C.indigo}15`, color: chipColor || C.indigo }}
          >
            {chip}
          </span>
        )}
      </div>
      <div className="flex items-end gap-2">
        <div className="font-display text-5xl font-medium lining-nums tabular-nums">{value}</div>
        {suffix && <div className="text-sm pb-2 lining-nums tabular-nums" style={{ color: C.stone400 }}>{suffix}</div>}
      </div>
      {progress !== undefined && (
        <div className="mt-4 h-1 rounded-full overflow-hidden" style={{ backgroundColor: C.stone100 }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%`, backgroundColor: C.ink }}
          />
        </div>
      )}
      {footnote && (
        <div className="mt-4 text-xs" style={{ color: C.stone500 }}>
          {footnote}
        </div>
      )}
    </div>
  );
}

function PillarHeroIllustration({ pillar }: { pillar: Pillar }) {
  if (pillar === "money") {
    return (
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        <ellipse cx="100" cy="155" rx="62" ry="10" fill={C.money} opacity="0.18" />
        <ellipse cx="100" cy="148" rx="62" ry="10" fill={C.money} opacity="0.28" />
        <ellipse cx="100" cy="140" rx="62" ry="10" fill={C.money} opacity="0.4" />
        <ellipse cx="100" cy="132" rx="62" ry="10" fill={C.money} opacity="0.55" />
        <ellipse cx="100" cy="124" rx="62" ry="10" fill="#D4B339" opacity="0.7" />
        <ellipse cx="100" cy="116" rx="62" ry="10" fill="#E0C24E" />
        <ellipse cx="100" cy="106" rx="62" ry="10" fill={C.paper} stroke={C.money} strokeWidth="1.5" />
        <text x="100" y="111" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="22" fontWeight="600" fill={C.ink}>₱</text>
        <circle cx="55" cy="60" r="14" fill={C.paper} stroke={C.money} strokeWidth="1.2" />
        <text x="55" y="65" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="13" fontWeight="600" fill={C.money}>₱</text>
        <circle cx="148" cy="48" r="11" fill={C.paper} stroke={C.money} strokeWidth="1.2" />
        <text x="148" y="52" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="11" fontWeight="600" fill={C.money}>₱</text>
      </svg>
    );
  }
  if (pillar === "mind") {
    return (
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="55" fill={C.mind} opacity="0.08" />
        <circle cx="100" cy="100" r="40" fill={C.mind} opacity="0.12" />
        <path d="M70 110 Q85 75 100 90 Q115 105 130 80" stroke={C.mind} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="100" cy="100" r="4" fill={C.mind} />
        <circle cx="70" cy="110" r="3" fill={C.mind} />
        <circle cx="130" cy="80" r="3" fill={C.mind} />
        <circle cx="50" cy="50" r="2" fill={C.mind} opacity="0.4" />
        <circle cx="160" cy="60" r="2" fill={C.mind} opacity="0.4" />
        <circle cx="155" cy="155" r="2" fill={C.mind} opacity="0.4" />
      </svg>
    );
  }
  if (pillar === "body") {
    return (
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="55" fill={C.body} opacity="0.08" />
        <path d="M100 60 Q70 90 80 130 Q100 150 120 130 Q130 90 100 60Z" fill={C.body} opacity="0.18" />
        <path d="M100 70 Q80 95 88 125 Q100 140 112 125 Q120 95 100 70Z" fill={C.body} opacity="0.4" />
        <circle cx="100" cy="100" r="4" fill={C.body} />
        <circle cx="60" cy="80" r="2" fill={C.body} opacity="0.4" />
        <circle cx="145" cy="100" r="2" fill={C.body} opacity="0.4" />
      </svg>
    );
  }
  // spirit
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="60" fill={C.spirit} opacity="0.06" />
      <circle cx="100" cy="100" r="42" fill={C.spirit} opacity="0.1" />
      <circle cx="100" cy="100" r="24" fill={C.spirit} opacity="0.2" />
      <circle cx="100" cy="100" r="6" fill={C.spirit} />
      <line x1="100" y1="40" x2="100" y2="60" stroke={C.spirit} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="100" y1="140" x2="100" y2="160" stroke={C.spirit} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="100" x2="60" y2="100" stroke={C.spirit} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="140" y1="100" x2="160" y2="100" stroke={C.spirit} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Plain helpers
// ─────────────────────────────────────────────────────────────

function weakestPillarMessage(scores: PillarScores) {
  const entries = Object.entries(scores) as [Pillar, number][];
  const sorted = entries.sort((a, b) => a[1] - b[1]);
  const [weakest, value] = sorted[0];
  if (value >= 80) return "All four pillars are strong. Keep refining the edges.";
  return `${PILLARS[weakest].title} is your lowest pillar. Today's lesson is built to lift it.`;
}

function formatRelativeDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isToday = d.toDateString() === today.toDateString();
  const isYesterday = d.toDateString() === yesterday.toDateString();
  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function streakNote(streak: number) {
  if (streak >= 30) return `${streak} days. You've built something most people only talk about.`;
  if (streak >= 14) return `${streak} days in a row. You're past the hard part. Keep going.`;
  if (streak >= 7) return `${streak} days. One full week. Most people never get here.`;
  if (streak >= 3) return `${streak} days. You're past the resistance — momentum is yours.`;
  return `Day ${streak}. Showing up is how lives change. Quietly. Daily.`;
}
