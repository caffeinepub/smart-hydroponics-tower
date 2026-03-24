import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { PLANTS } from "../data/plants";
import type { PlantData } from "../data/plants";
import { useSetPlantName, useSetStartDate } from "../hooks/useQueries";

interface Props {
  onBack: () => void;
  onSelect: (plant: PlantData) => void;
}

export default function ChoosePlantPage({ onBack, onSelect }: Props) {
  const setPlantName = useSetPlantName();
  const setStartDate = useSetStartDate();

  const handleSelect = async (plant: PlantData) => {
    try {
      await Promise.all([
        setPlantName.mutateAsync(plant.name),
        setStartDate.mutateAsync(BigInt(Date.now()) * BigInt(1_000_000)),
      ]);
      toast.success(`${plant.name} selected!`);
      onSelect(plant);
    } catch {
      toast.error("Failed to save plant selection.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-4 flex items-center gap-3 shadow-xs">
        <Button
          data-ocid="choose-plant.back.button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">🌱 Choose Plant</h1>
          <p className="text-xs text-muted-foreground">
            Select a crop for your tower
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 space-y-3">
        {PLANTS.map((plant, i) => (
          <motion.button
            key={plant.id}
            data-ocid={`choose-plant.item.${i + 1}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => handleSelect(plant)}
            className="w-full bg-card rounded-2xl p-4 shadow-card border border-border flex items-center gap-4 text-left active:scale-[0.98] transition-transform hover:shadow-card-hover"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: "oklch(0.90 0.04 145)" }}
            >
              {plant.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground text-base">
                {plant.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Harvest: {plant.harvest} · TDS: {plant.tds}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                🌡 {plant.temp} · ☀️ {plant.sunlight}
              </p>
            </div>
            <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180 flex-shrink-0" />
          </motion.button>
        ))}
      </main>
    </div>
  );
}
