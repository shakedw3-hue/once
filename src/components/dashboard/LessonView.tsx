"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Textarea } from "@/components/ui/textarea";
import { completeLesson } from "@/app/dashboard/module/[moduleId]/lesson/actions";

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
  module: { id: string; title: string; order: number };
  progress: { id: string; completed: boolean; reflection: string | null } | null;
  nextLessonId: string | null;
  prevLessonId: string | null;
  userId: string;
}

export default function LessonView({
  lesson,
  module: mod,
  progress,
  nextLessonId,
  prevLessonId,
}: LessonViewProps) {
  const router = useRouter();
  const [reflection, setReflection] = useState(progress?.reflection ?? "");
  const [completed, setCompleted] = useState(progress?.completed ?? false);
  const [saving, setSaving] = useState(false);

  async function handleComplete() {
    setSaving(true);
    const result = await completeLesson(
      lesson.id,
      reflection.trim() || null
    );
    if (result.success) {
      setCompleted(true);
    }
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
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-4 px-6">
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

      <main className="mx-auto max-w-3xl px-6 py-10">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Lesson header */}
          <div className="mb-8">
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
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
              {lesson.title}
            </h1>
          </div>

          {/* Lesson content — digital worksheet format */}
          <div className="space-y-8">
            {/* Description / Teaching */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  Lesson
                </h2>
                <div className="max-w-none text-muted-foreground leading-relaxed">
                  <p>{lesson.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Step */}
            {lesson.action_step && (
              <Card className="border-primary/15 bg-primary/5">
                <CardContent className="p-6">
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    Action Step
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">{lesson.action_step}</p>
                </CardContent>
              </Card>
            )}

            {/* Reflection */}
            {lesson.reflection_prompt && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    Reflection
                  </h2>
                  <p className="mb-4 text-muted-foreground italic">
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
            )}
          </div>

          <div className="my-8 h-px bg-border" />

          {/* Bottom actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {prevLessonId ? (
              <Button
                render={
                  <Link
                    href={`/dashboard/module/${mod.id}/lesson/${prevLessonId}`}
                  />
                }
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
              <Button onClick={handleComplete} disabled={saving} className="font-semibold">
                {saving ? "Saving..." : "Complete This Step"}
              </Button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                <p className="once-signature">One more step. Once<span style={{color:"#4F46E5"}}>.</span></p>
                <Button onClick={handleNext} className="font-semibold">
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
