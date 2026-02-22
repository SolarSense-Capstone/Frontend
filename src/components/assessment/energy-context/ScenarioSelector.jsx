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
      <p className="text-lg font-bold text-gray-900 mb-4">
        {label}
      </p>

      <div className="grid grid-cols-1 gap-3">
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
