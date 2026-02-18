import React from "react";
import Typography from "../ui/Typography";

export default function BackNav({ onBack }) {
  return (
    <div className="w-full flex justify-start mb-6 animate-fade-in opacity-0">
      <button
        onClick={onBack}
        className="flex items-center text-[#6B7280] hover:text-[#2E7D32] transition-colors group"
      >
        <span className="material-icons-outlined text-[20px] mr-1 group-hover:-translate-x-1 transition-transform">
          arrow_back
        </span>
        <Typography
          variant="caption"
          className="font-semibold uppercase tracking-wider"
        >
          Back
        </Typography>
      </button>
    </div>
  );
}
