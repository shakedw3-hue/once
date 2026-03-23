import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import webpush from "web-push";

export const dynamic = "force-dynamic";

function getWebPush() {
  if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    throw new Error("VAPID keys not configured");
  }
  webpush.setVapidDetails(
    "mailto:hello@onceph.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
  return webpush;
}

export async function GET(request: Request) {
  // Auth check — require secret header to prevent unauthorized triggers
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  // Fetch all push subscriptions joined with user data
  const { data: subscriptions, error: subError } = await supabase
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth, user_id, users(id, current_streak)");

  if (subError || !subscriptions) {
    return NextResponse.json(
      { error: "Failed to fetch subscriptions", details: subError?.message },
      { status: 500 }
    );
  }

  let sent = 0;
  let failed = 0;
  const toDelete: string[] = [];

  for (const sub of subscriptions) {
    const streak = (sub.users as unknown as { current_streak: number })?.current_streak ?? 0;

    let title: string;
    let body: string;

    if (streak === 0) {
      title = "Start your day with Once.";
      body = "Your lesson is waiting. Begin your streak today.";
    } else if (streak >= 1 && streak <= 6) {
      title = `Day ${streak}. Keep going.`;
      body = "Your streak is building. Don't stop now.";
    } else {
      title = `${streak}-day streak!`;
      body = "That's discipline. Your next lesson is ready.";
    }

    const pushSubscription = {
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.p256dh,
        auth: sub.auth,
      },
    };

    try {
      await getWebPush().sendNotification(
        pushSubscription,
        JSON.stringify({ title, body, icon: "/icons/icon-192x192.png" })
      );
      sent++;
    } catch (err: unknown) {
      const statusCode = (err as { statusCode?: number })?.statusCode;
      if (statusCode === 410) {
        // Subscription expired — mark for deletion
        toDelete.push(sub.id);
      }
      failed++;
    }
  }

  // Clean up expired subscriptions
  if (toDelete.length > 0) {
    await supabase
      .from("push_subscriptions")
      .delete()
      .in("id", toDelete);
  }

  return NextResponse.json({
    success: true,
    sent,
    failed,
    deleted: toDelete.length,
    total: subscriptions.length,
  });
}
