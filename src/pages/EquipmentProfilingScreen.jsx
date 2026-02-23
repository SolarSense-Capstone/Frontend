import React, { useState } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";
import ProgressBar from "../components/common/ProgressBar";

const EQUIPMENT_TYPES = [
  {
    id: "freezers",
    label: "Freezers",
    icon: "ac_unit",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-400",
  },
  {
    id: "refrigerators",
    label: "Refrigerators",
    icon: "kitchen",
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    id: "coldRoom",
    label: "Cold Room",
    icon: "inventory_2",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-400",
  },
  {
    id: "displayCoolers",

    label: "Display Coolers",
    icon: "door_sliding",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-400",
  },
  {
    id: "iceMachines",
    label: "Ice Machines",
    icon: "severe_cold",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-400",
  },
  {
    id: "lighting",
    label: "Lighting",
    icon: "lightbulb",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-400",
  },
];

export default function EquipmentProfilingScreen({ initialEquipment, onContinue, onBack }) {
  const [equipment, setEquipment] = useState(initialEquipment || {
    freezers: { quantity: 0, hoursPerDay: 0 },
    refrigerators: { quantity: 0, hoursPerDay: 0 },
    coldRoom: { quantity: 0, hoursPerDay: 0 },
    displayCoolers: { quantity: 0, hoursPerDay: 0 },
    iceMachines: { quantity: 0, hoursPerDay: 0 },
    lighting: { quantity: 0, hoursPerDay: 0 },
  });

  const updateEquipment = (id, field, value) => {
    setEquipment(prev => {
      const currentItem = prev[id] || { quantity: 0, hoursPerDay: 0 };
      const updatedItem = { ...currentItem, [field]: value };
      if (field === 'quantity' && value === 0) {
        updatedItem.hoursPerDay = 0;
      }
      return { ...prev, [id]: updatedItem };
    });
  };

  const hasItems = EQUIPMENT_TYPES.some(({ id }) => equipment[id]?.quantity > 0);
  const allValidHours = EQUIPMENT_TYPES.every(({ id }) => {
    const item = equipment[id];
    if (item?.quantity > 0) {
      return Number(item.hoursPerDay) > 0 && Number(item.hoursPerDay) <= 24;
    }
    return true;
  });

  const canContinue = hasItems && allValidHours;

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-20 pb-32 md:pb-40">
      <div className="max-w-2xl mx-auto w-full">
        <ProgressBar step={4} totalSteps={5} />
        <BackNav onBack={onBack} />

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            What equipment do you use daily?
          </h2>
          <p className="text-gray-400 text-sm">Specify quantity and daily usage hours for each.</p>
        </div>

        <div className="space-y-4">
          {EQUIPMENT_TYPES.map(({ id, label, icon, iconBg, iconColor }) => {
            const itemState = equipment[id] || { quantity: 0, hoursPerDay: 0 };
            const q = itemState.quantity;
            const h = itemState.hoursPerDay;

            return (
              <div
                key={id}
                className="bg-white px-4 py-4 md:px-5 md:py-5 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4 transition-colors"
              >
                {/* Icon */}
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-icons-outlined text-[18px] md:text-[20px] ${iconColor}`}>
                    {icon}
                  </span>
                </div>

                {/* Label */}
                <span className="flex-1 font-semibold text-[#1f2937] text-sm min-w-[80px]">
                  {label}
                </span>

                {/* Right Side Controls */}
                <div className="flex items-center gap-4 md:gap-6 ml-auto">
                  {/* Quantity */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">QUANTITY</span>
                    <div className="flex items-center justify-between border border-gray-100/80 rounded-full px-1 py-1 w-24">
                      <button
                        onClick={() => updateEquipment(id, 'quantity', Math.max(0, q - 1))}
                        className="w-7 h-7 rounded-full text-gray-400 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center text-lg font-medium transition-colors"
                      >
                        −
                      </button>
                      <span className="text-center text-[13px] font-semibold text-gray-800">{q}</span>
                      <button
                        onClick={() => updateEquipment(id, 'quantity', q + 1)}
                        className="w-7 h-7 rounded-full text-gray-400 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center text-lg font-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                  {/* Hours Per Day */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] whitespace-nowrap">HOURS PER DAY</span>
                    <input
                      type="number"
                      min="1"
                      max="24"
                      disabled={q === 0}
                      value={q === 0 ? "" : (h === 0 ? "" : h)}
                      onChange={(e) => {
                        const parsed = parseInt(e.target.value, 10);
                        const clamped = isNaN(parsed) ? 0 : Math.min(24, Math.max(0, parsed));
                        updateEquipment(id, 'hoursPerDay', clamped);
                      }}
                      placeholder="1–24"
                      className={`w-[72px] px-2 py-2 border border-gray-100/80 rounded-xl text-[13px] font-medium text-center focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] outline-none ${q === 0 ? 'bg-[#F9FAFB] text-gray-400 cursor-not-allowed hidden-arrows' : 'bg-[#F9FAFB] text-gray-800 hidden-arrows'}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <StickyContinue canContinue={canContinue} onClick={() => onContinue(equipment)} />
    </div>
  );
}
