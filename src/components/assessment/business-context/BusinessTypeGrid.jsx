import React from "react";
import BusinessTypeOption from "./BusinessTypeOption";

export default function BusinessTypeGrid({ types, selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-12">
      {types.map((type, index) => (
        <BusinessTypeOption
          key={type.id}
          type={type}
          index={index}
          selected={selectedId === type.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
