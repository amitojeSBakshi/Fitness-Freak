"use client";

import { Info } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card, SectionHeading } from "@/components/ui/Card";
import { DemoBanner } from "@/components/ui/DemoBanner";

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

export default function TrainingPage() {
  const { user } = useAuth();

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
        <button className="mt-4 w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground">
          Log this workout
        </button>
      </Card>
    </div>
  );
}
