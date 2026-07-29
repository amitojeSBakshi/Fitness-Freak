/**
 * Parses free-text food entries like "2 roti with dal and 1 katori rice" into
 * structured items the estimator can price.
 *
 * Deliberately rule-based rather than AI-driven: for the common Indian entries
 * this app sees, a good rule set is faster, free, and more predictable than a
 * model call — and it fails in ways the user can see and correct.
 */

export type ParsedItem = {
  /** Numeric quantity. Defaults to 1 when the user gives none. */
  quantity: number;
  /** Household unit if one was stated ("katori", "glass"), else null. */
  unit: string | null;
  /** The food text, cleaned of quantity and unit. */
  food: string;
  /** True when quantity was assumed rather than stated — drives confidence. */
  quantityAssumed: boolean;
};

/** Words that split one entry into multiple foods. */
const SEPARATORS = /\s+(?:with|and|plus|,|\+|&)\s+/gi;

/** Number words users actually type. */
const WORD_NUMBERS: Record<string, number> = {
  a: 1,
  an: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  half: 0.5,
  quarter: 0.25,
  couple: 2,
};

/**
 * Household units, normalised to a canonical key. Indian measures are included
 * because that is what people actually type — "1 katori dal", not "150g dal".
 */
const UNITS: Record<string, string> = {
  katori: "katori",
  katoris: "katori",
  bowl: "bowl",
  bowls: "bowl",
  glass: "glass",
  glasses: "glass",
  tumbler: "glass",
  cup: "cup",
  cups: "cup",
  plate: "plate",
  plates: "plate",
  piece: "piece",
  pieces: "piece",
  pcs: "piece",
  pc: "piece",
  slice: "slice",
  slices: "slice",
  scoop: "scoop",
  scoops: "scoop",
  tbsp: "tbsp",
  tablespoon: "tbsp",
  tablespoons: "tbsp",
  tsp: "tsp",
  teaspoon: "tsp",
  teaspoons: "tsp",
  g: "g",
  gm: "g",
  gms: "g",
  gram: "g",
  grams: "g",
  kg: "kg",
  ml: "ml",
  l: "l",
  litre: "l",
  liter: "l",
  litres: "l",
  bottle: "bottle",
  can: "can",
  packet: "packet",
  pack: "packet",
};

/** Filler words that carry no nutritional meaning. */
const STOPWORDS = new Set([
  "of",
  "some",
  "the",
  "my",
  "ate",
  "had",
  "eat",
  "drank",
  "consumed",
  "for",
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "today",
  "morning",
  "evening",
  "night",
]);

/** Parses "1/2", "0.5", "2" or a number word into a number. */
function parseQuantityToken(token: string): number | null {
  const fraction = token.match(/^(\d+)\/(\d+)$/);
  if (fraction) {
    const denominator = Number(fraction[2]);
    if (denominator === 0) return null;
    return Number(fraction[1]) / denominator;
  }

  // Mixed numbers like "1.5"
  if (/^\d+(\.\d+)?$/.test(token)) return Number(token);

  const word = WORD_NUMBERS[token.toLowerCase()];
  return word ?? null;
}

/** Splits a raw entry into individual food fragments. */
export function splitEntries(raw: string): string[] {
  return raw
    .toLowerCase()
    .split(SEPARATORS)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Parses a single fragment like "2 katori dal" into a ParsedItem. */
export function parseFragment(fragment: string): ParsedItem | null {
  const tokens = fragment
    .toLowerCase()
    .replace(/[^\w\s./]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) return null;

  let quantity = 1;
  let quantityAssumed = true;
  let unit: string | null = null;
  let cursor = 0;

  const leading = parseQuantityToken(tokens[0]);
  if (leading !== null) {
    quantity = leading;
    quantityAssumed = false;
    cursor = 1;

    // "half a roti" — skip a bare article after a fraction word
    if (tokens[cursor] === "a" || tokens[cursor] === "an") cursor += 1;
  }

  // A unit may follow the quantity, or be glued to it ("200g rice")
  if (cursor < tokens.length && UNITS[tokens[cursor]]) {
    unit = UNITS[tokens[cursor]];
    cursor += 1;
  } else if (cursor === 0) {
    const glued = tokens[0].match(/^(\d+(?:\.\d+)?)(g|gm|gms|kg|ml|l)$/);
    if (glued) {
      quantity = Number(glued[1]);
      quantityAssumed = false;
      unit = UNITS[glued[2]];
      cursor = 1;
    }
  }

  const food = tokens
    .slice(cursor)
    .filter((t) => !STOPWORDS.has(t))
    .join(" ")
    .trim();

  if (!food) return null;

  return { quantity, unit, food, quantityAssumed };
}

/** Parses a full free-text entry into structured items. */
export function parseFoodInput(raw: string): ParsedItem[] {
  return splitEntries(raw)
    .map(parseFragment)
    .filter((item): item is ParsedItem => item !== null);
}
