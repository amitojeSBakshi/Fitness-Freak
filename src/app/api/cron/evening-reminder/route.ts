import { NextResponse } from "next/server";
import webpush from "web-push";
import { createAdminClient } from "@/lib/supabase/admin";
import { todayISO } from "@/lib/date";

webpush.setVapidDetails(
  "mailto:amitojesinghb@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

/**
 * Triggered once daily by Vercel Cron (see vercel.json). Sends the evening
 * check-in nudge to every subscribed device, skipping anyone who's already
 * logged a habit_logs row for today so it doesn't nag people who don't need it.
 */
export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const today = todayISO();

  const [{ data: subs, error: subsError }, { data: doneToday, error: habitsError }] = await Promise.all([
    supabase.from("push_subscriptions").select("id, user_id, endpoint, p256dh, auth"),
    supabase.from("habit_logs").select("user_id").eq("logged_on", today),
  ]);

  if (subsError || habitsError) {
    return NextResponse.json({ error: (subsError ?? habitsError)?.message }, { status: 500 });
  }

  const alreadyCheckedIn = new Set((doneToday ?? []).map((h) => h.user_id));
  const targets = (subs ?? []).filter((s) => !alreadyCheckedIn.has(s.user_id));

  const payload = JSON.stringify({
    title: "Fit Freak",
    body: "Quick daily check-in — water, meals, sleep and steps. Two minutes.",
    url: "/",
  });

  let sent = 0;
  const stale: string[] = [];

  await Promise.all(
    targets.map(async (s) => {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          payload,
        );
        sent++;
      } catch (err) {
        const statusCode = (err as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) stale.push(s.endpoint);
      }
    }),
  );

  if (stale.length > 0) {
    await supabase.from("push_subscriptions").delete().in("endpoint", stale);
  }

  return NextResponse.json({ sent, skipped: alreadyCheckedIn.size, staleRemoved: stale.length });
}
