import React from "react";

export default function DieselDetails({
  dieselHoursPerDay,
  setDieselHoursPerDay,
  dieselPricePerLiter,
  setDieselPricePerLiter,
  currencySymbol,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 animate-slide-up opacity-0">
      {/* Generator Hours Per Day */}
      <div>
        <label htmlFor="gen-hours" className="block mb-2 px-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
            GENERATOR HOURS PER DAY
          </span>
        </label>
        <input
          id="gen-hours"
          type="text"
          inputMode="numeric"
          value={dieselHoursPerDay}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9.]/g, "");
            setDieselHoursPerDay(val);
          }}
          placeholder="1-24"
          className="w-full bg-white border border-gray-100/80 rounded-xl px-4 py-3.5 text-[13px] outline-none shadow-sm focus:ring-2 focus:ring-[#2E7D32]"
        />
      </div>

      {/* Diesel Price Per Litre */}
      <div>
        <label htmlFor="diesel-price" className="block mb-2 px-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
            DIESEL PRICE PER LITRE
          </span>
        </label>
        <div className="relative">
          {currencySymbol && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[13px] font-bold pointer-events-none">
              {currencySymbol}
            </span>
          )}
          <input
            id="diesel-price"
            type="text"
            inputMode="numeric"
            value={dieselPricePerLiter}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.]/g, "");
              setDieselPricePerLiter(val);
            }}
            placeholder="Price"
            className={`w-full bg-white border border-gray-100/80 rounded-xl py-3.5 text-[13px] outline-none shadow-sm focus:ring-2 focus:ring-[#2E7D32] ${currencySymbol ? "pl-9 pr-4" : "px-4"
              }`}
          />
        </div>
      </div>
    </div>
  );
}
