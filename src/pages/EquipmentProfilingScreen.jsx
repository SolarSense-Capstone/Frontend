import React, { useState } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";
import ProgressBar from "../components/common/ProgressBar";
import StepIntro from "../components/assessment/business-context/StepIntro";

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

        <StepIntro
          title="What equipment do you use daily?"
          subtitle="Specify quantity and daily usage hours for each."
          className="text-center mb-8 animate-slide-up opacity-0 mt-4"
        />

        <div className="space-y-3 w-full">
          {EQUIPMENT_TYPES.map(({ id, label, icon, iconBg, iconColor }) => {
            const itemState = equipment[id] || { quantity: 0, hoursPerDay: 0 };
            const q = itemState.quantity;
            const h = itemState.hoursPerDay;

            return (
              <div
                key={id}
                className="bg-white px-3 md:px-5 py-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between gap-2 md:gap-4 hover:border-gray-200 transition-colors"
              >
                {/* Left Side: Icon & Label */}
                <div className="flex flex-1 items-center min-w-0 pr-2">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 mr-3 md:mr-4`}>
                    <span className={`material-icons-outlined text-lg md:text-xl ${iconColor}`}>
                      {icon}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-800 text-xs md:text-sm truncate">
                    {label}
                  </span>
                </div>

                {/* Right Side: Fixed Width Controls */}
                <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
                  {/* Quantity */}
                  <div className="flex flex-col items-center gap-1.5 w-[72px] md:w-[84px]">
                    <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wide leading-none">Quantity</span>
                    <div className="flex items-center justify-between w-full">
                      <button
                        onClick={() => updateEquipment(id, "quantity", Math.max(0, q - 1))}
                        className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center text-sm md:text-base font-medium transition-colors"
                      >
                        −
                      </button>
                      <span className="text-xs md:text-sm font-bold text-gray-900">{q}</span>
                      <button
                        onClick={() => updateEquipment(id, "quantity", q + 1)}
                        className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center text-sm md:text-base font-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Hours Per Day */}
                  <div className="flex flex-col items-center gap-1.5 w-[64px] md:w-[72px]">
                    <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wide leading-none whitespace-nowrap text-center">Hours Per Day</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      disabled={q === 0}
                      value={h === 0 && q === 0 ? "" : h}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        const num = Number(val);
                        if (val === "" || (num >= 0 && num <= 24)) {
                          updateEquipment(id, "hoursPerDay", val);
                        }
                      }}
                      placeholder="1-24"
                      className={`w-full h-7 md:h-8 px-1 md:px-2 border rounded-lg text-xs md:text-sm text-center font-medium focus:ring-2 focus:ring-[#2E7D32] outline-none transition-colors ${q === 0
                        ? "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-200 text-gray-900"
                        }`}
                    />
                  </div>
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
