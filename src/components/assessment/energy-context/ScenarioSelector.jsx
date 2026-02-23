import React from "react";
import ScenarioOption from "./ScenarioOption";

export default function ScenarioSelector({
  label,
  scenarios,
  value,
  onChange,
}) {
  return (
    <>
      <p className="text-[22px] md:text-[28px] font-extrabold text-gray-900 mb-6 text-center">
        {label}
      </p>
      <div className="grid grid-cols-1 gap-4">
        {scenarios.map((opt) => (
          <ScenarioOption
            key={opt.id}
            opt={opt}
            selected={value === opt.id}
            onSelect={onChange}
          />
        ))}
      </div>
    </>
  );
}
