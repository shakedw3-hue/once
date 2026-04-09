export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import DashboardView from "@/components/dashboard/DashboardView";
import InstallBanner from "@/components/ui/InstallBanner";
import NotificationPrompt from "@/components/ui/NotificationPrompt";
import type { Pillar, PillarScores } from "@/types/database";
import { tracksForPlan, ALL_TRACK_MODULE_TITLES, findTrackById, type TrackMeta } from "@/lib/tracks";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, primary_path, secondary_path, has_paid, plan, recommendation_track, current_streak, longest_streak, last_activity_date")
    .eq("id", user.id)
    .single();

  if (!profile?.primary_path) redirect("/questionnaire");
  if (!profile.has_paid) redirect("/profile");

  const { data: qa } = await supabase
    .from("questionnaire_answers")
    .select("scores")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(1)
    .single();

  // User's pillars
  const pathPillars: Pillar[] = [profile.primary_path as Pillar];
  if (profile.secondary_path && profile.secondary_path !== profile.primary_path) {
    pathPillars.push(profile.secondary_path as Pillar);
  }

  // Use service client for content queries (bypasses RLS)
  const db = createServiceClient();

  // Get paths
  const { data: pathRows } = await db
    .from("paths")
    .select("id, title, description, pillar")
    .in("pillar", pathPillars);

  const pathIds = (pathRows ?? []).map((p) => p.id);

  // Get all modules for user's paths, then filter in JS
  // (column name "order" conflicts with PostgREST .order()/.lte() methods)
  let allModules: { id: string; title: string; description: string; order: number; path_id: string }[] = [];
  if (pathIds.length > 0) {
    const { data: mods } = await db
      .from("modules")
      .select("id, title, description, order, path_id")
      .in("path_id", pathIds);
    // Filter Core (order 1-5) in JS, sort manually
    allModules = (mods ?? [])
      .filter((m) => m.order <= 5)
      .sort((a, b) => a.order - b.order);
  }

  const moduleIds = allModules.map((m) => m.id);


  // Get ALL lessons with titles and order
  let lessons: { id: string; title: string; order: number; module_id: string }[] = [];
  if (moduleIds.length > 0) {
    const { data: lsns } = await db
      .from("lessons")
      .select("id, title, order, module_id")
      .in("module_id", moduleIds);
    lessons = (lsns ?? []).sort((a, b) => a.order - b.order);
  }

  // Get progress
  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id, completed")
    .eq("user_id", user.id);

  const completedLessonIds = new Set(
    (progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id)
  );

  // Build flat lesson list per path with module grouping
  const pathData = pathPillars.map((pillar) => {
    const pathRow = (pathRows ?? []).find((p) => p.pillar === pillar);
    if (!pathRow) return null;

    const mods = allModules
      .filter((m) => m.path_id === pathRow.id)
      .map((mod) => {
        const modLessons = lessons
          .filter((l) => l.module_id === mod.id)
          .map((l) => ({
            id: l.id,
            title: l.title,
            order: l.order,
            moduleId: mod.id,
            completed: completedLessonIds.has(l.id),
          }));

        return {
          id: mod.id,
          title: mod.title,
          order: mod.order,
          lessons: modLessons,
        };
      });

    const allLessonsFlat = mods.flatMap((m) => m.lessons);
    const completedCount = allLessonsFlat.filter((l) => l.completed).length;

    return {
      pillar,
      title: pathRow.title,
      modules: mods,
      totalLessons: allLessonsFlat.length,
      completedLessons: completedCount,
    };
  }).filter(Boolean) as {
    pillar: Pillar;
    title: string;
    modules: {
      id: string;
      title: string;
      order: number;
      lessons: { id: string; title: string; order: number; moduleId: string; completed: boolean }[];
    }[];
    totalLessons: number;
    completedLessons: number;
  }[];

  // First lesson for "Start here"
  const primaryData = pathData.find((p) => p.pillar === profile.primary_path);
  const firstLesson = primaryData?.modules[0]?.lessons[0];

  // Get today's tracking entries
  const today = new Date().toISOString().split("T")[0];
  const { data: todayTracking } = await db
    .from("user_tracking")
    .select("metric_type, metric_value, metric_text")
    .eq("user_id", user.id)
    .eq("entry_date", today);

  // Get last 30 days of tracking for history + averages
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const { data: trackingHistory } = await db
    .from("user_tracking")
    .select("entry_date, metric_type, metric_value, metric_text")
    .eq("user_id", user.id)
    .gte("entry_date", thirtyDaysAgo.toISOString().split("T")[0]);

  // Weekly message
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const { count: weeklyCompleted } = await db
    .from("user_progress")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("completed", true)
    .gte("completed_at", startOfWeek.toISOString());

  // ───── Income & AI tracks data (Pro/AI plans only) ─────
  // Loads modules + lessons for all tracks the user's plan unlocks,
  // groups them by track using src/lib/tracks.ts metadata.
  type TrackData = {
    meta: TrackMeta;
    modules: {
      id: string;
      title: string;
      lessons: { id: string; title: string; order: number; completed: boolean; moduleId: string }[];
    }[];
    totalLessons: number;
    completedLessons: number;
    nextLessonLink: string | null;
  };

  let incomeTracksData: TrackData[] = [];
  const planTracks = tracksForPlan(profile.plan);

  // Active track id: stored in `recommendation_track` column.
  // Only consider it valid if it matches a track in the current plan tier.
  let activeTrackId: string | null = null;
  if (profile.recommendation_track) {
    const candidate = findTrackById(profile.recommendation_track);
    if (candidate && planTracks.find((t) => t.id === candidate.id)) {
      activeTrackId = candidate.id;
    }
  }

  if (planTracks.length > 0) {
    // Find money path id (income tracks all live under money)
    const moneyPath = (pathRows ?? []).find((p) => p.pillar === "money");
    let moneyPathId = moneyPath?.id;

    if (!moneyPathId) {
      const { data: mp } = await db
        .from("paths")
        .select("id")
        .eq("pillar", "money")
        .maybeSingle();
      moneyPathId = mp?.id;
    }

    if (moneyPathId) {
      // Fetch all track modules by title (in case order slots collide between seed migrations)
      const { data: trackMods } = await db
        .from("modules")
        .select("id, title, order, path_id")
        .eq("path_id", moneyPathId)
        .in("title", ALL_TRACK_MODULE_TITLES);

      const trackModuleIds = (trackMods ?? []).map((m) => m.id);

      let trackLessons: { id: string; title: string; order: number; module_id: string }[] = [];
      if (trackModuleIds.length > 0) {
        const { data: lns } = await db
          .from("lessons")
          .select("id, title, order, module_id")
          .in("module_id", trackModuleIds);
        trackLessons = (lns ?? []).sort((a, b) => a.order - b.order);
      }

      incomeTracksData = planTracks.map((trackMeta) => {
        const modules = trackMeta.moduleTitles
          .map((title) => {
            const mod = (trackMods ?? []).find((m) => m.title === title);
            if (!mod) return null;
            const lessons = trackLessons
              .filter((l) => l.module_id === mod.id)
              .map((l) => ({
                id: l.id,
                title: l.title,
                order: l.order,
                moduleId: mod.id,
                completed: completedLessonIds.has(l.id),
              }));
            return { id: mod.id, title: mod.title, lessons };
          })
          .filter(Boolean) as TrackData["modules"];

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
    }
  }

  return (
    <>
    <DashboardView
      fullName={profile.full_name}
      primaryPath={profile.primary_path as Pillar}
      secondaryPath={profile.secondary_path as Pillar}
      scores={(qa?.scores as PillarScores) ?? { money: 0, mind: 0, body: 0, spirit: 0 }}
      pathData={pathData}
      plan={profile.plan}
      recommendationTrack={profile.recommendation_track}
      firstLessonLink={firstLesson ? `/dashboard/module/${firstLesson.moduleId}/lesson/${firstLesson.id}` : null}
      firstModuleTitle={primaryData?.modules[0]?.title ?? null}
      streak={profile.current_streak ?? 0}
      longestStreak={profile.longest_streak ?? 0}
      todayTracking={(todayTracking ?? []) as { metric_type: string; metric_value: number | null; metric_text: string | null }[]}
      trackingHistory={(trackingHistory ?? []) as { entry_date: string; metric_type: string; metric_value: number | null; metric_text: string | null }[]}
      weeklyCompleted={weeklyCompleted ?? 0}
      incomeTracks={incomeTracksData}
      activeTrackId={activeTrackId}
    />
    <InstallBanner />
    <NotificationPrompt />
    </>
  );
}
