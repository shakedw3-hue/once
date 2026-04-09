// Preview-only route. Bypasses auth so the dashboard design can be demoed without a real user.
// Visit /preview/dashboard?plan=core | pro | ai
// Add &active=<trackId> to preview the "active track" hero (e.g. ?plan=ai&active=ai-web-dev)
// Safe to delete once the design is approved.

import DashboardView from "@/components/dashboard/DashboardView";
import { tracksForPlan } from "@/lib/tracks";

export const dynamic = "force-dynamic";

type PlanKey = "core" | "pro" | "ai";

export default async function DashboardPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; active?: string }>;
}) {
  const params = await searchParams;
  const plan: PlanKey =
    params.plan === "core" || params.plan === "pro" || params.plan === "ai"
      ? (params.plan as PlanKey)
      : "pro";
  const requestedActive = params.active || null;

  // Sample lessons for the Money path (Core)
  const moneyLessons = [
    { id: "l1", title: "Why most Filipinos can't save (and the one fix that works)", order: 1, moduleId: "m1", completed: true },
    { id: "l2", title: "The 50-30-20 rule, made for Filipino salaries", order: 2, moduleId: "m1", completed: true },
    { id: "l3", title: "Envelope budgeting in 2026: a 10-minute setup", order: 3, moduleId: "m1", completed: true },
    { id: "l4", title: "How to negotiate your salary without losing your job", order: 4, moduleId: "m1", completed: false },
    { id: "l5", title: "Sari-sari math: turn ₱2,000 into ₱200/day income", order: 5, moduleId: "m1", completed: false },
    { id: "l6", title: "GCash vs Maya: what to use for what", order: 6, moduleId: "m2", completed: false },
    { id: "l7", title: "The emergency fund that actually saves you", order: 7, moduleId: "m2", completed: false },
  ];

  const mindLessons = [
    { id: "l8", title: "The 5 whys technique for emotional clarity", order: 1, moduleId: "m3", completed: true },
    { id: "l9", title: "How to stop replaying conversations in your head", order: 2, moduleId: "m3", completed: true },
    { id: "l10", title: "Daily focus reset: a 7-minute morning routine", order: 3, moduleId: "m3", completed: false },
  ];

  // Build sample income tracks for the selected plan
  const planTracks = tracksForPlan(plan);
  const incomeTracks = planTracks.map((trackMeta, trackIdx) => {
    // Fake some progress so the design shows real states (started/in-progress/completed)
    const modules = trackMeta.moduleTitles.map((title, modIdx) => {
      const modId = `tr-${trackMeta.id}-m${modIdx}`;
      const lessons = Array.from({ length: 5 }, (_, lessonIdx) => ({
        id: `tr-${trackMeta.id}-m${modIdx}-l${lessonIdx}`,
        title: `Lesson ${lessonIdx + 1}: Sample lesson title for ${title}`,
        order: lessonIdx + 1,
        moduleId: modId,
        // First track partially started, second 1 module done, third untouched
        completed: trackIdx === 0 ? modIdx === 0 && lessonIdx < 3 : trackIdx === 1 ? modIdx === 0 : false,
      }));
      return { id: modId, title, lessons };
    });
    const flat = modules.flatMap((m) => m.lessons);
    const completed = flat.filter((l) => l.completed).length;
    const next = flat.find((l) => !l.completed);
    return {
      meta: trackMeta,
      modules,
      totalLessons: flat.length,
      completedLessons: completed,
      nextLessonLink: next ? `/dashboard/module/${next.moduleId}/lesson/${next.id}` : null,
    };
  });

  const sampleData = {
    fullName: "Maria Santos",
    primaryPath: "money" as const,
    secondaryPath: "mind" as const,
    scores: { money: 67, mind: 82, body: 54, spirit: 71 },
    pathData: [
      {
        pillar: "money" as const,
        title: "Money",
        modules: [
          { id: "m1", title: "Financial Direction", order: 1, lessons: moneyLessons.slice(0, 5) },
          { id: "m2", title: "Smart Money Management", order: 2, lessons: moneyLessons.slice(5) },
        ],
        totalLessons: moneyLessons.length,
        completedLessons: moneyLessons.filter((l) => l.completed).length,
      },
      {
        pillar: "mind" as const,
        title: "Mind",
        modules: [
          { id: "m3", title: "Focus Reset", order: 1, lessons: mindLessons },
        ],
        totalLessons: mindLessons.length,
        completedLessons: mindLessons.filter((l) => l.completed).length,
      },
    ],
    plan: plan as string | null,
    recommendationTrack: "Social Media Management" as string | null,
    firstLessonLink: "/dashboard/preview",
    firstModuleTitle: "Financial Direction",
    streak: 23,
    longestStreak: 31,
    weeklyCompleted: 4,
    todayTracking: [
      { metric_type: "savings", metric_value: 500, metric_text: null },
    ],
    trackingHistory: [
      { entry_date: new Date().toISOString().split("T")[0], metric_type: "gratitude", metric_value: null, metric_text: "Reframed an anxious thought before it spiraled" },
      { entry_date: new Date(Date.now() - 86400000).toISOString().split("T")[0], metric_type: "savings", metric_value: 500, metric_text: null },
      { entry_date: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0], metric_type: "gratitude", metric_value: null, metric_text: "Wrote 3 things I was grateful for in tagalog" },
      { entry_date: new Date(Date.now() - 86400000 * 3).toISOString().split("T")[0], metric_type: "savings", metric_value: 250, metric_text: null },
      { entry_date: new Date(Date.now() - 86400000 * 4).toISOString().split("T")[0], metric_type: "gratitude", metric_value: null, metric_text: "Walked for 20 minutes after dinner" },
      { entry_date: new Date(Date.now() - 86400000 * 5).toISOString().split("T")[0], metric_type: "focus_score", metric_value: 8, metric_text: null },
      { entry_date: new Date(Date.now() - 86400000 * 6).toISOString().split("T")[0], metric_type: "savings", metric_value: 300, metric_text: null },
    ],
  };

  // Validate the requested active track id against the available tracks for this plan
  const activeTrackId =
    requestedActive && incomeTracks.find((t) => t.meta.id === requestedActive)
      ? requestedActive
      : null;

  return (
    <DashboardView
      {...sampleData}
      incomeTracks={incomeTracks}
      activeTrackId={activeTrackId}
      previewMode
    />
  );
}
