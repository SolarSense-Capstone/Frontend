import React, { useMemo, useState } from "react";
import BackNav from "../components/common/BackNav";
import StepHeader from "../components/assessment/energy-context/StepHeader";
import ScenarioSelector from "../components/assessment/energy-context/ScenarioSelector";
import InfoNote from "../components/assessment/energy-context/InfoNote";
import MonthlyCostField from "../components/assessment/energy-context/MonthlyCostField";
import DieselDetails from "../components/assessment/energy-context/DieselDetails";
import StickyContinue from "../components/common/StickyContinue";

/**
 * Backend/DSE: Supported only:
 * - grid_only  (uses_diesel: false)
 * - diesel_replacement (uses_diesel: true + diesel fields)
 */
const SCENARIOS = [
  {
    id: "grid_only",
    label: "Fully on grid",
    desc: "You mainly use grid electricity.",
    icon: "power",
  },
  {
    id: "diesel_replacement",
    label: "Off-grid with diesel generator",
    desc: "You use generator for a significant portion of power.",
    icon: "local_gas_station",
  },
];

export default function EnergyContextScreen({
  onContinue,
  onBack,
  currencySymbol,
  currencyCode,
}) {
  const [scenario, setScenario] = useState(null);
  const [monthlyCost, setMonthlyCost] = useState("");

  // Diesel-only inputs (required if scenario is diesel_replacement)
  const [dieselHoursPerDay, setDieselHoursPerDay] = useState("");
  const [dieselPricePerLiter, setDieselPricePerLiter] = useState("");

  const showDiesel = scenario === "diesel_replacement";

  const isValid = useMemo(() => {
    if (!scenario) return false;
    if (!monthlyCost.trim()) return false;
    const n = Number(monthlyCost);
    if (Number.isNaN(n) || n <= 0) return false;

    if (showDiesel) {
      const h = Number(dieselHoursPerDay);
      const p = Number(dieselPricePerLiter);
      if (Number.isNaN(h) || h <= 0 || h > 24) return false;
      if (Number.isNaN(p) || p <= 0) return false;
    }
    return true;
  }, [
    scenario,
    monthlyCost,
    showDiesel,
    dieselHoursPerDay,
    dieselPricePerLiter,
  ]);

  const handleContinue = () => {
    if (!isValid) return;
    onContinue({
      energy_scenario: scenario, // matches backend response doc naming
      uses_diesel: scenario === "diesel_replacement",
      monthly_cost: Number(monthlyCost),
      currency: currencyCode || "USD",
      diesel:
        scenario === "diesel_replacement"
          ? {
              hours_per_day: Number(dieselHoursPerDay),
              price_per_liter: Number(dieselPricePerLiter),
            }
          : null,
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-24 pb-32 md:pb-40">
      <div className="max-w-xl mx-auto w-full">
        <BackNav onBack={onBack} />

        <StepHeader
          title="Energy & Power Context"
          subtitle="We only support two scenarios in v1 (per model coverage)."
        />

        <div className="space-y-10">
          <div className="animate-slide-up opacity-0 animation-delay-100">
            <ScenarioSelector
              label="Select your energy scenario"
              scenarios={SCENARIOS}
              value={scenario}
              onChange={setScenario}
            />

            <InfoNote />
          </div>

          <MonthlyCostField
            value={monthlyCost}
            onChange={setMonthlyCost}
            currencySymbol={currencySymbol}
            currencyCode={currencyCode}
          />

          {showDiesel && (
            <DieselDetails
              dieselHoursPerDay={dieselHoursPerDay}
              setDieselHoursPerDay={setDieselHoursPerDay}
              dieselPricePerLiter={dieselPricePerLiter}
              setDieselPricePerLiter={setDieselPricePerLiter}
            />
          )}
        </div>
      </div>

      <StickyContinue isValid={isValid} onClick={handleContinue} />
    </div>
  );
}
