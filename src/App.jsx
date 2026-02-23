import React, { useState } from "react";
import LandingScreen from "./pages/LandingScreen";
import BusinessNameScreen from "./pages/BusinessNameScreen";
import BusinessContextScreen from "./pages/BusinessContextScreen";
import BusinessLocationScreen from "./pages/BusinessLocationScreen";
import EquipmentProfilingScreen from "./pages/EquipmentProfilingScreen";
import ReviewScreen from "./pages/ReviewScreen";
import ProcessingAnalysisScreen from "./pages/ProcessingAnalysisScreen";
import ResultsScreen from "./pages/ResultsScreen";
import PrivacyNotice from "./components/common/PrivacyNotice";

export default function App() {
  const [screen, setScreen] = useState("landing");

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    location: { country: "", state: "", city: "", address: "" },
    currencySymbol: "",
    currencyCode: "",
    energy: null, // { energy_scenario, uses_diesel, currency, diesel? }
    equipment: {
      freezers: { quantity: 0, hoursPerDay: 0 },
      refrigerators: { quantity: 0, hoursPerDay: 0 },
      coldRoom: { quantity: 0, hoursPerDay: 0 },
      displayCoolers: { quantity: 0, hoursPerDay: 0 },
      iceMachines: { quantity: 0, hoursPerDay: 0 },
      lighting: { quantity: 0, hoursPerDay: 0 },
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
        freezers: { quantity: 0, hoursPerDay: 0 },
        refrigerators: { quantity: 0, hoursPerDay: 0 },
        coldRoom: { quantity: 0, hoursPerDay: 0 },
        displayCoolers: { quantity: 0, hoursPerDay: 0 },
        iceMachines: { quantity: 0, hoursPerDay: 0 },
        lighting: { quantity: 0, hoursPerDay: 0 },
      },
    }));
    setScreen("business-name");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {screen === "landing" && (
        <LandingScreen onStart={() => setScreen("business-name")} />
      )}

      {screen === "business-name" && (
        <BusinessNameScreen
          initialName={formData.businessName}
          onContinue={({ businessName }) => {
            update({ businessName });
            setScreen("business-type");
          }}
          onBack={() => setScreen("landing")}
        />
      )}

      {screen === "business-type" && (
        <BusinessContextScreen
          initialType={formData.businessType}
          onContinue={({ businessType }) => {
            update({ businessType });
            setScreen("business-location");
          }}
          onBack={() => setScreen("business-name")}
        />
      )}

      {screen === "business-location" && (
        <BusinessLocationScreen
          initialLocation={formData.location}
          initialEnergy={formData.energy}
          onContinue={({ location, energy, currencyInfo }) => {
            update({
              location,
              energy,
              currencySymbol: currencyInfo.currencySymbol,
              currencyCode: currencyInfo.currencyCode,
            });
            setScreen("equipment-profile");
          }}
          onBack={() => setScreen("business-type")}
        />
      )}

      {screen === "equipment-profile" && (
        <EquipmentProfilingScreen
          initialEquipment={formData.equipment}
          onContinue={(equipment) => {
            update({ equipment });
            setScreen("review");
          }}
          onBack={() => setScreen("business-location")}
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
          currencyCode={formData.currencyCode}
          onReset={reset}
        />
      )}

      {/* Privacy Notice — shown once per session (Checklist: UI > Privacy Notices) */}
      <PrivacyNotice />
    </div>
  );
}
