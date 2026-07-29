import type { FoodItem } from "@/lib/types";

/**
 * Indian-food nutrition database, research-compiled against IFCT 2017 (NIN,
 * ICMR) and USDA FoodData Central, then adversarially fact-checked — several
 * items were corrected during that pass (full-cream/toned milk fat content,
 * firm tofu protein, roti macros, dosa calories, rohu fish kcal, peg sizing,
 * soya chunks protein). Home-cooked oil-heavy items are inherently variable;
 * trust "high" confidence more than "low", and treat "low" as a starting
 * estimate to correct from your own experience.
 */
export const FOOD_DATABASE: FoodItem[] = [
  {
    "name": "Roti / Chapati (whole wheat, plain)",
    "aliases": [
      "chapati",
      "roti",
      "atta roti"
    ],
    "standardPortion": "1 medium roti (~15cm dia)",
    "portionGrams": 40,
    "kcal": 104,
    "protein": 3.6,
    "carbs": 20.4,
    "fat": 0.5,
    "category": "bread",
    "confidence": "high",
    "sourceNote": "IFCT 2017 whole wheat atta ~341kcal/12g protein/69g carb/1.7g fat per 100g raw flour, scaled to 30g raw dough (~40g cooked weight after water absorption). No added ghee."
  },
  {
    "name": "Phulka (thin, no oil)",
    "aliases": [
      "phulka",
      "fulka"
    ],
    "standardPortion": "1 medium, thin puffed roti",
    "portionGrams": 25,
    "kcal": 71,
    "protein": 2.2,
    "carbs": 14.5,
    "fat": 0.2,
    "category": "bread",
    "confidence": "high",
    "sourceNote": "Same wheat-atta base as roti but thinner/smaller (~18-20g raw dough) and dry-roasted with zero oil, per IFCT wheat flour composition."
  },
  {
    "name": "Paratha, plain (whole wheat, pan-fried)",
    "aliases": [
      "plain paratha",
      "paratha"
    ],
    "standardPortion": "1 medium paratha",
    "portionGrams": 55,
    "kcal": 170,
    "protein": 3.8,
    "carbs": 24,
    "fat": 6.5,
    "category": "bread",
    "confidence": "medium",
    "sourceNote": "Wheat dough (~35g raw) pan-fried with ~1 tsp (5g) oil/ghee. Oil is brushed unevenly at home, so actual fat can range 4-10g; flag as variable."
  },
  {
    "name": "Aloo Paratha (stuffed)",
    "aliases": [
      "potato paratha",
      "aloo parantha"
    ],
    "standardPortion": "1 medium stuffed paratha",
    "portionGrams": 90,
    "kcal": 230,
    "protein": 5,
    "carbs": 32,
    "fat": 9,
    "category": "bread",
    "confidence": "medium",
    "sourceNote": "Wheat dough shell (~40g) + spiced mashed potato filling (~45g) + ~1.5 tsp oil/ghee for cooking. Filling density and oil vary by household."
  },
  {
    "name": "Paneer Paratha (stuffed)",
    "aliases": [
      "paneer parantha"
    ],
    "standardPortion": "1 medium stuffed paratha",
    "portionGrams": 90,
    "kcal": 260,
    "protein": 9,
    "carbs": 26,
    "fat": 13,
    "category": "bread",
    "confidence": "medium",
    "sourceNote": "Wheat shell (~40g) + grated paneer filling (~40g, ~265kcal/100g) + ~1.5 tsp oil/ghee. Paneer fat content (full vs low-fat) is the main variance source."
  },
  {
    "name": "Naan (plain, tandoor, butter-brushed)",
    "aliases": [
      "naan",
      "butter naan"
    ],
    "standardPortion": "1 medium naan",
    "portionGrams": 90,
    "kcal": 260,
    "protein": 7,
    "carbs": 42,
    "fat": 7,
    "category": "bread",
    "confidence": "medium",
    "sourceNote": "Maida-based leavened dough, tandoor-cooked, brushed with ~1 tsp butter. Restaurant naans run larger/richer than home versions."
  },
  {
    "name": "Puri (deep-fried)",
    "aliases": [
      "poori",
      "puri"
    ],
    "standardPortion": "1 medium puri",
    "portionGrams": 25,
    "kcal": 100,
    "protein": 1.7,
    "carbs": 12,
    "fat": 5,
    "category": "bread",
    "confidence": "low",
    "sourceNote": "Small wheat/maida disc (~15g raw dough) deep-fried; oil absorption during frying is highly variable (~4-7g per puri depending on oil temperature and dough thickness) — biggest error source."
  },
  {
    "name": "Bhatura (deep-fried, leavened)",
    "aliases": [
      "bhatura",
      "batura"
    ],
    "standardPortion": "1 medium bhatura",
    "portionGrams": 80,
    "kcal": 280,
    "protein": 6,
    "carbs": 35,
    "fat": 13,
    "category": "bread",
    "confidence": "low",
    "sourceNote": "Leavened maida dough, deep-fried; size and oil absorption vary hugely between home and restaurant preparation (150-350 kcal range reported)."
  },
  {
    "name": "Tandoori Roti (whole wheat, no oil)",
    "aliases": [
      "tandoori roti"
    ],
    "standardPortion": "1 medium roti",
    "portionGrams": 40,
    "kcal": 110,
    "protein": 3.5,
    "carbs": 20,
    "fat": 1.5,
    "category": "bread",
    "confidence": "high",
    "sourceNote": "Whole wheat dough cooked dry in tandoor; slightly denser than tava roti but similarly near-zero added fat."
  },
  {
    "name": "Missi Roti (besan + wheat, light oil)",
    "aliases": [
      "missi roti"
    ],
    "standardPortion": "1 medium roti",
    "portionGrams": 45,
    "kcal": 120,
    "protein": 4.5,
    "carbs": 18,
    "fat": 3,
    "category": "bread",
    "confidence": "medium",
    "sourceNote": "Blend of gram flour (besan) and wheat atta with a light oil smear; besan:atta ratio varies by household."
  },
  {
    "name": "Plain cooked white rice",
    "aliases": [
      "rice",
      "chawal",
      "steamed rice"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 175,
    "protein": 3.6,
    "carbs": 38,
    "fat": 0.3,
    "category": "rice",
    "confidence": "high",
    "sourceNote": "Raw white rice ~345kcal/100g (IFCT); cooked rice absorbs ~2.5-3x water by weight, giving ~115-120kcal/100g cooked. Katori standardized at 150g cooked."
  },
  {
    "name": "Brown rice, cooked",
    "aliases": [
      "brown rice"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 170,
    "protein": 3.9,
    "carbs": 36,
    "fat": 1.3,
    "category": "rice",
    "confidence": "high",
    "sourceNote": "USDA/IFCT brown rice raw ~362kcal/100g with higher fiber and germ-layer fat than white rice; cooked to same water ratio as white rice."
  },
  {
    "name": "Jeera Rice",
    "aliases": [
      "cumin rice",
      "jeera chawal"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 220,
    "protein": 3.8,
    "carbs": 38,
    "fat": 6,
    "category": "rice",
    "confidence": "medium",
    "sourceNote": "Plain rice base + ~1 tsp (5g) ghee/oil tempering with cumin. Ghee quantity is the main variance source."
  },
  {
    "name": "Vegetable Pulao",
    "aliases": [
      "veg pulao",
      "pulav"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 230,
    "protein": 5,
    "carbs": 36,
    "fat": 7,
    "category": "rice",
    "confidence": "medium",
    "sourceNote": "Rice cooked with mixed vegetables and ~1.5 tsp (7-8g) oil/ghee plus whole spices. Vegetable ratio and oil vary by recipe."
  },
  {
    "name": "Vegetable Biryani",
    "aliases": [
      "veg biryani"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 240,
    "protein": 5.5,
    "carbs": 34,
    "fat": 8,
    "category": "rice",
    "confidence": "low",
    "sourceNote": "Layered rice + vegetables + oil/ghee with high recipe-to-recipe variance (dum style uses more fat than quick pulao-style biryani)."
  },
  {
    "name": "Chicken Biryani",
    "aliases": [
      "chicken biryani"
    ],
    "standardPortion": "1 katori, cooked (rice + ~1 chicken piece)",
    "portionGrams": 150,
    "kcal": 260,
    "protein": 12,
    "carbs": 30,
    "fat": 9,
    "category": "rice",
    "confidence": "low",
    "sourceNote": "Assumes roughly 100g rice + 50g bone-in chicken portion + oil/ghee masala. Chicken:rice ratio and oil vary enormously between recipes — flagged as high-variance."
  },
  {
    "name": "Khichdi (moong dal + rice)",
    "aliases": [
      "khichdi",
      "khichadi"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 180,
    "protein": 6,
    "carbs": 30,
    "fat": 3.5,
    "category": "rice",
    "confidence": "medium",
    "sourceNote": "Roughly 2:1 rice-to-split moong dal cooked together with ~1 tsp ghee. Dal ratio varies by household (some use more dal, raising protein)."
  },
  {
    "name": "Curd Rice",
    "aliases": [
      "dahi rice",
      "thayir sadam"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 150,
    "kcal": 190,
    "protein": 5.5,
    "carbs": 28,
    "fat": 5,
    "category": "rice",
    "confidence": "medium",
    "sourceNote": "Cooked rice mixed with full-fat curd (~1:1 by volume) plus a light oil-mustard-curry leaf tempering."
  },
  {
    "name": "Lemon Rice",
    "aliases": [
      "chitranna"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 210,
    "protein": 3.8,
    "carbs": 34,
    "fat": 6.5,
    "category": "rice",
    "confidence": "medium",
    "sourceNote": "Rice with lemon, peanuts, and a mustard-curry leaf oil tempering (~1.5 tsp oil). Peanut quantity adds protein/fat variance."
  },
  {
    "name": "Toor / Arhar Dal (tadka)",
    "aliases": [
      "toor dal",
      "arhar dal",
      "pigeon pea dal"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 150,
    "protein": 8.5,
    "carbs": 20,
    "fat": 4,
    "category": "dal_legume",
    "confidence": "high",
    "sourceNote": "IFCT toor dal raw ~335kcal/22g protein/100g; cooked to ~150g with water plus ~1 tsp ghee/oil tadka."
  },
  {
    "name": "Moong Dal (yellow, split, tadka)",
    "aliases": [
      "moong dal",
      "mung dal"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 135,
    "protein": 8,
    "carbs": 18,
    "fat": 3,
    "category": "dal_legume",
    "confidence": "high",
    "sourceNote": "IFCT moong dal raw ~334kcal/24g protein/100g; lighter tadka (~1 tsp oil) than toor dal is typical."
  },
  {
    "name": "Chana Dal (split Bengal gram, tadka)",
    "aliases": [
      "chana dal"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 170,
    "protein": 9,
    "carbs": 24,
    "fat": 4,
    "category": "dal_legume",
    "confidence": "high",
    "sourceNote": "IFCT chana dal raw ~372kcal/20g protein/100g, denser than toor/moong when cooked to same katori volume."
  },
  {
    "name": "Masoor Dal (red lentil, tadka)",
    "aliases": [
      "masoor dal",
      "red lentil dal"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 140,
    "protein": 8.5,
    "carbs": 19,
    "fat": 3,
    "category": "dal_legume",
    "confidence": "high",
    "sourceNote": "IFCT masoor dal raw ~343kcal/25g protein/100g; cooks down quickly, similar profile to moong dal."
  },
  {
    "name": "Rajma Curry (kidney beans, gravy)",
    "aliases": [
      "rajma",
      "kidney bean curry"
    ],
    "standardPortion": "1 katori, cooked with gravy",
    "portionGrams": 150,
    "kcal": 180,
    "protein": 9,
    "carbs": 24,
    "fat": 5,
    "category": "dal_legume",
    "confidence": "medium",
    "sourceNote": "Boiled rajma in onion-tomato masala with ~1.5 tsp oil. Gravy thickness/oil varies by household."
  },
  {
    "name": "Chole / Chana Masala",
    "aliases": [
      "chole",
      "chana masala",
      "chickpea curry"
    ],
    "standardPortion": "1 katori, cooked with gravy",
    "portionGrams": 150,
    "kcal": 200,
    "protein": 9,
    "carbs": 26,
    "fat": 7,
    "category": "dal_legume",
    "confidence": "medium",
    "sourceNote": "Boiled chickpeas in a spiced onion-tomato masala with ~1.5-2 tsp oil; restaurant/chole-bhature style versions run higher in fat."
  },
  {
    "name": "Sambar (dal + vegetables, South Indian)",
    "aliases": [
      "sambar"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 150,
    "kcal": 110,
    "protein": 5,
    "carbs": 15,
    "fat": 3,
    "category": "dal_legume",
    "confidence": "medium",
    "sourceNote": "Toor dal cooked with mixed vegetables, tamarind, and a light oil tempering (~1 tsp); thinner/more watery than plain dal."
  },
  {
    "name": "Dal Makhani (whole urad + rajma, cream/butter)",
    "aliases": [
      "dal makhani"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 260,
    "protein": 9,
    "carbs": 20,
    "fat": 16,
    "category": "dal_legume",
    "confidence": "low",
    "sourceNote": "Whole black urad and rajma slow-cooked with cream and butter; cream/butter quantity varies hugely between home-style (lighter) and restaurant-style (richer) preparation."
  },
  {
    "name": "Mixed Vegetable Sabzi",
    "aliases": [
      "mixed veg",
      "mix veg sabzi"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 120,
    "protein": 3,
    "carbs": 12,
    "fat": 6,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Assumes ~1 tsp (5g) oil per katori, typical light home-style tempering. More oil-heavy preparations can run 30-50% higher."
  },
  {
    "name": "Aloo Sabzi (dry potato)",
    "aliases": [
      "aloo sabzi",
      "dry aloo"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 160,
    "protein": 3,
    "carbs": 24,
    "fat": 6,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Potato is calorie-dense on its own (~87kcal/100g boiled) before oil; assumes ~1 tsp oil per katori."
  },
  {
    "name": "Bhindi Sabzi (okra, dry)",
    "aliases": [
      "bhindi",
      "okra sabzi",
      "ladies finger sabzi"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 110,
    "protein": 2.5,
    "carbs": 10,
    "fat": 6.5,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Okra absorbs oil unevenly during frying; assumes ~1 tsp oil per katori but some households use noticeably more to prevent sticking."
  },
  {
    "name": "Palak (plain spinach saag, no paneer)",
    "aliases": [
      "palak",
      "saag",
      "spinach sabzi"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 90,
    "protein": 4,
    "carbs": 8,
    "fat": 5,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Pureed/chopped spinach with onion-garlic tempering, ~1 tsp oil per katori. Spinach itself is very low-calorie; oil dominates the count."
  },
  {
    "name": "Palak Paneer",
    "aliases": [
      "saag paneer"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 210,
    "protein": 9.5,
    "carbs": 8,
    "fat": 14,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Plain palak base plus ~30g paneer cubes (~265kcal/100g) and slightly more oil/cream than plain palak. Paneer fat content is the main variance driver."
  },
  {
    "name": "Baingan Bharta (roasted eggplant mash)",
    "aliases": [
      "baingan bharta",
      "brinjal bharta"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 130,
    "protein": 2.5,
    "carbs": 10,
    "fat": 8,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Fire-roasted eggplant mashed with onion-tomato and ~1.5 tsp oil; oil quantity varies notably by household."
  },
  {
    "name": "Cabbage / Gobi Sabzi (dry)",
    "aliases": [
      "cabbage sabzi",
      "patta gobi",
      "cauliflower sabzi"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 100,
    "protein": 2.5,
    "carbs": 10,
    "fat": 5.5,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Shredded cabbage or cauliflower florets stir-fried with ~1 tsp oil and light spices."
  },
  {
    "name": "Aloo Gobi (potato + cauliflower, dry)",
    "aliases": [
      "aloo gobi"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 150,
    "protein": 3,
    "carbs": 18,
    "fat": 7,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Combination of potato and cauliflower with ~1.5 tsp oil; potato content raises calories versus plain gobi sabzi."
  },
  {
    "name": "Karela Sabzi (bitter gourd, dry)",
    "aliases": [
      "karela",
      "bitter gourd sabzi"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 100,
    "protein": 2,
    "carbs": 10,
    "fat": 5.5,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Bitter gourd stir-fried with ~1 tsp oil; often deep-fried first in some households which would raise fat notably."
  },
  {
    "name": "Lauki Sabzi (bottle gourd, light)",
    "aliases": [
      "lauki",
      "bottle gourd sabzi",
      "doodhi"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 70,
    "protein": 1.5,
    "carbs": 8,
    "fat": 3.5,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Very high water-content vegetable; assumes light ~0.75 tsp oil per katori, one of the lowest-calorie common sabzis."
  },
  {
    "name": "Methi Sabzi (fenugreek leaves + aloo)",
    "aliases": [
      "methi aloo",
      "fenugreek sabzi"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 130,
    "protein": 3,
    "carbs": 14,
    "fat": 6.5,
    "category": "vegetable",
    "confidence": "medium",
    "sourceNote": "Fresh fenugreek leaves cooked with potato and ~1.5 tsp oil; fenugreek's natural bitterness means recipes vary in potato ratio."
  },
  {
    "name": "Poha (flattened rice, veg + peanuts)",
    "aliases": [
      "poha",
      "pohe"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 180,
    "protein": 4,
    "carbs": 30,
    "fat": 5,
    "category": "breakfast",
    "confidence": "medium",
    "sourceNote": "Flattened rice (~40g dry) rehydrated and stir-fried with onion, peanuts, and ~1.5 tsp oil; peanut and oil quantity are the main variance sources."
  },
  {
    "name": "Upma (semolina/rava, veg)",
    "aliases": [
      "upma",
      "rava upma"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 200,
    "protein": 5,
    "carbs": 30,
    "fat": 6.5,
    "category": "breakfast",
    "confidence": "medium",
    "sourceNote": "Roasted rava (~40g dry) cooked with vegetables and ~1.5 tsp oil/ghee tempering."
  },
  {
    "name": "Idli (steamed rice-urad batter)",
    "aliases": [
      "idli"
    ],
    "standardPortion": "2 medium idlis",
    "portionGrams": 80,
    "kcal": 130,
    "protein": 4,
    "carbs": 26,
    "fat": 0.5,
    "category": "breakfast",
    "confidence": "high",
    "sourceNote": "IFCT-consistent fermented rice-urad batter (~3:1 ratio), steamed with zero added fat; ~40g per idli."
  },
  {
    "name": "Dosa, plain",
    "aliases": [
      "plain dosa",
      "sada dosa"
    ],
    "standardPortion": "1 medium dosa",
    "portionGrams": 80,
    "kcal": 108,
    "protein": 3,
    "carbs": 19,
    "fat": 2.6,
    "category": "breakfast",
    "confidence": "low",
    "sourceNote": "Same fermented rice-urad batter as idli, thinner and pan-fried with ~1 tsp oil per dosa. Size varies widely (thin paper dosa vs thick)."
  },
  {
    "name": "Masala Dosa",
    "aliases": [
      "masala dosa"
    ],
    "standardPortion": "1 medium dosa with potato filling",
    "portionGrams": 150,
    "kcal": 240,
    "protein": 6,
    "carbs": 42,
    "fat": 10,
    "category": "breakfast",
    "confidence": "medium",
    "sourceNote": "Plain dosa (~80g) plus spiced potato filling (~60-70g) and extra oil for crisping; filling quantity is the main variance source."
  },
  {
    "name": "Uttapam (thick dosa with vegetable toppings)",
    "aliases": [
      "uttapam",
      "uthappam"
    ],
    "standardPortion": "1 medium uttapam",
    "portionGrams": 100,
    "kcal": 180,
    "protein": 5,
    "carbs": 28,
    "fat": 5,
    "category": "breakfast",
    "confidence": "medium",
    "sourceNote": "Thicker fermented batter than dosa, topped with onion/tomato and ~1.5 tsp oil."
  },
  {
    "name": "Oats, cooked plain (with water)",
    "aliases": [
      "oatmeal",
      "oats porridge"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 120,
    "protein": 4.5,
    "carbs": 20,
    "fat": 2.5,
    "category": "breakfast",
    "confidence": "high",
    "sourceNote": "Rolled oats (~30g dry, USDA ~389kcal/100g dry) cooked in water only, no milk or sugar added."
  },
  {
    "name": "Oats, cooked with milk",
    "aliases": [
      "oats with milk",
      "milk oats"
    ],
    "standardPortion": "1 katori, cooked",
    "portionGrams": 150,
    "kcal": 190,
    "protein": 8,
    "carbs": 24,
    "fat": 6,
    "category": "breakfast",
    "confidence": "medium",
    "sourceNote": "~30g dry oats cooked in ~100ml full-fat milk instead of water; toned/skim milk would lower fat and calories notably."
  },
  {
    "name": "Cornflakes with milk",
    "aliases": [
      "cornflakes",
      "corn flakes"
    ],
    "standardPortion": "1 bowl",
    "portionGrams": 180,
    "kcal": 200,
    "protein": 6.5,
    "carbs": 34,
    "fat": 4,
    "category": "breakfast",
    "confidence": "medium",
    "sourceNote": "~30g cornflakes (typical brand ~375kcal/100g) with ~150ml full-fat milk, no added sugar beyond what's in the cereal."
  },
  {
    "name": "Besan Chilla (gram flour savory pancake)",
    "aliases": [
      "besan chilla",
      "besan cheela"
    ],
    "standardPortion": "2 medium pieces",
    "portionGrams": 120,
    "kcal": 220,
    "protein": 10,
    "carbs": 20,
    "fat": 10,
    "category": "breakfast",
    "confidence": "medium",
    "sourceNote": "Gram flour (besan) batter (~40g dry) with vegetables, cooked with ~1.5-2 tsp oil for two pieces."
  },
  {
    "name": "Moong Dal Cheela",
    "aliases": [
      "moong dal chilla"
    ],
    "standardPortion": "2 medium pieces",
    "portionGrams": 120,
    "kcal": 190,
    "protein": 12,
    "carbs": 18,
    "fat": 6,
    "category": "breakfast",
    "confidence": "medium",
    "sourceNote": "Ground soaked whole/split moong dal batter (~50g dry-equivalent), higher protein than besan chilla, cooked with ~1 tsp oil per piece."
  },
  {
    "name": "Paratha with Curd (typical breakfast combo)",
    "aliases": [
      "paratha and curd",
      "paratha dahi"
    ],
    "standardPortion": "1 plain paratha + small katori curd",
    "portionGrams": 155,
    "kcal": 235,
    "protein": 7,
    "carbs": 29,
    "fat": 9.5,
    "category": "breakfast",
    "confidence": "medium",
    "sourceNote": "Sum of plain paratha (55g) + ~100g curd; a very common household breakfast pairing rather than a single dish."
  },
  {
    "name": "Curd / Dahi, plain (full-fat, homemade)",
    "aliases": [
      "dahi",
      "curd",
      "yogurt"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 150,
    "kcal": 95,
    "protein": 5,
    "carbs": 7,
    "fat": 5,
    "category": "accompaniment",
    "confidence": "high",
    "sourceNote": "IFCT/USDA full-fat curd from whole milk ~63kcal/100g, 3.5g protein/100g; scaled to 150g katori. Low-fat/toned-milk curd would be noticeably lower calorie."
  },
  {
    "name": "Raita (vegetable, curd-based)",
    "aliases": [
      "raita",
      "cucumber raita"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 150,
    "kcal": 80,
    "protein": 4,
    "carbs": 6,
    "fat": 4,
    "category": "accompaniment",
    "confidence": "medium",
    "sourceNote": "Curd diluted slightly with grated cucumber/onion and a pinch of roasted cumin; lower calorie than plain curd due to dilution."
  },
  {
    "name": "Papad, roasted",
    "aliases": [
      "papad",
      "papadum"
    ],
    "standardPortion": "1 piece, roasted/roasted-on-flame",
    "portionGrams": 10,
    "kcal": 35,
    "protein": 2,
    "carbs": 5,
    "fat": 0.5,
    "category": "accompaniment",
    "confidence": "high",
    "sourceNote": "Urad/moong dal papad, dry-roasted with no oil. IFCT-consistent lentil-flour composition."
  },
  {
    "name": "Papad, fried",
    "aliases": [
      "fried papad"
    ],
    "standardPortion": "1 piece, deep or shallow fried",
    "portionGrams": 10,
    "kcal": 60,
    "protein": 2,
    "carbs": 5,
    "fat": 3.5,
    "category": "accompaniment",
    "confidence": "medium",
    "sourceNote": "Same base papad as roasted version but frying adds significant absorbed oil; amount varies with oil temperature."
  },
  {
    "name": "Pickle / Achaar (oil-based, e.g. mango)",
    "aliases": [
      "achaar",
      "pickle",
      "aam ka achar"
    ],
    "standardPortion": "1 tbsp",
    "portionGrams": 15,
    "kcal": 45,
    "protein": 0.2,
    "carbs": 3,
    "fat": 3.5,
    "category": "accompaniment",
    "confidence": "low",
    "sourceNote": "Oil content varies enormously by brand/recipe (some pickles are 30-50% oil by weight); this is a mid-range estimate, flag as high-variance."
  },
  {
    "name": "Coconut Chutney",
    "aliases": [
      "coconut chutney"
    ],
    "standardPortion": "1 tbsp",
    "portionGrams": 20,
    "kcal": 45,
    "protein": 0.8,
    "carbs": 2,
    "fat": 4,
    "category": "accompaniment",
    "confidence": "medium",
    "sourceNote": "Fresh grated coconut (high natural fat) blended with a little oil tempering; coconut fat dominates the calorie count."
  },
  {
    "name": "Mint-Coriander Chutney",
    "aliases": [
      "mint chutney",
      "pudina chutney",
      "green chutney"
    ],
    "standardPortion": "1 tbsp",
    "portionGrams": 15,
    "kcal": 12,
    "protein": 0.5,
    "carbs": 2,
    "fat": 0.2,
    "category": "accompaniment",
    "confidence": "medium",
    "sourceNote": "Mint/coriander/lemon-based, no coconut or significant oil — much lower calorie than coconut chutney."
  },
  {
    "name": "Rasam (thin tamarind-tomato soup)",
    "aliases": [
      "rasam"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 150,
    "kcal": 55,
    "protein": 1.5,
    "carbs": 8,
    "fat": 1.5,
    "category": "accompaniment",
    "confidence": "medium",
    "sourceNote": "Thin tamarind/tomato-based South Indian soup with a light oil-mustard tempering; much lower calorie-density than sambar due to higher water content."
  },
  {
    "name": "Buttermilk / Chaas (spiced, diluted curd)",
    "aliases": [
      "chaas",
      "buttermilk"
    ],
    "standardPortion": "1 glass",
    "portionGrams": 200,
    "kcal": 55,
    "protein": 3,
    "carbs": 5,
    "fat": 2,
    "category": "accompaniment",
    "confidence": "medium",
    "sourceNote": "Curd diluted roughly 1:1 with water plus salt/spices; calorie content scales down proportionally from plain curd."
  },
  {
    "name": "Chicken breast, raw",
    "aliases": [
      "raw chicken breast",
      "skinless boneless chicken raw"
    ],
    "standardPortion": "1 medium breast piece",
    "portionGrams": 100,
    "kcal": 120,
    "protein": 22.5,
    "carbs": 0,
    "fat": 2.6,
    "category": "Animal Protein",
    "confidence": "high",
    "sourceNote": "USDA FoodData Central, raw skinless boneless breast"
  },
  {
    "name": "Chicken breast, grilled/cooked",
    "aliases": [
      "cooked chicken breast",
      "grilled chicken"
    ],
    "standardPortion": "1 medium cooked breast",
    "portionGrams": 100,
    "kcal": 165,
    "protein": 31,
    "carbs": 0,
    "fat": 3.6,
    "category": "Animal Protein",
    "confidence": "high",
    "sourceNote": "USDA, roasted skinless boneless breast; calorie density rises vs raw due to water loss on cooking"
  },
  {
    "name": "Chicken curry, home-style (bone-in, medium oil)",
    "aliases": [
      "ghar ka chicken curry",
      "chicken curry katori"
    ],
    "standardPortion": "1 katori (with 1-2 pieces + gravy)",
    "portionGrams": 150,
    "kcal": 230,
    "protein": 18,
    "carbs": 6,
    "fat": 15,
    "category": "Animal Protein",
    "confidence": "medium",
    "sourceNote": "Estimated from IFCT-style recipe computation + recipe aggregator averages; oil quantity is the main swing variable (can range 150-320 kcal for same weight)"
  },
  {
    "name": "Tandoori chicken",
    "aliases": [
      "tandoori chicken leg",
      "tandoori"
    ],
    "standardPortion": "1 leg piece",
    "portionGrams": 150,
    "kcal": 250,
    "protein": 30,
    "carbs": 4,
    "fat": 12,
    "category": "Animal Protein",
    "confidence": "medium",
    "sourceNote": "Restaurant-style marinade with yogurt+oil basting; less oil than curry since no gravy fat"
  },
  {
    "name": "Mutton curry, home-style",
    "aliases": [
      "mutton gravy",
      "goat curry"
    ],
    "standardPortion": "1 katori (with 2-3 pieces + gravy)",
    "portionGrams": 150,
    "kcal": 320,
    "protein": 20,
    "carbs": 6,
    "fat": 24,
    "category": "Animal Protein",
    "confidence": "medium",
    "sourceNote": "Mutton has notably higher intramuscular and cooking fat than chicken; home recipes vary widely by oil/ghee used"
  },
  {
    "name": "Egg, whole boiled",
    "aliases": [
      "boiled egg",
      "ubla anda"
    ],
    "standardPortion": "1 large egg",
    "portionGrams": 50,
    "kcal": 78,
    "protein": 6.3,
    "carbs": 0.6,
    "fat": 5.3,
    "category": "Animal Protein",
    "confidence": "high",
    "sourceNote": "USDA, large egg hard-boiled"
  },
  {
    "name": "Egg, fried (with oil)",
    "aliases": [
      "fried egg",
      "anda fry",
      "sunny side up"
    ],
    "standardPortion": "1 egg fried in ~1 tsp oil",
    "portionGrams": 55,
    "kcal": 90,
    "protein": 6.3,
    "carbs": 0.4,
    "fat": 7,
    "category": "Animal Protein",
    "confidence": "medium",
    "sourceNote": "USDA egg base + added oil absorbed during frying (~1 tsp typical home use)"
  },
  {
    "name": "Egg omelette (2-egg, plain, home-style)",
    "aliases": [
      "omelette",
      "masala omelette plain"
    ],
    "standardPortion": "1 omelette (2 eggs + onion/chili + oil)",
    "portionGrams": 120,
    "kcal": 190,
    "protein": 13.5,
    "carbs": 2.5,
    "fat": 15,
    "category": "Animal Protein",
    "confidence": "medium",
    "sourceNote": "2 eggs + ~1 tsp oil + minor vegetables; cheese/extra oil variants run higher"
  },
  {
    "name": "Egg white only, boiled",
    "aliases": [
      "egg white",
      "anda safedi"
    ],
    "standardPortion": "1 egg white",
    "portionGrams": 33,
    "kcal": 17,
    "protein": 3.6,
    "carbs": 0.2,
    "fat": 0.05,
    "category": "Animal Protein",
    "confidence": "high",
    "sourceNote": "USDA, raw/boiled egg white essentially unchanged in macros"
  },
  {
    "name": "Fish, rohu (raw)",
    "aliases": [
      "rohu fish",
      "rohu"
    ],
    "standardPortion": "1 medium piece",
    "portionGrams": 100,
    "kcal": 80,
    "protein": 16.6,
    "carbs": 0,
    "fat": 1.4,
    "category": "Animal Protein",
    "confidence": "medium",
    "sourceNote": "IFCT-range figures for freshwater carp; commercial variation exists by fat content"
  },
  {
    "name": "Fish, pomfret (raw)",
    "aliases": [
      "pomfret"
    ],
    "standardPortion": "1 small whole pomfret",
    "portionGrams": 100,
    "kcal": 90,
    "protein": 19,
    "carbs": 0,
    "fat": 1.5,
    "category": "Animal Protein",
    "confidence": "medium",
    "sourceNote": "IFCT-range figures for pomfret, a leaner white fish"
  },
  {
    "name": "Fish, salmon (raw)",
    "aliases": [
      "salmon"
    ],
    "standardPortion": "1 fillet",
    "portionGrams": 100,
    "kcal": 208,
    "protein": 20,
    "carbs": 0,
    "fat": 13,
    "category": "Animal Protein",
    "confidence": "high",
    "sourceNote": "USDA FoodData Central, raw Atlantic salmon (farmed)"
  },
  {
    "name": "Paneer, raw",
    "aliases": [
      "paneer cubes",
      "cottage cheese indian"
    ],
    "standardPortion": "1 katori cubed",
    "portionGrams": 100,
    "kcal": 265,
    "protein": 18,
    "carbs": 1.2,
    "fat": 20,
    "category": "Vegetarian Protein",
    "confidence": "high",
    "sourceNote": "IFCT/commercial full-fat paneer average; low-fat paneer can be ~20% lower calorie"
  },
  {
    "name": "Paneer bhurji",
    "aliases": [
      "scrambled paneer"
    ],
    "standardPortion": "1 katori cooked",
    "portionGrams": 100,
    "kcal": 220,
    "protein": 14,
    "carbs": 5,
    "fat": 16,
    "category": "Vegetarian Protein",
    "confidence": "medium",
    "sourceNote": "Raw paneer base + onion/tomato/1-1.5 tsp oil; home oil quantity is the main variable"
  },
  {
    "name": "Paneer tikka (grilled, restaurant-style)",
    "aliases": [
      "tikka paneer"
    ],
    "standardPortion": "5-6 cubes",
    "portionGrams": 100,
    "kcal": 220,
    "protein": 16,
    "carbs": 6,
    "fat": 14,
    "category": "Vegetarian Protein",
    "confidence": "medium",
    "sourceNote": "Yogurt-spice marinade + brushed oil; tandoor/grill loses some water raising density slightly"
  },
  {
    "name": "Tofu, firm",
    "aliases": [
      "soy paneer"
    ],
    "standardPortion": "1 katori cubed",
    "portionGrams": 100,
    "kcal": 144,
    "protein": 16,
    "carbs": 2.5,
    "fat": 8.5,
    "category": "Vegetarian Protein",
    "confidence": "high",
    "sourceNote": "USDA FoodData Central, firm tofu"
  },
  {
    "name": "Soya chunks, dry",
    "aliases": [
      "nutrela",
      "meal maker dry"
    ],
    "standardPortion": "1 small handful (dry, before soaking)",
    "portionGrams": 30,
    "kcal": 103,
    "protein": 15.5,
    "carbs": 10,
    "fat": 0.2,
    "category": "Vegetarian Protein",
    "confidence": "high",
    "sourceNote": "Nutrela/generic soya chunk label: ~345 kcal, 52g protein per 100g dry"
  },
  {
    "name": "Soya chunks curry (cooked)",
    "aliases": [
      "soya curry",
      "meal maker curry"
    ],
    "standardPortion": "1 katori (~30g dry chunks cooked in gravy)",
    "portionGrams": 150,
    "kcal": 200,
    "protein": 16,
    "carbs": 15,
    "fat": 6,
    "category": "Vegetarian Protein",
    "confidence": "medium",
    "sourceNote": "Rehydrated chunks (~3x weight gain) plus onion-tomato gravy and oil"
  },
  {
    "name": "Sprouts, moong (raw)",
    "aliases": [
      "moong sprouts",
      "sprouted mung bean"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 100,
    "kcal": 30,
    "protein": 3,
    "carbs": 5.9,
    "fat": 0.2,
    "category": "Vegetarian Protein",
    "confidence": "high",
    "sourceNote": "USDA/IFCT mung bean sprouts, raw"
  },
  {
    "name": "Peanuts, roasted (unsalted)",
    "aliases": [
      "moongfali",
      "groundnuts"
    ],
    "standardPortion": "1 small handful",
    "portionGrams": 30,
    "kcal": 170,
    "protein": 7.7,
    "carbs": 6,
    "fat": 14,
    "category": "Vegetarian Protein",
    "confidence": "high",
    "sourceNote": "USDA dry-roasted peanuts"
  },
  {
    "name": "Chana, roasted (bhuna chana)",
    "aliases": [
      "roasted chickpeas",
      "bhuna chana"
    ],
    "standardPortion": "1 small handful",
    "portionGrams": 30,
    "kcal": 120,
    "protein": 7,
    "carbs": 17,
    "fat": 2,
    "category": "Vegetarian Protein",
    "confidence": "high",
    "sourceNote": "IFCT roasted bengal gram values"
  },
  {
    "name": "Chana, boiled (white/kabuli)",
    "aliases": [
      "boiled chickpeas",
      "kabuli chana boiled"
    ],
    "standardPortion": "1 katori cooked",
    "portionGrams": 150,
    "kcal": 245,
    "protein": 13,
    "carbs": 40,
    "fat": 4,
    "category": "Vegetarian Protein",
    "confidence": "high",
    "sourceNote": "USDA boiled chickpeas, standard katori serving"
  },
  {
    "name": "Milk, full-fat/full-cream",
    "aliases": [
      "doodh full cream",
      "buffalo milk"
    ],
    "standardPortion": "1 glass",
    "portionGrams": 250,
    "kcal": 217,
    "protein": 7.5,
    "carbs": 12,
    "fat": 14.5,
    "category": "Dairy",
    "confidence": "medium",
    "sourceNote": "Indian full-cream milk (blend of cow/buffalo, ~6% fat) is fattier than Western whole milk; brand labels vary"
  },
  {
    "name": "Milk, toned",
    "aliases": [
      "toned doodh",
      "3% milk"
    ],
    "standardPortion": "1 glass",
    "portionGrams": 250,
    "kcal": 143,
    "protein": 8,
    "carbs": 11,
    "fat": 7.3,
    "category": "Dairy",
    "confidence": "high",
    "sourceNote": "FSSAI toned milk standard ~3% fat; based on Amul/Mother Dairy labels"
  },
  {
    "name": "Curd/dahi, full-fat",
    "aliases": [
      "dahi",
      "yogurt plain"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 100,
    "kcal": 60,
    "protein": 3.5,
    "carbs": 4.7,
    "fat": 4,
    "category": "Dairy",
    "confidence": "high",
    "sourceNote": "IFCT/standard whole-milk curd values"
  },
  {
    "name": "Greek yogurt, plain",
    "aliases": [
      "hung curd",
      "greek yoghurt"
    ],
    "standardPortion": "1 small tub",
    "portionGrams": 100,
    "kcal": 95,
    "protein": 9,
    "carbs": 4,
    "fat": 4.5,
    "category": "Dairy",
    "confidence": "medium",
    "sourceNote": "Averaged from Indian brands (Epigamia/Nestle a+); ranges from ~59kcal (nonfat) to ~130kcal (full-fat) depending on brand -- check label"
  },
  {
    "name": "Buttermilk/chaas (salted, thin)",
    "aliases": [
      "chaas",
      "spiced buttermilk"
    ],
    "standardPortion": "1 glass",
    "portionGrams": 250,
    "kcal": 40,
    "protein": 2,
    "carbs": 4,
    "fat": 1,
    "category": "Dairy",
    "confidence": "medium",
    "sourceNote": "Thin diluted curd + water + salt/spices; thickness varies by household recipe"
  },
  {
    "name": "Lassi, sweet",
    "aliases": [
      "meethi lassi"
    ],
    "standardPortion": "1 glass",
    "portionGrams": 250,
    "kcal": 220,
    "protein": 6,
    "carbs": 30,
    "fat": 8,
    "category": "Dairy",
    "confidence": "medium",
    "sourceNote": "Curd + sugar + water, blended; sugar quantity varies significantly by vendor"
  },
  {
    "name": "Lassi, salted",
    "aliases": [
      "namkeen lassi"
    ],
    "standardPortion": "1 glass",
    "portionGrams": 250,
    "kcal": 90,
    "protein": 4,
    "carbs": 8,
    "fat": 4,
    "category": "Dairy",
    "confidence": "medium",
    "sourceNote": "Thicker than chaas, no added sugar"
  },
  {
    "name": "Cheese slice, processed",
    "aliases": [
      "amul cheese slice",
      "cheese slice"
    ],
    "standardPortion": "1 slice",
    "portionGrams": 20,
    "kcal": 60,
    "protein": 3,
    "carbs": 1.5,
    "fat": 4.5,
    "category": "Dairy",
    "confidence": "high",
    "sourceNote": "Amul/Britannia processed cheese slice label"
  },
  {
    "name": "Butter",
    "aliases": [
      "makhan",
      "table butter"
    ],
    "standardPortion": "1 tsp",
    "portionGrams": 5,
    "kcal": 36,
    "protein": 0,
    "carbs": 0,
    "fat": 4,
    "category": "Dairy",
    "confidence": "high",
    "sourceNote": "USDA/standard dairy butter, ~717kcal/100g"
  },
  {
    "name": "Ghee",
    "aliases": [
      "clarified butter",
      "desi ghee"
    ],
    "standardPortion": "1 tsp",
    "portionGrams": 5,
    "kcal": 45,
    "protein": 0,
    "carbs": 0,
    "fat": 5,
    "category": "Dairy",
    "confidence": "high",
    "sourceNote": "IFCT ghee, ~900kcal/100g, pure fat"
  },
  {
    "name": "Almonds",
    "aliases": [
      "badam"
    ],
    "standardPortion": "10 pieces",
    "portionGrams": 12,
    "kcal": 70,
    "protein": 2.6,
    "carbs": 2.5,
    "fat": 6,
    "category": "Nuts and Seeds",
    "confidence": "high",
    "sourceNote": "USDA raw almonds"
  },
  {
    "name": "Walnuts",
    "aliases": [
      "akhrot"
    ],
    "standardPortion": "4 halves",
    "portionGrams": 10,
    "kcal": 65,
    "protein": 1.5,
    "carbs": 1.4,
    "fat": 6.5,
    "category": "Nuts and Seeds",
    "confidence": "high",
    "sourceNote": "USDA raw walnuts"
  },
  {
    "name": "Cashews",
    "aliases": [
      "kaju"
    ],
    "standardPortion": "10 pieces",
    "portionGrams": 15,
    "kcal": 85,
    "protein": 2.8,
    "carbs": 4.5,
    "fat": 7,
    "category": "Nuts and Seeds",
    "confidence": "high",
    "sourceNote": "USDA raw cashews"
  },
  {
    "name": "Peanut butter",
    "aliases": [
      "pnb"
    ],
    "standardPortion": "1 tbsp",
    "portionGrams": 16,
    "kcal": 95,
    "protein": 4,
    "carbs": 3,
    "fat": 8,
    "category": "Nuts and Seeds",
    "confidence": "high",
    "sourceNote": "USDA/typical Indian brand (Pintola/MyFitness) natural peanut butter"
  },
  {
    "name": "Chia seeds",
    "aliases": [
      "chia"
    ],
    "standardPortion": "1 tbsp",
    "portionGrams": 12,
    "kcal": 58,
    "protein": 2,
    "carbs": 5,
    "fat": 3.6,
    "category": "Nuts and Seeds",
    "confidence": "high",
    "sourceNote": "USDA chia seeds, dry"
  },
  {
    "name": "Flax seeds",
    "aliases": [
      "alsi",
      "flaxseed"
    ],
    "standardPortion": "1 tbsp",
    "portionGrams": 10,
    "kcal": 55,
    "protein": 1.9,
    "carbs": 3,
    "fat": 4.3,
    "category": "Nuts and Seeds",
    "confidence": "high",
    "sourceNote": "USDA flaxseed, whole"
  },
  {
    "name": "Whey protein powder, 1 scoop (generic Indian brand)",
    "aliases": [
      "whey scoop",
      "protein powder scoop",
      "ON whey",
      "MuscleBlaze whey"
    ],
    "standardPortion": "1 scoop",
    "portionGrams": 30,
    "kcal": 120,
    "protein": 24,
    "carbs": 3,
    "fat": 1.5,
    "category": "Supplements",
    "confidence": "medium",
    "sourceNote": "Scoop size varies by brand/product (27-35g) and protein per scoop ranges ~24-27g (MuscleBlaze Whey Gold ~24-25g/30g, Biozyme 25g/33g, ON Gold Standard ~24g/31g) -- always check the specific tub label"
  },
  {
    "name": "Samosa (street/home-style, medium)",
    "aliases": [
      "aloo samosa",
      "samosa"
    ],
    "standardPortion": "1 medium piece",
    "portionGrams": 50,
    "kcal": 150,
    "protein": 3,
    "carbs": 15,
    "fat": 9,
    "category": "Fried Snacks",
    "confidence": "low",
    "sourceNote": "High variance: small street samosa (30g/~130kcal) to large mithai-shop samosa (60-70g/~300kcal); deep-fry oil absorption is the biggest unknown -- weigh yours if possible"
  },
  {
    "name": "Pakora/bhaji (onion or mixed veg)",
    "aliases": [
      "onion pakora",
      "bhajiya",
      "kanda bhaji"
    ],
    "standardPortion": "4-5 pieces",
    "portionGrams": 50,
    "kcal": 150,
    "protein": 3,
    "carbs": 14,
    "fat": 9,
    "category": "Fried Snacks",
    "confidence": "low",
    "sourceNote": "Batter thickness and oil absorption vary hugely by vendor; treat as rough estimate"
  },
  {
    "name": "Vada pav",
    "aliases": [
      "batata vada pav",
      "vada pav mumbai"
    ],
    "standardPortion": "1 piece (vada + pav + chutney)",
    "portionGrams": 150,
    "kcal": 290,
    "protein": 7,
    "carbs": 38,
    "fat": 12,
    "category": "Fried Snacks",
    "confidence": "medium",
    "sourceNote": "Aggregator average ~280-350kcal; pav (bread) contributes significant carbs, fried vada contributes fat"
  },
  {
    "name": "Kachori (moong/urad dal stuffed)",
    "aliases": [
      "kachori"
    ],
    "standardPortion": "1 piece",
    "portionGrams": 60,
    "kcal": 220,
    "protein": 5,
    "carbs": 22,
    "fat": 13,
    "category": "Fried Snacks",
    "confidence": "low",
    "sourceNote": "Maida shell deep fried, dense with oil; regional recipes vary in filling and shell thickness"
  },
  {
    "name": "French fries (restaurant-style, salted)",
    "aliases": [
      "finger chips",
      "fries"
    ],
    "standardPortion": "1 medium regular serving",
    "portionGrams": 100,
    "kcal": 310,
    "protein": 3.5,
    "carbs": 41,
    "fat": 15,
    "category": "Fried Snacks",
    "confidence": "medium",
    "sourceNote": "McDonald's/fast-food medium fries reference; oil type and re-frying frequency affect fat content"
  },
  {
    "name": "Spring roll (veg, fried)",
    "aliases": [
      "veg spring roll"
    ],
    "standardPortion": "1 piece",
    "portionGrams": 80,
    "kcal": 160,
    "protein": 3,
    "carbs": 18,
    "fat": 8,
    "category": "Fried Snacks",
    "confidence": "low",
    "sourceNote": "Wrapper thickness and filling oil vary by vendor; Chinese-style street food estimate"
  },
  {
    "name": "Aloo tikki",
    "aliases": [
      "potato tikki",
      "tikki"
    ],
    "standardPortion": "1 piece",
    "portionGrams": 60,
    "kcal": 130,
    "protein": 2.5,
    "carbs": 16,
    "fat": 6,
    "category": "Fried Snacks",
    "confidence": "medium",
    "sourceNote": "Shallow-fried potato patty; chaat versions with chutney/curd add significant extra calories not included here"
  },
  {
    "name": "Bhujia/namkeen (sev-type)",
    "aliases": [
      "haldiram bhujia",
      "namkeen mix",
      "sev"
    ],
    "standardPortion": "1 small bowl",
    "portionGrams": 30,
    "kcal": 165,
    "protein": 4,
    "carbs": 14,
    "fat": 11,
    "category": "Fried Snacks",
    "confidence": "high",
    "sourceNote": "Haldiram's aloo bhujia label, ~550kcal/100g -- packaged so label-based confidence is high, but portion self-control is the real risk (easy to eat 2-3x this)"
  },
  {
    "name": "Potato chips (packaged, e.g. Lay's)",
    "aliases": [
      "chips",
      "lays"
    ],
    "standardPortion": "1 small pack",
    "portionGrams": 26,
    "kcal": 140,
    "protein": 1.7,
    "carbs": 14,
    "fat": 9,
    "category": "Fried Snacks",
    "confidence": "high",
    "sourceNote": "Lay's India small pack label (~26-28g)"
  },
  {
    "name": "Gulab jamun",
    "aliases": [
      "gulab jamun"
    ],
    "standardPortion": "1 piece with syrup",
    "portionGrams": 40,
    "kcal": 150,
    "protein": 2,
    "carbs": 22,
    "fat": 6,
    "category": "Sweets",
    "confidence": "medium",
    "sourceNote": "Piece weight is the biggest underestimation risk: mithai-shop pieces commonly weigh 40-50g each, not the ~20g many people assume; syrup soak level adds further variance"
  },
  {
    "name": "Rasgulla",
    "aliases": [
      "rasgulla",
      "roshogolla"
    ],
    "standardPortion": "1 piece with syrup",
    "portionGrams": 40,
    "kcal": 90,
    "protein": 2,
    "carbs": 18,
    "fat": 1,
    "category": "Sweets",
    "confidence": "medium",
    "sourceNote": "Lower fat than gulab jamun since chhena is boiled not fried, but still sugar-syrup heavy"
  },
  {
    "name": "Jalebi",
    "aliases": [
      "jalebi"
    ],
    "standardPortion": "1 medium spiral piece",
    "portionGrams": 25,
    "kcal": 100,
    "protein": 0.7,
    "carbs": 17,
    "fat": 3.5,
    "category": "Sweets",
    "confidence": "low",
    "sourceNote": "Piece weight varies widely (15g thin spiral to 30g+ thick halwai piece); nearly pure sugar syrup + refined flour, minimal protein"
  },
  {
    "name": "Besan laddoo",
    "aliases": [
      "besan ladoo"
    ],
    "standardPortion": "1 piece",
    "portionGrams": 33,
    "kcal": 160,
    "protein": 3,
    "carbs": 17,
    "fat": 9,
    "category": "Sweets",
    "confidence": "medium",
    "sourceNote": "Ghee-heavy; homemade recipes with more ghee/nuts can run notably higher"
  },
  {
    "name": "Motichoor laddoo",
    "aliases": [
      "motichoor ladoo",
      "boondi laddoo"
    ],
    "standardPortion": "1 piece",
    "portionGrams": 30,
    "kcal": 140,
    "protein": 2,
    "carbs": 18,
    "fat": 7,
    "category": "Sweets",
    "confidence": "medium",
    "sourceNote": "Deep-fried boondi held together with sugar syrup; mithai-shop pieces can be larger/denser"
  },
  {
    "name": "Barfi (plain khoya/milk)",
    "aliases": [
      "mawa barfi",
      "milk barfi"
    ],
    "standardPortion": "1 piece",
    "portionGrams": 28,
    "kcal": 130,
    "protein": 3,
    "carbs": 15,
    "fat": 7,
    "category": "Sweets",
    "confidence": "medium",
    "sourceNote": "Flavored/nut varieties (kaju barfi, anjeer barfi) shift macros -- kaju barfi in particular is more carb-dense from sugar+cashew paste"
  },
  {
    "name": "Halwa, gajar (carrot halwa)",
    "aliases": [
      "gajar ka halwa"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 100,
    "kcal": 220,
    "protein": 4,
    "carbs": 25,
    "fat": 12,
    "category": "Sweets",
    "confidence": "medium",
    "sourceNote": "Made with ghee, khoya/milk reduction and sugar; home recipes vary in ghee quantity"
  },
  {
    "name": "Halwa, sooji (semolina/rava halwa)",
    "aliases": [
      "sooji halwa",
      "rava halwa",
      "kesari"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 100,
    "kcal": 260,
    "protein": 3,
    "carbs": 35,
    "fat": 12,
    "category": "Sweets",
    "confidence": "medium",
    "sourceNote": "Sugar syrup + ghee-roasted semolina; ghee quantity is the main variable"
  },
  {
    "name": "Kheer (rice pudding)",
    "aliases": [
      "rice kheer",
      "chawal ki kheer"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 150,
    "kcal": 200,
    "protein": 5,
    "carbs": 30,
    "fat": 7,
    "category": "Sweets",
    "confidence": "medium",
    "sourceNote": "Milk reduced with rice and sugar; full-fat milk and sugar levels vary by household"
  },
  {
    "name": "Ice cream, vanilla (standard)",
    "aliases": [
      "ice cream scoop"
    ],
    "standardPortion": "1 scoop",
    "portionGrams": 60,
    "kcal": 110,
    "protein": 2,
    "carbs": 14,
    "fat": 5,
    "category": "Sweets",
    "confidence": "medium",
    "sourceNote": "Standard commercial vanilla (Amul/Kwality Wall's); premium/gourmet ice creams run notably higher fat and calories"
  },
  {
    "name": "Chocolate bar (milk chocolate, e.g. Dairy Milk)",
    "aliases": [
      "dairy milk",
      "milk chocolate bar"
    ],
    "standardPortion": "1 standard bar",
    "portionGrams": 45,
    "kcal": 240,
    "protein": 3,
    "carbs": 27,
    "fat": 13,
    "category": "Sweets",
    "confidence": "high",
    "sourceNote": "Cadbury Dairy Milk 45-50g bar label"
  },
  {
    "name": "Biscuits, Parle-G (glucose)",
    "aliases": [
      "parle g",
      "glucose biscuit"
    ],
    "standardPortion": "2 biscuits",
    "portionGrams": 10,
    "kcal": 48,
    "protein": 0.8,
    "carbs": 8,
    "fat": 1.5,
    "category": "Sweets",
    "confidence": "high",
    "sourceNote": "Parle-G nutrition label, ~467kcal/100g"
  },
  {
    "name": "Biscuits, Marie",
    "aliases": [
      "marie gold",
      "britannia marie"
    ],
    "standardPortion": "2 biscuits",
    "portionGrams": 12,
    "kcal": 54,
    "protein": 1,
    "carbs": 9,
    "fat": 1.7,
    "category": "Sweets",
    "confidence": "high",
    "sourceNote": "Britannia Marie Gold nutrition label"
  },
  {
    "name": "Biscuits, cream-filled (e.g. Bourbon/Oreo type)",
    "aliases": [
      "cream biscuit",
      "bourbon biscuit",
      "oreo"
    ],
    "standardPortion": "2 biscuits",
    "portionGrams": 25,
    "kcal": 120,
    "protein": 1.5,
    "carbs": 18,
    "fat": 5,
    "category": "Sweets",
    "confidence": "high",
    "sourceNote": "Britannia Bourbon/Oreo India label average"
  },
  {
    "name": "Water",
    "aliases": [
      "plain water",
      "paani"
    ],
    "standardPortion": "1 glass",
    "portionGrams": 250,
    "kcal": 0,
    "protein": 0,
    "carbs": 0,
    "fat": 0,
    "category": "Beverages",
    "confidence": "high",
    "sourceNote": "No calories"
  },
  {
    "name": "Green tea (plain, no sugar)",
    "aliases": [
      "green tea unsweetened"
    ],
    "standardPortion": "1 cup",
    "portionGrams": 200,
    "kcal": 2,
    "protein": 0,
    "carbs": 0.5,
    "fat": 0,
    "category": "Beverages",
    "confidence": "high",
    "sourceNote": "Negligible calories when unsweetened; add ~16kcal per tsp sugar if sweetened"
  },
  {
    "name": "Black coffee (no sugar)",
    "aliases": [
      "kaali coffee",
      "filter coffee black"
    ],
    "standardPortion": "1 cup",
    "portionGrams": 150,
    "kcal": 2,
    "protein": 0.3,
    "carbs": 0,
    "fat": 0,
    "category": "Beverages",
    "confidence": "high",
    "sourceNote": "Negligible calories; instant/filter coffee both similar when black"
  },
  {
    "name": "Soft drink (cola, e.g. Coca-Cola/Pepsi)",
    "aliases": [
      "cola",
      "coke",
      "pepsi",
      "soda"
    ],
    "standardPortion": "1 can",
    "portionGrams": 300,
    "kcal": 130,
    "protein": 0,
    "carbs": 33,
    "fat": 0,
    "category": "Beverages",
    "confidence": "high",
    "sourceNote": "Coca-Cola India label, ~42kcal/100ml, standard 300ml can/bottle"
  },
  {
    "name": "Packaged fruit juice (e.g. Real/Tropicana)",
    "aliases": [
      "fruit juice tetrapak",
      "real juice",
      "tropicana"
    ],
    "standardPortion": "1 glass",
    "portionGrams": 200,
    "kcal": 100,
    "protein": 0.5,
    "carbs": 24,
    "fat": 0,
    "category": "Beverages",
    "confidence": "high",
    "sourceNote": "Dabur Real/Tropicana mixed fruit label average, ~48-50kcal/100ml; mostly added/concentrated sugar, minimal fiber unlike whole fruit"
  },
  {
    "name": "Fresh lime soda (sweet)",
    "aliases": [
      "nimbu soda sweet",
      "shikanji"
    ],
    "standardPortion": "1 glass",
    "portionGrams": 250,
    "kcal": 100,
    "protein": 0,
    "carbs": 25,
    "fat": 0,
    "category": "Beverages",
    "confidence": "low",
    "sourceNote": "Sugar quantity fully vendor-dependent (2-4 tsp typical); salted version without sugar is near 0kcal"
  },
  {
    "name": "Energy drink (e.g. Red Bull)",
    "aliases": [
      "red bull",
      "energy drink"
    ],
    "standardPortion": "1 can",
    "portionGrams": 250,
    "kcal": 110,
    "protein": 0,
    "carbs": 28,
    "fat": 0,
    "category": "Beverages",
    "confidence": "high",
    "sourceNote": "Red Bull India 250ml can label"
  },
  {
    "name": "Beer (regular, ~5% ABV)",
    "aliases": [
      "beer",
      "kingfisher beer"
    ],
    "standardPortion": "1 can/bottle",
    "portionGrams": 500,
    "kcal": 200,
    "protein": 2,
    "carbs": 17,
    "fat": 0,
    "category": "Beverages",
    "confidence": "medium",
    "sourceNote": "Standard 500ml strong/regular Indian beer at ~5% ABV; strong beers (8%) run notably higher, near 320-350kcal"
  },
  {
    "name": "Whisky/spirits, neat, small peg (30ml, 40% ABV)",
    "aliases": [
      "whisky peg",
      "rum peg",
      "vodka shot"
    ],
    "standardPortion": "1 small/regular peg (30ml)",
    "portionGrams": 30,
    "kcal": 65,
    "protein": 0,
    "carbs": 0,
    "fat": 0,
    "category": "Beverages",
    "confidence": "high",
    "sourceNote": "Pure ethanol calories (~7kcal/g alcohol); mixers (soda/cola/juice) add separately"
  },
  {
    "name": "Banana",
    "aliases": [
      "kela"
    ],
    "standardPortion": "1 medium",
    "portionGrams": 120,
    "kcal": 105,
    "protein": 1.3,
    "carbs": 27,
    "fat": 0.4,
    "category": "Fruits",
    "confidence": "high",
    "sourceNote": "USDA raw banana, medium size"
  },
  {
    "name": "Apple",
    "aliases": [
      "seb"
    ],
    "standardPortion": "1 medium",
    "portionGrams": 180,
    "kcal": 95,
    "protein": 0.5,
    "carbs": 25,
    "fat": 0.3,
    "category": "Fruits",
    "confidence": "high",
    "sourceNote": "USDA raw apple with skin, medium size"
  },
  {
    "name": "Orange",
    "aliases": [
      "santra",
      "malta"
    ],
    "standardPortion": "1 medium",
    "portionGrams": 130,
    "kcal": 62,
    "protein": 1.2,
    "carbs": 15,
    "fat": 0.2,
    "category": "Fruits",
    "confidence": "high",
    "sourceNote": "USDA raw orange, medium size"
  },
  {
    "name": "Mango",
    "aliases": [
      "aam"
    ],
    "standardPortion": "1 medium (pulp only)",
    "portionGrams": 200,
    "kcal": 120,
    "protein": 1.4,
    "carbs": 30,
    "fat": 0.6,
    "category": "Fruits",
    "confidence": "high",
    "sourceNote": "USDA raw mango pulp; sweeter Indian varieties (Alphonso) may run slightly higher sugar"
  },
  {
    "name": "Papaya",
    "aliases": [
      "papita"
    ],
    "standardPortion": "1 katori chopped",
    "portionGrams": 150,
    "kcal": 60,
    "protein": 0.9,
    "carbs": 15,
    "fat": 0.2,
    "category": "Fruits",
    "confidence": "high",
    "sourceNote": "USDA raw papaya"
  },
  {
    "name": "Watermelon",
    "aliases": [
      "tarbooz"
    ],
    "standardPortion": "1 katori chopped",
    "portionGrams": 150,
    "kcal": 45,
    "protein": 0.9,
    "carbs": 11,
    "fat": 0.2,
    "category": "Fruits",
    "confidence": "high",
    "sourceNote": "USDA raw watermelon"
  },
  {
    "name": "Guava",
    "aliases": [
      "amrud",
      "peru"
    ],
    "standardPortion": "1 medium",
    "portionGrams": 100,
    "kcal": 68,
    "protein": 2.6,
    "carbs": 14,
    "fat": 1,
    "category": "Fruits",
    "confidence": "high",
    "sourceNote": "USDA raw guava"
  },
  {
    "name": "Grapes",
    "aliases": [
      "angoor"
    ],
    "standardPortion": "1 katori",
    "portionGrams": 100,
    "kcal": 67,
    "protein": 0.6,
    "carbs": 17,
    "fat": 0.3,
    "category": "Fruits",
    "confidence": "high",
    "sourceNote": "USDA raw grapes"
  }
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
