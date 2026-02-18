import React from "react";
import Typography from "../../ui/Typography";
import ReliabilityOption from "./ReliabilityOption";

export default function ReliabilitySelector({
  reliability,
  setReliability,
  options,
}) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-400">
      <label className="block mb-4 px-1">
        <Typography
          variant="caption"
          className="font-semibold text-gray-700 uppercase tracking-wider"
        >
          How reliable is your electricity supply?
        </Typography>
      </label>

      <div className="space-y-3">
        {options.map((option) => (
          <ReliabilityOption
            key={option.id}
            option={option}
            selected={reliability === option.id}
            onSelect={setReliability}
          />
        ))}
      </div>
    </div>
  );
}
