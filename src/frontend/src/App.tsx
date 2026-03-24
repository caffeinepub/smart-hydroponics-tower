import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { PlantData } from "./data/plants";
import ChoosePlantPage from "./pages/ChoosePlantPage";
import GrowthTrackerPage from "./pages/GrowthTrackerPage";
import HarvestTimerPage from "./pages/HarvestTimerPage";
import HomePage from "./pages/HomePage";
import NutrientSettingsPage from "./pages/NutrientSettingsPage";
import PlantDetailPage from "./pages/PlantDetailPage";
import PlantGuidePage from "./pages/PlantGuidePage";
import SystemStatusPage from "./pages/SystemStatusPage";
import WelcomePage from "./pages/WelcomePage";

export type Screen =
  | "welcome"
  | "home"
  | "choose-plant"
  | "plant-guide"
  | "plant-detail"
  | "growth-tracker"
  | "harvest-timer"
  | "nutrient-settings"
  | "system-status";

const queryClient = new QueryClient();

function HydroApp() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);
  const [detailSource, setDetailSource] = useState<Screen>("choose-plant");

  const navigateTo = (s: Screen) => setScreen(s);

  const handlePlantSelect = (plant: PlantData, from: Screen) => {
    setSelectedPlant(plant);
    setDetailSource(from);
    navigateTo("plant-detail");
  };

  return (
    <div
      className="min-h-screen w-full flex items-start justify-center"
      style={{ backgroundColor: "oklch(0.93 0.03 145)" }}
    >
      <div className="w-full max-w-[430px] min-h-screen bg-background shadow-xl flex flex-col relative overflow-hidden">
        {screen === "welcome" && (
          <WelcomePage onStart={() => navigateTo("home")} />
        )}
        {screen === "home" && <HomePage onNavigate={navigateTo} />}
        {screen === "choose-plant" && (
          <ChoosePlantPage
            onBack={() => navigateTo("home")}
            onSelect={(plant) => handlePlantSelect(plant, "choose-plant")}
          />
        )}
        {screen === "plant-guide" && (
          <PlantGuidePage
            onBack={() => navigateTo("home")}
            onSelect={(plant) => handlePlantSelect(plant, "plant-guide")}
          />
        )}
        {screen === "plant-detail" && selectedPlant && (
          <PlantDetailPage
            plant={selectedPlant}
            onBack={() => navigateTo(detailSource)}
          />
        )}
        {screen === "growth-tracker" && (
          <GrowthTrackerPage onBack={() => navigateTo("home")} />
        )}
        {screen === "harvest-timer" && (
          <HarvestTimerPage onBack={() => navigateTo("home")} />
        )}
        {screen === "nutrient-settings" && (
          <NutrientSettingsPage onBack={() => navigateTo("home")} />
        )}
        {screen === "system-status" && (
          <SystemStatusPage onBack={() => navigateTo("home")} />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HydroApp />
      <Toaster />
    </QueryClientProvider>
  );
}
