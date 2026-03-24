import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { getPlantByName } from "../data/plants";
import { useGetPlantName, useGetStartDate } from "../hooks/useQueries";

interface Props {
  onBack: () => void;
}

export default function GrowthTrackerPage({ onBack }: Props) {
  const { data: plantName } = useGetPlantName();
  const { data: startDateRaw } = useGetStartDate();

  const plant = plantName ? getPlantByName(plantName) : null;

  // startDate is in nanoseconds (Motoko Time)
  const startDateMs = startDateRaw ? Number(startDateRaw) / 1_000_000 : null;
  const now = Date.now();
  const dayCount = startDateMs
    ? Math.floor((now - startDateMs) / (1000 * 60 * 60 * 24))
    : 0;
  const harvestMax = plant?.harvestMax ?? 40;
  const daysRemaining = Math.max(0, harvestMax - dayCount);
  const progress = Math.min(100, (dayCount / harvestMax) * 100);

  const startDateDisplay = startDateMs
    ? new Date(startDateMs).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not set";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-4 flex items-center gap-3 shadow-xs">
        <Button
          data-ocid="growth-tracker.back.button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">
            📈 Growth Tracker
          </h1>
          <p className="text-xs text-muted-foreground">
            Monitor your plant's progress
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 space-y-4">
        {!plant ? (
          <motion.div
            data-ocid="growth-tracker.empty_state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl p-8 text-center shadow-card border border-border"
          >
            <span className="text-5xl block mb-4">🌱</span>
            <p className="font-bold text-foreground text-lg mb-2">
              No Plant Selected
            </p>
            <p className="text-muted-foreground text-sm">
              Go to Choose Plant to get started
            </p>
          </motion.div>
        ) : (
          <>
            {/* Plant info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-5 shadow-card"
              style={{ backgroundColor: "oklch(0.42 0.12 145)" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{plant.emoji}</span>
                <div>
                  <p className="text-white/80 text-sm">Currently Growing</p>
                  <h2 className="text-xl font-extrabold text-white">
                    {plant.name}
                  </h2>
                  <p className="text-white/70 text-xs mt-0.5">
                    Started: {startDateDisplay}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Day stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="bg-card rounded-2xl p-4 text-center shadow-card border border-border">
                <p
                  className="text-4xl font-extrabold"
                  style={{ color: "oklch(0.42 0.12 145)" }}
                >
                  {dayCount}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Days Growing
                </p>
              </div>
              <div className="bg-card rounded-2xl p-4 text-center shadow-card border border-border">
                <p
                  className="text-4xl font-extrabold"
                  style={{
                    color:
                      daysRemaining === 0
                        ? "oklch(0.577 0.245 27.325)"
                        : "oklch(0.42 0.12 145)",
                  }}
                >
                  {daysRemaining}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Days Remaining
                </p>
              </div>
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-card rounded-2xl p-5 shadow-card border border-border"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-foreground">Growth Progress</h3>
                <span
                  className="text-sm font-bold"
                  style={{ color: "oklch(0.42 0.12 145)" }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress
                data-ocid="growth-tracker.loading_state"
                value={progress}
                className="h-4 rounded-full"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">Day 0</span>
                <span className="text-xs text-muted-foreground">
                  Day {harvestMax}
                </span>
              </div>

              {daysRemaining === 0 && (
                <div
                  className="mt-4 rounded-xl p-3 text-center"
                  style={{ backgroundColor: "oklch(0.90 0.04 145)" }}
                >
                  <p
                    className="font-bold"
                    style={{ color: "oklch(0.42 0.12 145)" }}
                  >
                    🎉 Ready to Harvest!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-card rounded-2xl p-4 shadow-card border border-border space-y-2"
            >
              <h3 className="font-bold text-foreground mb-2">
                📋 Plant Summary
              </h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Germination</span>
                <span className="font-semibold text-foreground">
                  {plant.germination}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Total Harvest Window
                </span>
                <span className="font-semibold text-foreground">
                  {plant.harvest}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">TDS Range</span>
                <span className="font-semibold text-foreground">
                  {plant.tds}
                </span>
              </div>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
