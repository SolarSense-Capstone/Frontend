import React from "react";

export default function InfoNotice() {
  return (
    <div className="py-6 px-4 bg-[#FFF8E1] rounded-2xl border border-[#F9A825]/20">
      <div className="flex items-center space-x-3">
        <span className="material-icons-outlined text-[#F9A825]">info</span>
        <p className="text-[11px] font-medium text-gray-600 leading-relaxed">
          We will submit your data to the backend for a single full analysis
          response.
        </p>
      </div>
    </div>
  );
}
