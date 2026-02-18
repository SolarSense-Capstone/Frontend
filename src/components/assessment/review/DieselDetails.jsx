import React from "react";
import Typography from "../../ui/Typography";

export default function DieselDetails({ data }) {
  return (
    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
      <Typography
        variant="caption"
        className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-2 block"
      >
        Diesel Details
      </Typography>

      <div className="flex justify-between text-[12px] text-gray-700">
        <span>Hours/day</span>
        <span className="font-bold">{data.energy.diesel.hours_per_day}</span>
      </div>

      <div className="flex justify-between text-[12px] text-gray-700 mt-1">
        <span>Price/liter</span>
        <span className="font-bold">{data.energy.diesel.price_per_liter}</span>
      </div>
    </div>
  );
}
