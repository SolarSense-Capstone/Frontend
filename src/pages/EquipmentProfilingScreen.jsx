import React, { useState } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";

import StepHeader from "../components/assessment/equipment-profiling/StepHeader";
import ColdEquipmentSection from "../components/assessment/equipment-profiling/ColdEquipmentSection";
import LightingSection from "../components/assessment/equipment-profiling/LightingSection";
import OtherLoadChips from "../components/assessment/equipment-profiling/OtherLoadChips";

export default function EquipmentProfilingScreen({ onContinue, onBack }) {
  const [refrigerators, setRefrigerators] = useState({
    capacity: "200L-400L",
    quantity: 0,
  });
  const [freezers, setFreezers] = useState({
    capacity: "Large Freezer (300L+)",
    quantity: 0,
  });
  const [coldRoom, setColdRoom] = useState({
    capacity: "Small (up to 10m²)",
    quantity: 0,
  });
  const [lighting, setLighting] = useState({
    enabled: false,
    count: 5,
    type: "LED",
  });
  const [other, setOther] = useState({
    fans: false,
    pos: false,
    smallApps: false,
  });

  const handleContinue = () => {
    onContinue({ refrigerators, freezers, coldRoom, lighting, other });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-20 pb-32 md:pb-40">
      <div className="max-w-2xl mx-auto w-full">
        <BackNav onBack={onBack} />

        <StepHeader
          title="What equipment do you use daily?"
          subtitle="Select equipment and specify quantity and capacity."
        />

        <div className="space-y-6">
          <ColdEquipmentSection
            refrigerators={refrigerators}
            setRefrigerators={setRefrigerators}
            freezers={freezers}
            setFreezers={setFreezers}
            coldRoom={coldRoom}
            setColdRoom={setColdRoom}
          />

          <LightingSection lighting={lighting} setLighting={setLighting} />

          <OtherLoadChips other={other} setOther={setOther} />
        </div>
      </div>

      <StickyContinue canContinue={true} onClick={handleContinue} />
    </div>
  );
}
