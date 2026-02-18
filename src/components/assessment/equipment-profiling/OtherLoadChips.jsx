import React from "react";

export default function OtherLoadChips({ other, setOther }) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-400">
      <div className="flex flex-wrap gap-2">
        {[
          { id: "fans", label: "Fans", icon: "cyclone" },
          { id: "pos", label: "POS systems", icon: "point_of_sale" },
          {
            id: "smallApps",
            label: "Small appliances",
            icon: "settings_input_component",
          },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setOther((p) => ({ ...p, [item.id]: !p[item.id] }))}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all text-xs font-bold ${
              other[item.id]
                ? "bg-[#F1F8E9] border-[#2E7D32] text-[#2E7D32]"
                : "bg-white border-gray-100 text-gray-400"
            }`}
          >
            <span className="material-icons-outlined text-[14px]">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
