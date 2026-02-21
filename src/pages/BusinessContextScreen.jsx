import React, { useState } from "react";
import StepIntro from "../components/assessment/business-context/StepIntro";
import BackNav from "../components/common/BackNav";
import BusinessTypeGrid from "../components/assessment/business-context/BusinessTypeGrid";
import StickyContinue from "../components/common/StickyContinue";

const BUSINESS_TYPES = [
  // ✅ Match backend allowed values exactly (backendValue)
  {
    id: "cafe",
    backendValue: "Cafe",
    label: "Cafe",
    icon: "local_cafe",
    desc: "Small restaurant/cafe loads",
  },
  {
    id: "restaurant",
    backendValue: "Restaurant",
    label: "Restaurant / Quick Service",
    icon: "lunch_dining",
    desc: "Cooking + cooling load",
  },
  {
    id: "retail",
    backendValue: "Retail",
    label: "Retail",
    icon: "storefront",
    desc: "Small shops & stores",
  },
  {
    id: "office",
    backendValue: "Office",
    label: "Office",
    icon: "apartment",
    desc: "Office energy profile",
  },
  {
    id: "hotel",
    backendValue: "Hotel",
    label: "Hotel",
    icon: "hotel",
    desc: "Hospitality loads",
  },
  {
    id: "gym",
    backendValue: "Gym",
    label: "Gym",
    icon: "fitness_center",
    desc: "Fitness facility loads",
  },
  {
    id: "bakery",
    backendValue: "Bakery",
    label: "Bakery",
    icon: "bakery_dining",
    desc: "Ovens + cooling",
  },

  // ⚠️ backend expects these lowercase exactly (per your validation message)
  {
    id: "butchery",
    backendValue: "butchery",
    label: "Butchery",
    icon: "restaurant",
    desc: "Meat preservation",
  },
  {
    id: "grocery",
    backendValue: "grocery",
    label: "Grocery",
    icon: "shopping_cart",
    desc: "Groceries + refrigeration",
  },
  {
    id: "mini_supermarket",
    backendValue: "mini_supermarket",
    label: "Mini Supermarket",
    icon: "shopping_basket",
    desc: "Mini-mart / mini supermarket",
  },
  {
    id: "other",
    backendValue: "other",
    label: "Other",
    icon: "star",
    desc: "Other business types",
  }
];

export default function BusinessContextScreen({ initialType = "", onContinue, onBack }) {
  const initialSelected = BUSINESS_TYPES.find(t => t.backendValue === initialType)?.id || null;
  const [selectedId, setSelectedId] = useState(initialSelected);

  const canContinue = !!selectedId;

  const selectedType = BUSINESS_TYPES.find((t) => t.id === selectedId);

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-24 pb-32 md:pb-40">
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
        <BackNav onBack={onBack} />

        <StepIntro
          title="What type of business do you run?"
          subtitle=""
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
