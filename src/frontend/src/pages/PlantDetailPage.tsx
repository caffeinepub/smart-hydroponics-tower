import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import type { PlantData } from "../data/plants";

interface Props {
  plant: PlantData;
  onBack: () => void;
}

function InfoRow({
  label,
  value,
  icon,
}: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <span className="text-xl w-7 flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function PlantDetailPage({ plant, onBack }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-4 flex items-center gap-3 shadow-xs">
        <Button
          data-ocid="plant-detail.back.button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{plant.emoji}</span>
          <h1 className="text-lg font-bold text-foreground">{plant.name}</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 space-y-4">
        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-5 shadow-card"
          style={{ backgroundColor: "oklch(0.42 0.12 145)" }}
        >
          <div className="flex items-center gap-4">
            <span className="text-5xl">{plant.emoji}</span>
            <div>
              <h2 className="text-xl font-extrabold text-white">
                {plant.name}
              </h2>
              <p className="text-white/80 text-sm mt-1">{plant.notes}</p>
            </div>
          </div>
        </motion.div>

        {/* Details card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-card border border-border"
        >
          <h3 className="font-bold text-foreground text-base py-3 border-b border-border mb-1">
            🌿 Growing Information
          </h3>
          <InfoRow icon="🌾" label="Seed Source (India)" value={plant.seeds} />
          <InfoRow
            icon="🌱"
            label="Germination Period"
            value={plant.germination}
          />
          <InfoRow icon="☀️" label="Sunlight Required" value={plant.sunlight} />
          <InfoRow
            icon="🔄"
            label="When to Transplant"
            value={plant.transplant}
          />
          <InfoRow icon="🌡️" label="Ideal Temperature" value={plant.temp} />
          <InfoRow icon="🥬" label="Days to Harvest" value={plant.harvest} />
        </motion.div>

        {/* Water & Nutrients card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-card border border-border"
        >
          <h3 className="font-bold text-foreground text-base py-3 border-b border-border mb-1">
            💧 Water & Nutrients
          </h3>
          <InfoRow icon="⚗️" label="Ideal TDS Range" value={plant.tds} />
          <InfoRow
            icon="✅"
            label="Turbidity Safe Level"
            value={plant.turbiditySafe}
          />
          <InfoRow
            icon="⚠️"
            label="Turbidity Warning"
            value={plant.turbidityHarsh}
          />
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-card rounded-2xl p-3 text-center shadow-card border border-border">
            <p
              className="text-2xl font-extrabold"
              style={{ color: "oklch(0.42 0.12 145)" }}
            >
              {plant.germinationDays}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Germination Days
            </p>
          </div>
          <div className="bg-card rounded-2xl p-3 text-center shadow-card border border-border">
            <p
              className="text-2xl font-extrabold"
              style={{ color: "oklch(0.42 0.12 145)" }}
            >
              {plant.harvestMax}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max Harvest Days
            </p>
          </div>
          <div className="bg-card rounded-2xl p-3 text-center shadow-card border border-border">
            <p
              className="text-2xl font-extrabold"
              style={{ color: "oklch(0.42 0.12 145)" }}
            >
              {plant.tdsMin}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Min TDS (ppm)</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
