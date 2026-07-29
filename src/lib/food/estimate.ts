import type { Confidence, FoodItem } from "@/lib/types";
import { parseFoodInput, type ParsedItem } from "@/lib/food/parser";
import { findFoodMatch, FOOD_DATABASE } from "@/lib/food/database";

const WEIGHT_UNIT_TO_GRAMS: Record<string, number> = { g: 1, kg: 1000, ml: 1, l: 1000 };

export type FoodEstimate = {
  label: string;
  matched: FoodItem | null;
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: Confidence;
  note?: string;
};

function estimateOne(parsed: ParsedItem, db: FoodItem[]): FoodEstimate {
  const match = findFoodMatch(parsed.food, db);

  if (!match) {
    return {
      label: parsed.food,
      matched: null,
      grams: 0,
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      confidence: "low",
      note: "No match in the food database yet — logged as 0 kcal so it doesn't silently skew your total.",
    };
  }

  let multiplier: number;
  let grams: number;

  if (parsed.unit && WEIGHT_UNIT_TO_GRAMS[parsed.unit]) {
    grams = parsed.quantity * WEIGHT_UNIT_TO_GRAMS[parsed.unit];
    multiplier = grams / match.portionGrams;
  } else {
    multiplier = parsed.quantity;
    grams = match.portionGrams * multiplier;
  }

  // A wildly large multiplier off a household-unit guess is more likely a parsing
  // miss than someone eating 10x a normal portion — flag it rather than trust it.
  const confidence: Confidence =
    multiplier > 6 || multiplier < 0.1 ? "low" : parsed.quantityAssumed ? match.confidence : match.confidence;

  return {
    label: match.name,
    matched: match,
    grams: Math.round(grams * 10) / 10,
    kcal: Math.round(match.kcal * multiplier),
    protein: Math.round(match.protein * multiplier * 10) / 10,
    carbs: Math.round(match.carbs * multiplier * 10) / 10,
    fat: Math.round(match.fat * multiplier * 10) / 10,
    confidence,
  };
}

export function estimateFoodInput(raw: string, db: FoodItem[] = FOOD_DATABASE): FoodEstimate[] {
  return parseFoodInput(raw).map((p) => estimateOne(p, db));
}

export function sumEstimates(estimates: FoodEstimate[]) {
  return estimates.reduce(
    (acc, e) => ({
      kcal: acc.kcal + e.kcal,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  );
}
