import React from "react";
import BackNav from "../components/common/BackNav";
import ProgressBar from "../components/common/ProgressBar";

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
    .filter(([_, item]) => item.quantity > 0)
    .map(([key, item]) => ({
      label: EQUIPMENT_LABELS[key] || key,
      ...item
    }));

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-20 pb-32 md:pb-40">
      <div className="max-w-2xl mx-auto w-full">

        <ProgressBar step={5} totalSteps={5} />

        <div className="mb-4">
          <BackNav onBack={onBack} />
        </div>

        <div className="text-center mb-8 animate-slide-up opacity-0">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Review Your Assessment Details</h2>
          <p className="text-gray-500 mt-2 text-sm">Please verify your details before we perform the analysis.</p>
        </div>

        <div className="space-y-6 animate-slide-up opacity-0 animation-delay-200">

          {/* Single Main White Card */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">

            {/* Business Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-2">Business Name</p>
                <p className="font-medium text-gray-800">{businessName || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-2">Business Type</p>
                <p className="font-medium text-gray-800">{businessType || "-"}</p>
              </div>
            </div>

            {/* Location */}
            <div className="py-6 border-b border-gray-100">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-2">Location</p>
              <p className="font-medium text-gray-800">
                {[location.address, location.city, location.state, location.country].filter(Boolean).join(", ") || "-"}
              </p>
            </div>

            {/* Energy Scenario */}
            <div className="py-6 border-b border-gray-100">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-2">Energy Scenario</p>
              <p className="font-medium text-gray-800 mb-4">{scenarioLabel}</p>

              {energy?.uses_diesel && (
                <div className="flex flex-wrap gap-4">
                  <div className="bg-[#F9FAFB] border border-gray-100/50 rounded flex flex-col justify-center px-4 py-2 min-w-[120px]">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Gen Hours</p>
                    <p className="font-bold text-[#1f2937] text-[13px]">{energy.diesel.hours_per_day} hrs/day</p>
                  </div>
                  <div className="bg-[#F9FAFB] border border-gray-100/50 rounded flex flex-col justify-center px-4 py-2 min-w-[120px]">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Diesel Price</p>
                    <p className="font-bold text-[#1f2937] text-[13px]">{energy.diesel.price_per_liter} / litre</p>
                  </div>
                </div>
              )}
            </div>

            {/* Equipment Summary */}
            <div className="pt-6">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-4">Equipment Summary</p>
              {activeEquipment.length > 0 ? (
                <div className="space-y-3">
                  {activeEquipment.map((eq, idx) => (
                    <div key={idx} className="flex justify-between items-center py-4 px-5 bg-[#F9FAFB] rounded-xl border border-gray-100/50">
                      <span className="font-bold text-gray-900 text-sm">{eq.label}</span>
                      <div className="text-right">
                        <p className="font-bold text-[#2E7D32] text-sm">{eq.quantity} unit{eq.quantity > 1 ? 's' : ''}</p>
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
          <div className="bg-[#F3FCEF] border border-[#d2f3e0] p-4 md:p-5 rounded-xl flex items-center justify-center gap-3 mt-6 text-center shadow-[0_2px_10px_-4px_rgba(46,125,50,0.1)]">
            <span className="material-icons-outlined text-[#2E7D32] text-[22px]">verified</span>
            <p className="text-[12px] font-medium text-gray-700">
              Verify your details. Once you start the analysis, we'll calculate your solar potential and 25-year projections.
            </p>
          </div>

        </div>

        {/* Sticky Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <div className="max-w-2xl mx-auto w-full flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-4 font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Edit Details
            </button>
            <button
              onClick={onContinue}
              className="flex-1 py-4 font-bold text-white bg-[#2E7D32] rounded-xl flex items-center justify-center gap-2 hover:bg-[#1B5E20] transition-colors"
            >
              Run Analysis
              <span className="material-icons-outlined text-sm">equalizer</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
