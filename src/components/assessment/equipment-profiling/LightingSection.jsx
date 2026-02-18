import React from "react";
import Typography from "../../ui/Typography";
import Card from "../../ui/Card";

export default function LightingSection({ lighting, setLighting }) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-300">
      <Typography
        variant="caption"
        className="font-bold text-gray-700 uppercase tracking-widest mb-3 block px-1"
      >
        Lighting & Other
      </Typography>

      <Card className="p-5 bg-white border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                lighting.enabled
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <span className="material-icons-outlined text-xl">lightbulb</span>
            </div>
            <Typography variant="body1" className="font-bold text-sm">
              Include lighting load
            </Typography>
          </div>

          <input
            type="checkbox"
            checked={lighting.enabled}
            onChange={() => setLighting((p) => ({ ...p, enabled: !p.enabled }))}
            className="w-5 h-5 accent-[#2E7D32]"
          />
        </div>

        {lighting.enabled && (
          <div className="grid grid-cols-2 gap-4 animate-fade-in pl-11">
            <div className="flex flex-col space-y-1">
              <Typography
                variant="caption"
                className="text-[9px] uppercase font-bold text-gray-400"
              >
                Bulbs
              </Typography>
              <input
                type="number"
                value={lighting.count}
                onChange={(e) =>
                  setLighting((p) => ({
                    ...p,
                    count: parseInt(e.target.value || "0", 10),
                  }))
                }
                className="bg-gray-50 p-2 rounded-lg text-xs font-bold outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Typography
                variant="caption"
                className="text-[9px] uppercase font-bold text-gray-400"
              >
                Type
              </Typography>
              <select
                value={lighting.type}
                onChange={(e) =>
                  setLighting((p) => ({ ...p, type: e.target.value }))
                }
                className="bg-gray-50 p-2 rounded-lg text-xs font-bold outline-none"
              >
                <option>LED</option>
                <option>Fluorescent</option>
                <option>Mixed</option>
              </select>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
