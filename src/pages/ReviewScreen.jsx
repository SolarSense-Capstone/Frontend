import React from "react";
import BackNav from "../components/common/BackNav";
import ProgressBar from "../components/common/ProgressBar";

import Button from "../components/ui/Button";

const EQUIPMENT_LABELS = {
  freezers: "Freezers",
  refrigerators: "Refrigerators",
  coldRoom: "Cold Room",
  displayCoolers: "Display Coolers",
  iceMachines: "Ice Machines",
  lighting: "Lighting",
};

export default function ReviewScreen({ data, onContinue, onBack }) {
  const { businessName, businessType, location, energy, equipment, currencySymbol } = data;

  const scenarioLabel = energy?.uses_diesel
    ? "Grid + diesel generator"
    : "Fully on grid";

  const activeEquipment = Object.entries(equipment || {})
    .filter((entry) => entry[1].quantity > 0)
    .map(([key, item]) => ({
      label: EQUIPMENT_LABELS[key] || key,
      ...item
    }));

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-20 pb-32 md:pb-40">
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center">

        <div className="w-full self-start mb-4">
          <BackNav onBack={onBack} />
        </div>

        <div className="w-full self-stretch">
          <ProgressBar step={5} totalSteps={5} />
        </div>

        <div className="text-center mb-8 animate-slide-up opacity-0">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Review Your Assessment Details</h2>
          <p className="text-gray-500 mt-2 text-sm">Please verify your details before we perform the analysis.</p>
        </div>

        <div className="space-y-6 animate-slide-up opacity-0 animation-delay-200">

          {/* Single Main White Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">

            {/* Business Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1">Business Name</p>
                <p className="font-semibold text-gray-900">{businessName}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1">Business Type</p>
                <p className="font-semibold text-gray-900">{businessType}</p>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1">Location</p>
              <p className="font-semibold text-gray-900">
                {[location.address, location.city, location.state, location.country].filter(Boolean).join(", ")}
              </p>
            </div>

            {/* Energy Scenario */}
            <div className="mb-10">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1">Energy Scenario</p>
              <p className="font-semibold text-gray-900 mb-3">{scenarioLabel}</p>

              {energy?.uses_diesel && (
                <div className="flex flex-wrap gap-4">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Gen Hours</p>
                    <p className="font-bold text-gray-900 text-sm">{energy.diesel.hours_per_day} hrs/day</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Diesel Price</p>
                    <p className="font-bold text-gray-900 text-sm">{currencySymbol}{energy.diesel.price_per_liter} / litre</p>
                  </div>
                </div>
              )}
            </div>

            {/* Equipment Summary */}
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-3">Equipment Summary</p>
              {activeEquipment.length > 0 ? (
                <div className="space-y-3">
                  {activeEquipment.map((eq, idx) => (
                    <div key={idx} className="flex justify-between items-center py-4 px-5 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="font-bold text-gray-900">{eq.label}</span>
                      <div className="text-right">
                        <p className="font-bold text-[#2E7D32] text-sm">{eq.quantity} unit{eq.quantity > 1 ? "s" : ""}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{eq.hoursPerDay} hrs/day</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No equipment listed.</p>
              )}
            </div>

          </div>

          {/* Green Alert Banner */}
          <div className="bg-[#EEfbf4] border border-[#d2f3e0] p-4 rounded-xl flex items-center gap-3">
            <span className="material-icons-outlined text-[#2E7D32]">verified</span>
            <p className="text-[13px] font-medium text-gray-700">
              Verify your details. Once you start the analysis, we'll calculate your solar potential and 25-year projections.
            </p>
          </div>

        </div>
      </div>

      {/* Sticky Start Analysis & Edit Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 z-50 animate-fade-in">
        <div className="w-full max-w-2xl mx-auto flex flex-row gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-1/2 py-4 font-bold border-2"
          >
            Edit details
          </Button>
          <Button
            variant="primary"
            onClick={onContinue}
            className="w-1/2 py-4 font-bold rounded-xl"
            icon="equalizer"
          >
            Start Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}
