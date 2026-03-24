import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  useGetSystemStatus,
  useSetPumpState,
  useSetTemperature,
} from "../hooks/useQueries";

interface Props {
  onBack: () => void;
}

export default function SystemStatusPage({ onBack }: Props) {
  const { data: status, isLoading } = useGetSystemStatus();
  const setPumpState = useSetPumpState();
  const setTemperature = useSetTemperature();

  const pumpOn = status?.pumpState ?? false;
  const waterClarity = status?.waterClarity ?? "clear";
  const tds = status ? Number(status.tds) : 0;
  const temperature = status ? Number(status.temperature) : 25;

  const handlePumpToggle = async (checked: boolean) => {
    try {
      await setPumpState.mutateAsync(checked);
      toast.success(`Pump turned ${checked ? "ON" : "OFF"}`);
    } catch {
      toast.error("Failed to update pump state");
    }
  };

  const handleTempChange = async (delta: number) => {
    const newTemp = temperature + delta;
    if (newTemp < 0 || newTemp > 50) return;
    try {
      await setTemperature.mutateAsync(BigInt(newTemp));
    } catch {
      toast.error("Failed to update temperature");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-4 flex items-center gap-3 shadow-xs">
        <Button
          data-ocid="system-status.back.button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">⚙️ System Status</h1>
          <p className="text-xs text-muted-foreground">
            Monitor & control your tower
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 space-y-4">
        {isLoading ? (
          <div
            data-ocid="system-status.loading_state"
            className="bg-card rounded-2xl p-8 text-center shadow-card border border-border"
          >
            <p className="text-muted-foreground">Loading system data...</p>
          </div>
        ) : (
          <>
            {/* Status Grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 gap-3"
            >
              {/* TDS */}
              <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
                <p className="text-xs text-muted-foreground">💧 TDS Level</p>
                <p
                  className="text-3xl font-extrabold mt-1"
                  style={{ color: "oklch(0.42 0.12 145)" }}
                >
                  {tds}
                </p>
                <p className="text-xs text-muted-foreground">ppm</p>
              </div>

              {/* Water Clarity */}
              <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
                <p className="text-xs text-muted-foreground">🔍 Water</p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        waterClarity === "clear"
                          ? "oklch(0.42 0.12 145)"
                          : "oklch(0.577 0.245 27.325)",
                    }}
                  />
                  <p className="font-bold text-foreground capitalize">
                    {waterClarity}
                  </p>
                </div>
                <p
                  className="text-xs mt-1"
                  style={{
                    color:
                      waterClarity === "clear"
                        ? "oklch(0.42 0.12 145)"
                        : "oklch(0.577 0.245 27.325)",
                  }}
                >
                  {waterClarity === "clear" ? "Safe ✅" : "Warning ⚠️"}
                </p>
              </div>
            </motion.div>

            {/* Pump Control */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-card rounded-2xl p-5 shadow-card border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-base">
                    💦 Water Pump
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Status:{" "}
                    <span
                      className="font-semibold"
                      style={{
                        color: pumpOn
                          ? "oklch(0.42 0.12 145)"
                          : "oklch(0.577 0.245 27.325)",
                      }}
                    >
                      {pumpOn ? "ON ✅" : "OFF ❌"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Label
                    htmlFor="pump-switch"
                    className="text-sm text-muted-foreground"
                  >
                    {pumpOn ? "ON" : "OFF"}
                  </Label>
                  <Switch
                    id="pump-switch"
                    data-ocid="system-status.switch"
                    checked={pumpOn}
                    onCheckedChange={handlePumpToggle}
                    disabled={setPumpState.isPending}
                  />
                </div>
              </div>
            </motion.div>

            {/* Temperature Control */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-card rounded-2xl p-5 shadow-card border border-border"
            >
              <h3 className="font-bold text-foreground mb-4">🌡️ Temperature</h3>
              <div className="flex items-center justify-center gap-6">
                <Button
                  data-ocid="system-status.secondary_button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleTempChange(-1)}
                  disabled={setTemperature.isPending}
                  className="w-12 h-12 rounded-xl"
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <div className="text-center">
                  <p
                    className="text-5xl font-extrabold"
                    style={{ color: "oklch(0.42 0.12 145)" }}
                  >
                    {temperature}°
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Celsius</p>
                </div>
                <Button
                  data-ocid="system-status.primary_button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleTempChange(1)}
                  disabled={setTemperature.isPending}
                  className="w-12 h-12 rounded-xl"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Water Clarity Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-2xl p-4 shadow-card"
              style={{
                backgroundColor:
                  waterClarity === "clear"
                    ? "oklch(0.42 0.12 145)"
                    : "oklch(0.577 0.245 27.325)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {waterClarity === "clear" ? "💧" : "🚱"}
                </span>
                <div>
                  <p className="font-bold text-white text-base">
                    Water is{" "}
                    {waterClarity === "clear"
                      ? "Clean & Clear"
                      : "Dirty — Action Needed"}
                  </p>
                  <p className="text-white/75 text-sm">
                    {waterClarity === "clear"
                      ? "Your plants are happy! 🌿"
                      : "Check filtration system immediately."}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
