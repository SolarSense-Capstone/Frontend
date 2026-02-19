import React from "react";
import Typography from "../../ui/Typography";
import Card from "../../ui/Card";

export default function Stepper({
  value,
  onChange,
  label,
  sublabel,
  icon,
  color,
}) {
  return (
    <Card className="p-4 bg-white border-gray-100 shadow-sm mb-3">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${color} bg-opacity-10 ${color.replace("bg-", "text-")}`}
          >
            <span className="material-icons-outlined text-xl">{icon}</span>
          </div>
          <div>
            <Typography
              variant="body1"
              className="font-bold text-sm text-gray-800"
            >
              {label}
            </Typography>
            <Typography variant="caption" className="text-[10px] text-gray-400">
              {sublabel}
            </Typography>
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <button
            onClick={() => onChange(Math.max(0, value - 1))}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#2E7D32] hover:border-[#2E7D32] active:scale-90 transition-all"
          >
            <span className="material-icons-outlined text-sm">remove</span>
          </button>

          <Typography variant="body1" className="w-4 text-center font-black">
            {value}
          </Typography>

          <button
            onClick={() => onChange(value + 1)}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#2E7D32] hover:border-[#2E7D32] active:scale-90 transition-all"
          >
            <span className="material-icons-outlined text-sm">add</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
