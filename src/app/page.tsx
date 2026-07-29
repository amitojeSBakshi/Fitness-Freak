"use client";

import Link from "next/link";
import { Dumbbell, Sparkles, ChevronRight, Droplets, Footprints, Check } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card, SectionHeading } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { IntakeRing } from "@/components/charts/IntakeRing";
import { MacroBreakdown } from "@/components/charts/MacroBreakdown";

const WEEK = [
  { day: "M", date: 23, done: true },
  { day: "T", date: 24, done: true },
  { day: "W", date: 25, done: false },
  { day: "T", date: 26, done: true, today: true },
  { day: "F", date: 27, done: false },
  { day: "S", date: 28, done: false },
  { day: "S", date: 29, done: false },
];

const DEMO = {
  calories: { logged: 1450, target: 2300 },
  macros: { protein: 92, carbs: 148, fat: 46 },
  macroTargets: { protein: 150, carbs: 240, fat: 65 },
  workout: {
    title: "Full Body A",
    subtitle: "5 exercises · 45 min",
    exercises: ["Goblet squat", "Dumbbell bench press", "Dumbbell row", "Glute bridge", "Plank"],
  },
  tip: "Protein has been under target 2 days running — lean on eggs, chicken or a shake today.",
};

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4 pb-4">
      {!user && <DemoBanner />}

      <div>
        <p className="text-sm text-muted-foreground">Good evening</p>
        <h1 className="text-2xl font-bold tracking-tight">Let&apos;s make today count</h1>
      </div>

      <div className="flex justify-between gap-1">
        {WEEK.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">{d.day}</span>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                d.done
                  ? "bg-accent text-accent-foreground"
                  : d.today
                    ? "border-2 border-accent text-accent"
                    : "bg-surface-muted text-muted-foreground"
              }`}
            >
              {d.done ? <Check size={16} strokeWidth={3} /> : d.date}
            </div>
          </div>
        ))}
      </div>

      <Card className="flex items-center gap-3 border-accent/30 bg-accent-soft">
        <Sparkles className="shrink-0 text-accent" size={20} />
        <p className="text-sm">{DEMO.tip}</p>
      </Card>

      <Card>
        <SectionHeading title="Today's intake" subtitle="Calories & macros" />
        <div className="flex items-center gap-4">
          <IntakeRing value={DEMO.calories.logged} target={DEMO.calories.target} />
          <div className="flex-1">
            <MacroBreakdown grams={DEMO.macros} targets={DEMO.macroTargets} />
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
          title="Today's workout"
          subtitle={DEMO.workout.subtitle}
          action={<Dumbbell className="text-accent" size={20} />}
        />
        <div className="mb-3 rounded-xl bg-surface-muted p-3">
          <p className="mb-2 text-sm font-semibold">{DEMO.workout.title}</p>
          <ul className="flex flex-col gap-1 text-xs text-muted-foreground">
            {DEMO.workout.exercises.map((ex) => (
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
        <StatTile icon={Droplets} label="Water" value="1.8L" sub="of 3.2L target" />
        <StatTile icon={Footprints} label="Steps" value="4,200" sub="of 7,000 target" />
      </div>
    </div>
  );
}
