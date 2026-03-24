import { motion } from "motion/react";
import type { Screen } from "../App";
import { useGetUserName } from "../hooks/useQueries";

interface Props {
  onNavigate: (screen: Screen) => void;
}

const menuItems: { id: Screen; emoji: string; label: string; desc: string }[] =
  [
    {
      id: "live-dashboard",
      emoji: "📡",
      label: "Live Dashboard",
      desc: "Real-time sensor data",
    },
    {
      id: "choose-plant",
      emoji: "🌱",
      label: "Choose Plant",
      desc: "Select your crop",
    },
    {
      id: "plant-guide",
      emoji: "📖",
      label: "Plant Guide",
      desc: "Care & grow tips",
    },
    {
      id: "nutrient-settings",
      emoji: "💧",
      label: "Nutrients",
      desc: "TDS & water quality",
    },
    {
      id: "growth-tracker",
      emoji: "📈",
      label: "Growth Tracker",
      desc: "Track progress",
    },
    {
      id: "harvest-timer",
      emoji: "⏱",
      label: "Harvest Timer",
      desc: "Countdown to harvest",
    },
    {
      id: "system-status",
      emoji: "⚙️",
      label: "System Status",
      desc: "Pump & sensors",
    },
  ];

export default function HomePage({ onNavigate }: Props) {
  const { data: userName } = useGetUserName();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card border-b border-border px-5 py-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.42 0.12 145)" }}
          >
            <span className="text-xl">🌿</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Smart Hydroponics Tower
            </p>
            <h1 className="text-base font-bold text-foreground leading-tight">
              Welcome, {userName || "Farmer"}! 👋
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-5">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden mb-6 shadow-card relative"
          style={{ height: 140 }}
        >
          <img
            src="/assets/generated/hydro-tower-hero.dim_400x500.png"
            alt="Hydroponics Tower"
            className="w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-4"
            style={{
              background:
                "linear-gradient(to top, oklch(0.15 0.05 145 / 0.8), transparent)",
            }}
          >
            <p className="text-white font-bold text-lg leading-tight">
              Your Tower Dashboard
            </p>
            <p className="text-white/80 text-sm">
              Monitor & control your crops
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.id}
              data-ocid={`home.${item.id}.button`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              onClick={() => onNavigate(item.id)}
              className="bg-card rounded-2xl p-4 shadow-card border border-border flex flex-col items-center text-center gap-2 active:scale-95 transition-transform hover:shadow-card-hover"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-xs"
                style={{ backgroundColor: "oklch(0.90 0.04 145)" }}
              >
                {item.emoji}
              </div>
              <span className="font-bold text-foreground text-sm leading-tight">
                {item.label}
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                {item.desc}
              </span>
            </motion.button>
          ))}
        </div>
      </main>

      {/* Footer */}
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
