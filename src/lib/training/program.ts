export type Exercise = {
  name: string;
  sets: string;
  rest: string;
  rir: string;
  why: string;
  easier: string;
  harder: string;
};

export type Session = {
  name: string;
  focus: string;
  exercises: Exercise[];
};

/**
 * Foundation-phase (weeks 1-4) program: a rotating queue, not a fixed weekly
 * calendar. Whoever trains next does the next session in this array — a
 * missed day shifts the queue forward instead of leaving a hole. Every
 * muscle group gets ~2x/week frequency this way regardless of which days
 * actually happen. See Roadmap for what changes in weeks 5-12.
 */
export const SESSIONS: Session[] = [
  {
    name: "Upper A",
    focus: "Push, row, shoulders, core",
    exercises: [
      { name: "Incline push-up", sets: "2-3×8-12", rest: "90s", rir: "4-6", why: "Trains your whole front upper body while keeping the plank position that protects your shoulders — start elevated so it's doable with good form.", easier: "Higher surface (counter, then desk)", harder: "Lower surface, then slow 3-5s lowering" },
      { name: "Single-arm DB row", sets: "2-3×8-12/side", rest: "90s", rir: "4-6", why: "Builds the back muscle that fights against 11 hours/day sitting hunched forward.", easier: "Lighter dumbbell, support non-working hand on a chair", harder: "Add reps, then a heavier dumbbell" },
      { name: "DB overhead press", sets: "2-3×8-12", rest: "90s", rir: "4-6", why: "Shoulder strength and stability — a desk job gives you zero of this naturally.", easier: "Do it seated, or use a lighter dumbbell", harder: "Standing, add reps then load" },
      { name: "DB curl", sets: "2×10-15", rest: "60s", rir: "3-4", why: "Small joint-friendly accessory, easy confidence-builder early on.", easier: "Lighter dumbbell", harder: "Slower tempo, then heavier" },
      { name: "Side plank", sets: "2×20-40s/side", rest: "60s", rir: "—", why: "Anti-rotation core strength a desk job never trains.", easier: "Bent-knee side plank", harder: "Straight-leg, then add a hold with top arm raised" },
    ],
  },
  {
    name: "Lower A",
    focus: "Squat pattern, hinge, core",
    exercises: [
      { name: "Goblet squat", sets: "2-3×10-15", rest: "90s-2min", rir: "4-6", why: "Holding the weight in front forces an upright torso — self-correcting, and easier with a light dumbbell than bodyweight alone.", easier: "Sit-to-stand from a high chair first", harder: "Add reps, then a heavier dumbbell" },
      { name: "DB Romanian deadlift", sets: "2-3×10-15", rest: "90s", rir: "4-6", why: "The single highest-value movement for someone who sits all day — retrains hip extension your glutes have forgotten.", easier: "Wall-tap hip hinge drill, then a broomstick", harder: "Add reps, then a heavier dumbbell" },
      { name: "DB step-up", sets: "2×10-12/leg", rest: "60-90s", rir: "3-4", why: "Single-leg strength and balance for daily life and later progressions.", easier: "Lower step, hold a rail", harder: "Higher step, add dumbbells" },
      { name: "Calf raise", sets: "2×15-20", rest: "60s", rir: "2-3", why: "Cheap, low-risk direct work — calves respond well to higher reps.", easier: "Both feet, no weight", harder: "Single-leg, then add load" },
      { name: "Plank", sets: "2×30-45s", rest: "60s", rir: "—", why: "Anti-extension core, protects your lower back during squats and hinges.", easier: "Knees down", harder: "Add a slow arm/leg lift" },
    ],
  },
  {
    name: "Upper B",
    focus: "Press, pull, shoulders, core",
    exercises: [
      { name: "DB floor/bench press", sets: "2-3×8-12", rest: "2min", rir: "4-6", why: "Your main horizontal push — floor press is a safe home substitute without a bench.", easier: "Reduce load, or sub push-ups this session", harder: "Add reps, then a heavier dumbbell" },
      { name: "Inverted row (table/park bar)", sets: "2-3×8-12", rest: "90s", rir: "4-6", why: "Direct answer to the vertical-pull gap — dumbbells alone can't train this pattern.", easier: "Dead hang, then scapular pulls first", harder: "Elevate feet, then work toward chin-ups" },
      { name: "DB lateral raise", sets: "2×12-20", rest: "60s", rir: "3-4", why: "Shoulder width and joint health, cheap direct work.", easier: "Lighter dumbbell, partial range", harder: "Full range, then heavier" },
      { name: "DB pullover", sets: "2×10-15", rest: "60s", rir: "3-4", why: "Stretches and works lats/chest through a different angle than pressing.", easier: "Lighter dumbbell, smaller range", harder: "Full range, then heavier" },
      { name: "Dead bug", sets: "2×8-10/side", rest: "60s", rir: "—", why: "Teaches your core to resist arching, which pressing exercises expose.", easier: "Smaller range of motion", harder: "Slower tempo, full extension" },
    ],
  },
  {
    name: "Lower B",
    focus: "Unilateral legs, glutes, core",
    exercises: [
      { name: "Rear-foot-elevated split squat", sets: "2-3×10-15/leg", rest: "90s-2min", rir: "4-6", why: "The single most important exercise in this program — unilateral loading halves the weight needed per leg, which is exactly how you get real leg training from light apartment dumbbells.", easier: "Rear foot on the ground, hold a wall for balance", harder: "Rear foot elevated, then add dumbbells" },
      { name: "DB hip thrust / glute bridge", sets: "2-3×12-15", rest: "90s", rir: "4-6", why: "Direct glute work — a second angle on the hip extension your desk job switches off.", easier: "Bodyweight glute bridge", harder: "Add a dumbbell on the hips" },
      { name: "Single-leg RDL", sets: "2×10-12/side", rest: "90s", rir: "3-4", why: "Hamstring and balance work that complements the bilateral RDL in Lower A.", easier: "Light touch-down support with fingertips", harder: "No support, then add a dumbbell" },
      { name: "Calf raise", sets: "2×15-20", rest: "60s", rir: "2-3", why: "Same as Lower A — direct, low-risk.", easier: "Both feet, no weight", harder: "Single-leg, then add load" },
      { name: "Hanging knee raise", sets: "2×8-12", rest: "60s", rir: "—", why: "Lower-ab work you won't get from planks alone.", easier: "Lying leg raise if no bar available", harder: "Slower tempo, higher raise" },
    ],
  },
];

export const MINIMUM_VIABLE_SESSION = {
  title: "Bad-day minimum (still counts)",
  detail: "Goblet squat 3×12, push-up variation 3×10, single-arm row 3×12. Twenty minutes. Having this pre-decided turns a would-be miss into a win.",
};

export const WARMUP = "5 min brisk walking/stairs/skipping until slightly warm, then 2-3 light ramp-up sets on the first exercise of each pattern. Skip foam rolling and long static stretching — they don't earn their time cost before lifting.";

const EQUIPMENT_NOTES: Record<string, string> = {
  bodyweight:
    "You said bodyweight-only — every dumbbell exercise below still works: use the \"Easier\" cue as your actual prescription (e.g. slow-tempo push-ups instead of DB press), and add reps/tempo/range instead of load to progress.",
  full_gym:
    "You've got a full gym — feel free to swap the dumbbell lifts for their barbell or machine equivalents (squat, bench, deadlift, row) at the same sets/reps/RIR. Use dumbbells for anything single-arm/single-leg.",
};

export function equipmentNote(equipment: string | null | undefined): string | null {
  if (!equipment) return null;
  return EQUIPMENT_NOTES[equipment] ?? null;
}

export function nextSessionName(lastCompleted: string | null): string {
  const names = SESSIONS.map((s) => s.name);
  if (!lastCompleted) return names[0];
  const idx = names.indexOf(lastCompleted);
  return names[(idx + 1) % names.length];
}
