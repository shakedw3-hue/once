"use client";

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
}

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
}: DashboardViewProps) {
  const primary = PILLARS[primaryPath];
  const firstName = fullName.split(" ")[0] || "there";
  const planLabel = plan === "ai" ? "AI Careers" : plan === "pro" ? "Pro" : "Core";
  const isPro = plan === "pro" || plan === "ai";

  const primaryData = pathData.find((p) => p.pillar === primaryPath);
  const secondaryData = pathData.find((p) => p.pillar === secondaryPath);

  const totalLessons = pathData.reduce((sum, p) => sum + p.totalLessons, 0);
  const totalCompleted = pathData.reduce((sum, p) => sum + p.completedLessons, 0);
  const hasStarted = totalCompleted > 0;

  // Primary progress for income unlock (50%)
  const primaryTotal = primaryData?.totalLessons ?? 0;
  const primaryCompleted = primaryData?.completedLessons ?? 0;
  const primaryProgress = primaryTotal > 0 ? Math.round((primaryCompleted / primaryTotal) * 100) : 0;
  const incomeUnlocked = primaryProgress >= 50;

  return (
    <div className="relative min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
          <Link href="/dashboard" className="font-display text-xl font-semibold tracking-[-0.04em]">
            <span className="text-foreground">Once</span><span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-[10px]">{planLabel}</Badge>
            <form action={logout}>
              <Button variant="ghost" size="sm" type="submit">Log out</Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8 sm:py-10">

        {/* Greeting */}
        <div className="mb-6">
          <h1 className="mb-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {hasStarted ? `Welcome back, ${firstName}.` : `${firstName}, your path starts here.`}
          </h1>
          <p className="text-sm text-muted-foreground">
            {totalCompleted} of {totalLessons} lessons completed.
          </p>
        </div>

        {/* Start here CTA */}
        {!hasStarted && firstLessonLink && (
          <div className="mb-8">
            <Card className="overflow-hidden border-2 border-primary/30 shadow-md shadow-primary/10">
              <div className="h-1.5 bg-gradient-to-r from-primary to-primary/60" />
              <CardContent className="p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Start here</p>
                <p className="mb-3 font-display text-lg font-semibold">{firstModuleTitle}</p>
                <Button render={<Link href={firstLessonLink} />} size="lg" className="h-14 w-full text-base font-semibold shadow-lg shadow-primary/20">
                  Begin Your First Lesson
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Overall progress */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <PillarBadge pillar={primaryPath} label={`${primary.title} Path`} />
                <span className="text-sm font-bold">{primaryProgress}%</span>
              </div>
              <Progress value={primaryProgress} className="h-2.5" />
              {isPro && !incomeUnlocked && (
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {Math.ceil(primaryTotal * 0.5) - primaryCompleted} more lessons to unlock your income track
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ═══════════════════════════════════════ */}
        {/* PRIMARY PATH — all lessons visible      */}
        {/* ═══════════════════════════════════════ */}

        {primaryData && (
          <PathSection pathData={primaryData} isPrimary />
        )}

        {/* ═══════════════════════════════════════ */}
        {/* SECONDARY PATH — all lessons visible    */}
        {/* ═══════════════════════════════════════ */}

        {secondaryData && secondaryData.pillar !== primaryPath && (
          <PathSection pathData={secondaryData} />
        )}

        {/* ═══════════════════════════════════════ */}
        {/* INCOME TRACK (Pro/AI)                   */}
        {/* ═══════════════════════════════════════ */}

        {isPro && (
          <div className="mb-10">
            <h2 className="mb-1 font-display text-lg font-semibold tracking-tight sm:text-xl">Your Income Track</h2>

            {incomeUnlocked ? (
              <>
                <p className="mb-4 text-xs text-muted-foreground">You hit 50%. Choose your income path.</p>
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
                        <Card key={track.id} className={isRec ? "border-2 border-primary/30 shadow-md shadow-primary/10" : ""}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="mb-1 flex items-center gap-2">
                                  <p className="text-sm font-semibold">{track.name}</p>
                                  {isRec && <Badge className="text-[9px]">Best Match</Badge>}
                                  {isRec && <span className="text-[10px] text-primary font-semibold">#1 for you</span>}
                                </div>
                                <p className="text-xs text-muted-foreground">{track.desc}</p>
                                <p className="mt-1 text-xs font-semibold text-emerald-600">{track.earning}</p>
                              </div>
                              <Button variant={isRec ? "default" : "outline"} size="sm" className="shrink-0">
                                {isRec ? "Start Track" : "Choose"}
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
                <p className="mb-3 text-xs text-muted-foreground">Complete 50% of your path to unlock.</p>
                <Card className="border-dashed border-amber-300 bg-amber-50/30">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-amber-900">Income Track Locked</p>
                        <p className="text-xs text-amber-700">{Math.ceil(primaryTotal * 0.5) - primaryCompleted} more lessons to go</p>
                      </div>
                    </div>
                    <div className="space-y-2 opacity-50">
                      {INCOME_TRACKS.map((t) => (
                        <div key={t.id} className="flex items-center justify-between rounded-lg border bg-white/60 px-3 py-2.5">
                          <div>
                            <p className="text-xs font-semibold">{t.name}</p>
                            <p className="text-[10px] text-muted-foreground">{t.earning}</p>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/50"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <Card className="border-primary/10 bg-primary/[0.02]">
          <CardContent className="p-5 text-center">
            <p className="text-xs text-muted-foreground">Once {planLabel} · {totalLessons} lessons · Lifetime access</p>
            <p className="mt-2 once-signature">Once<span style={{color:"#4F46E5"}}>.</span></p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// ─── Path Section: shows all modules with all lessons expanded ───

function PathSection({ pathData, isPrimary }: { pathData: PathData; isPrimary?: boolean }) {
  const pillarInfo = PILLARS[pathData.pillar];

  // Build a flat ordered list of ALL lessons across modules
  const allLessons = pathData.modules.flatMap((mod) =>
    mod.lessons.map((l) => ({ ...l, moduleName: mod.title, moduleOrder: mod.order }))
  );

  // Find the index of the first incomplete lesson
  const firstIncompleteIdx = allLessons.findIndex((l) => !l.completed);

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <ModuleIllustration pillar={pathData.pillar} size="sm" />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl">{pathData.title} Path</h2>
            {isPrimary && <Badge variant="secondary" className="text-[9px]">Primary</Badge>}
          </div>
          <p className="text-xs text-muted-foreground">{pathData.completedLessons}/{pathData.totalLessons} lessons</p>
        </div>
      </div>

      <div className="space-y-1">
        {pathData.modules.map((mod) => (
          <div key={mod.id}>
            {/* Module header */}
            <div className="flex items-center gap-2 py-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                {mod.order}
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{mod.title}</p>
            </div>

            {/* Lessons */}
            <div className="ml-3 border-l-2 border-muted pl-4 space-y-0.5">
              {mod.lessons.map((lesson) => {
                const globalIdx = allLessons.findIndex((l) => l.id === lesson.id);
                // Unlocked if: completed, or is the first incomplete, or previous lesson is completed
                const isUnlocked = lesson.completed || globalIdx === firstIncompleteIdx || (globalIdx === 0) || (globalIdx > 0 && allLessons[globalIdx - 1].completed);
                const isCurrent = globalIdx === firstIncompleteIdx;

                return (
                  <LessonRow
                    key={lesson.id}
                    lesson={lesson}
                    moduleId={mod.id}
                    locked={!isUnlocked}
                    isCurrent={isCurrent}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Lesson Row ───

function LessonRow({ lesson, moduleId, locked, isCurrent }: {
  lesson: LessonItem;
  moduleId: string;
  locked: boolean;
  isCurrent: boolean;
}) {
  const content = (
    <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
      locked
        ? "opacity-40"
        : isCurrent
          ? "bg-primary/[0.06] border border-primary/20"
          : lesson.completed
            ? "bg-emerald-50/50"
            : "hover:bg-muted/50"
    }`}>
      {/* Status icon */}
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
        locked
          ? "bg-muted text-muted-foreground/40"
          : lesson.completed
            ? "bg-emerald-100 text-emerald-600"
            : isCurrent
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
      }`}>
        {locked ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        ) : lesson.completed ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
        ) : (
          <span className="text-[10px] font-bold">{lesson.order}</span>
        )}
      </div>

      {/* Title */}
      <p className={`flex-1 text-sm ${
        locked ? "text-muted-foreground/50" : lesson.completed ? "text-muted-foreground" : "text-foreground font-medium"
      }`}>
        {lesson.title}
      </p>

      {/* Arrow for unlocked */}
      {!locked && (
        <svg className="h-4 w-4 shrink-0 text-muted-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
      )}
    </div>
  );

  if (locked) return <div>{content}</div>;

  return (
    <Link href={`/dashboard/module/${moduleId}/lesson/${lesson.id}`} className="block">
      {content}
    </Link>
  );
}
