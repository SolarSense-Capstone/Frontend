import React from "react";

export default function ScenarioOption({ opt, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(opt.id)}
      className={`w-full text-left rounded-xl border transition-all duration-200 flex items-center gap-3 px-5 py-4 ${selected
        ? "border-2 border-[#2E7D32] bg-white shadow-sm"
        : "border-gray-100 bg-white hover:border-gray-200"
        }`}
    >
      {/* Icon */}
      <span
        className={`material-icons-outlined text-[20px] ${selected ? "text-[#2E7D32]" : "text-[#9ca3af]"
          }`}
      >
        {opt.icon}
      </span>

      {/* Label */}
      <span
        className={`flex-1 text-[13px] font-bold ${selected ? "text-[#2E7D32]" : "text-[#4b5563]"
          }`}
      >
        {opt.label}
      </span>

      {/* Radio circle */}
      <div className={`w-5 h-5 flex-shrink-0 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${selected ? "border-[#2E7D32]" : "border-gray-300"}`}>
        {selected && (
          <div className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
        )}
      </div>
    </button>
  );
}
