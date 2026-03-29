export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import Certificate from "@/components/dashboard/Certificate";
import { theme } from "@/lib/theme";
import type { Pillar } from "@/types/database";

interface Props {
  params: Promise<{ trackId: string }>;
}

// Map trackId to display name and pillar key
const TRACK_MAP: Record<string, { name: string; pillar: Pillar }> = {
  money: { name: "Money", pillar: "money" },
  mind: { name: "Mind", pillar: "mind" },
  body: { name: "Body", pillar: "body" },
  spirit: { name: "Spirit", pillar: "spirit" },
  "social-media": { name: "Social Media Income", pillar: "money" },
  "ecommerce": { name: "E-Commerce Income", pillar: "money" },
  "freelancing": { name: "Freelancing Income", pillar: "money" },
  "side-income": { name: "Side Income", pillar: "money" },
  "ai-content": { name: "AI Content Creation", pillar: "mind" },
  "ai-customer-service": { name: "AI Customer Service", pillar: "mind" },
  "ai-code": { name: "AI Code Builder", pillar: "mind" },
};

export default async function CertificatePage({ params }: Props) {
  const { trackId } = await params;
  const supabase = await createClient();
  const service = createServiceClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const track = TRACK_MAP[trackId];
  if (!track) redirect("/dashboard");

  // Get user profile for name
  const { data: profile } = await service
    .from("users")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const userName = profile?.full_name || user.email?.split("@")[0] || "Student";

  // Get the path for this pillar
  const { data: path } = await service
    .from("paths")
    .select("id")
    .eq("pillar", track.pillar)
    .maybeSingle();

  if (!path) redirect("/dashboard");

  // For core pillars, check all modules under that path
  // For income tracks, check modules matching the track name
  let moduleIds: string[] = [];

  if (["money", "mind", "body", "spirit"].includes(trackId)) {
    // Core pillar — get all core modules (order <= 5)
    const { data: modules } = await service
      .from("modules")
      .select("id, order")
      .eq("path_id", path.id);

    const coreModules = (modules || []).filter((m) => m.order <= 5);
    moduleIds = coreModules.map((m) => m.id);
  } else {
    // Income track — find modules by matching title patterns
    const { data: modules } = await service
      .from("modules")
      .select("id, title, order")
      .eq("path_id", path.id);

    // For income tracks, modules are order > 5
    const incomeModules = (modules || []).filter((m) => m.order > 5);
    moduleIds = incomeModules.map((m) => m.id);
  }

  if (moduleIds.length === 0) redirect("/dashboard");

  // Get all lessons in these modules
  const { data: lessons } = await service
    .from("lessons")
    .select("id")
    .in("module_id", moduleIds);

  if (!lessons || lessons.length === 0) redirect("/dashboard");

  const lessonIds = lessons.map((l) => l.id);

  // Check user progress — all lessons must be completed
  const { data: progress } = await service
    .from("user_progress")
    .select("lesson_id, completed")
    .eq("user_id", user.id)
    .in("lesson_id", lessonIds)
    .eq("completed", true);

  const completedIds = new Set((progress || []).map((p) => p.lesson_id));
  const allCompleted = lessonIds.every((id) => completedIds.has(id));

  if (!allCompleted) redirect("/dashboard");

  // Find completion date (latest completed_at)
  const { data: latestProgress } = await service
    .from("user_progress")
    .select("completed_at")
    .eq("user_id", user.id)
    .in("lesson_id", lessonIds)
    .eq("completed", true)
    .order("completed_at", { ascending: false })
    .limit(1)
    .single();

  const completionDate = latestProgress?.completed_at
    ? new Date(latestProgress.completed_at).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const pillarColor = theme.pillar[track.pillar]?.color ?? "#4F46E5";

  return (
    <Certificate
      userName={userName}
      trackName={track.name}
      completionDate={completionDate}
      pillarColor={pillarColor}
    />
  );
}
