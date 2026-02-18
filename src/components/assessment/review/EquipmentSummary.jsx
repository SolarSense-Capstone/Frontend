import React from "react";
import Typography from "../../ui/Typography";

export default function EquipmentSummary({ data }) {
  return (
    <div>
      <Typography
        variant="caption"
        className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-3 block"
      >
        Equipment Summary
      </Typography>

      <div className="flex flex-wrap gap-2">
        {data.equipment?.refrigerators?.quantity > 0 && (
          <span className="px-3 py-1 bg-gray-50 rounded-lg text-[11px] font-bold text-gray-600">
            {data.equipment.refrigerators.quantity}x Fridge (
            {data.equipment.refrigerators.capacity})
          </span>
        )}
        {data.equipment?.freezers?.quantity > 0 && (
          <span className="px-3 py-1 bg-gray-50 rounded-lg text-[11px] font-bold text-gray-600">
            {data.equipment.freezers.quantity}x Freezer (
            {data.equipment.freezers.capacity})
          </span>
        )}
        {data.equipment?.coldRoom?.quantity > 0 && (
          <span className="px-3 py-1 bg-gray-50 rounded-lg text-[11px] font-bold text-gray-600">
            {data.equipment.coldRoom.quantity}x Cold Room (
            {data.equipment.coldRoom.capacity})
          </span>
        )}
        {data.equipment?.lighting?.enabled && (
          <span className="px-3 py-1 bg-gray-50 rounded-lg text-[11px] font-bold text-gray-600">
            {data.equipment.lighting.count}x {data.equipment.lighting.type}{" "}
            Bulbs
          </span>
        )}
      </div>
    </div>
  );
}
