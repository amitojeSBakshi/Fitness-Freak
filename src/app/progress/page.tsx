"use client";

import { useCallback, useEffect, useState } from "react";
import { Scale, CalendarCheck, Flame, Dumbbell, Droplets, Moon, Footprints } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { Card, SectionHeading } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { WeightChart } from "@/components/charts/WeightChart";
import { WeeklyBars } from "@/components/charts/WeeklyBars";
import { ConsistencyCalendar } from "@/components/charts/ConsistencyCalendar";
import {
  getRecentWeightLogs,
  getRecentWorkoutSessions,
  getFoodLogsInRange,
  groupKcalByDay,
  getHabitLog,
} from "@/lib/supabase/queries";
import { daysAgoISO, shortWeekday, todayISO } from "@/lib/date";
import { deriveTargets } from "@/lib/nutrition/targets";
import type { WeightLog, WorkoutSession, HabitLog } from "@/lib/types";

const DEMO_HABITS = [
  { icon: Droplets, label: "Water", value: 1.8, target: 3.2, unit: "L" },
  { icon: Moon, label: "Sleep", value: 6.5, target: 8, unit: "h" },
  { icon: Footprints, label: "Steps", value: 4200, target: 7000, unit: "" },
];

const DEMO_CALORIE_WEEK = [
  { label: "Mon", value: 2180 },
  { label: "Tue", value: 2050 },
  { label: "Wed", value: 2420 },
  { label: "Thu", value: 1980 },
  { label: "Fri", value: 2610 },
  { label: "Sat", value: 2240 },
  { label: "Sun", value: 1890 },
];

const DEMO_WEIGHT_DATA = [
  { label: "Wk 1", value: 76.4 },
  { label: "Wk 2", value: 76.1 },
  { label: "Wk 3", value: 75.8 },
  { label: "Wk 4", value: 75.6 },
  { label: "Wk 5", value: 75.1 },
  { label: "Wk 6", value: 74.7 },
  { label: "Wk 7", value: 74.3 },
  { label: "Wk 8", value: 74.0 },
];

const DEMO_PATTERN = ["completed", "completed", "rest", "completed", "missed", "rest", "rest"] as const;
const DEMO_CONSISTENCY_DAYS = Array.from({ length: 28 }, (_, i) => ({
  date: `Day ${i + 1}`,
  status: DEMO_PATTERN[i % DEMO_PATTERN.length],
}));

const BODY_STATS = { weightKg: 74, heightCm: 174, age: 22, sex: "male" as const, trainingDaysPerWeek: 5 };

function buildConsistencyDays(sessions: WorkoutSession[]) {
  const trained = new Set(sessions.filter((s) => s.session_type !== "rest").map((s) => s.logged_on));
  const today = todayISO();
  return Array.from({ length: 28 }, (_, i) => {
    const iso = daysAgoISO(27 - i);
    const status = trained.has(iso) ? "completed" : iso === today ? "rest" : "missed";
    return { date: iso, status: status as "completed" | "rest" | "missed" };
  });
}

export default function ProgressPage() {
  const { user } = useAuth();
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [calorieWeek, setCalorieWeek] = useState<{ date: string; kcal: number }[]>([]);
  const [habitLog, setHabitLog] = useState<HabitLog | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const supabase = createClient();
    const [weights, workouts, foodLogs, habit] = await Promise.all([
      getRecentWeightLogs(supabase, user.id, 60),
      getRecentWorkoutSessions(supabase, user.id, 28),
      getFoodLogsInRange(supabase, user.id, 7),
      getHabitLog(supabase, user.id, todayISO()),
    ]);
    setWeightLogs(weights);
    setSessions(workouts);
    setCalorieWeek(groupKcalByDay(foodLogs, 7));
    setHabitLog(habit);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  const targets = deriveTargets(BODY_STATS);

  const weightData = user
    ? weightLogs.map((w) => ({ label: shortWeekday(w.logged_on), value: w.weight_kg }))
    : DEMO_WEIGHT_DATA;

  const calorieBars = user
    ? calorieWeek.map((d) => ({ label: shortWeekday(d.date), value: d.kcal }))
    : DEMO_CALORIE_WEEK;

  const consistencyDays = user ? buildConsistencyDays(sessions) : DEMO_CONSISTENCY_DAYS;

  const trainedCount = user
    ? consistencyDays.filter((d) => d.status === "completed").length
    : DEMO_CONSISTENCY_DAYS.filter((d) => d.status === "completed").length;
  const consistencyPct = Math.round((trainedCount / 28) * 100);

  const daysWithData = user ? calorieWeek.filter((d) => d.kcal > 0) : DEMO_CALORIE_WEEK;
  const avgCalories = daysWithData.length
    ? Math.round(
        (user ? calorieWeek.reduce((s, d) => s + d.kcal, 0) : DEMO_CALORIE_WEEK.reduce((s, d) => s + d.value, 0)) /
          daysWithData.length,
      )
    : 0;

  const weightChange =
    user && weightLogs.length >= 2
      ? Math.round((weightLogs[weightLogs.length - 1].weight_kg - weightLogs[0].weight_kg) * 10) / 10
      : null;

  const habits = user
    ? [
        { icon: Droplets, label: "Water", value: habitLog?.water_l ?? 0, target: targets.waterL, unit: "L" },
        { icon: Moon, label: "Sleep", value: habitLog?.sleep_h ?? 0, target: 8, unit: "h" },
        { icon: Footprints, label: "Steps", value: habitLog?.steps ?? 0, target: 7000, unit: "" },
      ]
    : DEMO_HABITS;

  return (
    <div className="flex flex-col gap-4 pb-4">
      {!user && <DemoBanner />}

      <div>
        <p className="text-sm text-muted-foreground">Small steps, big changes.</p>
        <h1 className="text-2xl font-bold tracking-tight">Your progress</h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatTile
          icon={Flame}
          label="Avg. calories"
          value={avgCalories ? avgCalories.toLocaleString() : "—"}
          sub={`kcal/day · target ${targets.targetKcal.toLocaleString()}`}
        />
        <StatTile
          icon={Dumbbell}
          label="Consistency"
          value={`${consistencyPct}%`}
          sub={`${trainedCount} of 28 days`}
        />
      </div>

      <Card>
        <SectionHeading title="Calorie intake" subtitle="Daily vs. target — orange means over" />
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <WeeklyBars data={calorieBars} target={targets.targetKcal} />
        )}
      </Card>

      <Card>
        <SectionHeading
          title="Weight trend"
          subtitle={
            user
              ? weightData.length >= 2
                ? `${weightData[0].value} kg → ${weightData[weightData.length - 1].value} kg`
                : "Log weight a few more days to see a trend"
              : "76.4 kg → 74.0 kg over 8 weeks"
          }
          action={<Scale className="text-accent" size={20} />}
        />
        {weightData.length >= 2 ? (
          <WeightChart data={weightData} />
        ) : (
          <p className="text-sm text-muted-foreground">No weight logged yet.</p>
        )}
      </Card>

      <Card>
        <SectionHeading
          title="Training consistency"
          subtitle="Last 28 days"
          action={<CalendarCheck className="text-accent" size={20} />}
        />
        <ConsistencyCalendar days={consistencyDays} />
      </Card>

      <Card>
        <SectionHeading title="Habits today" />
        <div className="flex flex-col gap-3">
          {habits.map((h) => (
            <div key={h.label} className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted">
                <h.icon size={16} className="text-accent" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex justify-between text-sm">
                  <span>{h.label}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {h.value}
                    {h.unit} / {h.target}
                    {h.unit}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${Math.min(100, (h.value / h.target) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {user && weightChange !== null && (
        <Card className="border-accent/30 bg-accent-soft">
          <p className="text-sm font-medium">
            Last 60 days: {consistencyPct}% consistent, weight {weightChange <= 0 ? "down" : "up"}{" "}
            {Math.abs(weightChange)}kg.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Auto-generated summary</p>
        </Card>
      )}
      {!user && (
        <Card className="border-accent/30 bg-accent-soft">
          <p className="text-sm font-medium">
            This week: 71% consistent, weight down 0.4kg, protein hit target 4/7 days.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Sample summary — sign in for your own</p>
        </Card>
      )}
    </div>
  );
}
