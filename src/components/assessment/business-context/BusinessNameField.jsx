import React from "react";
import Typography from "../../../components/ui/Typography";

export default function BusinessNameField({ value, onChange }) {
  return (
    <div className="w-full mb-8 animate-slide-up opacity-0">
      <label className="block mb-2 px-1">
        <Typography
          variant="caption"
          className="font-bold text-gray-700 uppercase tracking-widest"
        >
          Business Name (Optional)
        </Typography>
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Joe's Coffee Shop"
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
      />
    </div>
  );
}
