import React from "react";
import Typography from "../../ui/Typography";

export default function KeyMetricsCard({
  data,
  currencySymbol,
  coveragePercent,
  formatMoney,
  formatNumber,
}) {
  return (
    <div className="p-5 bg-white border border-gray-100 rounded-2xl">
      <Typography
        variant="caption"
        className="font-bold text-gray-400 uppercase tracking-widest text-[9px] mb-3 block"
      >
        Key Metrics
      </Typography>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Monthly Energy Use</span>
          <span className="font-bold text-gray-800">
            {formatNumber(data.estimated_consumption_kwh)} kWh
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Expected Solar Generation</span>
          <span className="font-bold text-gray-800">
            {formatNumber(data.predicted_generation_kwh)} kWh/mo
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Panel Size</span>
          <span className="font-bold text-gray-800">
            {typeof data.recommended_panel_area_m2 === "number"
              ? `${data.recommended_panel_area_m2.toFixed(1)} m²`
              : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">System Cost</span>
          <span className="font-bold text-gray-800">
            {formatMoney(data.system_cost, currencySymbol)}
          </span>
        </div>
      </div>

      {typeof coveragePercent === "number" ? (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Solar Coverage</span>
            <span className="font-bold">{coveragePercent}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E7D32]"
              style={{
                width: `${Math.min(100, Math.max(0, coveragePercent))}%`,
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
