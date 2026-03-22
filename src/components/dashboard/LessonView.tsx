"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { completeLesson } from "@/app/dashboard/module/[moduleId]/lesson/actions";
import {
  generateHook,
  extractSourceInfo,
  extractKeyInsight,
  extractTakeaways,
  extractQuote,
  extractStat,
  estimateReadTime,
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
  totalLessonsInModule: number;
}

const BOOKMARK_KEY = "once_saved_insights";

function toggleInsight(insight: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const saved = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
    const idx = saved.indexOf(insight);
    if (idx >= 0) { saved.splice(idx, 1); } else { saved.push(insight); }
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(saved));
    return idx < 0;
  } catch { return false; }
}

export default function LessonView({
  lesson,
  module: mod,
  progress,
  nextLessonId,
  prevLessonId,
  isPro,
  totalLessonsInModule,
}: LessonViewProps) {
  const router = useRouter();
  const [reflection, setReflection] = useState(progress?.reflection ?? "");
  const [completed, setCompleted] = useState(progress?.completed ?? false);
  const [saving, setSaving] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [insightSaved, setInsightSaved] = useState(false);

  // Derived content
  const hook = generateHook(lesson.title, lesson.description);
  const sourceInfo = extractSourceInfo(lesson.description);
  const keyInsight = extractKeyInsight(lesson.description);
  const takeaways = extractTakeaways(lesson.description);
  const quote = extractQuote(lesson.description);
  const stat = extractStat(lesson.description);
  const readTime = estimateReadTime(lesson.description, lesson.action_step);
  const actionSteps = splitActionSteps(lesson.action_step);
  const tools = isPro ? getToolSpotlight(lesson.title) : null;
  const realNumbers = isPro ? getRealNumbers(lesson.title) : null;
  const isOpener = isModuleOpener(lesson.order);

  // Split description into paragraphs for better readability
  const descParagraphs = lesson.description.split(/\n\n|\.\s{2,}/).filter(p => p.trim().length > 0);
  // If only 1 paragraph, split by sentences into 2-3 groups
  const contentBlocks = descParagraphs.length > 1 ? descParagraphs : splitIntoBlocks(lesson.description);

  const lessonProgress = Math.round((lesson.order / totalLessonsInModule) * 100);

  const handleToggleStep = useCallback((idx: number) => {
    setCheckedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  }, []);

  const handleSaveInsight = useCallback(() => {
    setInsightSaved(toggleInsight(keyInsight));
  }, [keyInsight]);

  async function handleComplete() {
    setSaving(true);
    const result = await completeLesson(lesson.id, reflection.trim() || null);
    if (result.success) setCompleted(true);
    setSaving(false);
  }

  function handleNext() {
    if (nextLessonId) router.push(`/dashboard/module/${mod.id}/lesson/${nextLessonId}`);
    else router.push(`/dashboard/module/${mod.id}`);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-4 px-5">
          <a href={`/dashboard`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            Dashboard
          </a>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">
              {lesson.order}/{totalLessonsInModule}
            </Badge>
            <span className="text-xs text-muted-foreground">{readTime} min</span>
          </div>
        </div>
        {/* Lesson progress bar */}
        <div className="h-0.5 bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${lessonProgress}%` }} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-6 sm:py-10">
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

          {/* ═══ LESSON HEADER ═══ */}
          <div className="mb-6">
            <p className="mb-2 text-xs font-medium text-primary uppercase tracking-wider">
              {mod.title} · Lesson {lesson.order}
            </p>
            <h1 className="mb-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {lesson.title}
            </h1>
            {completed && (
              <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200">Completed</Badge>
            )}
          </div>

          {/* ═══ MODULE OPENER ═══ */}
          {isOpener && (
            <div className="mb-6 rounded-xl border border-primary/15 bg-primary/[0.03] p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Starting: {mod.title}</p>
              <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{mod.description}</p>
              <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  3–5 days
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  10 min/day
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                  {totalLessonsInModule} lessons
                </span>
              </div>
            </div>
          )}

          {/* ═══ THE HOOK ═══ */}
          <div className="mb-6 overflow-hidden rounded-xl border">
            <div className="h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
            <div className="p-5">
              <p className="text-base font-medium leading-relaxed">{hook}</p>
            </div>
          </div>

          {/* ═══ STAT BOX (if available) ═══ */}
          {stat && (
            <div className="mb-6 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200/50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 mb-0.5">Did You Know</p>
                <p className="text-sm font-medium text-amber-900">{stat}</p>
              </div>
            </div>
          )}

          {/* ═══ WHAT YOU'LL LEARN (takeaways) ═══ */}
          {takeaways.length > 0 && (
            <div className="mb-6 rounded-xl border bg-muted/30 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">What You Will Learn</p>
              <div className="space-y-2.5">
                {takeaways.map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ LESSON CONTENT ═══ */}
          <div className="mb-6">
            <Card>
              <CardContent className="p-5 sm:p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  The Lesson
                </h2>
                <div className="space-y-4">
                  {contentBlocks.map((block, i) => (
                    <p key={i} className="text-sm leading-[1.8] text-muted-foreground">
                      {block.trim()}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ═══ EXPERT QUOTE ═══ */}
          {quote && sourceInfo && (
            <div className="mb-6 rounded-xl bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] border border-primary/10 p-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary/20 mb-2">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm font-medium leading-relaxed text-foreground italic mb-3">
                &ldquo;{quote.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {sourceInfo.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-xs font-semibold">{sourceInfo.name}</p>
                  <p className="text-[10px] text-muted-foreground">{sourceInfo.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* ═══ KEY INSIGHT (bookmarkable) ═══ */}
          <div className="mb-6 flex items-start gap-0 rounded-xl border border-primary/20 bg-primary/[0.04] overflow-hidden">
            <div className="w-1.5 shrink-0 self-stretch bg-primary" />
            <div className="flex-1 p-4 sm:p-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  Key Insight
                </p>
                <button onClick={handleSaveInsight} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={insightSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className={insightSaved ? "text-primary" : ""}>
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  {insightSaved ? "Saved" : "Save"}
                </button>
              </div>
              <p className="text-sm font-medium leading-relaxed">{keyInsight}</p>
            </div>
          </div>

          {/* ═══ SOURCE ATTRIBUTION ═══ */}
          {sourceInfo && !quote && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {sourceInfo.name.split(" ").map(n => n[0]).join("")}
              </div>
              <p className="text-xs text-muted-foreground">
                Built from the work of <span className="font-semibold text-foreground">{sourceInfo.name}</span> · {sourceInfo.role}
              </p>
            </div>
          )}

          {/* ═══ TOOL SPOTLIGHT (Pro/AI) ═══ */}
          {tools && tools.length > 0 && (
            <div className="mb-6">
              <Card className="border-amber-200/50 bg-amber-50/50">
                <CardContent className="p-5">
                  <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                    Tool Spotlight
                  </h2>
                  <div className="space-y-2.5">
                    {tools.map((tool) => (
                      <div key={tool.name} className="flex items-start justify-between gap-3 rounded-lg border border-amber-200/50 bg-white/80 px-3 py-2.5">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">{tool.name}</p>
                          <p className="text-xs text-muted-foreground">{tool.description}</p>
                          <p className="mt-0.5 text-[11px] font-medium text-amber-700">{tool.cost}</p>
                        </div>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/5 transition-colors">
                          Open →
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ═══ REAL NUMBERS (Pro/AI) ═══ */}
          {realNumbers && (
            <div className="mb-6 rounded-xl border border-emerald-200/50 bg-emerald-50/50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                </div>
                <div>
                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">Real Numbers — Philippines</p>
                  <p className="text-sm leading-relaxed font-medium text-emerald-900">{realNumbers}</p>
                </div>
              </div>
            </div>
          )}

          {/* ═══ ACTION STEPS ═══ */}
          {lesson.action_step && (
            <div className="mb-6">
              <Card className="border-primary/15 bg-primary/[0.04]">
                <CardContent className="p-5">
                  <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    Do This Today
                  </h2>
                  <div className="space-y-3">
                    {actionSteps.map((step, idx) => (
                      <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                        <div className="mt-1 shrink-0">
                          <div className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                            checkedSteps[idx] ? "bg-primary border-primary" : "border-primary/30"
                          }`}>
                            {checkedSteps[idx] && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                            )}
                          </div>
                          <input type="checkbox" checked={checkedSteps[idx] || false} onChange={() => handleToggleStep(idx)} className="sr-only" />
                        </div>
                        <span className={`text-sm leading-relaxed transition-colors ${
                          checkedSteps[idx] ? "text-muted-foreground line-through" : ""
                        }`}>
                          {step}
                        </span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ═══ REFLECTION ═══ */}
          {lesson.reflection_prompt && (
            <div className="mb-6">
              <Card>
                <CardContent className="p-5">
                  <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                    Your Reflection
                  </h2>
                  <div className="mb-4 rounded-lg bg-muted/50 p-4">
                    <p className="text-sm text-foreground italic leading-relaxed">
                      &ldquo;{lesson.reflection_prompt}&rdquo;
                    </p>
                  </div>
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
            </div>
          )}

          {/* ═══ BOTTOM ACTIONS ═══ */}
          <div className="border-t pt-6">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              {prevLessonId ? (
                <a href={`/dashboard/module/${mod.id}/lesson/${prevLessonId}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                  Previous
                </a>
              ) : <div />}

              {!completed ? (
                <Button onClick={handleComplete} disabled={saving} size="lg" className="h-12 font-semibold w-full sm:w-auto">
                  {saving ? "Saving..." : "Complete This Step"}
                </Button>
              ) : (
                <div className="flex flex-col items-center gap-3 w-full sm:items-end sm:w-auto">
                  <p className="once-signature">One more step<span style={{color:"#4F46E5"}}>.</span> Once<span style={{color:"#4F46E5"}}>.</span></p>
                  <Button onClick={handleNext} size="lg" className="h-12 font-semibold w-full sm:w-auto">
                    {nextLessonId ? "Next Lesson →" : "Back to Dashboard"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.article>
      </main>
    </div>
  );
}

// Split a long text into 2-3 readable blocks
function splitIntoBlocks(text: string): string[] {
  const sentences = text.split(/\.\s+/);
  if (sentences.length <= 3) return [text];

  const third = Math.ceil(sentences.length / 3);
  const blocks: string[] = [];
  for (let i = 0; i < sentences.length; i += third) {
    const chunk = sentences.slice(i, i + third).join(". ");
    blocks.push(chunk.endsWith(".") ? chunk : chunk + ".");
  }
  return blocks;
}
