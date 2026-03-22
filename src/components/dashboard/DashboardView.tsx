"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PILLARS } from "@/lib/constants";
import { ModuleIllustration, PillarBadge, PillarDivider } from "@/components/ui/illustrations";
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
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
}: DashboardViewProps) {
  const primary = PILLARS[primaryPath];
  const firstName = fullName.split(" ")[0] || "there";
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  const allMods = pathModules.flatMap((p) => [...p.coreMods, ...p.proMods]);
  const nextModule = allMods.find((m) => m.completedLessons < m.totalLessons);

  const planLabel = plan === "ai" ? "AI Careers" : plan === "pro" ? "Pro" : "Core";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <header className="relative z-10 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <Link href="/dashboard" className="font-display text-xl font-semibold tracking-[-0.04em]">
            <span className="text-foreground">Once</span>
            <span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden text-[10px] sm:inline-flex">{planLabel}</Badge>
            <span className="hidden text-sm text-muted-foreground sm:block">{fullName}</span>
            <form action={logout}>
              <Button variant="ghost" size="sm" type="submit">Log out</Button>
            </form>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-8 sm:py-10">
        <motion.div variants={stagger} initial="hidden" animate="visible">

          <motion.div variants={fadeUp} className="mb-8">
            <h1 className="mb-1 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Welcome back, {firstName}.
            </h1>
            <p className="text-muted-foreground">
              Your path is waiting.{" "}
              <span className="once-signature">Once<span style={{color:"#4F46E5"}}>.</span></span>
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="sm:col-span-2 lg:col-span-1">
              <CardContent className="p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Overall Progress</p>
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight text-foreground">{overallProgress}%</span>
                  <span className="text-sm text-muted-foreground">{totalCompleted}/{totalLessons} lessons</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardContent className="flex flex-col items-center justify-center gap-4 p-5 sm:flex-row sm:gap-8">
                <PillarRadar scores={scores} />
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Paths</p>
                  <div className="flex flex-wrap gap-2">
                    <PillarBadge pillar={primaryPath} label={`${primary.title} (Primary)`} />
                    <PillarBadge pillar={secondaryPath} label={`${PILLARS[secondaryPath].title} (Secondary)`} />
                  </div>
                  {recommendationTrack && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Track: <span className="font-medium text-foreground">{recommendationTrack}</span>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {nextModule && (
            <motion.div variants={fadeUp} className="mb-8">
              <Card className="relative overflow-hidden border-primary/20">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-primary/70" />
                <CardContent className="flex items-center justify-between gap-4 p-5 pl-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">Continue Learning</p>
                    <p className="mt-0.5 font-semibold text-foreground">{nextModule.title}</p>
                    <p className="text-sm text-muted-foreground">{nextModule.completedLessons} of {nextModule.totalLessons} lessons done</p>
                  </div>
                  <Button render={<Link href={`/dashboard/module/${nextModule.id}`} />} className="shrink-0">Continue Once</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {pathModules.map((pathGroup, groupIdx) => (
            <motion.div key={pathGroup.pillar} variants={fadeUp}>
              <PillarDivider pillar={pathGroup.pillar} />

              <div className="mb-4 flex items-center gap-3">
                <ModuleIllustration pillar={pathGroup.pillar} size="sm" />
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {pathGroup.title} Path
                  </h2>
                  <p className="text-xs text-muted-foreground">{pathGroup.description}</p>
                </div>
              </div>

              {pathGroup.coreMods.length > 0 && (
                <div className="mb-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Core Modules</p>
                  <div className="space-y-2.5">
                    {pathGroup.coreMods.map((mod, i) => (
                      <ModuleCard key={mod.id} mod={mod} pillar={pathGroup.pillar} />
                    ))}
                  </div>
                </div>
              )}

              {pathGroup.proMods.length > 0 && (
                <div className="mb-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Pro Income Tracks</p>
                  <div className="space-y-2.5">
                    {pathGroup.proMods.map((mod, i) => (
                      <ModuleCard key={mod.id} mod={mod} pillar={pathGroup.pillar} isPro />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          <motion.div variants={fadeUp} className="mt-8">
            <Card className="border-primary/10 bg-primary/[0.02]">
              <CardContent className="p-5 text-center">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Your Once {planLabel} includes</p>
                <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span>{totalLessons} lessons</span>
                  <span>·</span>
                  <span>{pathModules.length} paths</span>
                  <span>·</span>
                  <span>{allMods.length} modules</span>
                  <span>·</span>
                  <span>Lifetime access</span>
                </div>
                <p className="mt-3 once-signature">Once<span style={{color:"#4F46E5"}}>.</span></p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

function ModuleCard({ mod, pillar, isPro }: { mod: ModuleWithProgress; pillar: Pillar; delay?: number; isPro?: boolean }) {
  const modProgress = mod.totalLessons > 0 ? Math.round((mod.completedLessons / mod.totalLessons) * 100) : 0;
  const isComplete = modProgress === 100;
  const isActive = !isComplete && mod.completedLessons > 0;

  return (
    <Link href={`/dashboard/module/${mod.id}`} className="block">
      <div className={`group rounded-xl border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20 ${isComplete ? "border-emerald-200 bg-emerald-50/50" : ""}`}>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ModuleIllustration pillar={pillar} variant={mod.order} size="sm" />
          </div>

          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:hidden ${
            isComplete ? "bg-emerald-50 text-emerald-600" : isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          }`}>
            {isComplete ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            ) : mod.order}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold group-hover:text-primary transition-colors">{mod.title}</p>
              {isPro && <Badge variant="outline" className="text-[9px]">Pro</Badge>}
            </div>
            <p className="truncate text-sm text-muted-foreground">{mod.description}</p>
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <div className="w-20"><Progress value={modProgress} className="h-1.5" /></div>
            <span className="w-14 text-right text-xs text-muted-foreground">{mod.completedLessons}/{mod.totalLessons}</span>
          </div>

          <svg className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </div>
      </div>
    </Link>
  );
}
