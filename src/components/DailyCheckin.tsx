"use client";

import { useCallback, useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { getHabitLog, upsertHabitLog, addFoodLog } from "@/lib/supabase/queries";
import { estimateFoodInput } from "@/lib/food/estimate";
import { todayISO } from "@/lib/date";

type MealField = "breakfast" | "lunch" | "dinner";

const MEAL_LABELS: Record<MealField, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

const EVENING_HOUR = 20; // popup eligible from 8pm local time

const inputClass =
  "w-full rounded-xl border border-border bg-surface-muted px-3 py-2 text-sm outline-none focus:border-accent";

/**
 * Sits inside AuthProvider and decides whether to show the evening check-in
 * popup: once per day, only after EVENING_HOUR, only if nothing's logged in
 * habit_logs for today yet (our proxy for "check-in not done").
 */
export function DailyCheckinGate() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [dismissedToday, setDismissedToday] = useState(false);

  const maybeShow = useCallback(async () => {
    if (!user || dismissedToday) return;
    if (new Date().getHours() < EVENING_HOUR) return;
    const supabase = createClient();
    const habit = await getHabitLog(supabase, user.id, todayISO());
    if (!habit) setOpen(true);
  }, [user, dismissedToday]);

  useEffect(() => {
    maybeShow();
  }, [maybeShow]);

  if (!user || !open) return null;

  return (
    <DailyCheckinModal
      userId={user.id}
      onClose={() => {
        setOpen(false);
        setDismissedToday(true);
      }}
      onDone={() => setOpen(false)}
    />
  );
}

export function DailyCheckinModal({
  userId,
  onClose,
  onDone,
}: {
  userId: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [steps, setSteps] = useState("");
  const [sweets, setSweets] = useState("0");
  const [fried, setFried] = useState("0");
  const [meals, setMeals] = useState<Record<MealField, string>>({ breakfast: "", lunch: "", dinner: "" });
  const [saving, setSaving] = useState(false);

  const setMeal = (field: MealField, value: string) => setMeals((m) => ({ ...m, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();

    const mealEntries = (Object.keys(meals) as MealField[]).filter((f) => meals[f].trim());
    await Promise.all(
      mealEntries.flatMap((field) =>
        estimateFoodInput(meals[field]).map((est) =>
          addFoodLog(supabase, userId, {
            raw_input: meals[field],
            meal_type: field,
            matched_food: est.matched?.name,
            portion_label: est.matched?.standardPortion,
            grams: est.grams,
            kcal: est.kcal,
            protein_g: est.protein,
            carbs_g: est.carbs,
            fat_g: est.fat,
            confidence: est.confidence,
            source: "text",
          }),
        ),
      ),
    );

    await upsertHabitLog(supabase, userId, {
      water_l: water ? Number(water) : null,
      sleep_h: sleep ? Number(sleep) : null,
      steps: steps ? Number(steps) : null,
      sweets_servings: Number(sweets) || 0,
      fried_servings: Number(fried) || 0,
    });

    setSaving(false);
    onDone();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pb-4 sm:items-center">
      <div className="max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-2xl border border-border bg-surface p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Daily check-in</h2>
            <p className="text-xs text-muted-foreground">Two minutes — this is what feeds your targets tomorrow</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {(Object.keys(MEAL_LABELS) as MealField[]).map((field) => (
            <label key={field} className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">{MEAL_LABELS[field]}</span>
              <input
                value={meals[field]}
                onChange={(e) => setMeal(field, e.target.value)}
                placeholder="e.g. 2 roti with dal, or leave blank"
                className={inputClass}
              />
            </label>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Water today (L)</span>
              <input
                type="number"
                step="0.1"
                min={0}
                value={water}
                onChange={(e) => setWater(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Sleep last night (h)</span>
              <input
                type="number"
                step="0.5"
                min={0}
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Steps today</span>
              <input
                type="number"
                min={0}
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Sweets (count)</span>
              <input
                type="number"
                min={0}
                value={sweets}
                onChange={(e) => setSweets(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Fried food (count)</span>
              <input
                type="number"
                min={0}
                value={fried}
                onChange={(e) => setFried(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            Save today's check-in
          </button>
          <button type="button" onClick={onClose} className="text-center text-xs text-muted-foreground underline">
            Skip for today
          </button>
        </form>
      </div>
    </div>
  );
}
