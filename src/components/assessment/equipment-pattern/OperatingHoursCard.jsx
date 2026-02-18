import React from "react";
import Typography from "../../../components/ui/Typography";
import Card from "../../ui/Card";

export default function OperatingHoursCard({ opHours, setOpHours }) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-400">
      <Card className="p-6">
        <div className="mb-6 flex items-center space-x-4">
          <div className="bg-[#FFF8E1] p-3 rounded-xl">
            <span className="material-icons-outlined text-[#F9A825] text-2xl">
              schedule
            </span>
          </div>
          <div>
            <Typography variant="body1" className="font-semibold text-gray-800">
              Daily operating hours
            </Typography>
            <Typography variant="caption" color="textSecondary">
              When is your equipment drawing power?
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="range"
            min="6"
            max="24"
            value={opHours}
            onChange={(e) => setOpHours(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2E7D32]"
          />
          <div className="flex justify-between items-center text-sm">
            <Typography variant="caption" color="textSecondary">
              6 hrs
            </Typography>
            <Typography variant="h3" className="font-black text-[#2E7D32]">
              {opHours} hours/day
            </Typography>
            <Typography variant="caption" color="textSecondary">
              24 hrs
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
}
