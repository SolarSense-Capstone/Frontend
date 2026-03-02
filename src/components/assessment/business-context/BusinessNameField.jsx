import React from "react";

export default function BusinessNameField({ value, onChange }) {
  return (
    <div className="w-full mb-8 animate-slide-up opacity-0">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter business name"
        className="w-full bg-white border-2 border-[#2E7D32] rounded-xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
      />
    </div>
  );
}
