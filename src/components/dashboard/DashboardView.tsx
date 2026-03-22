"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PILLARS } from "@/lib/constants";
import { ModuleIllustration, PillarBadge } from "@/components/ui/illustrations";
import PillarRadar from "./PillarRadar";
import type { Pillar, PillarScores } from "@/types/database";
import { logout } from "@/app/auth/actions";

interface ModuleWithProgress {
  id: string;
  title: string;
  description: string;
  order: number;
  totalLessons: number;
  completedLessons: number;
}

interface PathGroup {
  pillar: Pillar;
  title: string;
  description: string;
  coreMods: ModuleWithProgress[];
  proMods: ModuleWithProgress[];
}

interface DashboardViewProps {
  fullName: string;
  primaryPath: Pillar;
  secondaryPath: Pillar;
  scores: PillarScores;
  pathModules: PathGroup[];
  totalLessons: number;
  totalCompleted: number;
  plan: string | null;
  recommendationTrack: string | null;
  firstModuleId: string | null;
  firstModuleTitle: string | null;
  firstLessonId: string | null;
}

const INCOME_TRACKS = [
  {
    id: "social-media",
    name: "Social Media Management",
    desc: "Manage Facebook and Instagram for local businesses.",
    earning: "₱15,000–₱40,000/month",
    match: ["mind"] as Pillar[],
  },
  {
    id: "ecommerce",
    name: "Shopee/Lazada E-Commerce",
    desc: "Find products, set up your store, and sell online.",
    earning: "₱10,000–₱50,000/month",
    match: ["money"] as Pillar[],
  },
  {
    id: "freelancing",
    name: "Freelancing",
    desc: "Find clients, build a portfolio, earn on your terms.",
    earning: "₱15,000–₱60,000/month",
    match: ["body", "spirit"] as Pillar[],
  },
];

export default function DashboardView({
  fullName,
  primaryPath,
  secondaryPath,
  scores,
  pathModules,
  totalLessons,
  totalCompleted,
  plan,
  recommendationTrack,
  firstModuleId,
  firstModuleTitle,
  firstLessonId,
}: DashboardViewProps) {
  const primary = PILLARS[primaryPath];
  const firstName = fullName.split(" ")[0] || "there";
  const planLabel = plan === "ai" ? "AI Careers" : plan === "pro" ? "Pro" : "Core";
  const isPro = plan === "pro" || plan === "ai";

  const primaryGroup = pathModules.find((p) => p.pillar === primaryPath);
  const primaryCoreMods = primaryGroup?.coreMods ?? [];

  // Total core lessons and completed
  const totalCoreLessons = primaryCoreMods.reduce((sum, m) => sum + m.totalLessons, 0);
  const completedCoreLessons = primaryCoreMods.reduce((sum, m) => sum + m.completedLessons, 0);
  const coreProgress = totalCoreLessons > 0 ? Math.round((completedCoreLessons / totalCoreLessons) * 100) : 0;

  // Income track unlocks at 50%
  const incomeUnlocked = coreProgress >= 50;
  const hasStarted = totalCompleted > 0;

  // Find the current module (first incomplete one)
  const currentModuleIdx = primaryCoreMods.findIndex((m) => m.completedLessons < m.totalLessons);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Nav */}
      <header className="relative z-10 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
          <Link href="/dashboard" className="font-display text-xl font-semibold tracking-[-0.04em]">
            <span className="text-foreground">Once</span>
            <span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-[10px]">{planLabel}</Badge>
            <form action={logout}>
              <Button variant="ghost" size="sm" type="submit">Log out</Button>
            </form>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-5 py-8 sm:py-10">

        {/* ═══ Greeting ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="mb-1 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {hasStarted ? `Welcome back, ${firstName}.` : `${firstName}, your path starts here.`}
          </h1>
          <p className="text-sm text-muted-foreground">
            {hasStarted
              ? `${completedCoreLessons} of ${totalCoreLessons} lessons completed.`
              : "One path. One step at a time."}
          </p>
        </motion.div>

        {/* ═══ START HERE (new users) ═══ */}
        {!hasStarted && firstModuleId && firstLessonId && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="overflow-hidden border-2 border-primary/30 shadow-md shadow-primary/10">
              <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
              <CardContent className="p-5 sm:p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Start here</p>
                <p className="mb-3 font-display text-lg font-semibold">{firstModuleTitle}</p>
                <Button
                  render={<Link href={`/dashboard/module/${firstModuleId}/lesson/${firstLessonId}`} />}
                  size="lg"
                  className="h-14 w-full text-base font-semibold shadow-lg shadow-primary/20"
                >
                  Begin Your First Lesson
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ═══ Progress bar ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <PillarBadge pillar={primaryPath} label={primary.title} />
                  <span className="text-xs text-muted-foreground">Primary path</span>
                </div>
                <span className="text-sm font-bold">{coreProgress}%</span>
              </div>
              <Progress value={coreProgress} className="h-2.5" />
              <p className="mt-2 text-[11px] text-muted-foreground">
                {coreProgress < 50
                  ? `${Math.ceil(totalCoreLessons * 0.5) - completedCoreLessons} more lessons to unlock your income track`
                  : "Income track unlocked"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════════════════════════════════════ */}
        {/* ALL MODULES — sequential, locked/unlocked  */}
        {/* ═══════════════════════════════════════════ */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <ModuleIllustration pillar={primaryPath} size="sm" />
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                Your {primary.title} Path
              </h2>
              <p className="text-xs text-muted-foreground">{totalCoreLessons} lessons across {primaryCoreMods.length} modules</p>
            </div>
          </div>

          <div className="space-y-2">
            {primaryCoreMods.map((mod, idx) => {
              // First module always unlocked
              // Next module unlocked only if previous is complete or started
              const isUnlocked = idx === 0 || idx <= currentModuleIdx || primaryCoreMods[idx - 1].completedLessons > 0;

              return (
                <ModuleCard
                  key={mod.id}
                  mod={mod}
                  pillar={primaryPath}
                  locked={!isUnlocked}
                  index={idx + 1}
                />
              );
            })}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════ */}
        {/* INCOME TRACK SECTION (Pro/AI)              */}
        {/* ═══════════════════════════════════════════ */}

        {isPro && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-10"
          >
            <h2 className="mb-1 font-display text-lg font-semibold tracking-tight sm:text-xl">
              Your Income Track
            </h2>

            {incomeUnlocked ? (
              <>
                {/* 3 track options with recommendation ranking */}
                <p className="mb-4 text-xs text-muted-foreground">
                  You completed 50% of your path. Choose your income track.
                </p>
                <div className="space-y-3">
                  {INCOME_TRACKS
                    .sort((a, b) => {
                      // Recommended track first
                      if (a.name === recommendationTrack) return -1;
                      if (b.name === recommendationTrack) return 1;
                      // Then by pillar match
                      const aMatch = a.match.includes(primaryPath) ? 1 : 0;
                      const bMatch = b.match.includes(primaryPath) ? 1 : 0;
                      return bMatch - aMatch;
                    })
                    .map((track, idx) => {
                      const isRecommended = track.name === recommendationTrack;
                      const isMatch = track.match.includes(primaryPath);

                      return (
                        <Card
                          key={track.id}
                          className={`transition-all ${
                            isRecommended
                              ? "border-2 border-primary/30 shadow-md shadow-primary/10"
                              : ""
                          }`}
                        >
                          <CardContent className="p-4 sm:p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="mb-1 flex items-center gap-2">
                                  <p className="text-sm font-semibold">{track.name}</p>
                                  {isRecommended && (
                                    <Badge className="text-[9px]">Best Match</Badge>
                                  )}
                                  {!isRecommended && isMatch && (
                                    <Badge variant="secondary" className="text-[9px]">Good Fit</Badge>
                                  )}
                                  {idx === 0 && isRecommended && (
                                    <span className="text-[10px] text-primary font-semibold">#1 for you</span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">{track.desc}</p>
                                <p className="mt-1 text-xs font-semibold text-emerald-600">{track.earning}</p>
                              </div>
                              <Button
                                variant={isRecommended ? "default" : "outline"}
                                size="sm"
                                className="shrink-0"
                              >
                                {isRecommended ? "Start Track" : "Choose"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </>
            ) : (
              <>
                <p className="mb-3 text-xs text-muted-foreground">
                  Complete 50% of your {primary.title} path to unlock income skills.
                </p>
                <Card className="border-dashed border-amber-300 bg-amber-50/30">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-amber-900">Income Track Locked</p>
                        <p className="text-xs text-amber-700">
                          {Math.ceil(totalCoreLessons * 0.5) - completedCoreLessons} more lessons to go
                        </p>
                      </div>
                    </div>
                    {/* Show 3 tracks as preview, dimmed */}
                    <div className="space-y-2 opacity-50">
                      {INCOME_TRACKS.map((track) => (
                        <div key={track.id} className="flex items-center justify-between rounded-lg border bg-white/60 px-3 py-2.5">
                          <div>
                            <p className="text-xs font-semibold">{track.name}</p>
                            <p className="text-[10px] text-muted-foreground">{track.earning}</p>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/50">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </motion.div>
        )}

        {/* ═══ Footer ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-primary/10 bg-primary/[0.02]">
            <CardContent className="p-5 text-center">
              <p className="text-xs text-muted-foreground">
                Once {planLabel} · {totalCoreLessons} lessons · Lifetime access
              </p>
              <p className="mt-2 once-signature">Once<span style={{color:"#4F46E5"}}>.</span></p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

// ─── Module Card ───

function ModuleCard({ mod, pillar, locked, index }: {
  mod: ModuleWithProgress;
  pillar: Pillar;
  locked?: boolean;
  index: number;
  isPro?: boolean;
}) {
  const modProgress = mod.totalLessons > 0 ? Math.round((mod.completedLessons / mod.totalLessons) * 100) : 0;
  const isComplete = modProgress === 100;
  const isActive = !isComplete && mod.completedLessons > 0;

  const content = (
    <div className={`group rounded-xl border p-4 transition-all ${
      locked
        ? "bg-muted/30 opacity-60"
        : isComplete
          ? "border-emerald-200 bg-emerald-50/50 hover:shadow-md"
          : "bg-card hover:shadow-md hover:border-primary/20"
    }`}>
      <div className="flex items-center gap-3">
        {/* Number / status circle */}
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          locked
            ? "bg-muted text-muted-foreground/50"
            : isComplete
              ? "bg-emerald-100 text-emerald-600"
              : isActive
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
        }`}>
          {locked ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          ) : isComplete ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          ) : (
            index
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold transition-colors ${
            locked ? "text-muted-foreground" : "group-hover:text-primary"
          }`}>
            {mod.title}
          </p>
          <p className="truncate text-xs text-muted-foreground">{mod.totalLessons} lessons</p>
        </div>

        {/* Progress or lock */}
        {!locked && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{mod.completedLessons}/{mod.totalLessons}</span>
            <svg className="h-4 w-4 shrink-0 text-muted-foreground/40 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        )}
      </div>

      {/* Progress bar for unlocked modules */}
      {!locked && mod.totalLessons > 0 && mod.completedLessons > 0 && (
        <div className="mt-2.5 ml-12">
          <Progress value={modProgress} className="h-1.5" />
        </div>
      )}
    </div>
  );

  if (locked) {
    return <div>{content}</div>;
  }

  return (
    <Link href={`/dashboard/module/${mod.id}`} className="block">
      {content}
    </Link>
  );
}
