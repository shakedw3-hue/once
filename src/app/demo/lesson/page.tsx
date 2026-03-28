export const dynamic = "force-dynamic";
import { createServiceClient } from "@/lib/supabase/server";
import LessonView from "@/components/dashboard/LessonView";
import { theme } from "@/lib/theme";
import type { Pillar } from "@/types/database";

export default async function DemoLessonPage() {
  const db = createServiceClient();

  // Pick a good demo lesson — first lesson of first module of Money pillar
  const { data: path } = await db
    .from("paths")
    .select("id, pillar")
    .eq("pillar", "money")
    .single();

  if (!path) return <p>No content found</p>;

  // Get first module
  const { data: modules } = await db
    .from("modules")
    .select("id, title, description, order, path_id")
    .eq("path_id", path.id);

  const sorted = (modules ?? []).sort((a, b) => a.order - b.order);
  const mod = sorted[0];
  if (!mod) return <p>No module found</p>;

  // Get lessons
  const { data: lessons } = await db
    .from("lessons")
    .select("id, title, description, action_step, reflection_prompt, order, module_id")
    .eq("module_id", mod.id);

  const sortedLessons = (lessons ?? []).sort((a, b) => a.order - b.order);
  const lesson = sortedLessons[0];
  if (!lesson) return <p>No lesson found</p>;

  const pillarKey = path.pillar as Pillar;
  const pillarColor = theme.pillar[pillarKey]?.color ?? "#F59E0B";
  const pillarName = pillarKey.charAt(0).toUpperCase() + pillarKey.slice(1);

  const nextLessonId = sortedLessons[1]?.id ?? null;

  return (
    <div>
      <LessonView
        lesson={lesson}
        module={mod}
        progress={null}
        nextLessonId={nextLessonId}
        prevLessonId={null}
        userId="demo"
        isPro={true}
        totalLessonsInModule={sortedLessons.length}
        pillarColor={pillarColor}
        pillarName={pillarName}
      />
    </div>
  );
}
