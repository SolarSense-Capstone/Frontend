import React, { useState } from "react";
import StepIntro from "../components/assessment/business-context/StepIntro";
import BackNav from "../components/common/BackNav";
import BusinessTypeGrid from "../components/assessment/business-context/BusinessTypeGrid";
import StickyContinue from "../components/common/StickyContinue";

const BUSINESS_TYPES = [
  {
    id: "frozen_food_retail",
    backendValue: "Retail",
    label: "Frozen Food Retail",
    icon: "ac_unit",
  },
  {
    id: "butchery",
    backendValue: "butchery",
    label: "Butchery",
    icon: "restaurant",
  },
  {
    id: "cold_storage",
    backendValue: "Retail",
    label: "Cold Storage",
    icon: "kitchen",
  },
  {
    id: "mini_supermarket",
    backendValue: "mini_supermarket",
    label: "Supermarket / Mini Mart",
    icon: "shopping_basket",
  },
  {
    id: "grocery",
    backendValue: "grocery",
    label: "Grocery",
    icon: "shopping_cart",
  },
  {
    id: "bakery",
    backendValue: "Bakery",
    label: "Bakery",
    icon: "bakery",
  },
];

import ProgressBar from "../components/common/ProgressBar";

export default function BusinessContextScreen({ initialType = "", onContinue, onBack }) {
  const initialSelected = BUSINESS_TYPES.find(t => t.backendValue === initialType)?.id || null;
  const [selectedId, setSelectedId] = useState(initialSelected);

  const canContinue = !!selectedId;

  const selectedType = BUSINESS_TYPES.find((t) => t.id === selectedId);

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-24 pb-32 md:pb-40">
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
        <div className="w-full self-stretch">
          <ProgressBar step={2} totalSteps={5} />
        </div>

        <BackNav onBack={onBack} />

        <StepIntro
          title="What type of business do you run?"
          subtitle="Select the category that best describes your primary operations."
          titleVariant="h3"
          titleClassName="mb-2 text-xl font-bold"
          className="text-center mb-8 animate-slide-up opacity-0"
        />

        <BusinessTypeGrid
          types={BUSINESS_TYPES}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      <StickyContinue
        canContinue={canContinue}
        onClick={() =>
          canContinue &&
          onContinue({
            businessType: selectedType?.backendValue || "",
          })
        }
      />
    </div>
  );
}
