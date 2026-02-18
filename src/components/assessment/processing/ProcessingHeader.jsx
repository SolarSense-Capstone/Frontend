import React from "react";
import Typography from "../../ui/Typography";

export default function ProcessingHeader() {
  return (
    <div className="mb-12">
      <div className="inline-block mb-6 relative">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10">
          <span className="material-icons-outlined text-[#2E7D32] text-4xl animate-pulse">
            analytics
          </span>
        </div>
        <div className="absolute inset-0 bg-[#2E7D32]/10 rounded-full animate-ping" />
      </div>

      <Typography variant="h2" className="mb-3">
        Analyzing your business
      </Typography>
      <Typography variant="body1" color="textSecondary" className="font-medium">
        This usually takes less than a minute.
      </Typography>
    </div>
  );
}
