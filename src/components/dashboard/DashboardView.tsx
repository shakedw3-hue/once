"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PILLARS } from "@/lib/constants";
import { ModuleIllustration, PillarBadge } from "@/components/ui/illustrations";
import type { Pillar, PillarScores } from "@/types/database";
import { logout } from "@/app/auth/actions";

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
}

// ─── Plan-based theme system ───
const PLAN_THEMES = {
  core: {
    bgColor: "",
    headerBg: "",
    accent: "#4F46E5",
    accentLight: "bg-primary/10",
    accentText: "text-primary",
    badgeBg: "bg-primary/10 text-primary",
    cardBorder: "",
    label: "Core",
    greeting: "",
  },
  pro: {
    bgColor: "#0C0A09",
    headerBg: "rgba(12,10,9,0.95)",
    accent: "#F59E0B",
    accentLight: "bg-amber-500/10",
    accentText: "text-amber-400",
    badgeBg: "bg-amber-500/15 text-amber-400",
    cardBorder: "border-amber-900/30",
    label: "Pro",
    greeting: "Your premium path is waiting.",
  },
  ai: {
    bgColor: "#050714",
    headerBg: "rgba(5,7,20,0.95)",
    accent: "#3B82F6",
    accentLight: "bg-blue-500/10",
    accentText: "text-blue-400",
    badgeBg: "bg-blue-500/15 text-blue-400",
    cardBorder: "border-blue-900/30",
    label: "AI Careers",
    greeting: "The future belongs to you.",
  },
};

const INCOME_TRACKS = [
  { id: "social-media", name: "Social Media Management", desc: "Manage Facebook and Instagram for local businesses.", earning: "₱15,000–₱40,000/month", match: ["mind"] as Pillar[] },
  { id: "ecommerce", name: "Shopee/Lazada E-Commerce", desc: "Find products, set up your store, and sell online.", earning: "₱10,000–₱50,000/month", match: ["money"] as Pillar[] },
  { id: "freelancing", name: "Freelancing", desc: "Find clients, build a portfolio, earn on your terms.", earning: "₱15,000–₱60,000/month", match: ["body", "spirit"] as Pillar[] },
];

export default function DashboardView({
  fullName,
  primaryPath,
  secondaryPath,
  scores,
  pathData,
  plan,
  recommendationTrack,
  firstLessonLink,
  firstModuleTitle,
  streak,
  longestStreak,
  todayTracking,
  trackingHistory,
  weeklyCompleted,
}: DashboardViewProps) {
  const primary = PILLARS[primaryPath];
  const firstName = fullName.split(" ")[0] || "there";
  const isPro = plan === "pro" || plan === "ai";
  const isAI = plan === "ai";
  const t = PLAN_THEMES[plan as keyof typeof PLAN_THEMES] || PLAN_THEMES.core;
  const isDark = plan === "pro" || plan === "ai";

  const primaryData = pathData.find((p) => p.pillar === primaryPath);
  const secondaryData = pathData.find((p) => p.pillar === secondaryPath);

  const totalLessons = pathData.reduce((sum, p) => sum + p.totalLessons, 0);
  const totalCompleted = pathData.reduce((sum, p) => sum + p.completedLessons, 0);
  const hasStarted = totalCompleted > 0;

  const primaryTotal = primaryData?.totalLessons ?? 0;
  const primaryCompleted = primaryData?.completedLessons ?? 0;
  const primaryProgress = primaryTotal > 0 ? Math.round((primaryCompleted / primaryTotal) * 100) : 0;
  const incomeUnlocked = primaryProgress >= 50;

  return (
    <div
      className={`relative min-h-screen ${isDark ? "text-white" : ""}`}
      style={isDark ? { backgroundColor: t.bgColor } : undefined}
    >
      {/* Premium background effects */}
      {isAI && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full blur-[120px]" style={{ backgroundColor: "rgba(59,130,246,0.04)" }} />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full blur-[100px]" style={{ backgroundColor: "rgba(139,92,246,0.04)" }} />
        </div>
      )}
      {plan === "pro" && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 right-1/3 h-[500px] w-[500px] rounded-full blur-[120px]" style={{ backgroundColor: "rgba(245,158,11,0.04)" }} />
        </div>
      )}

      {/* Nav */}
      <header
        className={`sticky top-0 z-10 backdrop-blur-sm border-b ${isDark ? "border-white/10" : ""}`}
        style={isDark ? { backgroundColor: t.headerBg } : undefined}
      >
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
          <Link href="/dashboard" className="font-display text-xl font-semibold tracking-[-0.04em]">
            <span className={isDark ? "text-white" : "text-foreground"}>Once</span>
            <span style={{ color: t.accent }}>.</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${t.badgeBg}`}>
              {t.label}
            </span>
            <form action={logout}>
              <Button variant="ghost" size="sm" type="submit" className={isDark ? "text-white/60 hover:text-white" : ""}>
                Log out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="relative z-[1] mx-auto max-w-3xl px-5 py-8 sm:py-10">

        {/* Greeting */}
        <div className="mb-6">
          <h1 className={`mb-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl ${isDark ? "text-white" : ""}`}>
            {hasStarted ? `Welcome back, ${firstName}.` : `${firstName}, your path starts here.`}
          </h1>
          <p className={isDark ? "text-sm text-white/50" : "text-sm text-muted-foreground"}>
            {isPro && !hasStarted ? t.greeting : `${totalCompleted} of ${totalLessons} lessons completed.`}
          </p>
        </div>

        {/* Streak + Weekly Message */}
        {hasStarted && (
          <div className="mb-6 flex flex-wrap gap-3">
            {/* Streak */}
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 ${isDark ? "bg-white/[0.06]" : "bg-muted"}`}>
              <span className="text-lg">🔥</span>
              <div>
                <span className={`text-sm font-bold ${isDark ? "text-white" : ""}`}>{streak}</span>
                <span className={`text-xs ml-1 ${isDark ? "text-white/50" : "text-muted-foreground"}`}>
                  {streak === 1 ? "day" : "days"}
                </span>
              </div>
              {streak >= 3 && <span className="text-[10px]">⭐</span>}
              {streak >= 7 && <span className="text-[10px]">🏆</span>}
              {streak >= 14 && <span className="text-[10px]">💎</span>}
              {streak >= 30 && <span className="text-[10px]">👑</span>}
            </div>

            {/* Weekly progress */}
            {weeklyCompleted > 0 && (
              <div className={`flex items-center gap-2 rounded-full px-4 py-2 ${isDark ? "bg-white/[0.06]" : "bg-muted"}`}>
                <span className="text-lg">📚</span>
                <span className={`text-xs ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
                  {weeklyCompleted} this week
                </span>
              </div>
            )}

            {/* Longest streak */}
            {longestStreak > streak && longestStreak >= 3 && (
              <div className={`flex items-center gap-2 rounded-full px-4 py-2 ${isDark ? "bg-white/[0.06]" : "bg-muted"}`}>
                <span className={`text-xs ${isDark ? "text-white/40" : "text-muted-foreground"}`}>
                  Best: {longestStreak} days
                </span>
              </div>
            )}
          </div>
        )}

        {/* Streak milestone message */}
        {streak > 0 && streak < 3 && (
          <div className={`mb-6 rounded-lg px-4 py-3 text-xs ${isDark ? "bg-white/[0.04] text-white/50" : "bg-muted/50 text-muted-foreground"}`}>
            🔥 {3 - streak} more day{3 - streak !== 1 ? "s" : ""} to earn your first streak badge!
          </div>
        )}
        {streak === 3 && (
          <div className={`mb-6 rounded-lg px-4 py-3 text-xs ${isDark ? "bg-amber-500/10 text-amber-300" : "bg-amber-50 text-amber-800"}`}>
            ⭐ 3-day streak! You are building momentum. Keep going.
          </div>
        )}
        {streak === 7 && (
          <div className={`mb-6 rounded-lg px-4 py-3 text-xs ${isDark ? "bg-amber-500/10 text-amber-300" : "bg-amber-50 text-amber-800"}`}>
            🏆 7-day streak! One full week of growth. Most people never get here.
          </div>
        )}

        {/* Daily tracking + history */}
        <DailyTracker primaryPath={primaryPath} todayTracking={todayTracking} trackingHistory={trackingHistory} isDark={isDark} accent={t.accent} />

        {/* Start here CTA */}
        {!hasStarted && firstLessonLink && (
          <div className="mb-8">
            <div className={`overflow-hidden rounded-2xl border-2 shadow-lg ${
              isAI ? "border-blue-500/30 shadow-blue-500/10 bg-blue-950/40" :
              plan === "pro" ? "border-amber-500/30 shadow-amber-500/10 bg-amber-950/40" :
              "border-primary/30 shadow-primary/10 bg-card"
            }`}>
              <div className="h-1.5" style={{ background: `linear-gradient(to right, ${t.accent}, ${t.accent}80, ${t.accent}30)` }} />
              <div className="p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: t.accent }}>Start here</p>
                <p className={`mb-3 font-display text-lg font-semibold ${isDark ? "text-white" : ""}`}>{firstModuleTitle}</p>
                <a href={firstLessonLink}>
                  <Button size="lg" className={`h-14 w-full text-base font-semibold shadow-lg ${
                    isAI ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20" :
                    plan === "pro" ? "bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20" :
                    "shadow-primary/20"
                  }`}>
                    Begin Your First Lesson
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="mb-8">
          <div className={`rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/[0.04]" : "bg-card"}`}>
            <div className="flex items-center justify-between mb-2">
              <PillarBadge pillar={primaryPath} label={`${primary.title} Path`} />
              <span className={`text-sm font-bold ${isDark ? "text-white" : ""}`}>{primaryProgress}%</span>
            </div>
            <Progress value={primaryProgress} className={`h-2.5 ${isDark ? "bg-white/10" : ""}`} style={isDark ? { ["--progress-color" as string]: t.accent } : undefined} />
            {isPro && !incomeUnlocked && (
              <p className={`mt-2 text-[11px] ${isDark ? "text-white/40" : "text-muted-foreground"}`}>
                {Math.ceil(primaryTotal * 0.5) - primaryCompleted} more lessons to unlock your income track
              </p>
            )}
          </div>
        </div>

        {/* Primary Path */}
        {primaryData && (
          <PathSection pathData={primaryData} isPrimary theme={t} isDark={isDark} />
        )}

        {/* Secondary Path */}
        {secondaryData && secondaryData.pillar !== primaryPath && (
          <PathSection pathData={secondaryData} theme={t} isDark={isDark} />
        )}

        {/* Income Track */}
        {isPro && (
          <div className="mb-10">
            <h2 className={`mb-1 font-display text-lg font-semibold tracking-tight sm:text-xl ${isDark ? "text-white" : ""}`}>
              Your Income Track
            </h2>

            {incomeUnlocked ? (
              <>
                <p className={`mb-4 text-xs ${isDark ? "text-white/50" : "text-muted-foreground"}`}>You hit 50%. Choose your income path.</p>
                <div className="space-y-3">
                  {INCOME_TRACKS
                    .sort((a, b) => {
                      if (a.name === recommendationTrack) return -1;
                      if (b.name === recommendationTrack) return 1;
                      return (b.match.includes(primaryPath) ? 1 : 0) - (a.match.includes(primaryPath) ? 1 : 0);
                    })
                    .map((track) => {
                      const isRec = track.name === recommendationTrack;
                      return (
                        <div key={track.id} className={`rounded-xl border p-4 ${
                          isRec
                            ? isDark ? `border-2 shadow-lg ${isAI ? "border-blue-500/30 bg-blue-950/40 shadow-blue-500/10" : "border-amber-500/30 bg-amber-950/40 shadow-amber-500/10"}` : "border-2 border-primary/30 shadow-md shadow-primary/10 bg-card"
                            : isDark ? "border-white/10 bg-white/[0.04]" : "bg-card"
                        }`}>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="mb-1 flex items-center gap-2">
                                <p className={`text-sm font-semibold ${isDark ? "text-white" : ""}`}>{track.name}</p>
                                {isRec && <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${t.badgeBg}`}>Best Match</span>}
                                {isRec && <span className="text-[10px] font-semibold" style={{ color: t.accent }}>#1 for you</span>}
                              </div>
                              <p className={`text-xs ${isDark ? "text-white/50" : "text-muted-foreground"}`}>{track.desc}</p>
                              <p className="mt-1 text-xs font-semibold text-emerald-500">{track.earning}</p>
                            </div>
                            <Button
                              size="sm"
                              className={`shrink-0 ${isRec
                                ? isAI ? "bg-blue-600 hover:bg-blue-500 text-white" : plan === "pro" ? "bg-amber-500 hover:bg-amber-400 text-black" : ""
                                : isDark ? "bg-white/10 text-white hover:bg-white/20 border-0" : ""
                              }`}
                              variant={isRec ? "default" : "outline"}
                            >
                              {isRec ? "Start Track" : "Choose"}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              <>
                <p className={`mb-3 text-xs ${isDark ? "text-white/40" : "text-muted-foreground"}`}>Complete 50% of your path to unlock.</p>
                <div className={`rounded-xl border border-dashed p-5 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-amber-300 bg-amber-50/30"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isDark ? "bg-white/10" : "bg-amber-100"}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDark ? "white" : "#D97706"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={isDark ? 0.5 : 1}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isDark ? "text-white/80" : "text-amber-900"}`}>Income Track Locked</p>
                      <p className={`text-xs ${isDark ? "text-white/40" : "text-amber-700"}`}>{Math.ceil(primaryTotal * 0.5) - primaryCompleted} more lessons to go</p>
                    </div>
                  </div>
                  <div className="space-y-2 opacity-50">
                    {INCOME_TRACKS.map((tr) => (
                      <div key={tr.id} className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${isDark ? "border-white/5 bg-white/[0.03]" : "bg-white/60"}`}>
                        <div>
                          <p className={`text-xs font-semibold ${isDark ? "text-white/70" : ""}`}>{tr.name}</p>
                          <p className={`text-[10px] ${isDark ? "text-white/30" : "text-muted-foreground"}`}>{tr.earning}</p>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isDark ? "text-white/20" : "text-muted-foreground/50"}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div className={`rounded-xl border p-5 text-center ${isDark ? "border-white/10" : "border-primary/10"}`} style={isDark ? { backgroundColor: `${t.accent}08` } : undefined}>
          <p className={`text-xs ${isDark ? "text-white/40" : "text-muted-foreground"}`}>
            Once {t.label} · {totalLessons} lessons · Lifetime access
          </p>
          <p className="mt-2 once-signature">
            <span className={isDark ? "text-white" : ""}>Once</span>
            <span style={{ color: t.accent }}>.</span>
          </p>
        </div>
      </main>
    </div>
  );
}

// ─── Path Section ───

function PathSection({ pathData, isPrimary, theme, isDark }: {
  pathData: PathData;
  isPrimary?: boolean;
  theme: typeof PLAN_THEMES.core;
  isDark: boolean;
}) {
  const allLessons = pathData.modules.flatMap((mod) =>
    mod.lessons.map((l) => ({ ...l, moduleName: mod.title, moduleOrder: mod.order }))
  );
  const firstIncompleteIdx = allLessons.findIndex((l) => !l.completed);
  const currentModuleId = firstIncompleteIdx >= 0 ? allLessons[firstIncompleteIdx].moduleId : null;

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <ModuleIllustration pillar={pathData.pillar} size="sm" />
        <div>
          <div className="flex items-center gap-2">
            <h2 className={`font-display text-lg font-semibold tracking-tight sm:text-xl ${isDark ? "text-white" : ""}`}>
              {pathData.title} Path
            </h2>
            {isPrimary && <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${theme.badgeBg}`}>Primary</span>}
          </div>
          <p className={`text-xs ${isDark ? "text-white/40" : "text-muted-foreground"}`}>
            {pathData.completedLessons}/{pathData.totalLessons} lessons
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {pathData.modules.map((mod) => {
          const modCompleted = mod.lessons.filter((l) => l.completed).length;
          const modTotal = mod.lessons.length;
          const modDone = modCompleted === modTotal && modTotal > 0;
          const isCurrent = mod.id === currentModuleId;

          return (
            <CollapsibleModule
              key={mod.id}
              mod={mod}
              allLessons={allLessons}
              firstIncompleteIdx={firstIncompleteIdx}
              defaultOpen={isCurrent || (!!isPrimary && mod.order === 1 && firstIncompleteIdx === -1)}
              modCompleted={modCompleted}
              modTotal={modTotal}
              modDone={modDone}
              isCurrent={isCurrent}
              theme={theme}
              isDark={isDark}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Collapsible Module ───

function CollapsibleModule({ mod, allLessons, firstIncompleteIdx, defaultOpen, modCompleted, modTotal, modDone, isCurrent, theme, isDark }: {
  mod: ModuleGroup;
  allLessons: (LessonItem & { moduleName: string; moduleOrder: number })[];
  firstIncompleteIdx: number;
  defaultOpen: boolean;
  modCompleted: number;
  modTotal: number;
  modDone: boolean;
  isCurrent: boolean;
  theme: typeof PLAN_THEMES.core;
  isDark: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-xl border transition-colors ${
      isDark
        ? isCurrent ? `border-[${theme.accent}]/20 bg-white/[0.03]` : modDone ? "border-emerald-800/30 bg-emerald-950/20" : "border-white/5 bg-white/[0.02]"
        : isCurrent ? "border-primary/20 bg-primary/[0.02]" : modDone ? "border-emerald-200 bg-emerald-50/30" : ""
    }`}>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 p-3 text-left">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          modDone
            ? "bg-emerald-500/20 text-emerald-400"
            : isCurrent
              ? theme.accentLight + " " + theme.accentText
              : isDark ? "bg-white/10 text-white/50" : "bg-muted text-muted-foreground"
        }`}>
          {modDone ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          ) : mod.order}
        </span>

        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${isDark ? "text-white/90" : ""}`}>{mod.title}</p>
          <p className={`text-[11px] ${isDark ? "text-white/30" : "text-muted-foreground"}`}>{modCompleted}/{modTotal} lessons</p>
        </div>

        <div className="flex items-center gap-2">
          {modTotal > 0 && !modDone && (
            <span className={`text-[10px] font-medium ${isDark ? "text-white/30" : "text-muted-foreground"}`}>
              {Math.round((modCompleted / modTotal) * 100)}%
            </span>
          )}
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform ${open ? "rotate-90" : ""} ${isDark ? "text-white/20" : "text-muted-foreground/50"}`}
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-3 pb-3">
          <div className={`ml-4 border-l-2 pl-3 space-y-0.5 ${isDark ? "border-white/10" : "border-muted"}`}>
            {mod.lessons.map((lesson) => {
              const globalIdx = allLessons.findIndex((l) => l.id === lesson.id);
              const isUnlocked = lesson.completed || globalIdx === firstIncompleteIdx || (globalIdx === 0) || (globalIdx > 0 && allLessons[globalIdx - 1].completed);
              const isCurrentLesson = globalIdx === firstIncompleteIdx;

              return (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  moduleId={mod.id}
                  locked={!isUnlocked}
                  isCurrent={isCurrentLesson}
                  theme={theme}
                  isDark={isDark}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Daily Tracker with History ───

const PILLAR_METRICS: Record<string, { type: string; label: string; emoji: string; placeholder: string; unit: string; isText?: boolean }[]> = {
  money: [
    { type: "savings", label: "Saved today", emoji: "💰", placeholder: "500", unit: "₱" },
    { type: "income", label: "Earned today", emoji: "📈", placeholder: "0", unit: "₱" },
  ],
  mind: [
    { type: "reading_minutes", label: "Learning time", emoji: "📖", placeholder: "15", unit: "min" },
    { type: "focus_score", label: "Focus today (1-10)", emoji: "🎯", placeholder: "7", unit: "/10" },
  ],
  body: [
    { type: "sleep_hours", label: "Sleep last night", emoji: "😴", placeholder: "7", unit: "hrs" },
    { type: "weight", label: "Weight", emoji: "⚖️", placeholder: "65", unit: "kg" },
    { type: "water_glasses", label: "Water intake", emoji: "💧", placeholder: "8", unit: "glasses" },
  ],
  spirit: [
    { type: "gratitude", label: "Grateful for", emoji: "🙏", placeholder: "Something good today...", unit: "", isText: true },
    { type: "mood_score", label: "Mood (1-10)", emoji: "😊", placeholder: "7", unit: "/10" },
  ],
};

function DailyTracker({ primaryPath, todayTracking, trackingHistory, isDark, accent }: {
  primaryPath: Pillar;
  todayTracking: TrackingEntry[];
  trackingHistory: TrackingHistoryEntry[];
  isDark: boolean;
  accent: string;
}) {
  const metrics = PILLAR_METRICS[primaryPath] || PILLAR_METRICS.money;
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const m of metrics) {
      const existing = todayTracking.find(t => t.metric_type === m.type);
      init[m.type] = existing ? (m.isText ? existing.metric_text || "" : String(existing.metric_value || "")) : "";
    }
    return init;
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const alreadySaved = todayTracking.length > 0;

  async function handleSave() {
    setSaving(true);
    const { saveTrackingEntry } = await import("@/app/dashboard/tracking-actions");
    for (const m of metrics) {
      const val = values[m.type];
      if (!val) continue;
      await saveTrackingEntry(m.type, m.isText ? null : Number(val), m.isText ? val : null);
    }
    setSaving(false);
    setSaved(true);
  }

  const anyFilled = metrics.some(m => values[m.type]);

  // Build mini history for numeric metrics (last 7 entries)
  const historyMetric = metrics.find(m => !m.isText);
  const historyData = historyMetric
    ? trackingHistory
        .filter(h => h.metric_type === historyMetric.type && h.metric_value != null)
        .sort((a, b) => a.entry_date.localeCompare(b.entry_date))
        .slice(-7)
    : [];
  const maxVal = historyData.length > 0 ? Math.max(...historyData.map(h => h.metric_value!)) : 0;

  return (
    <div className={`mb-6 rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/[0.03]" : "bg-card border"}`}>
      <div className="flex items-center justify-between mb-3">
        <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-white/40" : "text-muted-foreground"}`}>
          Today&apos;s Check-in
        </p>
        {(alreadySaved || saved) && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-medium">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            Saved
          </span>
        )}
      </div>

      <div className="grid gap-3 grid-cols-2">
        {metrics.map((m) => (
          <div key={m.type} className={m.isText ? "col-span-2" : ""}>
            <label className={`mb-1 flex items-center gap-1.5 text-xs ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </label>
            <div className="relative">
              <input
                type={m.isText ? "text" : "number"}
                value={values[m.type]}
                onChange={(e) => { setValues(prev => ({ ...prev, [m.type]: e.target.value })); setSaved(false); }}
                placeholder={m.placeholder}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors ${
                  m.unit && !m.isText ? "pr-12" : ""
                } ${
                  isDark
                    ? "border-white/10 bg-white/[0.05] text-white placeholder:text-white/20 focus:border-white/20"
                    : "border-border bg-background focus:border-primary/30"
                }`}
              />
              {m.unit && !m.isText && (
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${isDark ? "text-white/30" : "text-muted-foreground"}`}>
                  {m.unit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={!anyFilled || saving}
        className={`mt-3 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all min-h-[44px] ${
          saved
            ? "bg-emerald-500/20 text-emerald-500"
            : anyFilled
              ? isDark ? "text-white hover:opacity-90" : "text-white hover:opacity-90"
              : isDark ? "bg-white/5 text-white/20 cursor-not-allowed" : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
        style={anyFilled && !saved ? { backgroundColor: accent } : undefined}
      >
        {saving ? "Saving..." : saved ? "✓ Saved for today" : "Save Check-in"}
      </button>

      {/* Today's saved values */}
      {(alreadySaved || saved) && (
        <div className="mt-3 pt-3 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : undefined }}>
          <p className={`mb-2 text-[10px] font-medium uppercase tracking-wider ${isDark ? "text-white/30" : "text-muted-foreground"}`}>
            Today&apos;s Entries
          </p>
          <div className="flex flex-wrap gap-2">
            {metrics.map((m) => {
              const val = values[m.type] || todayTracking.find(t => t.metric_type === m.type)?.metric_value?.toString() || todayTracking.find(t => t.metric_type === m.type)?.metric_text;
              if (!val) return null;
              return (
                <div key={m.type} className={`rounded-lg px-3 py-1.5 text-xs ${isDark ? "bg-white/[0.06]" : "bg-muted"}`}>
                  <span>{m.emoji} </span>
                  <span className={`font-semibold ${isDark ? "text-white" : ""}`}>{val}</span>
                  {m.unit && !m.isText && <span className={isDark ? "text-white/40" : "text-muted-foreground"}> {m.unit}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* History chart */}
      {historyData.length >= 2 && historyMetric && (
        <div className="mt-3 pt-3 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : undefined }}>
          <p className={`mb-2 text-[10px] font-medium uppercase tracking-wider ${isDark ? "text-white/30" : "text-muted-foreground"}`}>
            {historyMetric.emoji} {historyMetric.label} — Last {historyData.length} days
          </p>
          <div className="flex items-end gap-1 h-16">
            {historyData.map((h, i) => {
              const pct = maxVal > 0 ? (h.metric_value! / maxVal) * 100 : 0;
              const isLatest = i === historyData.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <span className={`text-[9px] font-medium ${isLatest ? (isDark ? "text-white/70" : "text-foreground") : "opacity-0"}`}>
                    {h.metric_value}
                  </span>
                  <div
                    className="w-full rounded-t-sm min-h-[4px] transition-all"
                    style={{ height: `${Math.max(pct, 10)}%`, backgroundColor: accent, opacity: isLatest ? 1 : 0.3 }}
                  />
                  <span className={`text-[8px] ${isDark ? "text-white/20" : "text-muted-foreground/50"}`}>
                    {new Date(h.entry_date + "T00:00:00").toLocaleDateString("en", { weekday: "narrow" })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Gratitude history (spirit pillar) */}
      {primaryPath === "spirit" && trackingHistory.filter(h => h.metric_type === "gratitude" && h.metric_text).length > 0 && (
        <div className="mt-3 pt-3 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : undefined }}>
          <p className={`mb-2 text-[10px] font-medium uppercase tracking-wider ${isDark ? "text-white/30" : "text-muted-foreground"}`}>
            🙏 Recent Gratitude
          </p>
          <div className="space-y-1.5">
            {trackingHistory
              .filter(h => h.metric_type === "gratitude" && h.metric_text)
              .sort((a, b) => b.entry_date.localeCompare(a.entry_date))
              .slice(0, 5)
              .map((h, i) => (
                <div key={i} className={`rounded-lg px-3 py-2 text-xs ${isDark ? "bg-white/[0.04]" : "bg-muted/50"}`}>
                  <span className={isDark ? "text-white/30" : "text-muted-foreground"}>
                    {new Date(h.entry_date + "T00:00:00").toLocaleDateString("en", { month: "short", day: "numeric" })}:
                  </span>{" "}
                  <span className={isDark ? "text-white/70" : ""}>{h.metric_text}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Lesson Row ───

function LessonRow({ lesson, moduleId, locked, isCurrent, theme, isDark }: {
  lesson: LessonItem;
  moduleId: string;
  locked: boolean;
  isCurrent: boolean;
  theme: typeof PLAN_THEMES.core;
  isDark: boolean;
}) {
  const content = (
    <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
      locked
        ? "opacity-30"
        : isCurrent
          ? isDark ? `bg-white/[0.06] border border-white/10` : "bg-primary/[0.06] border border-primary/20"
          : lesson.completed
            ? isDark ? "bg-emerald-950/20" : "bg-emerald-50/50"
            : isDark ? "hover:bg-white/[0.04]" : "hover:bg-muted/50"
    }`}>
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
        locked
          ? isDark ? "bg-white/5 text-white/20" : "bg-muted text-muted-foreground/40"
          : lesson.completed
            ? "bg-emerald-500/20 text-emerald-400"
            : isCurrent
              ? `text-white` : isDark ? "bg-white/10 text-white/50" : "bg-muted text-muted-foreground"
      }`} style={isCurrent && !locked ? { backgroundColor: theme.accent } : undefined}>
        {locked ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        ) : lesson.completed ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
        ) : (
          <span className="text-[10px] font-bold">{lesson.order}</span>
        )}
      </div>

      <p className={`flex-1 text-sm ${
        locked
          ? isDark ? "text-white/20" : "text-muted-foreground/50"
          : lesson.completed
            ? isDark ? "text-white/40" : "text-muted-foreground"
            : isDark ? "text-white/80 font-medium" : "text-foreground font-medium"
      }`}>
        {lesson.title}
      </p>

      {!locked && (
        <svg className={`h-4 w-4 shrink-0 ${isDark ? "text-white/15" : "text-muted-foreground/30"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
      )}
    </div>
  );

  if (locked) return <div>{content}</div>;

  return (
    <a href={`/dashboard/module/${moduleId}/lesson/${lesson.id}`} className="block">
      {content}
    </a>
  );
}
