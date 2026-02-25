import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from 'recharts';
import formatNumber from "../../../../utils/format/formatNumber";

const CustomProjectionTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white border border-gray-100 p-3 shadow-xl rounded-xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Year {data.year}</p>
                <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#2E7D32]">{formatNumber(data.generation)} <span className="text-xs text-gray-500 font-normal">kWh</span></p>
                </div>
            </div>
        );
    }
    return null;
};

const CustomSeasonalityTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white border border-gray-100 p-3 shadow-xl rounded-xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{data.name}</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.isDry ? '#F59E0B' : '#3B82F6' }}></div>
                    <p className="text-sm font-bold text-gray-900">{formatNumber(data.generation)} <span className="text-xs text-gray-500 font-normal">kWh/day</span></p>
                </div>
            </div>
        );
    }
    return null;
};

export default function ProjectionAndSeasonalityRow({ data }) {
    const defaultData = {
        yearly_breakdown: [],
        monthly_generation_climatology: [],
        year_1_generation_kwh: 0,
        lifetime_total_kwh: 0,
        lifetime_average_annual_kwh: 0,
    };

    const lifetimePrediction = data?.lifetime_prediction || defaultData;

    // Map 25-Year Projection Chart Data
    const projectionData = Array.isArray(lifetimePrediction.yearly_breakdown)
        ? lifetimePrediction.yearly_breakdown.map((p) => ({
            year: p.year,
            generation: p.generation_kwh,
            low: p.confidence_low_kwh,
            high: p.confidence_high_kwh
        }))
        : [];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Map Seasonality Bar Chart Data
    const seasonalityData = Array.isArray(lifetimePrediction.monthly_generation_climatology)
        ? lifetimePrediction.monthly_generation_climatology.map((m) => ({
            name: monthNames[m.month - 1] || `M${m.month}`,
            generation: m.daily_kwh,
            isDry: m.is_dry_season
        }))
        : [];

    // Summary Metrics
    const year1Gen = lifetimePrediction.year_1_generation_kwh || 0;
    const lifetimeTotal = lifetimePrediction.lifetime_total_kwh || 0;
    const avgAnnual = lifetimePrediction.lifetime_average_annual_kwh || 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            {/* 25-Year Solar Performance Projection Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-bold text-gray-900">25-Year Solar Performance Projection</h3>
                    <span className="material-icons-outlined text-gray-400">timeline</span>
                </div>

                <div className="flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={projectionData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorGeneration" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis
                                dataKey="year"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                                dy={10}
                                ticks={[1, 5, 10, 15, 20, 25]}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                                dx={-10}
                                tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                            />
                            <Tooltip content={<CustomProjectionTooltip />} cursor={{ stroke: '#2E7D32', strokeWidth: 1, strokeDasharray: '3 3', fill: 'transparent' }} />
                            <Area
                                type="monotone"
                                dataKey="generation"
                                stroke="#2E7D32"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorGeneration)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-4 pt-4 text-[9px] uppercase font-bold tracking-widest text-gray-400">
                    * PROJECTION ASSUMES STANDARD SOLAR PANEL DEGRADATION OVER TIME.
                </div>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-6">

                {/* Seasonality Chart */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Seasonality</h3>
                        <span className="material-icons-outlined text-gray-400">calendar_today</span>
                    </div>

                    <div className="flex-1 w-full min-h-[140px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={seasonalityData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fill: '#9CA3AF' }}
                                    dy={5}
                                />
                                <Tooltip content={<CustomSeasonalityTooltip />} cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="generation" radius={[2, 2, 0, 0]}>
                                    {seasonalityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.isDry ? '#F59E0B' : '#3B82F6'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                        <div className="flex items-center gap-1.5 align-middle">
                            <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div> DRY
                        </div>
                        <div className="flex items-center gap-1.5 align-middle">
                            <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div> WET
                        </div>
                    </div>
                </div>

                {/* Lifetime Summary Metrics */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-6">LIFETIME SUMMARY</h3>
                    <div className="space-y-4 text-sm text-gray-500">
                        <div className="flex justify-between items-center">
                            <span>Year 1 Generation</span>
                            <span className="font-bold text-gray-900">{formatNumber(year1Gen)} kWh</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Avg. Annual Gen</span>
                            <span className="font-bold text-gray-900">{formatNumber(avgAnnual)} kWh</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-lg">
                            <span className="text-sm font-medium">LifeTime Total</span>
                            <span className="font-black text-[#2E7D32]">{formatNumber(lifetimeTotal)} kWh</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
