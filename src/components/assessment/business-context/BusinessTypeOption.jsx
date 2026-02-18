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
        className={`w-full text-left transition-all duration-300 transform rounded-[12px] p-1 ${
          selected ? "ring-2 ring-[#2E7D32] scale-[1.02]" : "hover:scale-[1.01]"
        }`}
      >
        <Card
          className={`p-6 flex items-center space-x-4 h-full ${
            selected ? "bg-[#F1F8E9] border-[#2E7D32]/30" : "bg-white"
          }`}
        >
          <div
            className={`p-3 rounded-lg ${
              selected ? "bg-[#2E7D32] text-white" : "bg-gray-50 text-[#6B7280]"
            }`}
          >
            <span className="material-icons-outlined text-2xl">
              {type.icon}
            </span>
          </div>
          <div>
            <Typography
              variant="body1"
              className={`font-semibold ${
                selected ? "text-[#2E7D32]" : "text-gray-700"
              }`}
            >
              {type.label}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              className="text-[11px]"
            >
              {type.desc}
            </Typography>
          </div>
        </Card>
      </button>
    </div>
  );
}
