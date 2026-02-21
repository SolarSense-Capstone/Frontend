import React from 'react';
import formatMoney from "../../../../utils/format/formatMoney";
import formatNumber from "../../../../utils/format/formatNumber";

export default function MetricsRow({ data, currencySymbol }) {
    const metrics = [
        {
            title: "MONTHLY ENERGY USE",
            icon: "bolt",
            value: `${formatNumber(data.estimated_consumption_kwh)} kWh`,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
        },
        {
            title: "EXPECTED GENERATION",
            icon: "wb_sunny",
            value: `${formatNumber(data.predicted_generation_kwh)} kWh`,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500",
        },
        {
            title: "RECOMMENDED AREA",
            icon: "grid_view",
            value: `${typeof data.recommended_panel_area_m2 === 'number' ? data.recommended_panel_area_m2.toFixed(1) : '—'} m²`,
            iconBg: "bg-green-50",
            iconColor: "text-green-500",
        },
        {
            title: "ESTIMATED SYSTEM COST",
            icon: "payments",
            value: formatMoney(data.system_cost_estimate || data.system_cost, currencySymbol),
            iconBg: "bg-purple-50",
            iconColor: "text-purple-500",
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {metrics.map((m, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${m.iconBg} flex items-center justify-center`}>
                        <span className={`material-icons-outlined ${m.iconColor}`}>{m.icon}</span>
                    </div>

                    <div className="flex flex-col items-end flex-1 pl-4">
                        <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest leading-tight text-right mb-1 line-clamp-2">
                            {m.title}
                        </span>
                        <span className="text-lg font-bold text-gray-900 tracking-tight whitespace-nowrap">
                            {m.value}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
