import React from "react";
import BackNav from "../components/common/BackNav";

import StepHeader from "../components/assessment/review/StepHeader";
import ReviewCard from "../components/assessment/review/ReviewCard";
import InfoNotice from "../components/assessment/review/InfoNotice";
import ReviewStickyActions from "../components/assessment/review/ReviewStickyActions";

export default function ReviewScreen({ data, onContinue, onBack }) {
  const scenarioLabel =
    data.energy?.energy_scenario === "diesel_replacement"
      ? "Off-grid with diesel generator"
      : "Fully on grid";

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-24 pb-32 md:pb-40">
      <div className="max-w-2xl mx-auto w-full">
        <BackNav onBack={onBack} />

        <StepHeader />

        <div className="space-y-4 animate-slide-up opacity-0 animation-delay-200">
          <ReviewCard data={data} scenarioLabel={scenarioLabel} />
          <InfoNotice />
        </div>
      </div>

      <ReviewStickyActions onBack={onBack} onContinue={onContinue} />
    </div>
  );
}
