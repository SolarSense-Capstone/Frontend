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
      if (field === "quantity" && value === 0) {
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
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center">
        <div className="w-full self-stretch mb-4">
          <ProgressBar step={4} totalSteps={5} />
        </div>
        <div className="w-full self-start mb-4">
          <BackNav onBack={onBack} />
        </div>

        <div className="w-full text-center my-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            What equipment do you use daily?
          </h2>
          <p className="text-gray-500 font-normal text-sm">Specify quantity and daily usage hours for each.</p>
        </div>

        <div className="space-y-3 w-full">
          {EQUIPMENT_TYPES.map(({ id, label, icon, iconBg, iconColor }) => {
            const itemState = equipment[id] || { quantity: 0, hoursPerDay: 0 };
            const q = itemState.quantity;
            const h = itemState.hoursPerDay;

            return (
              <div
                key={id}
                className="bg-white px-5 py-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4"
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-icons-outlined text-xl ${iconColor}`}>
                    {icon}
                  </span>
                </div>

                {/* Label */}
                <span className="flex-1 font-medium text-gray-800 text-sm">
                  {label}
                </span>

                {/* Quantity */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quantity</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateEquipment(id, "quantity", Math.max(0, q - 1))}
                      className="w-7 h-7 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center text-base font-medium"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-semibold text-gray-800">{q}</span>
                    <button
                      onClick={() => updateEquipment(id, "quantity", q + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center text-base font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Hours Per Day */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Hours Per Day</span>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    disabled={q === 0}
                    value={h === 0 && q === 0 ? "" : h}
                    onChange={(e) => updateEquipment(id, "hoursPerDay", e.target.value)}
                    placeholder="1-24"
                    className={`w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] outline-none ${q === 0 ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white text-gray-800"
                      }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <StickyContinue canContinue={canContinue} onClick={() => onContinue(equipment)} maxWidthClass="max-w-2xl" />
    </div>
  );
}
