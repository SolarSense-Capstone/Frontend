import React from "react";
import Typography from "../../ui/Typography";

export default function LocationInput({ location, setLocation }) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-200">
      <label className="block mb-2 px-1">
        <Typography
          variant="caption"
          className="font-semibold text-gray-700 uppercase tracking-wider"
        >
          Business Location
        </Typography>
      </label>

      <div className="relative">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter area, city, or landmark"
          className="w-full bg-white border border-gray-200 rounded-[8px] px-4 py-4 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all shadow-sm"
        />
        <div className="mt-2 px-1">
          <Typography variant="caption" color="textSecondary">
            Exact address not required
          </Typography>
        </div>
      </div>
    </div>
  );
}
