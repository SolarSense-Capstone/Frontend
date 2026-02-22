import React from 'react';

import formatMoney from "../../../../utils/format/formatMoney";

export default function VerdictSection({ data, score, currencySymbol }) {
    // Score mapping logic
    const normalizedScore = typeof score === 'number' ? score : (data?.viability_score || 0);

    // SVG drawing logic for the semi-circle
    const radius = 60;
    const strokeWidth = 12;
    const circumference = Math.PI * radius; // length of half circle
    const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

    // Generate dynamic explanation overriding the static backend response.
    const customExplanation = data?.monthly_savings
        ? `Your energy usage patterns provide a strong case for solar implementation. Transitioning to a solar-hybrid system can drastically reduce OPEX, with estimated savings of ${formatMoney(data.monthly_savings, currencySymbol)} per month, and mitigate the risk of grid instability or fuel price volatility.`
        : (data?.explanation || "Your energy usage patterns provide a strong case for solar implementation. Transitioning to a solar-hybrid system can drastically reduce OPEX and mitigate the risk of grid instability or fuel price volatility.");

    return (
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
            {/* Background purely aesthetic gradient decoration behind */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f2fdfa] rounded-full blur-3xl -mr-20 -mt-20 opacity-60 pointer-events-none"></div>

            <div className="flex-1 md:pr-12 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EEFbf4] text-[#00A190] rounded-full text-xs font-bold tracking-wider mb-4 border border-[#00A190]/20">
                    <span className="material-icons-outlined text-[14px]">check_circle</span>
                    {data?.status === 'HIGHLY_VIABLE' ? 'HIGHLY VIABLE' : data?.status?.replace('_', ' ')}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">Solar Viability Verdict</h2>

                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {customExplanation}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <span className="material-icons-outlined text-[14px]">auto_graph</span>
                    Confidence Level: <span className="text-gray-900">{typeof data.confidence === "number" ? `${Math.round(data.confidence)}%` : "88.5%"}</span>
                </div>
            </div>

            <div className="mt-8 md:mt-0 flex flex-col items-center relative z-10">
                <div className="relative w-40 h-24 flex items-end justify-center">
                    {/* SVG Semi Circle Gauge */}
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 160 80">
                        {/* Background Track */}
                        <path
                            d="M 20 80 A 60 60 0 0 1 140 80"
                            fill="none"
                            stroke="#F3F4F6"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                        />
                        {/* Progress Arc */}
                        <path
                            d="M 20 80 A 60 60 0 0 1 140 80"
                            fill="none"
                            stroke="#00A190"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="flex flex-col items-center leading-none mb-1">
                        <span className="text-3xl font-black text-gray-900">{normalizedScore.toFixed(1)}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">Score</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
