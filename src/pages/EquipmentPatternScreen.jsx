import React, { useState, useMemo } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";
import StepHeader from "../components/assessment/equipment-pattern/StepHeader";
import FridgeStepperCard from "../components/assessment/equipment-pattern/FridgeStepperCard";
import OperatingHoursCard from "../components/assessment/equipment-pattern/OperatingHoursCard";
import MonthlyCostCard from "../components/assessment/equipment-pattern/MonthlyCostCard";
import ProgressBar from "../components/common/ProgressBar";

const EquipmentPatternScreen = ({ onContinue, onBack }) => {
  const [fridgeCount, setFridgeCount] = useState(1);
  const [opHours, setOpHours] = useState(12);
  const [monthlyCost, setMonthlyCost] = useState("");

  const isValid = useMemo(() => {
    if (!monthlyCost || isNaN(Number(monthlyCost)) || Number(monthlyCost) <= 0) return false;
    if (fridgeCount <= 0) return false;
    if (opHours <= 0 || opHours > 24) return false;
    return true;
  }, [monthlyCost, fridgeCount, opHours]);

  const handleContinue = () => {
    onContinue(fridgeCount, opHours, monthlyCost);
  };

  const incrementFridge = () =>
    setFridgeCount((prev) => Math.min(prev + 1, 50));
  const decrementFridge = () => setFridgeCount((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 py-12 md:py-24">
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center">
        <div className="w-full self-stretch mb-4">
          <ProgressBar step={5} totalSteps={5} />
        </div>
        <div className="w-full self-start mb-4">
          <BackNav onBack={onBack} />
        </div>

        {/* <StepHeader title="How do you use energy in your business?" /> */}

        <div className="space-y-12 w-full">
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

      <StickyContinue canContinue={isValid} onClick={handleContinue} maxWidthClass="max-w-2xl" />
    </div>
  );
};

export default EquipmentPatternScreen;
