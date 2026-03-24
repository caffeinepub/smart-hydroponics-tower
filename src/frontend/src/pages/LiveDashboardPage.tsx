import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { getPlantByName } from "../data/plants";
import {
  useGetPlantName,
  useGetReadingHistory,
  useGetSystemStatus,
} from "../hooks/useQueries";

function parseTempRange(temp: string): { min: number; max: number } {
  const match = temp.match(/(\d+)[–-](\d+)/);
  if (match)
    return { min: Number.parseInt(match[1]), max: Number.parseInt(match[2]) };
  return { min: 15, max: 35 };
}

type StatusLevel = "safe" | "warning" | "danger";

function getStatus(value: number, min: number, max: number): StatusLevel {
  if (value < min * 0.9 || value > max * 1.1) return "danger";
  if (value < min || value > max) return "warning";
  return "safe";
}

function getTurbidityStatus(value: number): StatusLevel {
  if (value > 0.8) return "danger";
  if (value >= 0.5) return "warning";
  return "safe";
}

const STATUS_COLORS: Record<StatusLevel, string> = {
  safe: "oklch(0.42 0.12 145)",
  warning: "oklch(0.72 0.17 70)",
  danger: "oklch(0.55 0.22 25)",
};

const STATUS_BG: Record<StatusLevel, string> = {
  safe: "oklch(0.94 0.05 145)",
  warning: "oklch(0.97 0.06 70)",
  danger: "oklch(0.96 0.04 25)",
};

function MetricCard({
  emoji,
  label,
  value,
  unit,
  status,
  index,
}: {
  emoji: string;
  label: string;
  value: string;
  unit: string;
  status: StatusLevel;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 + index * 0.07 }}
      className="rounded-2xl p-4 border"
      style={{
        backgroundColor: STATUS_BG[status],
        borderColor: `${STATUS_COLORS[status]}66`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{emoji}</span>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="flex items-end gap-1">
        <span
          className="text-3xl font-bold"
          style={{ color: STATUS_COLORS[status] }}
        >
          {value}
        </span>
        <span className="text-sm text-muted-foreground pb-1">{unit}</span>
      </div>
      <div className="mt-2">
        <Badge
          className="text-xs capitalize"
          style={{
            backgroundColor: `${STATUS_COLORS[status]}22`,
            color: STATUS_COLORS[status],
            border: `1px solid ${STATUS_COLORS[status]}44`,
          }}
          variant="outline"
        >
          {status === "safe"
            ? "✅ Safe"
            : status === "warning"
              ? "⚠️ Warning"
              : "🚨 Alert"}
        </Badge>
      </div>
    </motion.div>
  );
}

function Sparkline({
  values,
  label,
  unit,
  color,
}: {
  values: number[];
  label: string;
  unit: string;
  color: string;
}) {
  if (values.length === 0) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const H = 48;
  const barW = 16;
  const gap = 4;
  const totalW = values.length * (barW + gap) - gap;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-muted-foreground">
        {label} ({unit})
      </span>
      <svg
        width={totalW}
        height={H + 16}
        className="overflow-visible"
        role="img"
        aria-label={`${label} sparkline chart`}
      >
        <title>{label} sparkline</title>
        {values.map((v, pos) => {
          const barH = Math.max(4, ((v - min) / range) * H);
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: sparkline bars are positional by design
            <g key={pos}>
              <rect
                x={pos * (barW + gap)}
                y={H - barH}
                width={barW}
                height={barH}
                rx={3}
                fill={color}
                opacity={0.7 + (pos / values.length) * 0.3}
              />
              {pos === values.length - 1 && (
                <text
                  x={pos * (barW + gap) + barW / 2}
                  y={H + 12}
                  textAnchor="middle"
                  fontSize={9}
                  fill={color}
                  fontWeight="bold"
                >
                  {v}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const SAMPLE_CODE = `// Arduino/ESP32 Code
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* canisterUrl =
  "https://<YOUR_CANISTER_ID>.raw.icp0.io/sensor";

void sendReading(int tds, int temp, float turbidity, bool pump) {
  HTTPClient http;
  http.begin(canisterUrl);
  http.addHeader("Content-Type", "application/json");
  StaticJsonDocument<200> doc;
  doc["tds"] = tds;
  doc["temperature"] = temp;
  doc["turbidity"] = turbidity;
  doc["pump"] = pump;
  String body;
  serializeJson(doc, body);
  http.POST(body);
  http.end();
}`;

export default function LiveDashboardPage({ onBack }: { onBack: () => void }) {
  const [showGuide, setShowGuide] = useState(false);
  const { data: plantName } = useGetPlantName();
  const { data: status, dataUpdatedAt } = useGetSystemStatus();
  const { data: history } = useGetReadingHistory();

  const plant = getPlantByName(plantName || "");
  const tempRange = plant ? parseTempRange(plant.temp) : { min: 18, max: 28 };

  const tds = status ? Number(status.tds) : 0;
  const temp = status ? Number(status.temperature) : 0;
  const pump = status?.pumpState ?? false;

  const latestReading =
    history && history.length > 0 ? history[history.length - 1] : null;
  const turbidity = latestReading ? latestReading.turbidity : 0;

  const tdsStatus = plant ? getStatus(tds, plant.tdsMin, plant.tdsMax) : "safe";
  const tempStatus = getStatus(temp, tempRange.min, tempRange.max);
  const turbidityStatus = getTurbidityStatus(turbidity);

  const alerts: string[] = [];
  if (tdsStatus === "danger") alerts.push(`TDS ${tds} ppm is out of range`);
  else if (tdsStatus === "warning") alerts.push(`TDS ${tds} ppm slightly off`);
  if (tempStatus === "danger") alerts.push(`Temp ${temp}°C is out of range`);
  else if (tempStatus === "warning") alerts.push(`Temp ${temp}°C slightly off`);
  if (turbidityStatus === "danger")
    alerts.push(`Turbidity ${turbidity.toFixed(2)} is too high`);
  else if (turbidityStatus === "warning")
    alerts.push(`Turbidity ${turbidity.toFixed(2)} is elevated`);

  const last10TDS = history ? history.slice(-10).map((r) => Number(r.tds)) : [];
  const last10Temp = history
    ? history.slice(-10).map((r) => Number(r.temperature))
    : [];

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : "--";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card border-b border-border px-5 py-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            data-ocid="live-dashboard.back.button"
            onClick={onBack}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
            type="button"
          >
            ←
          </button>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.42 0.12 145)" }}
          >
            <span className="text-xl">📡</span>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">
              Live Dashboard
            </p>
            <h1 className="text-base font-bold text-foreground leading-tight">
              {plantName || "No Plant Selected"}
            </h1>
          </div>
          <span className="text-xs text-muted-foreground">
            🔄 {lastUpdated}
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 flex flex-col gap-4">
        {/* Alert Banner */}
        <AnimatePresence>
          {alerts.length > 0 && (
            <motion.div
              data-ocid="live-dashboard.error_state"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl p-4 border"
              style={{
                backgroundColor: "oklch(0.96 0.04 25)",
                borderColor: "oklch(0.55 0.22 25 / 0.4)",
              }}
            >
              <p
                className="text-sm font-bold mb-1"
                style={{ color: "oklch(0.45 0.22 25)" }}
              >
                🚨 Attention Needed
              </p>
              {alerts.map((a) => (
                <p
                  key={a}
                  className="text-xs"
                  style={{ color: "oklch(0.45 0.22 25)" }}
                >
                  • {a}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Good Banner */}
        {alerts.length === 0 && status && (
          <motion.div
            data-ocid="live-dashboard.success_state"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-3 border flex items-center gap-2"
            style={{
              backgroundColor: "oklch(0.94 0.05 145)",
              borderColor: "oklch(0.42 0.12 145 / 0.3)",
            }}
          >
            <span>✅</span>
            <p
              className="text-xs font-semibold"
              style={{ color: "oklch(0.35 0.12 145)" }}
            >
              All sensors within safe range
            </p>
          </motion.div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            emoji="💧"
            label="TDS"
            value={status ? tds.toString() : "--"}
            unit="ppm"
            status={tdsStatus}
            index={0}
          />
          <MetricCard
            emoji="🌡️"
            label="Temperature"
            value={status ? temp.toString() : "--"}
            unit="°C"
            status={tempStatus}
            index={1}
          />
          <MetricCard
            emoji="🔬"
            label="Turbidity"
            value={latestReading ? turbidity.toFixed(2) : "--"}
            unit="NTU"
            status={turbidityStatus}
            index={2}
          />
          <MetricCard
            emoji="⚙️"
            label="Pump"
            value={status ? (pump ? "ON" : "OFF") : "--"}
            unit=""
            status={pump ? "safe" : "warning"}
            index={3}
          />
        </div>

        {/* Sparkline Charts */}
        {(last10TDS.length > 0 || last10Temp.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl p-4 shadow-card border border-border"
          >
            <p className="text-sm font-bold text-foreground mb-4">
              📊 Last 10 Readings
            </p>
            <div className="flex gap-8 overflow-x-auto">
              {last10TDS.length > 0 && (
                <Sparkline
                  values={last10TDS}
                  label="TDS"
                  unit="ppm"
                  color="oklch(0.42 0.12 145)"
                />
              )}
              {last10Temp.length > 0 && (
                <Sparkline
                  values={last10Temp}
                  label="Temp"
                  unit="°C"
                  color="oklch(0.60 0.15 200)"
                />
              )}
            </div>
          </motion.div>
        )}

        {/* No data state */}
        {!status && (
          <motion.div
            data-ocid="live-dashboard.loading_state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl p-6 border border-border text-center"
          >
            <p className="text-3xl mb-2">📡</p>
            <p className="text-sm font-semibold text-foreground">
              Waiting for data...
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Connect your sensor device to see live readings
            </p>
          </motion.div>
        )}

        {/* Plant safe ranges reference */}
        {plant && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl p-4 shadow-card border border-border"
          >
            <p className="text-sm font-bold text-foreground mb-3">
              🎯 Safe Ranges for {plant.name}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div
                className="rounded-xl p-2"
                style={{ backgroundColor: "oklch(0.94 0.05 145)" }}
              >
                <span
                  className="font-semibold block"
                  style={{ color: "oklch(0.35 0.12 145)" }}
                >
                  TDS
                </span>
                <span className="text-muted-foreground">{plant.tds}</span>
              </div>
              <div
                className="rounded-xl p-2"
                style={{ backgroundColor: "oklch(0.94 0.05 145)" }}
              >
                <span
                  className="font-semibold block"
                  style={{ color: "oklch(0.35 0.12 145)" }}
                >
                  Temp
                </span>
                <span className="text-muted-foreground">{plant.temp}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* How to connect guide */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl border border-border overflow-hidden shadow-card"
        >
          <button
            data-ocid="live-dashboard.connect-guide.toggle"
            type="button"
            onClick={() => setShowGuide((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🔌</span>
              <span className="text-sm font-bold text-foreground">
                How to Connect Your Device
              </span>
            </div>
            <span className="text-muted-foreground text-lg">
              {showGuide ? "▲" : "▼"}
            </span>
          </button>

          <AnimatePresence>
            {showGuide && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 flex flex-col gap-3">
                  <p className="text-xs text-muted-foreground">
                    Send sensor data from your Arduino/ESP32 to this app using
                    HTTP POST.
                  </p>

                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">
                      📍 Your Canister ID
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Look at your browser URL. It contains your canister ID
                      like:
                    </p>
                    <div
                      className="rounded-lg p-2 mt-1 font-mono text-xs"
                      style={{
                        backgroundColor: "oklch(0.12 0.02 145)",
                        color: "oklch(0.85 0.08 145)",
                      }}
                    >
                      https://&lt;CANISTER_ID&gt;.icp0.io
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">
                      📡 Endpoint
                    </p>
                    <div
                      className="rounded-lg p-2 font-mono text-xs break-all"
                      style={{
                        backgroundColor: "oklch(0.12 0.02 145)",
                        color: "oklch(0.85 0.08 145)",
                      }}
                    >
                      POST https://&lt;CANISTER_ID&gt;.raw.icp0.io/sensor
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">
                      📦 JSON Format
                    </p>
                    <div
                      className="rounded-lg p-2 font-mono text-xs"
                      style={{
                        backgroundColor: "oklch(0.12 0.02 145)",
                        color: "oklch(0.85 0.08 145)",
                      }}
                    >
                      {"{"} <br />
                      &nbsp;&nbsp;"tds": 800,
                      <br />
                      &nbsp;&nbsp;"temperature": 24,
                      <br />
                      &nbsp;&nbsp;"turbidity": 0.3,
                      <br />
                      &nbsp;&nbsp;"pump": true
                      <br />
                      {"}"}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">
                      🤖 Arduino / ESP32 Code
                    </p>
                    <div
                      className="rounded-lg p-2 font-mono text-xs overflow-x-auto whitespace-pre"
                      style={{
                        backgroundColor: "oklch(0.12 0.02 145)",
                        color: "oklch(0.85 0.08 145)",
                      }}
                    >
                      {SAMPLE_CODE}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <footer className="text-center text-xs text-muted-foreground py-4 px-6 border-t border-border">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
