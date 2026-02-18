import React from "react";
import Typography from "../../../components/ui/Typography";
import Card from "../../../components/ui/Card";

export default function ScenarioOption({ opt, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(opt.id)}
      className={`w-full text-left rounded-xl transition-all ${
        selected ? "ring-2 ring-[#2E7D32] scale-[1.01]" : "hover:bg-white"
      }`}
    >
      <Card
        className={`p-4 flex items-center justify-between ${
          selected
            ? "bg-[#F1F8E9] border-[#2E7D32]/20 shadow-lg"
            : "bg-white shadow-none border-gray-100"
        }`}
      >
        <div className="flex items-center space-x-4">
          <span
            className={`material-icons-outlined ${
              selected ? "text-[#2E7D32]" : "text-gray-400"
            }`}
          >
            {opt.icon}
          </span>
          <div>
            <Typography
              variant="body1"
              className={`font-semibold ${
                selected ? "text-[#2E7D32]" : "text-gray-700"
              }`}
            >
              {opt.label}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              className="text-[11px]"
            >
              {opt.desc}
            </Typography>
          </div>
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
