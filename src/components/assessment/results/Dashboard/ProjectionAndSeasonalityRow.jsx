import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import formatNumber from "../../../../utils/format/formatNumber";

export default function ProjectionAndSeasonalityRow({ data, leftColumnOnly, rightColumnOnly }) {
    const defaultData = {
        yearly_breakdown: [],
        monthly_generation_climatology: [],
        year_1_generation_kwh: 0,
        lifetime_total_kwh: 0,
        lifetime_average_annual_kwh: 0,
    };

    const lifetimePrediction = data?.lifetime_prediction || defaultData;

    const projectionData = Array.isArray(lifetimePrediction.yearly_breakdown)
        ? lifetimePrediction.yearly_breakdown.map((p) => ({
            year: p.year,
            generation: p.generation_kwh,
        }))
        : [];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const seasonalityData = Array.isArray(lifetimePrediction.monthly_generation_climatology)
        ? lifetimePrediction.monthly_generation_climatology.map((m) => ({
            name: monthNames[m.month - 1] || `M${m.month}`,
            generation: m.daily_kwh,
            isDry: m.is_dry_season
        }))
        : [];

    const year1Gen = lifetimePrediction.year_1_generation_kwh || 0;
    const lifetimeTotal = lifetimePrediction.lifetime_total_kwh || 0;
    const avgAnnual = lifetimePrediction.lifetime_average_annual_kwh || 0;

    if (leftColumnOnly) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] border border-gray-50">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[15px] font-bold text-gray-900">25-Year Solar Performance Projection</h3>
                    <span className="material-icons-outlined text-gray-300 text-[18px]">timeline</span>
                </div>

                {/* Fixed 220px height — no overflow */}
                <div style={{ height: 220 }} className="w-full">
                    {projectionData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0F9D58" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#0F9D58" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#F5F5F5" />
                                <XAxis
                                    dataKey="year"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fill: '#9CA3AF', fontWeight: 'bold' }}
                                    dy={6}
                                    ticks={[1, 5, 10, 15, 20, 25]}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fill: '#9CA3AF' }}
                                    width={40}
                                    tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="generation"
                                    stroke="#0F9D58"
                                    strokeWidth={2}
                                    fill="url(#projGrad)"
                                    isAnimationActive
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-300 text-sm italic">
                            <span className="material-icons-outlined text-3xl mb-2">insights</span>
                            Projection data unavailable
                        </div>
                    )}
                </div>

                <div className="mt-3 text-[8px] uppercase font-bold tracking-[0.15em] text-gray-400">
                    * Projection assumes standard solar panel degradation over time.
                </div>
            </div>
        );
    }

    if (rightColumnOnly) {
        return (
            <>
                {/* Seasonality Card */}
                <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] border border-gray-50">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-[15px] font-bold text-gray-900">Seasonality</h3>
                        <span className="material-icons-outlined text-gray-300 text-[18px]">calendar_today</span>
                    </div>

                    {/* Fixed 160px height bars */}
                    <div style={{ height: 160 }} className="w-full">
                        {seasonalityData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={seasonalityData} margin={{ top: 5, right: 4, left: -20, bottom: 0 }} barCategoryGap="15%">
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 8, fill: '#9CA3AF' }}
                                        dy={5}
                                    />
                                    <YAxis hide />
                                    <Bar dataKey="generation" radius={[3, 3, 0, 0]} isAnimationActive>
                                        {seasonalityData.map((entry, index) => (
                                            <Cell key={index} fill={entry.isDry ? '#F59E0B' : '#4F75FF'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-300 text-[13px] italic">
                                No seasonality data
                            </div>
                        )}
                    </div>

                    {seasonalityData.length > 0 && (
                        <div className="mt-4 flex items-center gap-5 text-[9px] uppercase font-bold tracking-[0.15em] text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#F59E0B]" /> DRY
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#4F75FF]" /> WET
                            </div>
                        </div>
                    )}
                </div>

                {/* Lifetime Summary Card */}
                <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] border border-gray-50">
                    <h3 className="text-[10px] uppercase font-bold tracking-[0.15em] text-gray-400 mb-5">LIFETIME SUMMARY</h3>
                    <div className="space-y-4 text-[12px] text-gray-500 font-medium">
                        <div className="flex justify-between items-center">
                            <span>Year 1 Generation</span>
                            <span className="font-bold text-gray-900">{formatNumber(year1Gen)} kWh</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Avg. Annual Gen</span>
                            <span className="font-bold text-gray-900">{formatNumber(avgAnnual)} kWh</span>
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-[13px] font-bold text-gray-900">Lifetime Total</span>
                            <span className="text-[18px] font-black text-[#0F9D58]">{formatNumber(lifetimeTotal)} kWh</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return null;
}
