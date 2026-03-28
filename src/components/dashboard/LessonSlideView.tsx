"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
  const slides = useRef<Slide[]>(buildSlides(lesson, isPro)).current;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [reflectionText, setReflectionText] = useState(progress?.reflection ?? "");
  const [completed, setCompleted] = useState(progress?.completed ?? false);

  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;
  const progressPct = ((currentSlide + 1) / totalSlides) * 100;

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, isTransitioning]);

  const goNext = useCallback(() => {
    if (isTransitioning || currentSlide >= totalSlides - 1) return;
    setIsTransitioning(true);
    setCurrentSlide((s) => s + 1);
    setTimeout(() => setIsTransitioning(false), 380);
  }, [currentSlide, totalSlides, isTransitioning]);

  const goPrev = useCallback(() => {
    if (isTransitioning || currentSlide <= 0) return;
    setIsTransitioning(true);
    setCurrentSlide((s) => s - 1);
    setTimeout(() => setIsTransitioning(false), 380);
  }, [currentSlide, isTransitioning]);

  function goToSlide(idx: number) {
    if (isTransitioning || idx === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(idx);
    setTimeout(() => setIsTransitioning(false), 380);
  }

  // Touch handlers
  function onTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
  }

  function onTouchMove(e: React.TouchEvent) {
    if (touchStart === null) return;
    const delta = e.touches[0].clientX - touchStart;
    setTouchDelta(delta);
  }

  function onTouchEnd() {
    if (touchStart === null) return;
    if (touchDelta < -50) goNext();
    else if (touchDelta > 50) goPrev();
    setTouchStart(null);
    setTouchDelta(0);
  }

  // Complete lesson on reaching final slide
  useEffect(() => {
    if (slides[currentSlide]?.type === "complete" && !completed) {
      completeLesson(lesson.id, reflectionText.trim() || null).then((res) => {
        if (res.success) {
          setCompleted(true);
          onComplete();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  function handleNextLesson() {
    if (nextLessonId) {
      router.push(`/dashboard/module/${moduleId}/lesson/${nextLessonId}`);
    } else {
      router.push(`/dashboard/module/${moduleId}`);
    }
  }

  const actionStepsDone = Object.values(checkedSteps).filter(Boolean).length;
  const actionStepsTotal =
    slides.find((s) => s.type === "action")?.data.steps?.length ?? 0;

  // Determine drag offset only while touching
  const dragOffset = touchStart !== null ? touchDelta : 0;

  function renderSlide(slide: Slide, index: number) {
    const isActive = index === currentSlide;

    switch (slide.type) {
      case "hook":
        return <HookSlide data={slide.data as any} pillarColor={pillarColor} />;
      case "stat":
        return (
          <StatSlide
            data={slide.data as any}
            pillarColor={pillarColor}
            isActive={isActive}
          />
        );
      case "takeaways":
        return (
          <TakeawaySlide
            data={slide.data as any}
            pillarColor={pillarColor}
            isActive={isActive}
          />
        );
      case "content":
        return <ContentSlide data={slide.data as any} />;
      case "quote":
        return (
          <QuoteSlide data={slide.data as any} pillarColor={pillarColor} />
        );
      case "insight":
        return (
          <InsightSlide data={slide.data as any} pillarColor={pillarColor} />
        );
      case "tool":
        return (
          <ToolSlide data={slide.data as any} pillarColor={pillarColor} />
        );
      case "realNumbers":
        return (
          <RealNumbersSlide
            data={slide.data as any}
            pillarColor={pillarColor}
          />
        );
      case "action":
        return (
          <ActionSlide
            data={slide.data as any}
            pillarColor={pillarColor}
            initialChecked={checkedSteps}
            onCheckedChange={setCheckedSteps}
          />
        );
      case "reflection":
        return (
          <ReflectionSlide
            data={slide.data as any}
            pillarColor={pillarColor}
            initialText={reflectionText}
            onReflectionChange={setReflectionText}
          />
        );
      case "complete":
        return (
          <CompleteSlide
            data={slide.data}
            pillarColor={pillarColor}
            actionStepsDone={actionStepsDone}
            actionStepsTotal={actionStepsTotal}
            hasReflection={reflectionText.trim().length > 0}
            onNext={handleNextLesson}
            isLastLesson={!nextLessonId}
            isActive={isActive}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-white select-none"
      style={{ height: "100dvh", touchAction: "pan-y" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-gray-100">
        <div
          className="h-full"
          style={{
            width: `${progressPct}%`,
            backgroundColor: pillarColor,
            transition: "width 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-3 pb-2">
        <button
          onClick={() => router.push(`/dashboard/module/${moduleId}`)}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>

        <p
          className="text-xs text-gray-400 truncate max-w-[50%] text-center"
          title={lesson.title}
        >
          {lesson.title}
        </p>

        <span className="text-xs font-medium text-gray-400">
          {currentSlide + 1}/{totalSlides}
        </span>
      </header>

      {/* Slides container */}
      <div
        className="relative h-full"
        style={{
          willChange: "transform",
          transform: `translateX(calc(${-currentSlide * 100}% + ${dragOffset}px))`,
          transition:
            touchStart !== null
              ? "none"
              : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          width: `${totalSlides * 100}%`,
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={`${slide.type}-${i}`}
            className="relative"
            style={{
              width: `${100 / totalSlides}%`,
              height: "100dvh",
              flexShrink: 0,
              paddingTop: 48,
              paddingBottom: 48,
            }}
          >
            {renderSlide(slide, i)}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === currentSlide ? 10 : 6,
              height: i === currentSlide ? 10 : 6,
              backgroundColor:
                i === currentSlide ? pillarColor : "#d1d5db",
              opacity: i === currentSlide ? 1 : 0.5,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
