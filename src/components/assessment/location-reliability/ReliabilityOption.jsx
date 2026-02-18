import React from "react";
import Typography from "../../ui/Typography";
import Card from "../../ui/Card";

export default function ReliabilityOption({ option, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(option.id)}
      className={`w-full text-left transition-all duration-200 rounded-[12px] ${
        selected ? "ring-2 ring-[#2E7D32]" : "hover:translate-x-1"
      }`}
    >
      <Card
        className={`p-4 flex items-center justify-between ${
          selected ? "bg-[#F1F8E9] border-[#2E7D32]/30" : "bg-white"
        }`}
      >
        <div className="flex items-center space-x-4">
          <span
            className={`material-icons-outlined ${
              selected ? "text-[#2E7D32]" : "text-gray-400"
            }`}
          >
            {option.icon}
          </span>
          <Typography
            variant="body1"
            className={`font-semibold ${
              selected ? "text-[#2E7D32]" : "text-gray-700"
            }`}
          >
            {option.label}
          </Typography>
        </div>

        {selected && (
          <span className="material-icons-outlined text-[#2E7D32]">
            check_circle
          </span>
        )}
      </Card>
    </button>
  );
}
