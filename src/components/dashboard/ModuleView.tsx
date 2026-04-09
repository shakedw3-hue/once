"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

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

// ─── Theme tokens (mirrors DashboardView for visual unity) ───
const C = {
  paper: "#FAFAF7",
  ink: "#0A0A0F",
  border: "#EAE8E0",
  borderSoft: "#EFEDE6",
  stone50: "#F7F6F2",
  stone100: "#EFEDE6",
  stone200: "#E2DFD4",
  stone300: "#C8C3B2",
  stone400: "#9A937D",
  stone500: "#6B6452",
  stone600: "#48433A",
  indigo: "#4F46E5",
};

export default function ModuleView({ module: mod, lessons }: ModuleViewProps) {
  const completed = lessons.filter((l) => l.completed).length;
  const progress = lessons.length > 0 ? completed / lessons.length : 0;
  const nextLesson = lessons.find((l) => !l.completed);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: C.paper,
        color: C.ink,
        fontFamily: "var(--font-sans), Inter, system-ui, sans-serif",
      }}
    >
      {/* ===== HEADER ===== */}
      <header
        className="px-6 lg:px-10 py-6 flex items-center justify-between gap-4"
        style={{ borderBottom: `1px solid ${C.stone200}` }}
      >
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-display text-2xl font-semibold tracking-tight">
            Once<span style={{ color: C.indigo }}>.</span>
          </Link>
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-1.5 text-sm hover:opacity-100 opacity-70 transition"
            style={{ color: C.stone600 }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to dashboard
          </Link>
        </div>
        <div className="text-xs lining-nums tabular-nums" style={{ color: C.stone500 }}>
          Module {mod.order}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-12">
        {/* ===== MODULE INTRO ===== */}
        <div className="mb-10">
          <div className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: C.stone500 }}>
            Module {mod.order} · {lessons.length} lessons
          </div>
          <h1 className="font-display text-[42px] sm:text-[52px] leading-[1.05] font-semibold mb-5">
            {mod.title}
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: C.stone600 }}>
            {mod.description}
          </p>

          {/* Progress strip */}
          {lessons.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: C.stone500 }}>
                  Your progress
                </div>
                <div className="text-sm font-semibold lining-nums tabular-nums">
                  {completed} / {lessons.length}
                </div>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.stone100 }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${progress * 100}%`, backgroundColor: C.ink }}
                />
              </div>
              {nextLesson && (
                <div className="mt-5">
                  <Link href={`/dashboard/module/${mod.id}/lesson/${nextLesson.id}`}>
                    <Button
                      className="rounded-full text-sm font-medium px-6 py-3 hover:opacity-90 transition flex items-center gap-2 h-auto"
                      style={{ backgroundColor: C.ink, color: C.paper }}
                    >
                      {completed === 0 ? "Start first lesson" : "Continue lesson"}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== EMPTY STATE ===== */}
        {lessons.length === 0 && (
          <div
            className="rounded-3xl p-12 text-center"
            style={{ backgroundColor: "#FFFFFF", border: `1px dashed ${C.stone200}` }}
          >
            <div
              className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: C.stone100 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={C.stone500} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <p className="text-sm font-medium">No lessons available yet</p>
            <p className="text-xs mt-1" style={{ color: C.stone500 }}>
              Lessons for this module are being prepared.
            </p>
          </div>
        )}

        {/* ===== LESSONS LIST ===== */}
        {lessons.length > 0 && (
          <div className="space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-widest mb-4" style={{ color: C.stone500 }}>
              All lessons
            </div>
            {lessons.map((lesson) => {
              const isNext = nextLesson?.id === lesson.id;
              return (
                <Link
                  key={lesson.id}
                  href={`/dashboard/module/${mod.id}/lesson/${lesson.id}`}
                  className="block group"
                >
                  <div
                    className="flex items-start gap-4 p-5 transition hover:shadow-sm"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: `1px solid ${isNext ? C.ink : C.border}`,
                      borderRadius: 18,
                    }}
                  >
                    {/* Status indicator */}
                    <div
                      className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-semibold"
                      style={{
                        backgroundColor: lesson.completed
                          ? C.ink
                          : isNext
                          ? C.ink
                          : "#FFFFFF",
                        border: lesson.completed || isNext ? "none" : `1.5px solid ${C.stone200}`,
                        color: lesson.completed || isNext ? C.paper : C.stone400,
                      }}
                    >
                      {lesson.completed ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        lesson.order
                      )}
                    </div>

                    {/* Lesson info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p
                          className="font-display text-lg font-medium leading-tight"
                          style={{
                            color: lesson.completed ? C.stone500 : C.ink,
                          }}
                        >
                          {lesson.title}
                        </p>
                        {isNext && !lesson.completed && (
                          <span
                            className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: C.ink, color: C.paper }}
                          >
                            Up next
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: C.stone500 }}>
                        {lesson.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <svg
                      className="w-4 h-4 shrink-0 mt-3 transition group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={C.stone300}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
