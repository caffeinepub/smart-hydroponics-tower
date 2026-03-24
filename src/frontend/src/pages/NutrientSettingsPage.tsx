import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { getPlantByName } from "../data/plants";
import {
  useGetPlantName,
  useGetSystemStatus,
  useSetTDS,
  useSetWaterClarity,
} from "../hooks/useQueries";

interface Props {
  onBack: () => void;
}

export default function NutrientSettingsPage({ onBack }: Props) {
  const { data: status } = useGetSystemStatus();
  const { data: plantName } = useGetPlantName();
  const setTDS = useSetTDS();
  const setWaterClarity = useSetWaterClarity();

  const plant = plantName ? getPlantByName(plantName) : null;
  const currentTDS = status ? Number(status.tds) : 0;
  const waterClarity = status?.waterClarity ?? "clear";

  const [tdsInput, setTdsInput] = useState("");

  const tdsStatus = () => {
    if (!plant || currentTDS === 0) return "unknown";
    if (currentTDS < plant.tdsMin) return "low";
    if (currentTDS > plant.tdsMax) return "high";
    return "ok";
  };

  const tdsColor = () => {
    const s = tdsStatus();
    if (s === "ok") return "oklch(0.42 0.12 145)";
    if (s === "low") return "oklch(0.72 0.18 75)";
    if (s === "high") return "oklch(0.577 0.245 27.325)";
    return "oklch(0.50 0.01 145)";
  };

  const handleUpdateTDS = async () => {
    const val = Number.parseInt(tdsInput);
    if (Number.isNaN(val) || val < 0) {
      toast.error("Enter a valid TDS value");
      return;
    }
    try {
      await setTDS.mutateAsync(BigInt(val));
      setTdsInput("");
      toast.success("TDS updated!");
    } catch {
      toast.error("Failed to update TDS");
    }
  };

  const handleToggleClarity = async () => {
    const newClarity = waterClarity === "clear" ? "dirty" : "clear";
    try {
      await setWaterClarity.mutateAsync(newClarity);
      toast.success(`Water marked as ${newClarity}`);
    } catch {
      toast.error("Failed to update water clarity");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-4 flex items-center gap-3 shadow-xs">
        <Button
          data-ocid="nutrient-settings.back.button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">
            💧 Nutrient Settings
          </h1>
          <p className="text-xs text-muted-foreground">
            Monitor TDS & water quality
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 space-y-4">
        {/* Current TDS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-2xl p-5 shadow-card border border-border"
        >
          <h3 className="font-bold text-foreground mb-4">
            ⚗️ Current TDS Level
          </h3>
          <div className="text-center py-4">
            <p
              className="text-6xl font-extrabold"
              style={{ color: tdsColor() }}
            >
              {currentTDS}
            </p>
            <p className="text-muted-foreground mt-1">ppm</p>
          </div>

          {/* Status badge */}
          <div
            data-ocid="nutrient-settings.loading_state"
            className="rounded-xl p-3 text-center mt-2"
            style={{
              backgroundColor:
                tdsStatus() === "ok"
                  ? "oklch(0.90 0.04 145)"
                  : tdsStatus() === "low"
                    ? "oklch(0.95 0.06 75)"
                    : tdsStatus() === "high"
                      ? "oklch(0.95 0.06 27)"
                      : "oklch(0.94 0.02 145)",
            }}
          >
            <p className="font-semibold text-sm" style={{ color: tdsColor() }}>
              {tdsStatus() === "ok" && "✅ TDS is in safe range"}
              {tdsStatus() === "low" && "⚠️ TDS too low — add nutrients"}
              {tdsStatus() === "high" && "🚨 TDS too high — dilute solution"}
              {tdsStatus() === "unknown" &&
                "📊 No plant selected for reference"}
            </p>
            {plant && (
              <p className="text-xs text-muted-foreground mt-1">
                Safe range for {plant.name}: {plant.tds}
              </p>
            )}
          </div>
        </motion.div>

        {/* Update TDS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-2xl p-5 shadow-card border border-border"
        >
          <h3 className="font-bold text-foreground mb-4">✏️ Update TDS Value</h3>
          <Label htmlFor="tds-input" className="text-sm text-muted-foreground">
            Enter TDS (ppm)
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="tds-input"
              data-ocid="nutrient-settings.input"
              type="number"
              placeholder="e.g. 700"
              value={tdsInput}
              onChange={(e) => setTdsInput(e.target.value)}
              className="flex-1 rounded-xl h-11"
            />
            <Button
              data-ocid="nutrient-settings.save_button"
              onClick={handleUpdateTDS}
              disabled={setTDS.isPending}
              className="rounded-xl h-11 px-5 font-semibold"
              style={{
                backgroundColor: "oklch(0.42 0.12 145)",
                color: "white",
              }}
            >
              {setTDS.isPending ? "..." : "Set"}
            </Button>
          </div>
        </motion.div>

        {/* Turbidity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-card border border-border"
        >
          <h3 className="font-bold text-foreground mb-4">🔍 Water Turbidity</h3>
          <div
            className="rounded-xl p-4 flex items-center justify-between"
            style={{
              backgroundColor:
                waterClarity === "clear"
                  ? "oklch(0.90 0.04 145)"
                  : "oklch(0.95 0.06 27)",
            }}
          >
            <div>
              <p
                className="font-bold"
                style={{
                  color:
                    waterClarity === "clear"
                      ? "oklch(0.42 0.12 145)"
                      : "oklch(0.577 0.245 27.325)",
                }}
              >
                {waterClarity === "clear" ? "✅ Water Clear" : "🚨 Water Dirty"}
              </p>
              {plant && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Safe: {plant.turbiditySafe} · Warning: {plant.turbidityHarsh}
                </p>
              )}
            </div>
            <Button
              data-ocid="nutrient-settings.toggle"
              size="sm"
              onClick={handleToggleClarity}
              disabled={setWaterClarity.isPending}
              className="rounded-xl font-semibold"
              style={{
                backgroundColor:
                  waterClarity === "clear"
                    ? "oklch(0.42 0.12 145)"
                    : "oklch(0.577 0.245 27.325)",
                color: "white",
              }}
            >
              Mark {waterClarity === "clear" ? "Dirty" : "Clear"}
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
