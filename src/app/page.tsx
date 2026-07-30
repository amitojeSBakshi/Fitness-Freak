"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Dumbbell, Sparkles, ChevronRight, Droplets, Footprints, Check, UserPlus, NotebookPen } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { Card, SectionHeading } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { IntakeRing } from "@/components/charts/IntakeRing";
import { MacroBreakdown } from "@/components/charts/MacroBreakdown";
import { DailyCheckinModal } from "@/components/DailyCheckin";
import { targetsFromProfile } from "@/lib/nutrition/targets";
import { SESSIONS, nextSessionName } from "@/lib/training/program";
import { getFoodLogsForDate, sumFoodLogs, getRecentWorkoutSessions, getHabitLog } from "@/lib/supabase/queries";
import { daysAgoISO, shortWeekday, todayISO } from "@/lib/date";

const DEMO_WEEK = [
  { date: daysAgoISO(3), done: true },
  { date: daysAgoISO(2), done: true },
  { date: daysAgoISO(1), done: false },
  { date: todayISO(), done: false },
];

const DEMO = {
  calories: { logged: 1450 },
  macros: { protein: 92, carbs: 148, fat: 46 },
  workoutTitle: "Upper A",
  workoutExercises: SESSIONS[0].exercises.map((e) => e.name),
  water: 1.8,
  tip: "Protein has been under target 2 days running — lean on eggs, chicken or a shake today.",
};

export default function HomePage() {
  const { user, profile, profileLoading } = useAuth();
  const [eaten, setEaten] = useState<{ kcal: number; protein: number; carbs: number; fat: number } | null>(null);
  const [water, setWater] = useState<number | null>(null);
  const [weekDays, setWeekDays] = useState<{ date: string; done: boolean }[]>([]);
  const [sessionName, setSessionName] = useState(SESSIONS[0].name);
  const [loading, setLoading] = useState(false);
  const [checkinOpen, setCheckinOpen] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const supabase = createClient();
    const [foodLogs, sessions, habit] = await Promise.all([
      getFoodLogsForDate(supabase, user.id, todayISO()),
      getRecentWorkoutSessions(supabase, user.id, 7),
      getHabitLog(supabase, user.id, todayISO()),
    ]);
    setEaten(sumFoodLogs(foodLogs));
    setWater(habit?.water_l ?? 0);

    const trainedDates = new Set(sessions.filter((s) => s.session_type !== "rest").map((s) => s.logged_on));
    setWeekDays(Array.from({ length: 7 }, (_, i) => ({ date: daysAgoISO(6 - i), done: trainedDates.has(daysAgoISO(6 - i)) })));

    const strengthSessions = sessions.filter((s) => s.session_type === "strength");
    const last = strengthSessions[strengthSessions.length - 1];
    setSessionName(nextSessionName(last?.session_name ?? null));

    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  const t = targetsFromProfile(user ? profile : null);
  const session = SESSIONS.find((s) => s.name === sessionName) ?? SESSIONS[0];
  const needsOnboarding = user && !profileLoading && !profile?.onboarding_completed;

  const caloriesLogged = user ? eaten?.kcal ?? 0 : DEMO.calories.logged;
  const macros = user
    ? { protein: eaten?.protein ?? 0, carbs: eaten?.carbs ?? 0, fat: eaten?.fat ?? 0 }
    : DEMO.macros;
  const waterValue = user ? water ?? 0 : DEMO.water;
  const week = user ? weekDays : DEMO_WEEK;

  return (
    <div className="flex flex-col gap-4 pb-4">
      {!user && <DemoBanner />}

      <div>
        <p className="text-sm text-muted-foreground">Good to see you</p>
        <h1 className="text-2xl font-bold tracking-tight">Let&apos;s make today count</h1>
      </div>

      {needsOnboarding && (
        <Link href="/onboarding">
          <Card className="flex items-center gap-3 border-accent/30 bg-accent-soft">
            <UserPlus className="shrink-0 text-accent" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium">Finish setting up your profile</p>
              <p className="text-xs text-muted-foreground">
                2 minutes — your age, weight, equipment and goal calculate your real targets below,
                instead of these generic defaults.
              </p>
            </div>
            <ChevronRight size={18} className="shrink-0 text-accent" />
          </Card>
        </Link>
      )}

      {!loading && week.length > 0 && (
        <div className="flex justify-between gap-1">
          {week.map((d) => {
            const isToday = d.date === todayISO();
            return (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">{shortWeekday(d.date)}</span>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                    d.done
                      ? "bg-accent text-accent-foreground"
                      : isToday
                        ? "border-2 border-accent text-accent"
                        : "bg-surface-muted text-muted-foreground"
                  }`}
                >
                  {d.done ? <Check size={16} strokeWidth={3} /> : new Date(`${d.date}T00:00:00`).getDate()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Card className="flex items-center gap-3 border-accent/30 bg-accent-soft">
        <Sparkles className="shrink-0 text-accent" size={20} />
        <p className="text-sm">{DEMO.tip}</p>
      </Card>

      <Card>
        <SectionHeading title="Today's intake" subtitle="Calories & macros" />
        <div className="flex items-center gap-4">
          <IntakeRing value={Math.round(caloriesLogged)} target={t.targetKcal} />
          <div className="flex-1">
            <MacroBreakdown
              grams={{ protein: Math.round(macros.protein), carbs: Math.round(macros.carbs), fat: Math.round(macros.fat) }}
              targets={{ protein: t.proteinG, carbs: t.carbsG, fat: t.fatG }}
            />
          </div>
        </div>
        <Link
          href="/calorie-tool"
          className="mt-4 flex items-center justify-center gap-1 rounded-xl border border-border py-2.5 text-sm font-semibold"
        >
          Log food <ChevronRight size={16} />
        </Link>
      </Card>

      <Card>
        <SectionHeading
          title="Up next"
          subtitle={`${session.exercises.length} exercises · ~45 min`}
          action={<Dumbbell className="text-accent" size={20} />}
        />
        <div className="mb-3 rounded-xl bg-surface-muted p-3">
          <p className="mb-2 text-sm font-semibold">{user ? session.name : DEMO.workoutTitle}</p>
          <ul className="flex flex-col gap-1 text-xs text-muted-foreground">
            {(user ? session.exercises.map((e) => e.name) : DEMO.workoutExercises).map((ex) => (
              <li key={ex} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {ex}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/training"
          className="flex items-center justify-center gap-1 rounded-xl bg-accent py-3 text-sm font-bold text-accent-foreground"
        >
          Start workout <ChevronRight size={16} />
        </Link>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <StatTile icon={Droplets} label="Water" value={`${waterValue}L`} sub={`of ${t.waterL}L target`} />
        <StatTile icon={Footprints} label="Steps" value="4,200" sub="of 7,000 target" />
      </div>

      {user && (
        <button
          onClick={() => setCheckinOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-semibold"
        >
          <NotebookPen size={16} /> Daily check-in
        </button>
      )}

      {user && checkinOpen && (
        <DailyCheckinModal
          userId={user.id}
          onClose={() => setCheckinOpen(false)}
          onDone={() => {
            setCheckinOpen(false);
            load();
          }}
        />
      )}
    </div>
  );
}
