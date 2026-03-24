import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { PLANTS } from "../data/plants";
import type { PlantData } from "../data/plants";

interface Props {
  onBack: () => void;
  onSelect: (plant: PlantData) => void;
}

export default function PlantGuidePage({ onBack, onSelect }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-4 flex items-center gap-3 shadow-xs">
        <Button
          data-ocid="plant-guide.back.button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">📖 Plant Guide</h1>
          <p className="text-xs text-muted-foreground">
            Complete care information
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 space-y-3">
        {PLANTS.map((plant, i) => (
          <motion.button
            key={plant.id}
            data-ocid={`plant-guide.item.${i + 1}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => onSelect(plant)}
            className="w-full bg-card rounded-2xl p-4 shadow-card border border-border text-left active:scale-[0.98] transition-transform hover:shadow-card-hover"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: "oklch(0.90 0.04 145)" }}
              >
                {plant.emoji}
              </div>
              <div>
                <p className="font-bold text-foreground text-base">
                  {plant.name}
                </p>
                <p className="text-xs text-muted-foreground">{plant.notes}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div
                className="rounded-xl p-2 text-center"
                style={{ backgroundColor: "oklch(0.90 0.04 145)" }}
              >
                <p className="text-xs text-muted-foreground">Germination</p>
                <p className="font-bold text-foreground text-xs">
                  {plant.germination}
                </p>
              </div>
              <div
                className="rounded-xl p-2 text-center"
                style={{ backgroundColor: "oklch(0.90 0.04 145)" }}
              >
                <p className="text-xs text-muted-foreground">Sunlight</p>
                <p className="font-bold text-foreground text-xs">
                  {plant.sunlight}
                </p>
              </div>
              <div
                className="rounded-xl p-2 text-center"
                style={{ backgroundColor: "oklch(0.90 0.04 145)" }}
              >
                <p className="text-xs text-muted-foreground">Harvest</p>
                <p className="font-bold text-foreground text-xs">
                  {plant.harvest}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </main>
    </div>
  );
}
