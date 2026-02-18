import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-[12px] shadow-md border border-gray-100 overflow-hidden transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
