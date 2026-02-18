import React from "react";
import Typography from "../../ui/Typography";

export default function StepHeader({ title }) {
  return (
    <div className="text-center mb-10 animate-slide-up opacity-0">
      <Typography variant="h2" className="mb-3">
        {title}
      </Typography>
    </div>
  );
}
