import React from "react";

export default function BusinessNameField({ value, onChange }) {
  return (
    <div className="w-full mb-8 animate-slide-up opacity-0">
      <label htmlFor="business-name-input" className="block mb-2 px-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Business Name</span>
      </label>
      <input
        id="business-name-input"
        name="business_name"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter business name"
        autoComplete="organization"
        maxLength={100}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm text-gray-900"
      />
      <p className="text-[11px] text-gray-400 mt-2 px-1">
        Used only to personalise your solar report. Not stored or shared.
      </p>
    </div>
  );
}
