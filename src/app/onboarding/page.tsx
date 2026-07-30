"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flame } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { upsertProfile, upsertWeightLog } from "@/lib/supabase/queries";
import { deriveTargets } from "@/lib/nutrition/targets";
import { Card } from "@/components/ui/Card";
import type { DietPreference, Equipment, Goal, Sex } from "@/lib/types";

type FormState = {
  age: string;
  sex: Sex;
  heightCm: string;
  weightKg: string;
  goal: Goal;
  trainingDaysPerWeek: string;
  equipment: Equipment;
  dietPreference: DietPreference;
};

const DEFAULTS: FormState = {
  age: "",
  sex: "male",
  heightCm: "",
  weightKg: "",
  goal: "fat_loss",
  trainingDaysPerWeek: "4",
  equipment: "dumbbells",
  dietPreference: "flexible",
};

function Field({ label, help, children }: { label: string; help: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs text-muted-foreground">{help}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-surface-muted px-3 py-2 text-sm outline-none focus:border-accent";

export default function OnboardingPage() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!profile) return;
    setForm({
      age: profile.age?.toString() ?? "",
      sex: profile.sex ?? "male",
      heightCm: profile.height_cm?.toString() ?? "",
      weightKg: profile.starting_weight_kg?.toString() ?? "",
      goal: profile.goal ?? "fat_loss",
      trainingDaysPerWeek: profile.training_days_per_week?.toString() ?? "4",
      equipment: profile.equipment ?? "dumbbells",
      dietPreference: profile.diet_preference ?? "flexible",
    });
  }, [profile]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const age = Number(form.age);
    const heightCm = Number(form.heightCm);
    const weightKg = Number(form.weightKg);
    const trainingDaysPerWeek = Number(form.trainingDaysPerWeek);

    const targets = deriveTargets({ age, heightCm, weightKg, sex: form.sex, trainingDaysPerWeek });

    const supabase = createClient();
    await upsertProfile(supabase, user.id, {
      age,
      sex: form.sex,
      height_cm: heightCm,
      starting_weight_kg: weightKg,
      goal: form.goal,
      training_days_per_week: trainingDaysPerWeek,
      equipment: form.equipment,
      diet_preference: form.dietPreference,
      maintenance_kcal: targets.maintenanceKcal,
      maintenance_is_calibrated: false,
      target_kcal: targets.targetKcal,
      target_protein_g: targets.proteinG,
      target_carbs_g: targets.carbsG,
      target_fat_g: targets.fatG,
      target_water_l: targets.waterL,
      onboarding_completed: true,
    });
    await upsertWeightLog(supabase, user.id, weightKg);

    await refreshProfile();
    setSaving(false);
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <Flame className="text-accent" size={28} />
        <h1 className="text-xl font-semibold tracking-tight">Set up your profile</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          This is what makes the app actually yours — your calorie/protein targets and the
          exercises you see are calculated from these answers, not generic defaults.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Age" help="Used in the maintenance-calorie formula.">
              <input
                type="number"
                required
                min={13}
                max={100}
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Sex" help="Changes the BMR formula.">
              <select value={form.sex} onChange={(e) => set("sex", e.target.value as Sex)} className={inputClass}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Field>
            <Field label="Height (cm)" help="e.g. 174">
              <input
                type="number"
                required
                min={100}
                max={230}
                value={form.heightCm}
                onChange={(e) => set("heightCm", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Weight (kg)" help="Today's weight — this also becomes your first Progress log.">
              <input
                type="number"
                required
                min={30}
                max={250}
                step="0.1"
                value={form.weightKg}
                onChange={(e) => set("weightKg", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Main goal" help="Shapes how your calorie deficit and training are framed.">
            <select value={form.goal} onChange={(e) => set("goal", e.target.value as Goal)} className={inputClass}>
              <option value="fat_loss">Fat loss first</option>
              <option value="recomp">Recomposition (lose fat, build muscle)</option>
              <option value="muscle_gain">Muscle/strength gain</option>
              <option value="maintain">Maintain, build consistency</option>
            </select>
          </Field>

          <Field label="Training days/week" help="How many sessions you can realistically commit to.">
            <select
              value={form.trainingDaysPerWeek}
              onChange={(e) => set("trainingDaysPerWeek", e.target.value)}
              className={inputClass}
            >
              {[2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} days/week
                </option>
              ))}
            </select>
          </Field>

          <Field label="Equipment" help="Changes which version of each exercise the Training tab shows you.">
            <select
              value={form.equipment}
              onChange={(e) => set("equipment", e.target.value as Equipment)}
              className={inputClass}
            >
              <option value="bodyweight">Bodyweight only — no equipment</option>
              <option value="dumbbells">Dumbbells (+ bodyweight)</option>
              <option value="full_gym">Full gym (barbell, machines, etc.)</option>
            </select>
          </Field>

          <Field label="Diet preference" help="Shapes which foods show up in recipe/meal suggestions.">
            <select
              value={form.dietPreference}
              onChange={(e) => set("dietPreference", e.target.value as DietPreference)}
              className={inputClass}
            >
              <option value="flexible">Flexible / no restriction</option>
              <option value="veg">Vegetarian</option>
              <option value="eggetarian">Eggetarian</option>
              <option value="non_veg">Non-vegetarian</option>
            </select>
          </Field>

          <button
            type="submit"
            disabled={saving}
            className="mt-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save and calculate my targets"}
          </button>
        </form>
      </Card>
    </div>
  );
}
