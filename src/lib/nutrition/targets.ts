/**
 * Formula-based starting targets. These are a first guess, not gospel — the
 * app is designed to replace them with numbers calibrated from 2-3 weeks of
 * real weight + intake logs (see Profile.maintenance_is_calibrated). See
 * research findings in src/lib/nutrition/research/ once available for the
 * evidence behind the multipliers below.
 */

export type BodyStats = {
  weightKg: number;
  heightCm: number;
  age: number;
  sex: "male" | "female";
  trainingDaysPerWeek: number;
};

/** Mifflin-St Jeor BMR, the best-validated equation for a non-athlete of unknown body-fat %. */
export function estimateBMR({ weightKg, heightCm, age, sex }: BodyStats): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

/**
 * Activity multiplier for someone with a sedentary desk job whose only
 * structured activity is N training sessions/week (not a generically "active"
 * lifestyle multiplier — desk-job NEAT is low regardless of training days).
 */
export function activityMultiplier(trainingDaysPerWeek: number): number {
  if (trainingDaysPerWeek <= 0) return 1.2;
  if (trainingDaysPerWeek <= 2) return 1.3;
  if (trainingDaysPerWeek <= 4) return 1.4;
  return 1.5;
}

export function estimateMaintenanceKcal(stats: BodyStats): number {
  return Math.round(estimateBMR(stats) * activityMultiplier(stats.trainingDaysPerWeek));
}

export type Targets = {
  maintenanceKcal: number;
  targetKcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  waterL: number;
};

/**
 * Default fat-loss targets for a beginner who wants to preserve/build muscle:
 * a moderate ~15% deficit (not aggressive — aggressive deficits in an
 * untrained lifter cost muscle for little extra fat-loss speed), high
 * protein to protect lean mass, fat floor for hormonal health, carbs fill
 * the remainder.
 */
export function deriveTargets(stats: BodyStats, maintenanceOverride?: number): Targets {
  const maintenanceKcal = maintenanceOverride ?? estimateMaintenanceKcal(stats);
  const targetKcal = Math.round(maintenanceKcal * 0.85);

  const proteinG = Math.round(stats.weightKg * 2);
  const fatG = Math.round((stats.weightKg * 0.8));
  const remainingKcal = targetKcal - proteinG * 4 - fatG * 9;
  const carbsG = Math.max(50, Math.round(remainingKcal / 4));

  return {
    maintenanceKcal,
    targetKcal,
    proteinG,
    carbsG,
    fatG,
    waterL: 3.2,
  };
}
