import React from "react";
import Typography from "../../ui/Typography";

export default function StepHeader() {
  return (
    <div className="text-center mb-10 animate-slide-up opacity-0">
      <Typography variant="h2" className="mb-2 text-3xl font-bold">
        Review Your Information
      </Typography>
      <Typography variant="body1" color="textSecondary" className="text-sm">
        Please verify before we run the backend analysis.
      </Typography>
    </div>
  );
}
