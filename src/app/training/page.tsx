"use client";

import { useCallback, useEffect, useState } from "react";
import { Info, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { Card, SectionHeading } from "@/components/ui/Card";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { addWorkoutSession, getRecentWorkoutSessions } from "@/lib/supabase/queries";
import { todayISO } from "@/lib/date";

const WEEK_PLAN = [
  { day: "Mon", label: "Full Body A", type: "strength" },
  { day: "Tue", label: "Outdoor + Core", type: "cardio" },
  { day: "Wed", label: "Full Body B", type: "strength" },
  { day: "Thu", label: "Rest", type: "rest" },
  { day: "Fri", label: "Full Body A", type: "strength" },
  { day: "Sat", label: "Outdoor (optional)", type: "cardio" },
  { day: "Sun", label: "Rest", type: "rest" },
];

const TODAY_EXERCISES = [
  {
    name: "Goblet Squat (or bodyweight squat)",
    sets: "3 x 12-15",
    rest: "60-90s",
    why: "Builds the squat pattern and leg strength — the base for everything else. Bodyweight is fine until form is solid.",
  },
  {
    name: "Dumbbell Bench Press (or Push-up)",
    sets: "3 x 10-12",
    rest: "60-90s",
    why: "Chest/shoulders/triceps push strength. Push-ups are a full substitute if no bench.",
  },
  {
    name: "Dumbbell Row (or backpack row)",
    sets: "3 x 12 each side",
    rest: "60s",
    why: "Balances out all the pushing/sitting from your desk job and builds back strength.",
  },
  {
    name: "Glute Bridge",
    sets: "3 x 15",
    rest: "45s",
    why: "Wakes up glutes that go dormant from sitting all day — protects your lower back.",
  },
  {
    name: "Plank",
    sets: "3 x 30-45s",
    rest: "45s",
    why: "Core stability so heavier lifts later don't stress your spine.",
  },
];

// Rough MET-based estimate for a ~50min moderate resistance session at this bodyweight.
// Will be replaced by a per-session estimate once effort/duration are actually captured.
const ESTIMATED_SESSION_KCAL = 280;

export default function TrainingPage() {
  const { user } = useAuth();
  const [loggedToday, setLoggedToday] = useState(false);
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);

  const checkToday = useCallback(async () => {
    if (!user) return;
    setChecking(true);
    const supabase = createClient();
    const sessions = await getRecentWorkoutSessions(supabase, user.id, 0);
    setLoggedToday(sessions.some((s) => s.logged_on === todayISO() && s.session_type !== "rest"));
    setChecking(false);
  }, [user]);

  useEffect(() => {
    if (user) checkToday();
  }, [user, checkToday]);

  const handleLog = async () => {
    if (!user || loggedToday) return;
    setSaving(true);
    const supabase = createClient();
    await addWorkoutSession(supabase, user.id, {
      session_name: "Full Body A",
      session_type: "strength",
      duration_min: 50,
      estimated_kcal: ESTIMATED_SESSION_KCAL,
    });
    setLoggedToday(true);
    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      {!user && <DemoBanner />}

      <div>
        <p className="text-sm text-muted-foreground">Phase 1 · Foundation · Week 2</p>
        <h1 className="text-2xl font-semibold tracking-tight">Training</h1>
      </div>

      <Card className="flex items-start gap-2 bg-surface-muted text-sm text-muted-foreground">
        <Info size={16} className="mt-0.5 shrink-0 text-accent" />
        <p>
          Programmed for dumbbells + bodyweight by default. Tell me what&apos;s actually in your
          apartment gym and I&apos;ll tailor the exact exercises.
        </p>
      </Card>

      <Card>
        <SectionHeading title="This week" subtitle="4-5 sessions, 45-60 min each" />
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {WEEK_PLAN.map((d) => (
            <div key={d.day} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">{d.day}</span>
              <div
                className={`flex h-14 w-full items-center justify-center rounded-lg text-[10px] font-medium leading-tight ${
                  d.type === "strength"
                    ? "bg-accent-soft text-accent"
                    : d.type === "cardio"
                      ? "bg-warning-soft text-warning"
                      : "bg-surface-muted text-muted-foreground"
                }`}
              >
                {d.label}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading title="Today · Full Body A" subtitle="Foundation strength" />
        <div className="flex flex-col gap-3">
          {TODAY_EXERCISES.map((ex) => (
            <div key={ex.name} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium">{ex.name}</p>
                <p className="whitespace-nowrap text-xs text-muted-foreground">{ex.sets}</p>
              </div>
              <p className="text-xs text-muted-foreground">Rest {ex.rest} — {ex.why}</p>
            </div>
          ))}
        </div>
        {user ? (
          <button
            onClick={handleLog}
            disabled={loggedToday || saving || checking}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold ${
              loggedToday ? "bg-accent-soft text-accent" : "bg-accent text-accent-foreground"
            } disabled:cursor-default`}
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {loggedToday ? (
              <>
                <Check size={16} /> Logged for today
              </>
            ) : (
              "Log this workout"
            )}
          </button>
        ) : (
          <button className="mt-4 w-full rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground">
            Sign in to log workouts
          </button>
        )}
      </Card>
    </div>
  );
}
