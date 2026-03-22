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
  const secondary = PILLARS[secondaryPath];
  const firstName = fullName.split(" ")[0] || "there";
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  const planLabel = plan === "ai" ? "AI Careers" : plan === "pro" ? "Pro" : "Core";
  const isPro = plan === "pro" || plan === "ai";

  const primaryGroup = pathModules.find((p) => p.pillar === primaryPath);
  const secondaryGroup = pathModules.find((p) => p.pillar === secondaryPath);

  // Count completed primary core modules (at least 1 lesson done)
  const completedPrimaryCoreCount = (primaryGroup?.coreMods ?? []).filter((m) => m.completedLessons > 0).length;
  const secondaryUnlocked = completedPrimaryCoreCount >= 3;
  const proUnlocked = completedPrimaryCoreCount >= 3;

  // Has user started at all?
  const hasStarted = totalCompleted > 0;

  // Find next module to continue
  const primaryCoreMods = primaryGroup?.coreMods ?? [];
  const nextPrimaryModule = primaryCoreMods.find((m) => m.completedLessons < m.totalLessons);

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
              ? `${totalCompleted} of ${totalLessons} lessons completed.`
              : "One path. One step at a time."}
          </p>
        </motion.div>

        {/* ═══ START HERE CTA (only if not started) ═══ */}
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

        {/* ═══ CONTINUE CTA (if started) ═══ */}
        {hasStarted && nextPrimaryModule && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="relative overflow-hidden border-primary/20">
              <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
              <CardContent className="flex items-center justify-between gap-4 p-5 pl-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Continue</p>
                  <p className="mt-0.5 font-semibold">{nextPrimaryModule.title}</p>
                  <p className="text-sm text-muted-foreground">{nextPrimaryModule.completedLessons}/{nextPrimaryModule.totalLessons} lessons</p>
                </div>
                <Button render={<Link href={`/dashboard/module/${nextPrimaryModule.id}`} />} className="shrink-0">
                  Continue Once
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ═══ Progress + Scores (compact) ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 grid gap-4 sm:grid-cols-2"
        >
          <Card>
            <CardContent className="p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Progress</p>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">{overallProgress}%</span>
                <span className="text-xs text-muted-foreground">{totalCompleted}/{totalLessons}</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <PillarRadar scores={scores} />
              <div>
                <PillarBadge pillar={primaryPath} label={primary.title} />
                <p className="mt-1 text-[10px] text-muted-foreground">Primary path</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ═══════════════════════════════════════════ */}
        {/* SECTION 1 — YOUR PATH (primary only)       */}
        {/* ═══════════════════════════════════════════ */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <ModuleIllustration pillar={primaryPath} size="sm" />
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                Your {primary.title} Path
              </h2>
              <p className="text-xs text-muted-foreground">This is your main path. Start here.</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {primaryCoreMods.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} pillar={primaryPath} />
            ))}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════ */}
        {/* SECTION 2 — SECONDARY PATH                 */}
        {/* ═══════════════════════════════════════════ */}

        {secondaryGroup && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10"
          >
            {secondaryUnlocked ? (
              <>
                <div className="mb-1 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <p className="text-xs font-semibold text-emerald-600">Unlocked</p>
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <ModuleIllustration pillar={secondaryPath} size="sm" />
                  <div>
                    <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                      {secondary.title} Path
                    </h2>
                    <p className="text-xs text-muted-foreground">Your secondary path is ready.</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {secondaryGroup.coreMods.map((mod) => (
                    <ModuleCard key={mod.id} mod={mod} pillar={secondaryPath} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{secondary.title} Path</p>
                    <p className="text-xs text-muted-foreground">
                      Complete {3 - completedPrimaryCoreCount} more {primary.title} module{3 - completedPrimaryCoreCount !== 1 ? "s" : ""} to unlock.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════ */}
        {/* SECTION 3 — INCOME TRACK (Pro/AI only)     */}
        {/* ═══════════════════════════════════════════ */}

        {isPro && primaryGroup && primaryGroup.proMods.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-10"
          >
            <h2 className="mb-1 font-display text-lg font-semibold tracking-tight sm:text-xl">
              {recommendationTrack || "Your Income Track"}
            </h2>

            {proUnlocked ? (
              <>
                <p className="mb-4 text-xs text-muted-foreground">Your income modules are unlocked. Time to earn.</p>
                <div className="space-y-2.5">
                  {primaryGroup.proMods.map((mod) => (
                    <ModuleCard key={mod.id} mod={mod} pillar={primaryPath} isPro />
                  ))}
                </div>
              </>
            ) : (
              <Card className="border-dashed border-amber-300 bg-amber-50/50">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-900">{recommendationTrack || "Income Track"}</p>
                    <p className="text-xs text-amber-800">
                      Complete {3 - completedPrimaryCoreCount} more Core module{3 - completedPrimaryCoreCount !== 1 ? "s" : ""} to unlock your income skills.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* ═══ Summary footer ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-primary/10 bg-primary/[0.02]">
            <CardContent className="p-5 text-center">
              <p className="text-xs text-muted-foreground">
                Once {planLabel} · {totalLessons} lessons · Lifetime access
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

function ModuleCard({ mod, pillar, isPro }: { mod: ModuleWithProgress; pillar: Pillar; isPro?: boolean }) {
  const modProgress = mod.totalLessons > 0 ? Math.round((mod.completedLessons / mod.totalLessons) * 100) : 0;
  const isComplete = modProgress === 100;
  const isActive = !isComplete && mod.completedLessons > 0;

  return (
    <Link href={`/dashboard/module/${mod.id}`} className="block">
      <div className={`group rounded-xl border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20 ${
        isComplete ? "border-emerald-200 bg-emerald-50/50" : ""
      }`}>
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            isComplete ? "bg-emerald-100 text-emerald-600"
              : isActive ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          }`}>
            {isComplete ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            ) : mod.order}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold group-hover:text-primary transition-colors">{mod.title}</p>
              {isPro && <Badge variant="outline" className="text-[9px]">Pro</Badge>}
            </div>
            <p className="truncate text-xs text-muted-foreground">{mod.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{mod.completedLessons}/{mod.totalLessons}</span>
            <svg className="h-4 w-4 shrink-0 text-muted-foreground/40 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        </div>

        {/* Progress bar */}
        {mod.totalLessons > 0 && (
          <div className="mt-2.5 ml-12">
            <Progress value={modProgress} className="h-1.5" />
          </div>
        )}
      </div>
    </Link>
  );
}
