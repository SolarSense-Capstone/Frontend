import React from "react";
import Typography from "../../ui/Typography";
import Stepper from "./Stepper";

export default function ColdEquipmentSection({
  refrigerators,
  setRefrigerators,
  freezers,
  setFreezers,
  coldRoom,
  setColdRoom,
}) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-100">
      <Typography
        variant="caption"
        className="font-bold text-gray-700 uppercase tracking-widest mb-3 block px-1"
      >
        Refrigerators & Freezers
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Stepper
            icon="kitchen"
            color="bg-blue-500"
            label="Refrigerators"
            sublabel="Upright/Display"
            value={refrigerators.quantity}
            onChange={(q) => setRefrigerators((p) => ({ ...p, quantity: q }))}
          />
          <select
            value={refrigerators.capacity}
            onChange={(e) =>
              setRefrigerators((p) => ({ ...p, capacity: e.target.value }))
            }
            className="text-[11px] font-bold p-2 bg-gray-50 border-none rounded-lg outline-none text-gray-500 uppercase tracking-widest"
          >
            <option>Under 200L</option>
            <option>200L – 400L</option>
            <option>400L+</option>
          </select>
        </div>

        <div className="flex flex-col">
          <Stepper
            icon="ac_unit"
            color="bg-cyan-500"
            label="Freezers"
            sublabel="Chest/Large"
            value={freezers.quantity}
            onChange={(q) => setFreezers((p) => ({ ...p, quantity: q }))}
          />
          <select
            value={freezers.capacity}
            onChange={(e) =>
              setFreezers((p) => ({ ...p, capacity: e.target.value }))
            }
            className="text-[11px] font-bold p-2 bg-gray-50 border-none rounded-lg outline-none text-gray-500 uppercase tracking-widest"
          >
            <option>Chest Freezer (100L-300L)</option>
            <option>Large Freezer (300L+)</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <Stepper
          icon="inventory"
          color="bg-indigo-500"
          label="Cold Room"
          sublabel="Industrial Storage"
          value={coldRoom.quantity}
          onChange={(q) => setColdRoom((p) => ({ ...p, quantity: q }))}
        />
        <select
          value={coldRoom.capacity}
          onChange={(e) =>
            setColdRoom((p) => ({ ...p, capacity: e.target.value }))
          }
          className="text-[11px] font-bold p-2 bg-gray-50 border-none rounded-lg outline-none text-gray-500 uppercase tracking-widest"
        >
          <option>Small (up to 10m²)</option>
          <option>Medium (10m²–25m²)</option>
          <option>Large (25m²+)</option>
        </select>
      </div>
    </div>
  );
}
