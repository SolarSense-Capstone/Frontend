import React, { useState } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";

import StepHeader from "../components/assessment/location-reliability/StepHeader";
import LocationInput from "../components/assessment/location-reliability/LocationInput";
import ReliabilitySelector from "../components/assessment/location-reliability/ReliabilitySelector";

const RELIABILITY_OPTIONS = [
  { id: "reliable", label: "Mostly reliable", icon: "power" },
  { id: "unstable", label: "Unstable / frequent outages", icon: "power_off" },
  { id: "unavailable", label: "Mostly unavailable", icon: "battery_alert" },
];

const LocationReliabilityScreen = ({ onContinue, onBack }) => {
  const [location, setLocation] = useState("");
  const [reliability, setReliability] = useState(null);

  const isValid = location.trim().length > 2 && reliability !== null;

  const handleContinue = () => {
    if (isValid) {
      onContinue(location, reliability);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 py-12 md:py-24">
      <div className="max-w-xl mx-auto w-full">
        <BackNav onBack={onBack} />

        <StepHeader title="Where is your business located?" />

        <div className="space-y-10">
          <LocationInput location={location} setLocation={setLocation} />

          <ReliabilitySelector
            reliability={reliability}
            setReliability={setReliability}
            options={RELIABILITY_OPTIONS}
          />
        </div>
      </div>

      <StickyContinue canContinue={isValid} onClick={handleContinue} />
    </div>
  );
};

export default LocationReliabilityScreen;
