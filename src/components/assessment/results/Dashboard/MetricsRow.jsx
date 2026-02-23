import React from 'react';
import formatMoney from "../../../../utils/format/formatMoney";
import formatNumber from "../../../../utils/format/formatNumber";

export default function MetricsRow({ data, currencySymbol }) {
    const metrics = [
        {
            title: "MONTHLY ENERGY USE",
            icon: "bolt",
            value: `${formatNumber(data.estimated_consumption_kwh)} kWh`,
            iconBg: "bg-[#F3F6FF]",
            iconColor: "text-[#4F75FF]",
        },
        {
            title: "EXPECTED GENERATION",
            icon: "wb_sunny",
            value: `${formatNumber(data.predicted_generation_kwh)} kWh`,
            iconBg: "bg-[#FFF8EE]",
            iconColor: "text-[#FCD34D]",
        },
        {
            title: "RECOMMENDED AREA",
            icon: "grid_view",
            value: `${typeof data.recommended_panel_area_m2 === 'number' ? data.recommended_panel_area_m2.toFixed(0) : '—'} m²`,
            iconBg: "bg-[#F0FDF4]",
            iconColor: "text-[#4ADE80]",
        },
        {
            title: "ESTIMATED SYSTEM COST",
            icon: "payments",
            value: formatMoney(data.system_cost_estimate || data.system_cost, currencySymbol, 0),
            iconBg: "bg-[#F5F3FF]",
            iconColor: "text-[#A78BFA]",
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {metrics.map((m, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col justify-between h-[120px]">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${m.iconBg} flex items-center justify-center`}>
                            <span className={`material-icons-outlined ${m.iconColor} text-[18px]`}>{m.icon}</span>
                        </div>
                        <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest leading-tight">
                            {m.title}
                        </span>
                    </div>

                    <div className="text-xl font-bold text-gray-900 tracking-tight whitespace-nowrap pt-3">
                        {m.value}
                    </div>
                </div>
            ))}
        </div>
    );
}
