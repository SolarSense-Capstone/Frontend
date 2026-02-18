import React from "react";
import Typography from "../../ui/Typography";

export default function SavingsCard({
  data,
  currencySymbol,
  annualSavings,
  formatMoney,
}) {
  return (
    <div className="p-6 bg-[#2E7D32] rounded-3xl text-white shadow-lg">
      <Typography
        variant="caption"
        className="font-bold opacity-70 uppercase tracking-widest text-[9px] mb-1"
      >
        Est. Monthly Savings
      </Typography>
      <Typography variant="h3" className="text-2xl font-black mb-3">
        {formatMoney(data.monthly_savings, currencySymbol)}
      </Typography>

      <Typography
        variant="caption"
        className="font-bold opacity-70 uppercase tracking-widest text-[9px] mb-1"
      >
        Annual Potential
      </Typography>
      <Typography variant="body1" className="font-black text-lg">
        {formatMoney(annualSavings, currencySymbol)}
      </Typography>

      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
        <Typography
          variant="caption"
          className="font-bold text-[9px] opacity-70"
        >
          ROI
        </Typography>
        <Typography variant="body1" className="font-black text-xl">
          {typeof data.roi_percentage === "number"
            ? `${data.roi_percentage.toFixed(1)}%`
            : "—"}
        </Typography>
      </div>
    </div>
  );
}
