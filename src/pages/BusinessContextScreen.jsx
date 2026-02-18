import React, { useState } from "react";
import StepIntro from "../components/assessment/business-context/StepIntro";
import BackNav from "../components/common/BackNav";
import BusinessNameField from "../components/assessment/business-context/BusinessNameField";
import BusinessTypeGrid from "../components/assessment/business-context/BusinessTypeGrid";
import StickyContinue from "../components/common/StickyContinue";

const BUSINESS_TYPES = [
  {
    id: "frozen-food",
    label: "Frozen Food Retail",
    icon: "ac_unit",
    desc: "Small scale retail cooling",
  },
  {
    id: "butchery",
    label: "Butchery",
    icon: "restaurant",
    desc: "High intensity meat preservation",
  },
  {
    id: "cold-storage",
    label: "Cold Storage Facility",
    icon: "kitchen",
    desc: "Large scale preservation",
  },
  {
    id: "supermarket",
    label: "Supermarket / Mini-Mart",
    icon: "shopping_basket",
    desc: "Mixed usage profiles",
  },
  {
    id: "restaurant",
    label: "Restaurant / Quick Service",
    icon: "lunch_dining",
    desc: "Cooking and cooling load",
  },
  {
    id: "other-food",
    label: "Other Food-Based Business",
    icon: "storefront",
    desc: "Generic food production",
  },
];

export default function BusinessContextScreen({ onContinue, onBack }) {
  const [selectedId, setSelectedId] = useState(null);
  const [businessName, setBusinessName] = useState("");

  const canContinue = !!selectedId;

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-24 pb-32 md:pb-40">
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
        <BackNav onBack={onBack} />

        <StepIntro
          title="Tell us about your business"
          subtitle="This helps us personalize your results screen."
          className="text-center mb-8 animate-slide-up opacity-0"
        />

        <BusinessNameField value={businessName} onChange={setBusinessName} />

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
          canContinue && onContinue({ businessName, businessType: selectedId })
        }
      />
    </div>
  );
}
