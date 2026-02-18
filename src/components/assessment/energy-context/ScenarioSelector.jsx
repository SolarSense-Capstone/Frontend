import React from "react";
import Typography from "../../../components/ui/Typography";
import ScenarioOption from "./ScenarioOption";

export default function ScenarioSelector({
  label,
  scenarios,
  value,
  onChange,
}) {
  return (
    <>
      <label className="block mb-4 px-1">
        <Typography
          variant="caption"
          className="font-bold text-gray-700 uppercase tracking-widest"
        >
          {label}
        </Typography>
      </label>

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
