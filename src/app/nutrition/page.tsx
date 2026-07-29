"use client";

import { CheckCircle2, MinusCircle, XCircle, Utensils } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card, SectionHeading } from "@/components/ui/Card";
import { DemoBanner } from "@/components/ui/DemoBanner";

const TARGETS = [
  { label: "Calories", value: "~2,300 kcal", note: "calibrating from your logs" },
  { label: "Protein", value: "~150g", note: "~2g per kg bodyweight" },
  { label: "Water", value: "3-3.5L", note: "up from your current 1.5L" },
];

const EAT_MORE = ["Chicken, eggs, paneer, fish", "Dal, rice, roti, oats", "Fruit + vegetables daily", "Nuts, curd, milk"];
const REDUCE_SLOWLY = ["Fried snacks (samosa, pakora)", "Sweets/desserts", "Sugary drinks"];
const SUPPLEMENTS = ["Whey protein — hits your protein target easily", "Creatine 5g/day — safe, well-researched, helps strength", "Basic multivitamin — insurance, not essential"];

export default function NutritionPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4 pb-4">
      {!user && <DemoBanner />}

      <div>
        <p className="text-sm text-muted-foreground">Your plan</p>
        <h1 className="text-2xl font-semibold tracking-tight">Nutrition</h1>
      </div>

      <Card>
        <SectionHeading title="Daily targets" />
        <div className="grid grid-cols-3 gap-2">
          {TARGETS.map((t) => (
            <div key={t.label} className="rounded-xl bg-surface-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">{t.label}</p>
              <p className="text-base font-semibold">{t.value}</p>
              <p className="text-[10px] text-muted-foreground">{t.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading title="Eat more of" action={<CheckCircle2 className="text-accent" size={20} />} />
        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {EAT_MORE.map((i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {i}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <SectionHeading
          title="Reduce gradually — not cold turkey"
          subtitle="Step 1: cap frequency → Step 2: control portions → Step 3: swap for lighter versions"
          action={<MinusCircle className="text-warning" size={20} />}
        />
        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {REDUCE_SLOWLY.map((i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              {i}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <SectionHeading title="Supplements you're open to" action={<XCircle className="text-muted-foreground" size={20} />} />
        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {SUPPLEMENTS.map((i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
              {i}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="text-accent" size={18} />
          <div>
            <p className="text-sm font-medium">Recipes & eating-out helper</p>
            <p className="text-xs text-muted-foreground">Coming next — matched to your targets</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
