"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card, SectionHeading } from "@/components/ui/Card";
import { DemoBanner } from "@/components/ui/DemoBanner";

const PHASES = [
  { name: "Foundation", weeks: "Weeks 1-4", desc: "Learn the movements, build the habit, calibrate targets", active: true },
  { name: "Building", weeks: "Weeks 5-10", desc: "Progressive overload, nutrition consistency", active: false },
  { name: "Recomposition+", weeks: "Weeks 11+", desc: "Intensity up, deficit refined, more variety", active: false },
];

const FIRST_30 = [
  {
    week: "Week 1",
    items: ["Confirm what's in your apartment gym", "Complete 3-4 workouts, focus on form not weight", "Log every meal, even if messy", "Set up water & sleep tracking"],
  },
  {
    week: "Week 2",
    items: ["Push to 4-5 sessions this week", "Hit your protein target 5 of 7 days", "Start sweets/fried step-down: cap frequency"],
  },
  {
    week: "Week 3",
    items: ["Get water intake to 3L+ consistently", "Add 1 outdoor conditioning session", "Take progress photos + waist/neck measurement"],
  },
  {
    week: "Week 4",
    items: ["Review 3 weeks of real data", "Calibrate calorie target from actual weight trend", "Plan Phase 2: add progressive overload"],
  },
];

export default function RoadmapPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4 pb-4">
      {!user && <DemoBanner />}

      <div>
        <p className="text-sm text-muted-foreground">Your journey</p>
        <h1 className="text-2xl font-semibold tracking-tight">Roadmap</h1>
      </div>

      <Card>
        <SectionHeading title="Phases" subtitle="Flexible timeline — progress at your pace" />
        <div className="flex flex-col gap-2">
          {PHASES.map((p) => (
            <div
              key={p.name}
              className={`flex items-center justify-between rounded-xl border p-3 ${
                p.active ? "border-accent bg-accent-soft" : "border-border"
              }`}
            >
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
              <span className={`text-xs font-medium ${p.active ? "text-accent" : "text-muted-foreground"}`}>
                {p.weeks}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading title="First 30 days" subtitle="No guesswork — just follow this" />
        <div className="flex flex-col gap-4">
          {FIRST_30.map((w) => (
            <div key={w.week}>
              <p className="mb-2 text-sm font-semibold text-accent">{w.week}</p>
              <ul className="flex flex-col gap-1.5">
                {w.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Circle size={14} className="mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card className="flex items-start gap-2 bg-surface-muted">
        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
        <p className="text-xs text-muted-foreground">
          No fixed deadline — this roadmap adjusts as your consistency and progress data come in.
        </p>
      </Card>
    </div>
  );
}
