import React, { useState } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";
import StepHeader from "../components/assessment/equipment-pattern/StepHeader";
import FridgeStepperCard from "../components/assessment/equipment-pattern/FridgeStepperCard";
import OperatingHoursCard from "../components/assessment/equipment-pattern/OperatingHoursCard";
import MonthlyCostCard from "../components/assessment/equipment-pattern/MonthlyCostCard";

const EquipmentPatternScreen = ({ onContinue, onBack }) => {
  const [fridgeCount, setFridgeCount] = useState(1);
  const [opHours, setOpHours] = useState(12);
  const [monthlyCost, setMonthlyCost] = useState("");

  const handleContinue = () => {
    onContinue(fridgeCount, opHours, monthlyCost);
  };

  const incrementFridge = () =>
    setFridgeCount((prev) => Math.min(prev + 1, 50));
  const decrementFridge = () => setFridgeCount((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 py-12 md:py-24">
      <div className="max-w-xl mx-auto w-full">
        <BackNav onBack={onBack} />

        <StepHeader title="How do you use energy in your business?" />

        <div className="space-y-12">
          <FridgeStepperCard
            fridgeCount={fridgeCount}
            incrementFridge={incrementFridge}
            decrementFridge={decrementFridge}
          />

          <OperatingHoursCard opHours={opHours} setOpHours={setOpHours} />

          <MonthlyCostCard
            monthlyCost={monthlyCost}
            setMonthlyCost={setMonthlyCost}
          />
        </div>
      </div>

      <StickyContinue canContinue={true} onClick={handleContinue} />
    </div>
  );
};

export default EquipmentPatternScreen;
