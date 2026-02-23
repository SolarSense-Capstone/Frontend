import React from "react";
import Typography from "../../../components/ui/Typography";

export default function StepIntro({
  title,
  subtitle,
  className = "text-center mb-8 md:mb-12 animate-slide-up opacity-0",
  titleVariant = "h2",
  titleClassName = "mb-4 text-[32px] md:text-[40px] font-extrabold leading-tight text-gray-900",
}) {
  return (
    <div className={className}>
      <Typography variant={titleVariant} className={titleClassName}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        className="max-w-md mx-auto text-[16px] md:text-[18px] leading-relaxed"
      >
        {subtitle}
      </Typography>
    </div>
  );
}
