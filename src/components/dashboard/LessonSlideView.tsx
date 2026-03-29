"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { buildSlides, type Slide } from "@/lib/lesson-slides";
import { completeLesson } from "@/app/dashboard/module/[moduleId]/lesson/actions";
import HookSlide from "./slides/HookSlide";
import StatSlide from "./slides/StatSlide";
import TakeawaySlide from "./slides/TakeawaySlide";
import ContentSlide from "./slides/ContentSlide";
import QuoteSlide from "./slides/QuoteSlide";
import InsightSlide from "./slides/InsightSlide";
import ToolSlide from "./slides/ToolSlide";
import RealNumbersSlide from "./slides/RealNumbersSlide";
import ActionSlide from "./slides/ActionSlide";
import ReflectionSlide from "./slides/ReflectionSlide";
import CompleteSlide from "./slides/CompleteSlide";
import TemplateSlide from "./slides/TemplateSlide";
import QuizSlide from "./slides/QuizSlide";

interface LessonSlideViewProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    action_step: string;
    reflection_prompt: string;
    order: number;
    module_id: string;
  };
  isPro: boolean;
  pillarColor: string;
  pillarName: string;
  lessonNumber: number;
  totalLessons: number;
  moduleTitle: string;
  moduleId: string;
  progress: { id: string; completed: boolean; reflection: string | null } | null;
  nextLessonId: string | null;
  onComplete: () => void;
}

export default function LessonSlideView({
  lesson,
  isPro,
  pillarColor,
  pillarName,
  lessonNumber,
  totalLessons,
  moduleTitle,
  moduleId,
  progress,
  nextLessonId,
  onComplete,
}: LessonSlideViewProps) {
  const router = useRouter();
  const isLastLesson = !nextLessonId;
  const slides = useRef<Slide[]>(buildSlides(lesson, isPro, isLastLesson, moduleTitle)).current;
  const totalSlideCount = slides.length;

  const [current, setCurrent] = useState(0);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [reflectionText, setReflectionText] = useState(progress?.reflection ?? "");
  const [completed, setCompleted] = useState(progress?.completed ?? false);

  // Touch tracking
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isDragging = useRef(false);
  const locked = useRef(false);

  const currentRef = useRef(current);
  currentRef.current = current;

  const progressPct = ((current + 1) / totalSlideCount) * 100;
  const isDark = slides[current]?.type === "hook" || slides[current]?.type === "quote";

  // --- Navigation ---
  const go = useCallback((dir: 1 | -1) => {
    if (locked.current) return;
    const next = currentRef.current + dir;
    if (next < 0 || next >= totalSlideCount) return;
    locked.current = true;
    setCurrent(next);
    setTimeout(() => { locked.current = false; }, 400);
  }, [totalSlideCount]);

  const goTo = useCallback((idx: number) => {
    if (locked.current || idx === currentRef.current) return;
    locked.current = true;
    setCurrent(idx);
    setTimeout(() => { locked.current = false; }, 400);
  }, []);

  // --- Keyboard ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  // --- Touch ---
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDragging.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (touchDeltaX.current < -40) go(1);
    else if (touchDeltaX.current > 40) go(-1);
    touchDeltaX.current = 0;
  }

  // --- Click to advance (tap right half = next, left half = prev) ---
  function handleClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    // Don't navigate if clicking on interactive elements
    if (target.closest("button") || target.closest("a") || target.closest("input") || target.closest("textarea") || target.closest("label")) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width * 0.65) go(1);
    else if (x < rect.width * 0.35) go(-1);
  }

  // --- Auto-complete on final slide ---
  useEffect(() => {
    if (slides[current]?.type === "complete" && !completed) {
      completeLesson(lesson.id, reflectionText.trim() || null).then((res) => {
        if (res.success) {
          setCompleted(true);
          onComplete();
        }
      });
    }
  }, [current]);

  function handleNextLesson() {
    if (nextLessonId) router.push(`/dashboard/module/${moduleId}/lesson/${nextLessonId}`);
    else router.push(`/dashboard/module/${moduleId}`);
  }

  const actionStepsDone = Object.values(checkedSteps).filter(Boolean).length;
  const actionStepsTotal = slides.find((s) => s.type === "action")?.data.steps?.length ?? 0;

  function renderSlide(slide: Slide, index: number) {
    const isActive = index === current;
    switch (slide.type) {
      case "hook":
        return <HookSlide data={slide.data as any} pillarColor={pillarColor} isActive={isActive} moduleTitle={moduleTitle} lessonNumber={lessonNumber} />;
      case "stat":
        return <StatSlide data={slide.data as any} pillarColor={pillarColor} isActive={isActive} />;
      case "takeaways":
        return <TakeawaySlide data={slide.data as any} pillarColor={pillarColor} isActive={isActive} />;
      case "content":
        return <ContentSlide data={slide.data as any} pillarColor={pillarColor} isActive={isActive} />;
      case "quote":
        return <QuoteSlide data={slide.data as any} pillarColor={pillarColor} isActive={isActive} />;
      case "insight":
        return <InsightSlide data={slide.data as any} pillarColor={pillarColor} />;
      case "tool":
        return <ToolSlide data={slide.data as any} pillarColor={pillarColor} />;
      case "realNumbers":
        return <RealNumbersSlide data={slide.data as any} pillarColor={pillarColor} />;
      case "template":
        return <TemplateSlide data={slide.data as any} pillarColor={pillarColor} isActive={isActive} />;
      case "quiz":
        return <QuizSlide data={slide.data as any} pillarColor={pillarColor} isActive={isActive} />;
      case "action":
        return <ActionSlide data={slide.data as any} pillarColor={pillarColor} initialChecked={checkedSteps} onCheckedChange={setCheckedSteps} />;
      case "reflection":
        return <ReflectionSlide data={slide.data as any} pillarColor={pillarColor} initialText={reflectionText} onReflectionChange={setReflectionText} />;
      case "complete":
        return <CompleteSlide data={slide.data} pillarColor={pillarColor} actionStepsDone={actionStepsDone} actionStepsTotal={actionStepsTotal} hasReflection={reflectionText.trim().length > 0} onNext={handleNextLesson} isLastLesson={!nextLessonId} isActive={isActive} />;
      default:
        return null;
    }
  }

  return (
    <div
      className="relative select-none"
      style={{ height: "100dvh", overflow: "hidden" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-1" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#f3f4f6" }}>
        <div className="h-full" style={{ width: `${progressPct}%`, backgroundColor: pillarColor, transition: "width 0.4s ease-out" }} />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-3 pb-2">
        <button
          onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/module/${moduleId}`); }}
          className="flex items-center gap-1 text-sm"
          style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#9ca3af" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          Back
        </button>
        <p className="text-xs truncate max-w-[50%] text-center" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>{lesson.title}</p>
        <span className="text-xs font-medium" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>{current + 1}/{totalSlideCount}</span>
      </header>

      {/* Slides — only render current slide for performance */}
      {slides.map((slide, i) => {
        const isDarkSlide = slide.type === "hook" || slide.type === "quote";
        const isVisible = Math.abs(i - current) <= 1; // render current + adjacent
        return (
          <div
            key={`${slide.type}-${i}`}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
              transition: "opacity 0.4s ease-out",
              background: isDarkSlide
                ? `linear-gradient(165deg, ${pillarColor}15 0%, #0c0a1a 50%, #08071a 100%)`
                : `linear-gradient(180deg, ${pillarColor}08 0%, #ffffff 40%, #ffffff 100%)`,
              paddingTop: 48,
              paddingBottom: 56,
              overflowY: "auto",
            }}
          >
            {isVisible ? renderSlide(slide, i) : null}
          </div>
        );
      })}

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 z-10 flex items-center justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 10 : 6,
              height: i === current ? 10 : 6,
              backgroundColor: i === current ? pillarColor : isDark ? "rgba(255,255,255,0.3)" : "#d1d5db",
              opacity: i === current ? 1 : 0.5,
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideHint {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `}} />
    </div>
  );
}
