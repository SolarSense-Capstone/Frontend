import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import formatMoney from "../../../../utils/format/formatMoney";
const CustomBarTooltip = ({ active, payload, currencySymbol, coveragePercent }) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0].payload;
        const isZero = dataPoint.actualValue === 0;

        return (
            <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg max-w-xs z-50 relative">
                <p className="font-bold text-gray-900 mb-1">{dataPoint.name}</p>
                <p className="text-gray-700">Cost: {formatMoney(dataPoint.actualValue, currencySymbol)}</p>
                {isZero && dataPoint.isMinimumApplied && (
                    <p className="text-xs text-gray-500 mt-2">
                        * Cost is 0 because solar covers {coveragePercent > 100 ? '100%+' : `${coveragePercent}%`} of energy needs
                    </p>
                )}
            </div>
        );
    }
    return null;
};

export default function CostAndEnergyMixRow({ data, currencySymbol }) {
    const currentCostMonthly = data?.current_energy_cost?.total_monthly || 0;
    const monthlySavings = data?.monthly_savings || 0;

    const currentCostAnnual = currentCostMonthly * 12;
    const newCostAnnual = Math.max(0, currentCostMonthly - monthlySavings) * 12;
    const annualSavings = monthlySavings * 12;

    const systemCost = data?.system_cost || 0;
    const paybackYears = annualSavings > 0 ? (systemCost / annualSavings).toFixed(1) : "0.0";

    const coveragePercent = data?.estimated_consumption_kwh ? Math.round(((data?.predicted_generation_kwh || 0) / data.estimated_consumption_kwh) * 100) : 0;

    const maxValue = Math.max(currentCostAnnual, newCostAnnual);
    const minBarHeightThreshold = maxValue * 0.10; // 10% of max

    const getDisplayHeight = (actualValue) => {
        return Math.max(actualValue, minBarHeightThreshold);
    };

    const comparisonData = [
        {
            name: 'Current',
            actualValue: currentCostAnnual,
            value: getDisplayHeight(currentCostAnnual),
            isMinimumApplied: currentCostAnnual < minBarHeightThreshold && currentCostAnnual === 0
        },
        {
            name: 'After Solar',
            actualValue: newCostAnnual,
            value: getDisplayHeight(newCostAnnual),
            isMinimumApplied: newCostAnnual < minBarHeightThreshold && newCostAnnual === 0
        },
    ];

    const usesDiesel = data.energy_scenario === 'diesel_replacement';

    // Derived Mix data from specific breakdown
    const gridKwh = data?.estimated_consumption_kwh ? (data.estimated_consumption_kwh - (data?.diesel_details?.diesel_kwh_monthly || 0)) : 0;
    const dieselKwh = data?.diesel_details?.diesel_kwh_monthly || 0;

    const totalKwh = gridKwh + dieselKwh;
    const dieselPercent = totalKwh > 0 && usesDiesel ? Math.round((dieselKwh / totalKwh) * 100) : 0;
    const gridPercent = totalKwh > 0 ? Math.round((gridKwh / totalKwh) * 100) : 100;

    const mixData = usesDiesel ? [
        { name: 'Diesel Generator', value: dieselPercent, color: '#F97316' }, // orange
        { name: 'Grid', value: gridPercent, color: '#FCD34D' } // yellow
    ] : [
        { name: 'Grid', value: 100, color: '#FCD34D' }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            {/* Monthly Energy Cost Comparison - 2/3 */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Annual Energy Cost Comparison</h3>
                    <span className="material-icons-outlined text-gray-400">show_chart</span>
                </div>

                <div className="flex-1 min-h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} dx={-10} tickFormatter={(val) => val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} />
                            <Tooltip content={<CustomBarTooltip currencySymbol={currencySymbol} coveragePercent={coveragePercent} />} cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {
                                    comparisonData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#F59E0B' : '#2E7D32'} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                    <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Current Annual Cost</span>
                        <span className="text-lg font-black text-gray-900">{formatMoney(currentCostAnnual, currencySymbol)}</span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">After Solar Annual Cost</span>
                        <span className="text-lg font-black text-gray-900">{formatMoney(newCostAnnual, currencySymbol)}</span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Estimated Annual Savings</span>
                        <span className="text-lg font-black text-[#2E7D32]">{formatMoney(annualSavings, currencySymbol)}</span>
                    </div>
                </div>

                <div className="flex items-start gap-2 mt-4 text-sm text-gray-500">
                    <span className="flex-shrink-0 mt-0.5">ℹ️</span>
                    <p className="flex-1 leading-relaxed">
                        Savings shown are annual operational cost reductions. System cost of {formatMoney(systemCost, currencySymbol)} is paid upfront. Break-even in {paybackYears} years.
                    </p>
                </div>
            </div >

            {/* Energy Mix Breakdown - 1/3 */}
            < div className="lg:col-span-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col" >
                <h3 className="text-lg font-bold text-gray-900 mb-6">Energy Mix Breakdown</h3>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-full h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={mixData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    stroke="none"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {mixData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full space-y-3 mt-4">
                        {mixData.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                    <span className="text-gray-600">{item.name}</span>
                                </div>
                                <span className="font-bold text-gray-900">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {
                    usesDiesel && data.diesel_details && (
                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-end">
                            <div>
                                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Diesel Cost</span>
                                <span className="text-xs font-bold text-gray-900">{formatMoney(data.diesel_details.price_per_liter, currencySymbol)}/L</span>
                            </div>
                            <div className="text-right">
                                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Monthly Litres</span>
                                <span className="text-xs font-bold text-gray-900">{data.diesel_details.monthly_liters.toFixed(0)} L</span>
                            </div>
                        </div>
                    )
                }
            </div >

        </div >
    );
}
