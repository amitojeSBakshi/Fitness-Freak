export type Confidence = "high" | "medium" | "low";

export type Profile = {
  id: string;
  display_name: string | null;
  date_of_birth: string | null;
  height_cm: number | null;
  starting_weight_kg: number | null;
  goal: string | null;
  activity_level: string | null;
  maintenance_kcal: number | null;
  maintenance_is_calibrated: boolean;
  target_kcal: number | null;
  target_protein_g: number | null;
  target_carbs_g: number | null;
  target_fat_g: number | null;
  target_water_l: number | null;
  target_sleep_h: number | null;
  target_steps: number | null;
  training_days_per_week: number | null;
};

export type WeightLog = {
  id: string;
  user_id: string;
  logged_on: string;
  weight_kg: number;
  note: string | null;
};

export type Measurement = {
  id: string;
  user_id: string;
  logged_on: string;
  waist_cm: number | null;
  neck_cm: number | null;
  chest_cm: number | null;
  hips_cm: number | null;
  left_arm_cm: number | null;
  right_arm_cm: number | null;
  left_thigh_cm: number | null;
  right_thigh_cm: number | null;
  note: string | null;
};

export type WorkoutSession = {
  id: string;
  user_id: string;
  logged_on: string;
  session_name: string;
  session_type: "strength" | "cardio" | "outdoor" | "rest";
  duration_min: number | null;
  perceived_effort: number | null;
  estimated_kcal: number | null;
  note: string | null;
};

export type ExerciseSet = {
  id: string;
  session_id: string;
  user_id: string;
  exercise_name: string;
  set_number: number;
  reps: number | null;
  weight_kg: number | null;
  hold_seconds: number | null;
  rir: number | null;
};

export type FoodLog = {
  id: string;
  user_id: string;
  logged_on: string;
  meal_type: "breakfast" | "lunch" | "dinner" | "snack" | null;
  raw_input: string;
  matched_food: string | null;
  quantity: number;
  portion_label: string | null;
  grams: number | null;
  kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  confidence: Confidence;
  source: "text" | "photo" | "manual";
  photo_path: string | null;
};

export type HabitLog = {
  id: string;
  user_id: string;
  logged_on: string;
  water_l: number | null;
  sleep_h: number | null;
  steps: number | null;
  sweets_servings: number | null;
  fried_servings: number | null;
  note: string | null;
};

/** A single entry in the food reference database used by the text estimator. */
export type FoodItem = {
  name: string;
  aliases?: string[];
  standardPortion: string;
  portionGrams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  confidence: Confidence;
  sourceNote?: string;
};
