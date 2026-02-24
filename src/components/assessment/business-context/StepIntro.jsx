import React from "react";
import Typography from "../../../components/ui/Typography";

export default function StepIntro({
  title,
  subtitle,
  className = "text-center mb-8 animate-slide-up opacity-0",
  titleVariant = "h2",
  titleClassName = "mb-3 text-2xl md:text-3xl font-semibold",
}) {
  return (
    <div className={className}>
      <Typography variant={titleVariant} className={titleClassName}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        className="max-w-md mx-auto"
      >
        {subtitle}
      </Typography>
    </div>
  );
}
