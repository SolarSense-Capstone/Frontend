import React from "react";
import Typography from "../../ui/Typography";
import Card from "../../ui/Card";

export default function DieselEconomicsCard({ data }) {
  return (
    <Card className="p-6 bg-white border-gray-100">
      <Typography
        variant="caption"
        className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-4 block"
      >
        Diesel Economics
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-gray-500">Generator hours/day</span>
          <span className="font-bold text-gray-800">
            {data.diesel_details.hours_per_day}
          </span>
        </div>
        <div className="flex justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-gray-500">Diesel price/liter</span>
          <span className="font-bold text-gray-800">
            {data.diesel_details.price_per_liter}
          </span>
        </div>
        <div className="flex justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-gray-500">Monthly liters</span>
          <span className="font-bold text-gray-800">
            {Math.round(data.diesel_details.monthly_liters)} L
          </span>
        </div>
        <div className="flex justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-gray-500">Effective tariff</span>
          <span className="font-bold text-gray-800">
            {data.diesel_details.effective_tariff?.toFixed?.(2)} / kWh
          </span>
        </div>
      </div>
    </Card>
  );
}
