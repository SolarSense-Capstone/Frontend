import React from "react";

const Typography = ({
  variant,
  children,
  className = "",
  color = "textPrimary",
}) => {
  const colorMap = {
    primary: "text-[#2E7D32]",
    secondary: "text-[#F9A825]",
    textPrimary: "text-[#111827]",
    textSecondary: "text-[#6B7280]",
  };

  const variantStyles = {
    h1: "text-3xl md:text-4xl font-semibold leading-tight tracking-tight",
    h2: "text-2xl md:text-3xl font-semibold leading-snug",
    h3: "text-xl md:text-2xl font-medium leading-normal",
    body1: "text-base font-normal leading-relaxed",
    caption: "text-sm font-normal",
  };

  return (
    <div
      className={`${variantStyles[variant]} ${colorMap[color]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Typography;
