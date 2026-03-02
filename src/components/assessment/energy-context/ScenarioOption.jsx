import React from "react";

export default function ScenarioOption({ opt, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(opt.id)}
      className={`w-full text-left rounded-xl border transition-all duration-200 flex items-center gap-3 px-4 py-3.5 ${selected
          ? "border-[#2E7D32] bg-white shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300"
        }`}
    >
      {/* Icon */}
      <span
        className={`material-icons-outlined text-xl ${selected ? "text-[#2E7D32]" : "text-gray-500"
          }`}
      >
        {opt.icon}
      </span>

      {/* Label */}
      <span
        className={`flex-1 text-sm font-medium ${selected ? "text-[#2E7D32]" : "text-gray-700"
          }`}
      >
        {opt.label}
      </span>

      {/* Radio circle */}
      <span
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected
            ? "border-[#2E7D32] bg-white"
            : "border-gray-300 bg-white"
          }`}
      >
        {selected && (
          <span className="w-3 h-3 rounded-full bg-[#2E7D32]" />
        )}
      </span>
    </button>
  );
}
