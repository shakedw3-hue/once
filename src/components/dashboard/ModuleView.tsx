"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface LessonWithProgress {
  id: string;
  title: string;
  description: string;
  order: number;
  completed: boolean;
}

interface ModuleViewProps {
  module: { id: string; title: string; description: string; order: number };
  lessons: LessonWithProgress[];
}

export default function ModuleView({ module: mod, lessons }: ModuleViewProps) {
  const completed = lessons.filter((l) => l.completed).length;
  const progress = lessons.length > 0 ? Math.round((completed / lessons.length) * 100) : 0;
  const nextLesson = lessons.find((l) => !l.completed);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-4xl items-center gap-4 px-6">
          <Button render={<Link href="/dashboard" />} variant="ghost" size="sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </Button>
          <span className="text-sm text-muted-foreground">
            Module {mod.order}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Module header */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-3">
              Module {mod.order}
            </Badge>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
              {mod.title}
            </h1>
            <p className="mb-4 text-muted-foreground">{mod.description}</p>
            <div className="flex items-center gap-3">
              <Progress value={progress} className="h-2 w-40" />
              <span className="text-sm text-muted-foreground">
                {completed}/{lessons.length} complete
              </span>
            </div>
          </div>

          {/* Lessons list */}
          <div className="space-y-3">
            {lessons.map((lesson, i) => {
              const isNext = nextLesson?.id === lesson.id;

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    href={`/dashboard/module/${mod.id}/lesson/${lesson.id}`}
                  >
                    <Card
                      className={`group transition-all hover:shadow-md hover:border-primary/20 ${
                        lesson.completed
                          ? "border-emerald-200 bg-emerald-50"
                          : isNext
                            ? "border-primary/20 bg-primary/5"
                            : ""
                      }`}
                    >
                      <CardContent className="flex items-center gap-4 p-4">
                        {/* Status indicator */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            lesson.completed
                              ? "bg-emerald-50 text-emerald-600"
                              : isNext
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {lesson.completed ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            lesson.order
                          )}
                        </div>

                        {/* Lesson info */}
                        <div className="min-w-0 flex-1">
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {lesson.title}
                          </p>
                          <p className="truncate text-sm text-muted-foreground">
                            {lesson.description}
                          </p>
                        </div>

                        {/* Status badge / arrow */}
                        {isNext && (
                          <Badge className="shrink-0">Up Next</Badge>
                        )}
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
      </main>
    </div>
  );
}
