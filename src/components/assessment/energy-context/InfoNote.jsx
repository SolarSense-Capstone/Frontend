import React from "react";

export default function InfoNote() {
  return (
    <div className="mt-4 px-2 py-3 rounded-xl bg-[#FFF8E1] border border-[#F9A825]/20">
      <div className="flex items-start gap-2">
        <span className="material-icons-outlined text-[#F9A825] text-[18px]">
          info
        </span>
        <p className="text-[11px] text-gray-600 leading-relaxed">
          Intermittent-grid only is not modeled in v1. If you use a generator
          during outages, pick the diesel option.
        </p>
      </div>
    </div>
  );
}
