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
  const targetKcal = Math.round(maintenanceKcal * 0.8);

  const proteinG = Math.round(stats.weightKg * 2.16);
  const fatG = Math.round(stats.weightKg * 0.95);
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

/**
 * Research-calibrated targets (Mifflin-St Jeor + activity multiplier for a
 * sedentary desk job + 4-5 training days/week, then a ~20% deficit for
 * recomposition). This is a hypothesis to be replaced by REAL calibrated
 * numbers once 2-3 weeks of logged weight + intake exist — see
 * recalibrateMaintenance() below. Treat as a starting point, not gospel.
 */
export const CURRENT_TARGETS: Targets = {
  maintenanceKcal: 2500,
  targetKcal: 2000,
  proteinG: 160,
  carbsG: 182,
  fatG: 70,
  waterL: 3.2,
};

/**
 * Resolves the targets a page should show for the signed-in user: their own
 * saved targets if onboarding set them, a formula estimate if we at least
 * have body stats, or the generic CURRENT_TARGETS default otherwise (also
 * what signed-out demo mode shows).
 */
export function targetsFromProfile(profile: import("@/lib/types").Profile | null): Targets {
  if (!profile) return CURRENT_TARGETS;

  if (profile.target_kcal && profile.target_protein_g && profile.target_carbs_g && profile.target_fat_g) {
    return {
      maintenanceKcal: profile.maintenance_kcal ?? CURRENT_TARGETS.maintenanceKcal,
      targetKcal: profile.target_kcal,
      proteinG: profile.target_protein_g,
      carbsG: profile.target_carbs_g,
      fatG: profile.target_fat_g,
      waterL: profile.target_water_l ?? CURRENT_TARGETS.waterL,
    };
  }

  if (profile.starting_weight_kg && profile.height_cm && profile.age && profile.sex) {
    return deriveTargets({
      weightKg: profile.starting_weight_kg,
      heightCm: profile.height_cm,
      age: profile.age,
      sex: profile.sex,
      trainingDaysPerWeek: profile.training_days_per_week ?? 4,
    });
  }

  return CURRENT_TARGETS;
}

/**
 * Derives true maintenance from a window of real logged data, per the
 * research method: compare rolling-average weight change against average
 * logged intake over the same window, using 7700 kcal ≈ 1kg of bodyweight.
 */
export function recalibrateMaintenance(
  avgDailyIntakeKcal: number,
  startRollingAvgWeightKg: number,
  endRollingAvgWeightKg: number,
  windowDays: number,
): number {
  const weightChangeKg = endRollingAvgWeightKg - startRollingAvgWeightKg;
  const energyChangeKcal = weightChangeKg * 7700;
  const dailyEnergyChangeKcal = energyChangeKcal / windowDays;
  return Math.round(avgDailyIntakeKcal - dailyEnergyChangeKcal);
}
