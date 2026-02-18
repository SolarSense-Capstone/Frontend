import React, { useState } from "react";
import LandingScreen from "./pages/LandingScreen";
import BusinessContextScreen from "./pages/BusinessContextScreen";
import LocationScreen from "./pages/LocationScreen";
import EnergyContextScreen from "./pages/EnergyContextScreen";
import EquipmentProfilingScreen from "./pages/EquipmentProfilingScreen";
import ReviewScreen from "./pages/ReviewScreen";
import ProcessingAnalysisScreen from "./pages/ProcessingAnalysisScreen";
import ResultsScreen from "./pages/ResultsScreen";

export default function App() {
  const [screen, setScreen] = useState("landing");

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    location: { country: "", state: "", city: "", address: "" },
    currencySymbol: "",
    currencyCode: "",
    energy: null, // { energy_scenario, uses_diesel, monthly_cost, currency, diesel? }
    equipment: {
      refrigerators: { capacity: "", quantity: 0 },
      freezers: { capacity: "", quantity: 0 },
      coldRoom: { capacity: "", quantity: 0 },
      lighting: { enabled: false, count: 0, type: "" },
      other: { fans: false, pos: false, smallApps: false },
    },
  });

  const [outcome, setOutcome] = useState(null); // { ok, data? error? }

  const update = (patch) => setFormData((p) => ({ ...p, ...patch }));

  const reset = () => {
    setOutcome(null);
    setFormData((p) => ({
      ...p,
      businessName: "",
      businessType: "",
      location: { country: "", state: "", city: "", address: "" },
      currencySymbol: "",
      currencyCode: "",
      energy: null,
      equipment: {
        refrigerators: { capacity: "", quantity: 0 },
        freezers: { capacity: "", quantity: 0 },
        coldRoom: { capacity: "", quantity: 0 },
        lighting: { enabled: false, count: 0, type: "" },
        other: { fans: false, pos: false, smallApps: false },
      },
    }));
    setScreen("business-context");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {screen === "landing" && (
        <LandingScreen onStart={() => setScreen("business-context")} />
      )}

      {screen === "business-context" && (
        <BusinessContextScreen
          onContinue={({ businessName, businessType }) => {
            update({ businessName, businessType });
            setScreen("location");
          }}
          onBack={() => setScreen("landing")}
        />
      )}

      {screen === "location" && (
        <LocationScreen
          onContinue={(location, currencyInfo) => {
            update({
              location,
              currencySymbol: currencyInfo.currencySymbol,
              currencyCode: currencyInfo.currencyCode,
            });
            setScreen("energy-context");
          }}
          onBack={() => setScreen("business-context")}
        />
      )}

      {screen === "energy-context" && (
        <EnergyContextScreen
          currencySymbol={formData.currencySymbol}
          currencyCode={formData.currencyCode}
          onContinue={(energyObj) => {
            update({ energy: energyObj });
            setScreen("equipment-profile");
          }}
          onBack={() => setScreen("location")}
        />
      )}

      {screen === "equipment-profile" && (
        <EquipmentProfilingScreen
          onContinue={(equipment) => {
            update({ equipment });
            setScreen("review");
          }}
          onBack={() => setScreen("energy-context")}
        />
      )}

      {screen === "review" && (
        <ReviewScreen
          data={formData}
          onContinue={() => setScreen("processing")}
          onBack={() => setScreen("equipment-profile")}
        />
      )}

      {screen === "processing" && (
        <ProcessingAnalysisScreen
          formData={formData}
          onComplete={(result) => {
            setOutcome(result);
            setScreen("results");
          }}
        />
      )}

      {screen === "results" && (
        <ResultsScreen
          outcome={outcome}
          currencySymbol={formData.currencySymbol || "$"}
          onReset={reset}
        />
      )}
    </div>
  );
}
