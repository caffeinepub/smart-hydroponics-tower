export interface PlantData {
  id: string;
  name: string;
  emoji: string;
  seeds: string;
  germination: string;
  germinationDays: number;
  sunlight: string;
  transplant: string;
  transplantDays: number;
  tds: string;
  tdsMin: number;
  tdsMax: number;
  turbiditySafe: string;
  turbidityHarsh: string;
  temp: string;
  harvest: string;
  harvestMin: number;
  harvestMax: number;
  notes: string;
}

export const PLANTS: PlantData[] = [
  {
    id: "lettuce-romaine",
    name: "Lettuce (Romaine)",
    emoji: "🥬",
    seeds: "Local nursery / Amazon / Ugaoo India",
    germination: "3–5 days",
    germinationDays: 4,
    sunlight: "4–6 hrs/day",
    transplant: "10–12 days after germination",
    transplantDays: 11,
    tds: "560–840 ppm",
    tdsMin: 560,
    tdsMax: 840,
    turbiditySafe: "Clear to light cloudy",
    turbidityHarsh: "Muddy / dirty",
    temp: "18–24°C",
    harvest: "30–40 days",
    harvestMin: 30,
    harvestMax: 40,
    notes: "Great beginner plant. Grows fast in towers. Prefers cool weather.",
  },
  {
    id: "lettuce-butterhead",
    name: "Lettuce (Butterhead)",
    emoji: "🥗",
    seeds: "Local nursery / Amazon / Ugaoo India",
    germination: "3–5 days",
    germinationDays: 4,
    sunlight: "4–6 hrs/day",
    transplant: "10 days after germination",
    transplantDays: 10,
    tds: "600–800 ppm",
    tdsMin: 600,
    tdsMax: 800,
    turbiditySafe: "Clear",
    turbidityHarsh: "Dirty water",
    temp: "18–24°C",
    harvest: "30–35 days",
    harvestMin: 30,
    harvestMax: 35,
    notes: "Soft buttery leaves. Good for salads. Ideal for towers.",
  },
  {
    id: "basil",
    name: "Basil",
    emoji: "🌿",
    seeds: "Local nursery / Amazon / Ugaoo India",
    germination: "5–7 days",
    germinationDays: 6,
    sunlight: "6 hrs/day",
    transplant: "12–14 days after germination",
    transplantDays: 13,
    tds: "700–1120 ppm",
    tdsMin: 700,
    tdsMax: 1120,
    turbiditySafe: "Clear",
    turbidityHarsh: "Cloudy",
    temp: "20–30°C",
    harvest: "35–45 days",
    harvestMin: 35,
    harvestMax: 45,
    notes: "Aromatic herb. Needs full sun. Works well in vertical towers.",
  },
  {
    id: "coriander",
    name: "Coriander (Cilantro)",
    emoji: "🌱",
    seeds: "Local market / Ugaoo / Nursery",
    germination: "5–7 days",
    germinationDays: 6,
    sunlight: "4–5 hrs/day",
    transplant: "12 days after germination",
    transplantDays: 12,
    tds: "800–1200 ppm",
    tdsMin: 800,
    tdsMax: 1200,
    turbiditySafe: "Clear",
    turbidityHarsh: "Dirty",
    temp: "18–25°C",
    harvest: "30–40 days",
    harvestMin: 30,
    harvestMax: 40,
    notes: "Popular Indian herb. Monitor pH closely. Avoid overwatering.",
  },
  {
    id: "spinach",
    name: "Spinach",
    emoji: "🍃",
    seeds: "Local nursery / Amazon / BigHaat",
    germination: "4–6 days",
    germinationDays: 5,
    sunlight: "4 hrs/day",
    transplant: "10 days after germination",
    transplantDays: 10,
    tds: "1000–1400 ppm",
    tdsMin: 1000,
    tdsMax: 1400,
    turbiditySafe: "Clear",
    turbidityHarsh: "Cloudy",
    temp: "16–22°C",
    harvest: "35–45 days",
    harvestMin: 35,
    harvestMax: 45,
    notes: "Cool weather crop. Very nutritious. Good for student projects.",
  },
  {
    id: "kale",
    name: "Kale",
    emoji: "🥦",
    seeds: "Amazon / Ugaoo / BigHaat India",
    germination: "4–6 days",
    germinationDays: 5,
    sunlight: "5 hrs/day",
    transplant: "12 days after germination",
    transplantDays: 12,
    tds: "900–1200 ppm",
    tdsMin: 900,
    tdsMax: 1200,
    turbiditySafe: "Clear",
    turbidityHarsh: "Dirty",
    temp: "18–25°C",
    harvest: "45–55 days",
    harvestMin: 45,
    harvestMax: 55,
    notes: "Hardy and nutritious. Slower grower. Ideal for long-term towers.",
  },
  {
    id: "mint",
    name: "Mint",
    emoji: "🌾",
    seeds: "Local nursery / propagate from cuttings",
    germination: "5–8 days",
    germinationDays: 6,
    sunlight: "4–6 hrs/day",
    transplant: "14 days after germination",
    transplantDays: 14,
    tds: "1000–1400 ppm",
    tdsMin: 1000,
    tdsMax: 1400,
    turbiditySafe: "Clear",
    turbidityHarsh: "Cloudy",
    temp: "18–28°C",
    harvest: "40–50 days",
    harvestMin: 40,
    harvestMax: 50,
    notes: "Fast spreading. Very aromatic. Great for beginners.",
  },
];

export function getPlantById(id: string): PlantData | undefined {
  return PLANTS.find((p) => p.id === id);
}

export function getPlantByName(name: string): PlantData | undefined {
  return PLANTS.find((p) => p.name === name);
}
