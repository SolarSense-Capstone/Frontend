import React, { useState } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";
import StepHeader from "../components/assessment/equipment-profiling/StepHeader";

const EQUIPMENT_TYPES = [
  { id: "freezers", label: "Freezers" },
  { id: "refrigerators", label: "Refrigerators" },
  { id: "coldRoom", label: "Cold Room" },
  { id: "displayChillers", label: "Display Chillers" },
  { id: "iceMachines", label: "Ice Machines" },
  { id: "lighting", label: "Lighting" },
];

import ProgressBar from "../components/common/ProgressBar";

export default function EquipmentProfilingScreen({ initialEquipment, onContinue, onBack }) {
  // equipment object comes from App.jsx:
  // { freezers: { quantity: 0, hoursPerDay: 0 }, ... }
  const [equipment, setEquipment] = useState(initialEquipment || {
    freezers: { quantity: 0, hoursPerDay: 0 },
    refrigerators: { quantity: 0, hoursPerDay: 0 },
    coldRoom: { quantity: 0, hoursPerDay: 0 },
    displayChillers: { quantity: 0, hoursPerDay: 0 },
    iceMachines: { quantity: 0, hoursPerDay: 0 },
    lighting: { quantity: 0, hoursPerDay: 0 },
  });

  const updateEquipment = (id, field, value) => {
    setEquipment(prev => {
      const currentItem = prev[id] || { quantity: 0, hoursPerDay: 0 };
      const updatedItem = { ...currentItem, [field]: value };

      // If changing quantity to 0, reset hours.
      if (field === 'quantity' && value === 0) {
        updatedItem.hoursPerDay = 0;
      }

      return { ...prev, [id]: updatedItem };
    });
  };

  // Validation: At least one item mapped must have QTY > 0.
  // Any item with QTY > 0 must have Hours > 0.
  const hasItems = EQUIPMENT_TYPES.some(({ id }) => equipment[id]?.quantity > 0);
  const allValidHours = EQUIPMENT_TYPES.every(({ id }) => {
    const item = equipment[id];
    if (item?.quantity > 0) {
      return Number(item.hoursPerDay) > 0 && Number(item.hoursPerDay) <= 24;
    }
    return true;
  });

  const canContinue = hasItems && allValidHours;

  const handleContinue = () => {
    onContinue(equipment);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-20 pb-32 md:pb-40">
      <div className="max-w-2xl mx-auto w-full">
        <BackNav onBack={onBack} />
        <ProgressBar step={4} totalSteps={5} />

        <StepHeader
          title="What equipment do you use daily?"
          subtitle="Specify the number of items and their average daily usage hours."
        />

        <div className="space-y-4 mt-6">
          {EQUIPMENT_TYPES.map(({ id, label }) => {
            const itemState = equipment[id] || { quantity: 0, hoursPerDay: 0 };
            const q = itemState.quantity;
            const h = itemState.hoursPerDay;

            return (
              <div key={id} className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm">
                <div className="font-medium text-gray-800 mb-4 sm:mb-0 w-1/3">
                  {label}
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <label className="text-sm text-gray-500 whitespace-nowrap hidden sm:block">Quantity:</label>
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-[100px]">
                      <button
                        onClick={() => updateEquipment(id, 'quantity', Math.max(0, q - 1))}
                        className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200 font-medium"
                      >-</button>
                      <div className="flex-1 text-center text-sm font-medium leading-none">
                        {q}
                      </div>
                      <button
                        onClick={() => updateEquipment(id, 'quantity', q + 1)}
                        className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200 font-medium"
                      >+</button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-500 hidden sm:block whitespace-nowrap">Hours/day:</label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      disabled={q === 0}
                      value={h === 0 && q === 0 ? "" : h}
                      onChange={(e) => updateEquipment(id, 'hoursPerDay', e.target.value)}
                      placeholder="hrs"
                      className={`w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-[#00A190] focus:border-[#00A190] outline-none ${q === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <StickyContinue canContinue={canContinue} onClick={handleContinue} />
    </div>
  );
}
