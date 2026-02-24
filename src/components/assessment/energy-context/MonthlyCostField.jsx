import React from "react";
import Typography from "../../../components/ui/Typography";

export default function MonthlyCostField({
  value,
  onChange,
  currencySymbol,
  currencyCode,
}) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-300">
      <label className="block mb-3 px-1">
        <Typography
          variant="caption"
          className="font-bold text-gray-700 uppercase tracking-widest"
        >
          Average Monthly Energy Cost (Required)
        </Typography>
      </label>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-gray-400 font-bold group-focus-within:text-[#2E7D32] transition-colors">
            {currencySymbol || currencyCode || "$"}
          </span>
        </div>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9.]/g, ""); // only allow numbers and dot
            onChange(val);
          }}
          placeholder="0.00"
          className="w-full bg-white border border-gray-200 rounded-xl pl-16 pr-4 py-5 text-xl font-bold focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
        />
      </div>

      <p className="mt-3 text-[11px] text-gray-400 italic px-1">
        This baseline powers the ROI math. Include grid bills + diesel spend if
        applicable.
      </p>
    </div>
  );
}
