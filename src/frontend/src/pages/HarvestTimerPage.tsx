import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { getPlantByName } from "../data/plants";
import { useGetPlantName, useGetStartDate } from "../hooks/useQueries";

interface Props {
  onBack: () => void;
}

export default function HarvestTimerPage({ onBack }: Props) {
  const { data: plantName } = useGetPlantName();
  const { data: startDateRaw } = useGetStartDate();

  const plant = plantName ? getPlantByName(plantName) : null;

  const startDateMs = startDateRaw ? Number(startDateRaw) / 1_000_000 : null;
  const harvestMax = plant?.harvestMax ?? 40;
  const harvestDateMs = startDateMs
    ? startDateMs + harvestMax * 24 * 60 * 60 * 1000
    : null;
  const now = Date.now();
  const daysRemaining = harvestDateMs
    ? Math.ceil((harvestDateMs - now) / (1000 * 60 * 60 * 24))
    : null;
  const isReady = daysRemaining !== null && daysRemaining <= 0;

  const startDateDisplay = startDateMs
    ? new Date(startDateMs).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not set";

  const harvestDateDisplay = harvestDateMs
    ? new Date(harvestDateMs).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-4 flex items-center gap-3 shadow-xs">
        <Button
          data-ocid="harvest-timer.back.button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">⏱ Harvest Timer</h1>
          <p className="text-xs text-muted-foreground">
            Countdown to harvest day
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 space-y-4">
        {!plant ? (
          <motion.div
            data-ocid="harvest-timer.empty_state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl p-8 text-center shadow-card border border-border"
          >
            <span className="text-5xl block mb-4">⏱</span>
            <p className="font-bold text-foreground text-lg mb-2">
              No Plant Selected
            </p>
            <p className="text-muted-foreground text-sm">
              Go to Choose Plant to start your timer
            </p>
          </motion.div>
        ) : (
          <>
            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-6 text-center shadow-card"
              style={{
                backgroundColor: isReady
                  ? "oklch(0.42 0.12 145)"
                  : "oklch(0.42 0.12 145)",
              }}
            >
              {isReady ? (
                <>
                  <span className="text-6xl block mb-3">🎉</span>
                  <h2 className="text-2xl font-extrabold text-white">
                    Ready to Harvest!
                  </h2>
                  <p className="text-white/80 mt-2">
                    {plant.name} is ready for harvest 🌿
                  </p>
                </>
              ) : (
                <>
                  <p className="text-white/80 text-sm mb-2">
                    Days until harvest
                  </p>
                  <p className="text-7xl font-extrabold text-white">
                    {daysRemaining ?? "—"}
                  </p>
                  <p className="text-white/80 mt-2 text-sm">days remaining</p>
                  <div className="mt-4 rounded-xl bg-white/20 p-3">
                    <p className="text-white font-semibold text-base">
                      {plant.emoji} {plant.name}
                    </p>
                  </div>
                </>
              )}
            </motion.div>

            {/* Dates */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-card rounded-2xl p-5 shadow-card border border-border space-y-4"
            >
              <h3 className="font-bold text-foreground">📅 Timeline</h3>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.90 0.04 145)" }}
                >
                  🌱
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Planting Date</p>
                  <p className="font-semibold text-foreground">
                    {startDateDisplay}
                  </p>
                </div>
              </div>
              <div
                className="w-0.5 h-4 ml-5 rounded"
                style={{ backgroundColor: "oklch(0.42 0.12 145)" }}
              />
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.90 0.04 145)" }}
                >
                  🥬
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Harvest Date</p>
                  <p className="font-semibold text-foreground">
                    {harvestDateDisplay}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-card rounded-2xl p-4 shadow-card border border-border"
            >
              <p className="text-xs text-muted-foreground text-center">
                Based on {plant.harvest} harvest window for {plant.name}
              </p>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
