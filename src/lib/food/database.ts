import type { FoodItem } from "@/lib/types";

/**
 * Starter food set covering the most common entries so the tool is usable
 * immediately. Values are conservative household-portion estimates from
 * standard nutrition references (USDA FoodData Central + typical Indian
 * home-cooking ratios) — treat "medium" confidence items as good-enough
 * estimates, not lab numbers. This file is meant to be MERGED with a larger
 * research-verified set (see scripts/merge-food-research.mjs) rather than
 * hand-maintained long-term.
 */
export const FOOD_DATABASE: FoodItem[] = [
  { name: "roti", aliases: ["chapati", "phulka", "whole wheat roti"], standardPortion: "1 medium roti", portionGrams: 40, kcal: 104, protein: 3.1, carbs: 18, fat: 2.5, category: "Breads", confidence: "high" },
  { name: "rice", aliases: ["white rice", "steamed rice", "cooked rice"], standardPortion: "1 katori cooked (150g)", portionGrams: 150, kcal: 195, protein: 4.1, carbs: 43, fat: 0.4, category: "Rice", confidence: "high" },
  { name: "dal", aliases: ["toor dal", "arhar dal", "moong dal", "dal fry", "dal tadka"], standardPortion: "1 katori (150g)", portionGrams: 150, kcal: 155, protein: 9, carbs: 22, fat: 3.5, category: "Legumes", confidence: "medium" },
  { name: "chicken curry", aliases: ["murgh curry", "chicken gravy", "chicken sabzi"], standardPortion: "1 katori (150g)", portionGrams: 150, kcal: 240, protein: 18, carbs: 6, fat: 15.5, category: "Animal protein", confidence: "medium" },
  { name: "chicken breast", aliases: ["grilled chicken", "chicken breast cooked", "tawa chicken"], standardPortion: "1 fillet cooked (100g)", portionGrams: 100, kcal: 165, protein: 31, carbs: 0, fat: 3.6, category: "Animal protein", confidence: "high" },
  { name: "egg boiled", aliases: ["boiled egg", "egg", "anda"], standardPortion: "1 large egg (45g)", portionGrams: 45, kcal: 68, protein: 5.7, carbs: 0.4, fat: 4.7, category: "Animal protein", confidence: "high" },
  { name: "egg fried", aliases: ["fried egg", "half fry"], standardPortion: "1 egg, fried (1 tsp oil)", portionGrams: 50, kcal: 112, protein: 5.8, carbs: 0.5, fat: 9.4, category: "Animal protein", confidence: "medium" },
  { name: "omelette", aliases: ["masala omelette", "anda bhurji"], standardPortion: "2 eggs (110g)", portionGrams: 110, kcal: 195, protein: 11.5, carbs: 3, fat: 15, category: "Animal protein", confidence: "medium" },
  { name: "paneer", aliases: ["cottage cheese", "malai paneer"], standardPortion: "100g cubes", portionGrams: 100, kcal: 300, protein: 18.5, carbs: 3, fat: 24, category: "Vegetarian protein", confidence: "high" },
  { name: "paneer bhurji", aliases: ["scrambled paneer"], standardPortion: "1 katori (150g)", portionGrams: 150, kcal: 365, protein: 19, carbs: 8, fat: 29, category: "Vegetarian protein", confidence: "medium" },
  { name: "mixed veg sabzi", aliases: ["sabzi", "mix veg", "vegetable curry"], standardPortion: "1 katori (150g)", portionGrams: 150, kcal: 130, protein: 3, carbs: 12, fat: 8, category: "Vegetables", confidence: "medium" },
  { name: "aloo sabzi", aliases: ["potato sabzi", "aloo curry"], standardPortion: "1 katori (150g)", portionGrams: 150, kcal: 180, protein: 3, carbs: 24, fat: 8, category: "Vegetables", confidence: "medium" },
  { name: "curd", aliases: ["dahi", "yogurt", "plain yogurt"], standardPortion: "1 katori (150g)", portionGrams: 150, kcal: 98, protein: 5.4, carbs: 7, fat: 5.4, category: "Dairy", confidence: "high" },
  { name: "milk", aliases: ["toned milk", "full fat milk"], standardPortion: "1 glass (200ml)", portionGrams: 200, kcal: 122, protein: 6.4, carbs: 9.6, fat: 6.4, category: "Dairy", confidence: "high" },
  { name: "banana", aliases: ["kela"], standardPortion: "1 medium (120g)", portionGrams: 120, kcal: 107, protein: 1.3, carbs: 27, fat: 0.4, category: "Fruit", confidence: "high" },
  { name: "apple", aliases: ["seb"], standardPortion: "1 medium (180g)", portionGrams: 180, kcal: 94, protein: 0.5, carbs: 25, fat: 0.3, category: "Fruit", confidence: "high" },
  { name: "oats", aliases: ["oatmeal", "porridge"], standardPortion: "1 bowl cooked (40g dry)", portionGrams: 40, kcal: 150, protein: 5.3, carbs: 27, fat: 2.7, category: "Breakfast", confidence: "high" },
  { name: "poha", aliases: [], standardPortion: "1 plate (150g)", portionGrams: 150, kcal: 250, protein: 4.5, carbs: 40, fat: 8, category: "Breakfast", confidence: "medium" },
  { name: "idli", aliases: [], standardPortion: "1 piece (40g)", portionGrams: 40, kcal: 58, protein: 2, carbs: 12, fat: 0.2, category: "Breakfast", confidence: "high" },
  { name: "dosa plain", aliases: ["plain dosa"], standardPortion: "1 medium (80g)", portionGrams: 80, kcal: 133, protein: 2.7, carbs: 22, fat: 3.7, category: "Breakfast", confidence: "medium" },
  { name: "samosa", aliases: [], standardPortion: "1 piece (60g)", portionGrams: 60, kcal: 200, protein: 3.4, carbs: 22, fat: 11, category: "Fried snacks", confidence: "medium" },
  { name: "pakora", aliases: ["bhaji", "pakoda"], standardPortion: "4-5 pieces (60g)", portionGrams: 60, kcal: 180, protein: 3, carbs: 18, fat: 11, category: "Fried snacks", confidence: "low" },
  { name: "french fries", aliases: ["fries"], standardPortion: "1 small portion (100g)", portionGrams: 100, kcal: 312, protein: 3.4, carbs: 41, fat: 15, category: "Fried snacks", confidence: "medium" },
  { name: "gulab jamun", aliases: [], standardPortion: "1 piece (40g)", portionGrams: 40, kcal: 150, protein: 2, carbs: 22, fat: 6, category: "Sweets", confidence: "medium" },
  { name: "jalebi", aliases: [], standardPortion: "1 piece (25g)", portionGrams: 25, kcal: 105, protein: 0.5, carbs: 18, fat: 3.5, category: "Sweets", confidence: "medium" },
  { name: "ice cream", aliases: [], standardPortion: "1 scoop (65g)", portionGrams: 65, kcal: 137, protein: 2.3, carbs: 16, fat: 7.3, category: "Sweets", confidence: "medium" },
  { name: "chocolate", aliases: ["chocolate bar"], standardPortion: "1 standard bar (40g)", portionGrams: 40, kcal: 214, protein: 3, carbs: 24, fat: 12, category: "Sweets", confidence: "medium" },
  { name: "whey protein", aliases: ["protein shake", "whey scoop"], standardPortion: "1 scoop (30g)", portionGrams: 30, kcal: 120, protein: 24, carbs: 3, fat: 1.5, category: "Supplements", confidence: "medium" },
  { name: "almonds", aliases: ["badam"], standardPortion: "10 pieces (12g)", portionGrams: 12, kcal: 70, protein: 2.5, carbs: 2.6, fat: 6, category: "Nuts", confidence: "high" },
  { name: "peanut butter", aliases: [], standardPortion: "1 tbsp (16g)", portionGrams: 16, kcal: 95, protein: 3.6, carbs: 3, fat: 8.2, category: "Nuts", confidence: "high" },
];

const UNIT_TO_GRAMS: Record<string, number> = { g: 1, gm: 1, kg: 1000, ml: 1, l: 1000 };

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

/** Scores how well a food name/alias matches the parsed query — higher is better, 0 = no match. */
function matchScore(query: string, candidate: string): number {
  const q = normalize(query);
  const c = normalize(candidate);
  if (q === c) return 100;
  if (c.includes(q) || q.includes(c)) return 70;
  const qWords = new Set(q.split(/\s+/));
  const cWords = c.split(/\s+/);
  const overlap = cWords.filter((w) => qWords.has(w)).length;
  return overlap > 0 ? 40 + overlap * 10 : 0;
}

export function findFoodMatch(query: string, db: FoodItem[] = FOOD_DATABASE): FoodItem | null {
  let best: { item: FoodItem; score: number } | null = null;
  for (const item of db) {
    const names = [item.name, ...(item.aliases ?? [])];
    for (const name of names) {
      const score = matchScore(query, name);
      if (score > 0 && (!best || score > best.score)) {
        best = { item, score };
      }
    }
  }
  return best?.item ?? null;
}
