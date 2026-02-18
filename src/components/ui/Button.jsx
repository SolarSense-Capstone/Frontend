import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  icon,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-[8px] font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-[#2E7D32] text-white hover:bg-[#1B5E20] focus:ring-[#2E7D32]",
    outline:
      "border border-[#2E7D32] text-[#2E7D32] hover:bg-[#F1F8E9] focus:ring-[#2E7D32]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && (
        <span className="material-icons-outlined mr-2 text-[20px]">{icon}</span>
      )}
      <span className="normal-case">{children}</span>
    </button>
  );
};

export default Button;
