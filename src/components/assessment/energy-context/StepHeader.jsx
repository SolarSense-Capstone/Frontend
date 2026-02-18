import React from "react";
import Typography from "../../../components/ui/Typography";

export default function StepHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-10 animate-slide-up opacity-0">
      <Typography variant="h2" className="mb-3 text-3xl font-bold">
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary" className="text-sm">
        {subtitle}
      </Typography>
    </div>
  );
}
