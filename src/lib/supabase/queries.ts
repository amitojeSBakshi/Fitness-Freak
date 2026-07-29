import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Profile,
  WeightLog,
  Measurement,
  WorkoutSession,
  ExerciseSet,
  FoodLog,
  HabitLog,
} from "@/lib/types";
import { daysAgoISO, todayISO } from "@/lib/date";

/**
 * All functions here take the caller's Supabase client rather than creating
 * their own — client components pass the browser client, server components /
 * route handlers pass the server client. RLS does the actual access control;
 * these are just typed shorthand over the queries the app repeats often.
 */

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export async function getProfile(supabase: SupabaseClient, userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function upsertProfile(
  supabase: SupabaseClient,
  userId: string,
  patch: Partial<Omit<Profile, "id">>,
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...patch, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ---------------------------------------------------------------------------
// Weight
// ---------------------------------------------------------------------------

export async function getRecentWeightLogs(
  supabase: SupabaseClient,
  userId: string,
  days = 60,
): Promise<WeightLog[]> {
  const { data, error } = await supabase
    .from("weight_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("logged_on", daysAgoISO(days))
    .order("logged_on", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function upsertWeightLog(
  supabase: SupabaseClient,
  userId: string,
  weightKg: number,
  loggedOn: string = todayISO(),
  note?: string,
): Promise<WeightLog> {
  const { data, error } = await supabase
    .from("weight_logs")
    .upsert(
      { user_id: userId, logged_on: loggedOn, weight_kg: weightKg, note },
      { onConflict: "user_id,logged_on" },
    )
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ---------------------------------------------------------------------------
// Measurements
// ---------------------------------------------------------------------------

export async function getRecentMeasurements(
  supabase: SupabaseClient,
  userId: string,
  limit = 12,
): Promise<Measurement[]> {
  const { data, error } = await supabase
    .from("measurements")
    .select("*")
    .eq("user_id", userId)
    .order("logged_on", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function upsertMeasurement(
  supabase: SupabaseClient,
  userId: string,
  patch: Partial<Omit<Measurement, "id" | "user_id">> & { logged_on?: string },
): Promise<Measurement> {
  const { data, error } = await supabase
    .from("measurements")
    .upsert(
      { user_id: userId, logged_on: patch.logged_on ?? todayISO(), ...patch },
      { onConflict: "user_id,logged_on" },
    )
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ---------------------------------------------------------------------------
// Workouts
// ---------------------------------------------------------------------------

export async function getRecentWorkoutSessions(
  supabase: SupabaseClient,
  userId: string,
  days = 28,
): Promise<WorkoutSession[]> {
  const { data, error } = await supabase
    .from("workout_sessions")
    .select("*")
    .eq("user_id", userId)
    .gte("logged_on", daysAgoISO(days))
    .order("logged_on", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addWorkoutSession(
  supabase: SupabaseClient,
  userId: string,
  session: Pick<WorkoutSession, "session_name" | "session_type"> &
    Partial<Pick<WorkoutSession, "duration_min" | "perceived_effort" | "estimated_kcal" | "note">> & {
      logged_on?: string;
    },
): Promise<WorkoutSession> {
  const { data, error } = await supabase
    .from("workout_sessions")
    .insert({ user_id: userId, logged_on: session.logged_on ?? todayISO(), ...session })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function addExerciseSets(
  supabase: SupabaseClient,
  userId: string,
  sessionId: string,
  sets: Array<Pick<ExerciseSet, "exercise_name" | "set_number"> & Partial<Pick<ExerciseSet, "reps" | "weight_kg" | "hold_seconds" | "rir">>>,
): Promise<ExerciseSet[]> {
  if (sets.length === 0) return [];
  const { data, error } = await supabase
    .from("exercise_sets")
    .insert(sets.map((s) => ({ user_id: userId, session_id: sessionId, ...s })))
    .select();
  if (error) throw error;
  return data ?? [];
}

/** Consecutive days (working backward from today) with a logged strength/cardio/outdoor session. */
export function computeStreak(sessions: WorkoutSession[]): number {
  const trainedDays = new Set(
    sessions.filter((s) => s.session_type !== "rest").map((s) => s.logged_on),
  );
  let streak = 0;
  const cursor = new Date();
  // A missed *today* (haven't trained yet) shouldn't zero the streak until the day ends,
  // so start checking from today but don't require it.
  for (let i = 0; i < 365; i++) {
    const iso = daysAgoISO(i);
    if (trainedDays.has(iso)) {
      streak++;
    } else if (i > 0) {
      break;
    }
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// ---------------------------------------------------------------------------
// Food
// ---------------------------------------------------------------------------

export async function getFoodLogsForDate(
  supabase: SupabaseClient,
  userId: string,
  loggedOn: string = todayISO(),
): Promise<FoodLog[]> {
  const { data, error } = await supabase
    .from("food_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("logged_on", loggedOn)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addFoodLog(
  supabase: SupabaseClient,
  userId: string,
  entry: Pick<FoodLog, "raw_input" | "kcal" | "protein_g" | "carbs_g" | "fat_g" | "confidence" | "source"> &
    Partial<Pick<FoodLog, "meal_type" | "matched_food" | "quantity" | "portion_label" | "grams" | "photo_path">> & {
      logged_on?: string;
    },
): Promise<FoodLog> {
  const { data, error } = await supabase
    .from("food_logs")
    .insert({ user_id: userId, logged_on: entry.logged_on ?? todayISO(), ...entry })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteFoodLog(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase.from("food_logs").delete().eq("id", id);
  if (error) throw error;
}

export async function getFoodLogsInRange(
  supabase: SupabaseClient,
  userId: string,
  days: number,
): Promise<FoodLog[]> {
  const { data, error } = await supabase
    .from("food_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("logged_on", daysAgoISO(days))
    .order("logged_on", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/** Sums kcal per day over the last N days (oldest first), including zero-days. */
export function groupKcalByDay(logs: FoodLog[], days: number): { date: string; kcal: number }[] {
  const totals = new Map<string, number>();
  for (const l of logs) totals.set(l.logged_on, (totals.get(l.logged_on) ?? 0) + l.kcal);

  const result: { date: string; kcal: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const iso = daysAgoISO(i);
    result.push({ date: iso, kcal: Math.round(totals.get(iso) ?? 0) });
  }
  return result;
}

export function sumFoodLogs(logs: FoodLog[]) {
  return logs.reduce(
    (acc, l) => ({
      kcal: acc.kcal + l.kcal,
      protein: acc.protein + l.protein_g,
      carbs: acc.carbs + l.carbs_g,
      fat: acc.fat + l.fat_g,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

// ---------------------------------------------------------------------------
// Habits
// ---------------------------------------------------------------------------

export async function getHabitLog(
  supabase: SupabaseClient,
  userId: string,
  loggedOn: string = todayISO(),
): Promise<HabitLog | null> {
  const { data, error } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("logged_on", loggedOn)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getRecentHabitLogs(
  supabase: SupabaseClient,
  userId: string,
  days = 28,
): Promise<HabitLog[]> {
  const { data, error } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("logged_on", daysAgoISO(days))
    .order("logged_on", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function upsertHabitLog(
  supabase: SupabaseClient,
  userId: string,
  patch: Partial<Omit<HabitLog, "id" | "user_id">>,
  loggedOn: string = todayISO(),
): Promise<HabitLog> {
  const { data, error } = await supabase
    .from("habit_logs")
    .upsert({ user_id: userId, logged_on: loggedOn, ...patch }, { onConflict: "user_id,logged_on" })
    .select()
    .single();
  if (error) throw error;
  return data;
}
