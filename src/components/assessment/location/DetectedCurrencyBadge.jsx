import React from "react";
import Typography from "../../ui/Typography";

export default function DetectedCurrencyBadge({ currency }) {
  return (
    <div className="animate-fade-in py-3 px-4 bg-[#F1F8E9] rounded-xl flex items-center justify-between border border-[#2E7D32]/10">
      <Typography variant="caption" className="font-bold text-[#2E7D32]">
        Detected Currency
      </Typography>
      <div className="bg-white px-3 py-1 rounded-lg shadow-sm font-black text-[#2E7D32]">
        {currency}
      </div>
    </div>
  );
}
