import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client for server-only, cross-user operations (the evening
 * reminder cron needs to read every user's subscriptions/check-in status,
 * which no single user's RLS-scoped session can do). Never import this from
 * client components or anything reachable from the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
