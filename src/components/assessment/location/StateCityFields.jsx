import React from "react";
import Typography from "../../ui/Typography";

export default function StateCityFields({ state, setState, city, setCity }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="animate-slide-up opacity-0 animation-delay-200">
        <label className="block mb-2 px-1">
          <Typography
            variant="caption"
            className="font-bold text-gray-700 uppercase tracking-widest"
          >
            State / Province
          </Typography>
        </label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter state"
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
        />
      </div>

      <div className="animate-slide-up opacity-0 animation-delay-300">
        <label className="block mb-2 px-1">
          <Typography
            variant="caption"
            className="font-bold text-gray-700 uppercase tracking-widest"
          >
            City
          </Typography>
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
        />
      </div>
    </div>
  );
}
