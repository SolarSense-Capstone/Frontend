import React from "react";
import BackNav from "../components/common/BackNav";

const EQUIPMENT_LABELS = {
  freezers: "Freezers",
  refrigerators: "Refrigerators",
  coldRoom: "Cold Room",
  displayChillers: "Display Chillers",
  iceMachines: "Ice Machines",
  lighting: "Lighting",
};

export default function ReviewScreen({ data, onContinue, onBack }) {
  const { businessName, businessType, location, energy, equipment, currencySymbol } = data;

  const scenarioLabel = energy?.uses_diesel
    ? "Off-grid with diesel generator"
    : "Fully on grid";

  const activeEquipment = Object.entries(equipment || {})
    .filter(([_, item]) => item.quantity > 0)
    .map(([key, item]) => ({
      label: EQUIPMENT_LABELS[key] || key,
      ...item
    }));

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-24 pb-32 md:pb-40">
      <div className="max-w-2xl mx-auto w-full">
        <BackNav onBack={onBack} />

        <div className="text-center mb-8 animate-slide-up opacity-0">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Review Your Assessment Details</h2>
          <p className="text-gray-500 mt-2">Please ensure all details are correct before running the analysis.</p>
        </div>

        <div className="space-y-6 animate-slide-up opacity-0 animation-delay-200">

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Business Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Business Name</p>
                <p className="font-medium text-gray-900 mt-1">{businessName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Business Type</p>
                <p className="font-medium text-gray-900 mt-1">{businessType}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Location & Energy</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Location</p>
                <p className="font-medium text-gray-900 mt-1">
                  {[location.city, location.state, location.country].filter(Boolean).join(", ")}
                </p>
                {location.address && <p className="text-gray-600 text-sm mt-1">{location.address}</p>}
              </div>

              <div>
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Energy Supply</p>
                <p className="font-medium text-gray-900 mt-1">{scenarioLabel}</p>
                {energy?.uses_diesel && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>• Backup Generator: {energy.diesel.hours_per_day} hrs/day</p>
                    <p>• Diesel Price: {currencySymbol}{energy.diesel.price_per_liter}/L</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Equipment Details</h3>
            {activeEquipment.length > 0 ? (
              <ul className="space-y-2">
                {activeEquipment.map((eq, idx) => (
                  <li key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="font-medium text-gray-800">{eq.label}</span>
                    <span className="text-gray-600">
                      {eq.quantity} unit{eq.quantity > 1 ? 's' : ''} — {eq.hoursPerDay} hrs/day
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No equipment listed.</p>
            )}
          </div>

        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up opacity-0 animation-delay-300">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3 font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Edit Details
          </button>
          <button
            onClick={onContinue}
            className="w-full sm:w-auto px-8 py-3 font-bold text-white bg-[#00A190] rounded-xl shadow-[0_4px_12px_rgba(0,161,144,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,161,144,0.4)] transition-all"
          >
            Start Analysis
          </button>
        </div>

      </div>
    </div>
  );
}
