"use client";

import { useState } from "react";
import { Camera, Search, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card, SectionHeading } from "@/components/ui/Card";
import { DemoBanner } from "@/components/ui/DemoBanner";

const DEMO_LOG = [
  { name: "Oats + banana + peanut butter", kcal: 420, protein: 16 },
  { name: "Chicken breast + rice + salad", kcal: 560, protein: 48 },
  { name: "Paneer bhurji + 2 roti", kcal: 470, protein: 28 },
];

const MAINTENANCE = 2300;
const BURNED_TODAY = 260;

export default function CalorieToolPage() {
  const { user } = useAuth();
  const [foodInput, setFoodInput] = useState("");
  const [description, setDescription] = useState("");
  const [pendingItems, setPendingItems] = useState<string[]>([]);

  const eaten = DEMO_LOG.reduce((sum, i) => sum + i.kcal, 0);
  const net = eaten - MAINTENANCE - BURNED_TODAY;

  const handleAdd = () => {
    if (!foodInput.trim()) return;
    setPendingItems((prev) => [...prev, foodInput.trim()]);
    setFoodInput("");
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      {!user && <DemoBanner />}

      <div>
        <p className="text-sm text-muted-foreground">Track what you eat</p>
        <h1 className="text-2xl font-semibold tracking-tight">Calorie Tool</h1>
      </div>

      <Card>
        <SectionHeading title="Add food" action={<Search className="text-accent" size={20} />} />
        <div className="flex gap-2">
          <input
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="e.g. 2 roti with dal"
            className="flex-1 rounded-xl border border-border bg-surface-muted px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            onClick={handleAdd}
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
          >
            Add
          </button>
        </div>

        <div className="my-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex items-center gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium">
            <Camera size={16} /> Upload a photo
          </button>
        </div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional: describe the meal (helps accuracy)"
          className="mt-2 w-full rounded-xl border border-border bg-surface-muted px-3 py-2 text-sm outline-none focus:border-accent"
        />

        {pendingItems.length > 0 && (
          <div className="mt-3 flex flex-col gap-1.5">
            {pendingItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-surface-muted px-3 py-2 text-sm"
              >
                <span>{item}</span>
                <span className="text-xs text-muted-foreground">estimate pending</span>
              </div>
            ))}
          </div>
        )}

        <Card className="mt-3 flex items-start gap-2 bg-surface-muted text-xs text-muted-foreground">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-warning" />
          <p>
            Calorie/photo estimation engine isn&apos;t wired up yet — once we pick the estimation
            approach, entries here will get real calorie &amp; macro numbers automatically.
          </p>
        </Card>
      </Card>

      <Card>
        <SectionHeading title="Today's log" subtitle="Sample data" />
        <div className="flex flex-col gap-2">
          {DEMO_LOG.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <span>{item.name}</span>
              <span className="text-muted-foreground">
                {item.kcal} kcal · {item.protein}g P
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading title="Maintenance vs. eaten vs. burned" />
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Maintenance</span>
            <span className="font-medium">{MAINTENANCE} kcal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Eaten today</span>
            <span className="font-medium">{eaten} kcal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Burned (workout)</span>
            <span className="font-medium">{BURNED_TODAY} kcal</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-border pt-2">
            <span className="font-medium">Net</span>
            <span className={`font-semibold ${net > 0 ? "text-warning" : "text-accent"}`}>
              {net > 0 ? `+${net}` : net} kcal {net > 0 ? "surplus" : "deficit"}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
