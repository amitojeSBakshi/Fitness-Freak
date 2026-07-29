"use client";

import { useState } from "react";
import { Scale, CalendarCheck, Flame, Dumbbell, Droplets, Moon, Footprints } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card, SectionHeading } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { WeightChart } from "@/components/charts/WeightChart";
import { WeeklyBars } from "@/components/charts/WeeklyBars";
import { ConsistencyCalendar } from "@/components/charts/ConsistencyCalendar";

const RANGES = ["Week", "Month", "3 Months"] as const;

const CALORIE_WEEK = [
  { label: "Mon", value: 2180 },
  { label: "Tue", value: 2050 },
  { label: "Wed", value: 2420 },
  { label: "Thu", value: 1980 },
  { label: "Fri", value: 2610 },
  { label: "Sat", value: 2240 },
  { label: "Sun", value: 1890 },
];

const WEIGHT_DATA = [
  { label: "Wk 1", value: 76.4 },
  { label: "Wk 2", value: 76.1 },
  { label: "Wk 3", value: 75.8 },
  { label: "Wk 4", value: 75.6 },
  { label: "Wk 5", value: 75.1 },
  { label: "Wk 6", value: 74.7 },
  { label: "Wk 7", value: 74.3 },
  { label: "Wk 8", value: 74.0 },
];

const PATTERN = ["completed", "completed", "rest", "completed", "missed", "rest", "rest"] as const;
const CONSISTENCY_DAYS = Array.from({ length: 28 }, (_, i) => ({
  date: `Day ${i + 1}`,
  status: PATTERN[i % PATTERN.length],
}));

const HABITS = [
  { icon: Droplets, label: "Water", value: "1.8L", target: "3.2L", pct: 56 },
  { icon: Moon, label: "Sleep", value: "6.5h", target: "7-8h", pct: 81 },
  { icon: Footprints, label: "Steps", value: "4,200", target: "7,000", pct: 60 },
];

export default function ProgressPage() {
  const { user } = useAuth();
  const [range, setRange] = useState<(typeof RANGES)[number]>("Week");

  return (
    <div className="flex flex-col gap-4 pb-4">
      {!user && <DemoBanner />}

      <div>
        <p className="text-sm text-muted-foreground">Small steps, big changes.</p>
        <h1 className="text-2xl font-bold tracking-tight">Your progress</h1>
      </div>

      <div className="flex gap-1.5 rounded-full bg-surface-muted p-1">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-colors ${
              range === r ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatTile
          icon={Flame}
          label="Avg. calories"
          value="2,196"
          sub="kcal/day"
          delta={{ text: "↓ 180 vs last week", good: true }}
        />
        <StatTile
          icon={Dumbbell}
          label="Consistency"
          value="71%"
          sub="5 of 7 planned"
          delta={{ text: "↑ 14% vs last week", good: true }}
        />
      </div>

      <Card>
        <SectionHeading title="Calorie intake" subtitle="Daily vs. target — orange means over" />
        <WeeklyBars data={CALORIE_WEEK} target={2300} />
      </Card>

      <Card>
        <SectionHeading
          title="Weight trend"
          subtitle="76.4 kg → 74.0 kg over 8 weeks"
          action={<Scale className="text-accent" size={20} />}
        />
        <WeightChart data={WEIGHT_DATA} />
      </Card>

      <Card>
        <SectionHeading
          title="Training consistency"
          subtitle="Last 28 days"
          action={<CalendarCheck className="text-accent" size={20} />}
        />
        <ConsistencyCalendar days={CONSISTENCY_DAYS} />
      </Card>

      <Card>
        <SectionHeading title="Habits today" />
        <div className="flex flex-col gap-3">
          {HABITS.map((h) => (
            <div key={h.label} className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted">
                <h.icon size={16} className="text-accent" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex justify-between text-sm">
                  <span>{h.label}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {h.value} / {h.target}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${h.pct}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-accent/30 bg-accent-soft">
        <p className="text-sm font-medium">
          This week: 71% consistent, weight down 0.4kg, protein hit target 4/7 days.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Auto-generated weekly summary</p>
      </Card>
    </div>
  );
}
