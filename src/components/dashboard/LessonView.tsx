"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { completeLesson } from "@/app/dashboard/module/[moduleId]/lesson/actions";
import {
  generateHook,
  extractSourceName,
  extractKeyInsight,
  splitActionSteps,
  getToolSpotlight,
  getRealNumbers,
  isModuleOpener,
} from "@/lib/lesson-content";

interface LessonViewProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    action_step: string;
    reflection_prompt: string;
    order: number;
    module_id: string;
  };
  module: { id: string; title: string; description: string; order: number };
  progress: { id: string; completed: boolean; reflection: string | null } | null;
  nextLessonId: string | null;
  prevLessonId: string | null;
  userId: string;
  isPro: boolean;
}

const BOOKMARK_KEY = "once_saved_insights";

function getSavedInsights(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  } catch { return []; }
}

function toggleInsight(insight: string): boolean {
  const saved = getSavedInsights();
  const idx = saved.indexOf(insight);
  if (idx >= 0) {
    saved.splice(idx, 1);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(saved));
    return false;
  }
  saved.push(insight);
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(saved));
  return true;
}

export default function LessonView({
  lesson,
  module: mod,
  progress,
  nextLessonId,
  prevLessonId,
  isPro,
}: LessonViewProps) {
  const router = useRouter();
  const [reflection, setReflection] = useState(progress?.reflection ?? "");
  const [completed, setCompleted] = useState(progress?.completed ?? false);
  const [saving, setSaving] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [insightSaved, setInsightSaved] = useState(false);

  // Derived content
  const hook = generateHook(lesson.title, lesson.description);
  const sourceName = extractSourceName(lesson.description);
  const keyInsight = extractKeyInsight(lesson.description);
  const actionSteps = splitActionSteps(lesson.action_step);
  const tools = isPro ? getToolSpotlight(lesson.title) : null;
  const realNumbers = isPro ? getRealNumbers(lesson.title) : null;
  const isOpener = isModuleOpener(lesson.order);

  const handleToggleStep = useCallback((idx: number) => {
    setCheckedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  }, []);

  const handleSaveInsight = useCallback(() => {
    const saved = toggleInsight(keyInsight);
    setInsightSaved(saved);
  }, [keyInsight]);

  async function handleComplete() {
    setSaving(true);
    const result = await completeLesson(lesson.id, reflection.trim() || null);
    if (result.success) setCompleted(true);
    setSaving(false);
  }

  function handleNext() {
    if (nextLessonId) {
      router.push(`/dashboard/module/${mod.id}/lesson/${nextLessonId}`);
    } else {
      router.push(`/dashboard/module/${mod.id}`);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-4 px-5">
          <Button
            render={<Link href={`/dashboard/module/${mod.id}`} />}
            variant="ghost"
            size="sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {mod.title}
          </Button>
          <span className="ml-auto text-sm text-muted-foreground">
            Lesson {lesson.order}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Lesson header */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="secondary">
                Module {mod.order} · Lesson {lesson.order}
              </Badge>
              {completed && (
                <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                  Completed
                </Badge>
              )}
            </div>
            <h1 className="mb-1 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {lesson.title}
            </h1>
          </div>

          {/* ═══════════════════════════════════════ */}
          {/* MODULE OPENER (first lesson only)      */}
          {/* ═══════════════════════════════════════ */}

          {isOpener && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <Card className="border-primary/15 bg-primary/[0.03]">
                <CardContent className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    Starting: {mod.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {mod.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    5 lessons · 10 min/day · Complete in 3–5 days
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="space-y-6">

            {/* ═══════════════════════════════════════ */}
            {/* LAYER 1 — THE HOOK                     */}
            {/* ═══════════════════════════════════════ */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/20" />
                <CardContent className="p-5">
                  <p className="text-base font-medium leading-relaxed text-foreground">
                    {hook}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* ═══════════════════════════════════════ */}
            {/* LAYER 2 — CONTENT                      */}
            {/* ═══════════════════════════════════════ */}

            {/* Teaching */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Lesson
                  </h2>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <p>{lesson.description}</p>
                  </div>

                  {/* Source attribution */}
                  {sourceName && (
                    <p className="mt-4 text-xs text-muted-foreground/60">
                      Built from the work of {sourceName}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Insight */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex items-start gap-0 rounded-xl border border-primary/20 bg-primary/[0.04] overflow-hidden">
                <div className="w-1 shrink-0 self-stretch bg-primary" />
                <div className="flex-1 p-4 sm:p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Key Insight
                    </p>
                    <button
                      onClick={handleSaveInsight}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={insightSaved ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={insightSaved ? "text-primary" : ""}
                      >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                      {insightSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-foreground">
                    {keyInsight}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════ */}
            {/* PRO/AI: Tool Spotlight                  */}
            {/* ═══════════════════════════════════════ */}

            {tools && tools.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-amber-200/50 bg-amber-50/50">
                  <CardContent className="p-5">
                    <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
                      Tool Spotlight
                    </h2>
                    <div className="space-y-2.5">
                      {tools.map((tool) => (
                        <div key={tool.name} className="flex items-start justify-between gap-3 rounded-lg border border-amber-200/50 bg-white/80 px-3 py-2.5">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground">{tool.name}</p>
                            <p className="text-xs text-muted-foreground">{tool.description}</p>
                            <p className="mt-0.5 text-[11px] font-medium text-amber-700">{tool.cost}</p>
                          </div>
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                          >
                            Open →
                          </a>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════ */}
            {/* PRO/AI: Real Numbers                    */}
            {/* ═══════════════════════════════════════ */}

            {realNumbers && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <div className="rounded-xl border border-emerald-200/50 bg-emerald-50/50 px-5 py-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    Real Numbers — Philippines
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {realNumbers}
                  </p>
                </div>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════ */}
            {/* LAYER 3 — ACTION                       */}
            {/* ═══════════════════════════════════════ */}

            {/* Action Steps as checkboxes */}
            {lesson.action_step && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-primary/15 bg-primary/[0.04]">
                  <CardContent className="p-5">
                    <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                      Action Steps — Do This Today
                    </h2>
                    <div className="space-y-2.5">
                      {actionSteps.map((step, idx) => (
                        <label
                          key={idx}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <div className="mt-0.5 shrink-0">
                            <input
                              type="checkbox"
                              checked={checkedSteps[idx] || false}
                              onChange={() => handleToggleStep(idx)}
                              className="h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary/20"
                            />
                          </div>
                          <span className={`text-sm leading-relaxed transition-colors ${
                            checkedSteps[idx] ? "text-muted-foreground line-through" : "text-foreground"
                          }`}>
                            {step}
                          </span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Reflection */}
            {lesson.reflection_prompt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <CardContent className="p-5">
                    <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                      Reflection
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground italic">
                      &ldquo;{lesson.reflection_prompt}&rdquo;
                    </p>
                    <Textarea
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Write your thoughts here..."
                      rows={4}
                      className="resize-none"
                      disabled={completed}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          <div className="my-8 h-px bg-border" />

          {/* Bottom actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {prevLessonId ? (
              <Button
                render={<Link href={`/dashboard/module/${mod.id}/lesson/${prevLessonId}`} />}
                variant="ghost"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Previous
              </Button>
            ) : (
              <div />
            )}

            {!completed ? (
              <Button onClick={handleComplete} disabled={saving} className="h-12 font-semibold sm:h-auto">
                {saving ? "Saving..." : "Complete This Step"}
              </Button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                <p className="once-signature">One more step<span style={{color:"#4F46E5"}}>.</span> Once<span style={{color:"#4F46E5"}}>.</span></p>
                <Button onClick={handleNext} className="h-12 font-semibold sm:h-auto">
                  {nextLessonId ? "Next Lesson" : "Back to Module"}
                  {nextLessonId && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                </Button>
              </div>
            )}
          </div>
        </motion.article>
      </main>
    </div>
  );
}
