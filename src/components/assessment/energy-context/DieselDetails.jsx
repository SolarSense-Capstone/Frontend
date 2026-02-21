import React from "react";
import Typography from "../../../components/ui/Typography";
import Card from "../../../components/ui/Card";

export default function DieselDetails({
  dieselHoursPerDay,
  setDieselHoursPerDay,
  dieselPricePerLiter,
  setDieselPricePerLiter,
}) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-400 space-y-4">
      <Typography
        variant="caption"
        className="font-bold text-gray-700 uppercase tracking-widest block px-1"
      >
        Diesel generator details (Required)
      </Typography>

      <Card className="p-5 bg-white border-gray-100 shadow-sm">
        <label className="block mb-2">
          <Typography
            variant="caption"
            className="font-bold text-gray-400 uppercase tracking-widest text-[10px]"
          >
            Hours per day generator runs
          </Typography>
        </label>
        <input
          type="text"
          inputMode="numeric"
          min="0"
          max="24"
          value={dieselHoursPerDay}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9.]/g, "");
            setDieselHoursPerDay(val);
          }}
          placeholder="e.g., 18"
          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />

        <label className="block mt-5 mb-2">
          <Typography
            variant="caption"
            className="font-bold text-gray-400 uppercase tracking-widest text-[10px]"
          >
            Diesel price per liter
          </Typography>
        </label>
        <input
          type="text"
          inputMode="numeric"
          min="0"
          value={dieselPricePerLiter}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9.]/g, "");
            setDieselPricePerLiter(val);
          }}
          placeholder="e.g., 1.35"
          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />

        <p className="mt-3 text-[11px] text-gray-400 italic">
          This enables diesel economics and breakdown charts.
        </p>
      </Card>
    </div>
  );
}
