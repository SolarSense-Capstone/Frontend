import React from "react";
import Typography from "../../ui/Typography";

export default function AddressField({ address, setAddress }) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-400">
      <div className="flex justify-between items-center mb-2 px-1">
        <label>
          <Typography
            variant="caption"
            className="font-bold text-gray-700 uppercase tracking-widest"
          >
            Street Address
          </Typography>
        </label>
        <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
          Optional
        </span>
      </div>

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter building or street"
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
      />
      <p className="mt-2 text-[11px] text-gray-400 italic px-1">
        Optional. Estimates are based on regional energy data.
      </p>
    </div>
  );
}
