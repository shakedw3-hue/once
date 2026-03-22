import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWeeklyProgressEmail } from "@/lib/email";

export const runtime = "edge";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: Request) {
  // Auth check — require secret header to prevent unauthorized triggers
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  // Fetch all paid users with their email and name
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id, email, full_name, plan, created_at")
    .eq("has_paid", true);

  if (usersError || !users) {
    return NextResponse.json(
      { error: "Failed to fetch users", details: usersError?.message },
      { status: 500 }
    );
  }

  let sent = 0;
  let failed = 0;

  for (const user of users) {
    try {
      // Calculate week number since signup
      const createdAt = new Date(user.created_at);
      const now = new Date();
      const weekNumber = Math.max(1, Math.ceil((now.getTime() - createdAt.getTime()) / (7 * 24 * 60 * 60 * 1000)));

      // Get lessons completed this week
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { count: lessonsThisWeek } = await supabase
        .from("lesson_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", true)
        .gte("completed_at", weekAgo);

      // Get current streak (consecutive days with completed lessons)
      const { data: recentLessons } = await supabase
        .from("lesson_progress")
        .select("completed_at")
        .eq("user_id", user.id)
        .eq("completed", true)
        .order("completed_at", { ascending: false })
        .limit(90);

      let currentStreak = 0;
      if (recentLessons && recentLessons.length > 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const uniqueDays = new Set(
          recentLessons.map((l) => {
            const d = new Date(l.completed_at);
            return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
          })
        );

        const sortedDays = Array.from(uniqueDays).sort().reverse();
        const checkDate = new Date(today);

        for (const day of sortedDays) {
          const key = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
          if (day === key) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }
      }

      // Get overall progress (total completed / total available)
      const { count: totalCompleted } = await supabase
        .from("lesson_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", true);

      // Estimate total lessons based on plan
      const totalLessons: Record<string, number> = { core: 20, pro: 40, ai: 60 };
      const planTotal = totalLessons[user.plan || "core"] || 20;
      const overallProgress = Math.min(100, Math.round(((totalCompleted || 0) / planTotal) * 100));

      // Get user email from auth (users table may not have it)
      const email = user.email;
      if (!email) continue;

      const firstName = (user.full_name as string)?.split(" ")[0] || "there";

      await sendWeeklyProgressEmail({
        email,
        firstName,
        weekNumber,
        lessonsThisWeek: lessonsThisWeek || 0,
        currentStreak,
        overallProgress,
      });

      sent++;
    } catch (err) {
      console.error(`Failed to send weekly email to user ${user.id}:`, err);
      failed++;
    }
  }

  return NextResponse.json({
    success: true,
    sent,
    failed,
    total: users.length,
  });
}
