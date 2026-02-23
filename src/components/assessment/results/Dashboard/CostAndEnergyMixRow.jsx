import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import formatMoney from "../../../../utils/format/formatMoney";

export default function CostAndEnergyMixRow({ data, currencySymbol, leftColumnOnly, rightColumnOnly }) {
    const currentCost = data?.current_energy_cost?.total_monthly || 0;
    const savings = data?.monthly_savings || 0;
    const newCost = Math.max(0, currentCost - savings);

    // Ensure After Solar bar always shows — use a minimum visual floor of 1% of current cost
    const afterSolarDisplay = newCost === 0 && currentCost > 0 ? currentCost * 0.01 : newCost;

    const comparisonData = [
        { name: 'Current', value: currentCost },
        { name: 'After Solar', value: afterSolarDisplay },
    ];

    const usesDiesel = data?.energy_scenario === 'diesel_replacement';

    const gridKwh = data?.estimated_consumption_kwh
        ? (data.estimated_consumption_kwh - (data?.diesel_details?.diesel_kwh_monthly || 0))
        : 0;
    const dieselKwh = data?.diesel_details?.diesel_kwh_monthly || 0;
    const totalKwh = gridKwh + dieselKwh;
    const dieselPercent = totalKwh > 0 && usesDiesel ? Math.round((dieselKwh / totalKwh) * 100) : 0;
    const gridPercent = totalKwh > 0 ? Math.round((gridKwh / totalKwh) * 100) : 100;

    const mixData = usesDiesel ? [
        { name: 'Diesel', value: dieselPercent, color: '#F59E0B' },
        { name: 'Grid', value: gridPercent, color: '#FCD34D' }
    ] : [
        { name: 'Grid', value: 100, color: '#4F75FF' }
    ];

    if (leftColumnOnly) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] border border-gray-50">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[15px] font-bold text-gray-900">Monthly Energy Cost Comparison</h3>
                    <span className="material-icons-outlined text-gray-300 text-[18px]" style={{ transform: 'rotate(-45deg)' }}>trending_up</span>
                </div>

                {/* Fixed height chart - no flex-1 overflow */}
                <div style={{ height: 220 }} className="w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }} barCategoryGap="45%">
                            <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#F5F5F5" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: '600' }}
                                dy={6}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 9, fill: '#9CA3AF' }}
                                width={48}
                                tickFormatter={(val) => {
                                    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
                                    if (val >= 1_000) return `${(val / 1_000).toFixed(0)}k`;
                                    return val;
                                }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={120} isAnimationActive>
                                {comparisonData.map((_, index) => (
                                    <Cell key={index} fill={index === 0 ? '#F59E0B' : '#0F9D58'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Savings Footer */}
                <div className="flex items-center justify-between bg-[#F9FAFB] rounded-xl px-5 py-4 border border-gray-100 mt-4">
                    <div>
                        <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-gray-400 block mb-1">ESTIMATED MONTHLY SAVINGS</span>
                        <span className="text-[20px] font-bold text-[#0F9D58]">{formatMoney(savings, currencySymbol)}</span>
                    </div>
                    <div className="text-[8px] text-gray-400 text-right max-w-[140px] italic leading-relaxed">
                        Costs estimated based on equipment usage, regional tariffs, and diesel inputs.
                    </div>
                </div>
            </div>
        );
    }

    if (rightColumnOnly) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] border border-gray-50">
                <h3 className="text-[15px] font-bold text-gray-900 mb-4">Energy Mix Breakdown</h3>

                {/* Fixed height donut chart */}
                <div style={{ height: 160 }} className="w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={mixData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                stroke="none"
                                paddingAngle={4}
                                dataKey="value"
                                isAnimationActive
                            >
                                {mixData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(v) => `${v}%`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="space-y-2 mt-3 px-1">
                    {mixData.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[12px]">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-gray-600 font-medium">{item.name}</span>
                            </div>
                            <span className="font-bold text-gray-900">{item.value}%</span>
                        </div>
                    ))}
                </div>

                {/* Diesel stats footer */}
                {usesDiesel && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-end">
                        <div>
                            <span className="text-[8px] uppercase font-bold tracking-[0.15em] text-gray-400 block mb-1">DIESEL TARIFF</span>
                            <span className="text-[12px] font-bold text-gray-900">
                                {currencySymbol}{typeof data?.diesel_details?.effective_tariff === 'number'
                                    ? data.diesel_details.effective_tariff.toFixed(2) : '—'}/kWh
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-[8px] uppercase font-bold tracking-[0.15em] text-gray-400 block mb-1">MONTHLY LITRES</span>
                            <span className="text-[12px] font-bold text-gray-900">
                                {typeof data?.diesel_details?.monthly_liters === 'number'
                                    ? Math.round(data.diesel_details.monthly_liters) : '0'} L
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return null;
}
