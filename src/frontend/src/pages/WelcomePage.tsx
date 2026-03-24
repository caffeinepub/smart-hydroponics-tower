import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSetUserName } from "../hooks/useQueries";

interface Props {
  onStart: () => void;
}

export default function WelcomePage({ onStart }: Props) {
  const [name, setName] = useState("");
  const setUserName = useSetUserName();

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Please enter your name to continue");
      return;
    }
    try {
      await setUserName.mutateAsync(trimmed);
      onStart();
    } catch {
      toast.error("Failed to save name. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background decorative circles */}
      <div
        className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full opacity-20"
        style={{ backgroundColor: "oklch(0.55 0.15 145)" }}
      />
      <div
        className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full opacity-15"
        style={{ backgroundColor: "oklch(0.55 0.15 145)" }}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm text-center"
        >
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-card"
              style={{ backgroundColor: "oklch(0.42 0.12 145)" }}
            >
              <span className="text-5xl">🌿</span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-foreground mb-2">
            Smart Hydroponics
          </h1>
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "oklch(0.42 0.12 145)" }}
          >
            Tower System
          </h2>
          <p className="text-muted-foreground text-base mb-10">
            Your intelligent plant growth companion for Indian farms & schools
          </p>

          {/* Hero Image */}
          <div
            className="relative rounded-2xl overflow-hidden mb-10 shadow-card"
            style={{ height: 220 }}
          >
            <img
              src="/assets/generated/hydro-tower-hero.dim_400x500.png"
              alt="Hydroponics Tower"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 50%, oklch(0.97 0.018 145) 100%)",
              }}
            />
          </div>

          {/* Name Input Card */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <p className="text-foreground font-semibold text-lg mb-4">
              Enter your name to continue
            </p>
            <Input
              data-ocid="welcome.input"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="text-lg h-12 mb-4 rounded-xl"
            />
            <Button
              data-ocid="welcome.primary_button"
              onClick={handleSubmit}
              disabled={setUserName.isPending}
              className="w-full h-12 text-lg font-semibold rounded-xl"
              style={{
                backgroundColor: "oklch(0.42 0.12 145)",
                color: "white",
              }}
            >
              {setUserName.isPending ? "Starting..." : "🌱 Get Started"}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground py-4 px-6">
        © {new Date().getFullYear()}. Built with love using{" "}
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
