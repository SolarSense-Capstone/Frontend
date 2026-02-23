import React from "react";
import Typography from "../../../components/ui/Typography";
import Card from "../../../components/ui/Card";

export default function BusinessTypeOption({
  type,
  index,
  selected,
  onSelect,
}) {
  return (
    <div
      className="animate-slide-up opacity-0"
      style={{ animationDelay: `${150 + index * 50}ms` }}
    >
      <button
        onClick={() => onSelect(type.id)}
        className={`w-full text-left transition-all duration-300 transform rounded-xl ${selected ? "scale-[1.02]" : "hover:scale-[1.01]"
          }`}
      >
        <Card
          className={`px-6 py-5 flex items-center space-x-5 h-full border ${selected ? "border-2 border-[#2E7D32] bg-white shadow-sm" : "border-gray-100 bg-white"
            }`}
        >
          <div
            className={`p-3 rounded flex items-center justify-center w-14 h-14 ${selected ? "bg-[#2E7D32] text-white" : "bg-gray-50 text-[#6B7280]"
              }`}
          >
            <span className="material-icons-outlined text-[28px]">
              {type.icon}
            </span>
          </div>
          <Typography
            variant="body1"
            className={`font-semibold text-[17px] ${selected ? "text-[#2E7D32]" : "text-[#1f2937]"
              }`}
          >
            {type.label}
          </Typography>
        </Card>
      </button>
    </div>
  );
}
