import React from "react";
import Typography from "../../ui/Typography";

export default function ResultsHeader({ data }) {
  return (
    <div className="text-center mb-10 animate-fade-in">
      <Typography variant="h2" className="text-3xl font-black mb-1">
        Solar Assessment Summary
      </Typography>
      <Typography variant="body1" color="textSecondary" className="text-sm">
        {data.business_name
          ? `Solar Assessment for ${data.business_name}`
          : "Based on your business location and energy profile."}
      </Typography>
    </div>
  );
}
