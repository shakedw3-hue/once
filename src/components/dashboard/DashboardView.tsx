"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { PILLARS } from "@/lib/constants";
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

interface DashboardViewProps {
  fullName: string;
  primaryPath: Pillar;
  secondaryPath: Pillar;
  scores: PillarScores;
  modules: ModuleWithProgress[];
  totalLessons: number;
  totalCompleted: number;
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
  modules,
  totalLessons,
  totalCompleted,
}: DashboardViewProps) {
  const primary = PILLARS[primaryPath];
  const firstName = fullName.split(" ")[0] || "there";
  const overallProgress =
    totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Find next module to work on
  const nextModule = modules.find(
    (m) => m.completedLessons < m.totalLessons
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Top nav */}
      <header className="relative z-10 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/dashboard" className="font-display text-xl font-semibold tracking-[-0.04em]"><span className="text-foreground">Once</span><span className="text-primary">.</span></Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:block">
              {fullName}
            </span>
            <form action={logout}>
              <Button variant="ghost" size="sm" type="submit">
                Log out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting & overall progress */}
          <motion.div variants={fadeUp} className="mb-10">
            <h1 className="mb-1 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Welcome back, {firstName}.
            </h1>
            <p className="text-muted-foreground">
              Your path is waiting.{" "}
              <span className="once-signature">Once<span className="once-dot">.</span></span>
            </p>
          </motion.div>

          {/* Top cards row */}
          <motion.div
            variants={fadeUp}
            className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Overall Progress */}
            <Card className="sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Overall Progress
                </p>
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {overallProgress}%
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {totalCompleted}/{totalLessons} lessons
                  </span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </CardContent>
            </Card>

            {/* Pillar Radar */}
            <Card className="lg:col-span-2">
              <CardContent className="flex flex-col items-center justify-center p-6 sm:flex-row sm:gap-8">
                <PillarRadar scores={scores} />
                <div className="mt-4 sm:mt-0">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your Paths
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full bg-gradient-to-r ${primary.color}`}
                      />
                      <span className="text-sm font-medium">
                        {primary.title}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        Primary
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full bg-gradient-to-r ${PILLARS[secondaryPath].color}`}
                      />
                      <span className="text-sm font-medium">
                        {PILLARS[secondaryPath].title}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        Secondary
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next lesson CTA */}
          {nextModule && (
            <motion.div variants={fadeUp} className="mb-8">
              <Card className="relative overflow-hidden border-primary/20">
                <div
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-primary/70"
                />
                <CardContent className="flex items-center justify-between gap-4 p-5 pl-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Continue Learning
                    </p>
                    <p className="mt-0.5 font-semibold text-foreground">{nextModule.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {nextModule.completedLessons} of {nextModule.totalLessons}{" "}
                      lessons done
                    </p>
                  </div>
                  <Button
                    render={
                      <Link href={`/dashboard/module/${nextModule.id}`} />
                    }
                    className="shrink-0"
                  >
                    Continue Once
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="my-8 h-px bg-border" />

          {/* Modules list */}
          <motion.div variants={fadeUp}>
            <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">
              Your Modules
            </h2>
            <div className="space-y-4">
              {modules.map((mod, i) => {
                const modProgress =
                  mod.totalLessons > 0
                    ? Math.round(
                        (mod.completedLessons / mod.totalLessons) * 100
                      )
                    : 0;
                const isComplete = modProgress === 100;
                const isActive =
                  !isComplete && mod.completedLessons > 0;

                return (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  >
                    <Link href={`/dashboard/module/${mod.id}`}>
                      <Card
                        className={`group transition-all hover:shadow-md hover:border-primary/20 ${
                          isComplete ? "border-emerald-200 bg-emerald-50" : ""
                        }`}
                      >
                        <CardContent className="flex items-center gap-5 p-5">
                          {/* Module number */}
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                              isComplete
                                ? "bg-emerald-50 text-emerald-600"
                                : isActive
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isComplete ? (
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              mod.order
                            )}
                          </div>

                          {/* Module info */}
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold group-hover:text-primary transition-colors">
                              {mod.title}
                            </p>
                            <p className="truncate text-sm text-muted-foreground">
                              {mod.description}
                            </p>
                          </div>

                          {/* Progress */}
                          <div className="hidden shrink-0 items-center gap-3 sm:flex">
                            <div className="w-24">
                              <Progress value={modProgress} className="h-1.5" />
                            </div>
                            <span className="text-xs text-muted-foreground w-16 text-right">
                              {mod.completedLessons}/{mod.totalLessons} lessons
                            </span>
                          </div>

                          {/* Arrow */}
                          <svg
                            className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
