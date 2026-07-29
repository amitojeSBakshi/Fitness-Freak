"use client";

import { useEffect, useState, useCallback } from "react";
import { Camera, Search, AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { Card, SectionHeading } from "@/components/ui/Card";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { estimateFoodInput, type FoodEstimate } from "@/lib/food/estimate";
import {
  getFoodLogsForDate,
  addFoodLog,
  deleteFoodLog,
  sumFoodLogs,
  getRecentWorkoutSessions,
} from "@/lib/supabase/queries";
import { deriveTargets } from "@/lib/nutrition/targets";
import { todayISO } from "@/lib/date";
import type { FoodLog } from "@/lib/types";

const DEMO_LOG: FoodEstimate[] = [
  { label: "Oats + banana + peanut butter", matched: null, grams: 200, kcal: 420, protein: 16, carbs: 60, fat: 15, confidence: "medium" },
  { label: "Chicken breast + rice + salad", matched: null, grams: 350, kcal: 560, protein: 48, carbs: 55, fat: 12, confidence: "medium" },
  { label: "Paneer bhurji + 2 roti", matched: null, grams: 300, kcal: 470, protein: 28, carbs: 38, fat: 26, confidence: "medium" },
];

// Hardcoded until onboarding writes real stats into the profile row.
const BODY_STATS = { weightKg: 74, heightCm: 174, age: 22, sex: "male" as const, trainingDaysPerWeek: 5 };

export default function CalorieToolPage() {
  const { user } = useAuth();
  const [foodInput, setFoodInput] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<FoodEstimate[]>([]);
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [burnedToday, setBurnedToday] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const targets = deriveTargets(BODY_STATS);

  const loadToday = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const supabase = createClient();
    const [foodLogs, sessions] = await Promise.all([
      getFoodLogsForDate(supabase, user.id, todayISO()),
      getRecentWorkoutSessions(supabase, user.id, 0),
    ]);
    setLogs(foodLogs);
    setBurnedToday(sessions.reduce((sum, s) => sum + (s.estimated_kcal ?? 0), 0));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) loadToday();
  }, [user, loadToday]);

  const handlePreview = () => {
    if (!foodInput.trim()) return;
    setPreview(estimateFoodInput(foodInput));
  };

  const handleSave = async () => {
    if (preview.length === 0 || !user) return;
    setSaving(true);
    const supabase = createClient();
    await Promise.all(
      preview.map((e) =>
        addFoodLog(supabase, user.id, {
          raw_input: foodInput,
          matched_food: e.matched?.name,
          quantity: 1,
          portion_label: e.matched?.standardPortion,
          grams: e.grams,
          kcal: e.kcal,
          protein_g: e.protein,
          carbs_g: e.carbs,
          fat_g: e.fat,
          confidence: e.confidence,
          source: "text",
        }),
      ),
    );
    setPreview([]);
    setFoodInput("");
    setSaving(false);
    loadToday();
  };

  const handleDelete = async (id: string) => {
    const supabase = createClient();
    await deleteFoodLog(supabase, id);
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const displayLog = user
    ? logs.map((l) => ({ label: l.matched_food ?? l.raw_input, kcal: l.kcal, protein: l.protein_g, confidence: l.confidence, id: l.id }))
    : DEMO_LOG.map((l) => ({ label: l.label, kcal: l.kcal, protein: l.protein, confidence: l.confidence, id: undefined }));

  const eaten = user ? sumFoodLogs(logs).kcal : DEMO_LOG.reduce((s, i) => s + i.kcal, 0);
  const maintenance = targets.maintenanceKcal;
  const burned = user ? burnedToday : 260;
  const net = eaten - maintenance - burned;

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
            onKeyDown={(e) => e.key === "Enter" && handlePreview()}
            placeholder="e.g. 2 roti with dal"
            className="flex-1 rounded-xl border border-border bg-surface-muted px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            onClick={handlePreview}
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
          >
            Estimate
          </button>
        </div>

        <div className="my-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled
            title="Photo estimation is planned once you're logging consistently by text — see Nutrition page"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium opacity-50"
          >
            <Camera size={16} /> Upload a photo (coming later)
          </button>
        </div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional: describe the meal (helps accuracy)"
          disabled
          className="mt-2 w-full rounded-xl border border-border bg-surface-muted px-3 py-2 text-sm outline-none opacity-50"
        />

        {preview.length > 0 && (
          <div className="mt-3 flex flex-col gap-1.5">
            {preview.map((e, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-surface-muted px-3 py-2 text-sm">
                <div>
                  <span>{e.label}</span>
                  {e.confidence === "low" && (
                    <span className="ml-2 text-[10px] font-medium text-warning">low confidence</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {e.kcal} kcal · {e.protein}g P
                </span>
              </div>
            ))}
            {user ? (
              <button
                onClick={handleSave}
                disabled={saving}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                Save to today's log
              </button>
            ) : (
              <p className="mt-1 text-center text-xs text-muted-foreground">Sign in to save this entry</p>
            )}
          </div>
        )}

        <Card className="mt-3 flex items-start gap-2 bg-surface-muted text-xs text-muted-foreground">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-warning" />
          <p>
            Estimates come from a starter food database — accurate for common items, rougher for
            anything not yet matched (flagged as low confidence). A larger, research-verified
            database is being merged in.
          </p>
        </Card>
      </Card>

      <Card>
        <SectionHeading title="Today's log" subtitle={user ? undefined : "Sample data — sign in to log your own"} />
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : displayLog.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing logged yet today.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {displayLog.map((item, i) => (
              <div key={item.id ?? i} className="flex items-center justify-between text-sm">
                <span>{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {Math.round(item.kcal)} kcal · {item.protein}g P
                  </span>
                  {item.id && (
                    <button onClick={() => handleDelete(item.id!)} className="text-muted-foreground hover:text-warning">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <SectionHeading title="Maintenance vs. eaten vs. burned" />
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Maintenance</span>
            <span className="font-medium">{maintenance} kcal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Eaten today</span>
            <span className="font-medium">{Math.round(eaten)} kcal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Burned (workout)</span>
            <span className="font-medium">{burned} kcal</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-border pt-2">
            <span className="font-medium">Net</span>
            <span className={`font-semibold ${net > 0 ? "text-warning" : "text-accent"}`}>
              {net > 0 ? `+${Math.round(net)}` : Math.round(net)} kcal {net > 0 ? "surplus" : "deficit"}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
