"use client";

import { CheckCircle2, MinusCircle, Pill, Utensils, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card, SectionHeading } from "@/components/ui/Card";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { CURRENT_TARGETS } from "@/lib/nutrition/targets";

const MEALS = [
  { time: "8:15-8:45am", meal: "Breakfast", detail: "2-3 eggs or paneer bhurji + 1-2 roti, or oats with milk + nuts" },
  { time: "1:00-1:30pm", meal: "Lunch", detail: "2 katori dal/sabzi + 1-2 roti or a katori rice — as your family cooks it" },
  { time: "5:00-5:30pm", meal: "Desk snack", detail: "Fruit + roasted chana, or a whey shake if short on protein" },
  { time: "9:00-9:45pm", meal: "Train", detail: "See Training tab" },
  { time: "10:00-10:15pm", meal: "Dinner", detail: "Highest-protein meal: chicken/fish/paneer + dal + sabzi + moderate roti/rice" },
];

const EAT_MORE = [
  "Protein at every meal — eggs, chicken, paneer, fish, dal, whey. Aim ~30-40g per meal.",
  "Vegetables and dal at lunch and dinner — filling per calorie, and your family already cooks them.",
  "Whole fruit as your go-to for a sweet craving — mango, banana, papaya.",
  "Rice/roti — don't fear carbs, they fuel training. Just don't stack fried bread on top of rice at the same meal.",
];

const REDUCE = [
  "Deep-fried items (samosa, pakora, puri, bhatura, fries) — your densest calories, least filling per calorie.",
  "Sweets/mithai and sugary drinks — same problem, different form.",
  "Second helpings of rice/roti out of habit rather than hunger.",
];

const STEP_DOWN = [
  { stage: "1 — Cap it", weeks: "Weeks 1-2", target: "4 occasions/week", note: "Planned in advance. Just converting \"whenever\" into \"on purpose\" — don't restrict further yet." },
  { stage: "2 — Swap half", weeks: "Weeks 3-6", target: "2-3 occasions/week", note: "Swap half your treats for a lighter version you like: roasted chana instead of chips, fruit instead of dessert, tandoori instead of fried." },
  { stage: "3 — Plan it", weeks: "Weeks 7-10", target: "1-2 occasions/week", note: "A planned line-item in your week, never a \"cheat.\" Guilt language predicts rebound overeating." },
  { stage: "4 — Maintain", weeks: "Week 11+", target: "1-2 occasions/week", note: "This is the end state, not a phase to escape. A logged, guilt-free treat is the plan working." },
];

const SUPPLEMENTS = [
  {
    name: "Creatine monohydrate",
    priority: "1st priority",
    detail: "3-5g/day, every day, no loading phase needed. Expect a gradual, modest 0.5-1kg increase over the first month from water pulled into muscle — that's normal, not fat, don't panic and stop.",
  },
  {
    name: "Whey protein",
    priority: "2nd priority",
    detail: "Not biologically required if food alone hits 160g, but genuinely useful given family-cooked meals of variable protein. Check the label: FSSAI license, <5g sugar, no glycine/taurine spiking high on the ingredient list.",
  },
  {
    name: "Bloodwork before a multivitamin",
    priority: "Do this first",
    detail: "India-specific deficiency rates for vitamin D and B12 are high enough that a one-time blood panel beats guessing with a generic multivitamin. If D or B12 come back low, supplement those specifically.",
  },
];

const SKIP_SUPPLEMENTS = "Fat burners, BCAAs, testosterone boosters, mass gainers — no reliable benefit for your goal, and mass gainers actively work against fat loss.";

export default function NutritionPage() {
  const { user } = useAuth();
  const t = CURRENT_TARGETS;

  return (
    <div className="flex flex-col gap-4 pb-4">
      {!user && <DemoBanner />}

      <div>
        <p className="text-sm text-muted-foreground">Your plan</p>
        <h1 className="text-2xl font-semibold tracking-tight">Nutrition</h1>
      </div>

      <Card>
        <SectionHeading title="Daily targets" subtitle={`Maintenance ~${t.maintenanceKcal} kcal · recalibrate from real data at week 3`} />
        <div className="grid grid-cols-4 gap-2">
          <div className="rounded-xl bg-surface-muted p-2.5 text-center">
            <p className="text-xs text-muted-foreground">Calories</p>
            <p className="text-base font-semibold">{t.targetKcal}</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-2.5 text-center">
            <p className="text-xs text-muted-foreground">Protein</p>
            <p className="text-base font-semibold">{t.proteinG}g</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-2.5 text-center">
            <p className="text-xs text-muted-foreground">Carbs</p>
            <p className="text-base font-semibold">{t.carbsG}g</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-2.5 text-center">
            <p className="text-xs text-muted-foreground">Fat</p>
            <p className="text-base font-semibold">{t.fatG}g</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Water: {t.waterL}L/day (up from 1.5L) — creatine and training both increase your needs.
        </p>
      </Card>

      <Card>
        <SectionHeading title="Your day, built around your schedule" subtitle="Leave ~9:30am, home ~9pm" />
        <div className="flex flex-col gap-2.5">
          {MEALS.map((m) => (
            <div key={m.meal} className="flex gap-3 text-sm">
              <span className="w-24 shrink-0 text-xs text-muted-foreground">{m.time}</span>
              <div>
                <p className="font-medium">{m.meal}</p>
                <p className="text-xs text-muted-foreground">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading title="Eat more of" action={<CheckCircle2 className="text-accent" size={20} />} />
        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {EAT_MORE.map((i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {i}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <SectionHeading title="Reduce" action={<MinusCircle className="text-warning" size={20} />} />
        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {REDUCE.map((i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
              {i}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <SectionHeading
          title="Staged step-down: sweets & fried food"
          subtitle="Gradual beats cold turkey — rigid restriction predicts worse long-term outcomes"
        />
        <div className="flex flex-col gap-3">
          {STEP_DOWN.map((s) => (
            <div key={s.stage} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="mb-0.5 flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium">{s.stage}</p>
                <p className="text-xs text-muted-foreground">{s.weeks}</p>
              </div>
              <p className="text-xs font-medium text-accent">{s.target}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading title="Supplements" action={<Pill className="text-accent" size={20} />} />
        <div className="flex flex-col gap-3">
          {SUPPLEMENTS.map((s) => (
            <div key={s.name} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="mb-0.5 flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.priority}</p>
              </div>
              <p className="text-xs text-muted-foreground">{s.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Skip: </span>
          {SKIP_SUPPLEMENTS}
        </p>
      </Card>

      <Card className="flex items-start gap-2 bg-surface-muted text-xs text-muted-foreground">
        <AlertTriangle size={14} className="mt-0.5 shrink-0 text-warning" />
        <p>
          These numbers carry normal individual error (±10-20%) and are not medical advice. Get a
          baseline blood panel (vitamin D, B12, glucose, lipids, kidney/liver) before starting
          supplements, and see a doctor first if you have any personal or family history of kidney,
          thyroid, diabetes or heart conditions.
        </p>
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
