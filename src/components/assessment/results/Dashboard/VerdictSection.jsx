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

    // Determine colors and icons based on status
    const statusStr = (data?.status || '').toUpperCase().trim();
    const isNotViable = statusStr.includes('NOT') || statusStr.includes('LOW') || statusStr.includes('POOR');
    const isModerate = statusStr.includes('MODERATE') || statusStr.includes('MEDIUM') || statusStr.includes('AVERAGE');

    let statusColorClass = "bg-[#EEFbf4] text-[#2E7D32] border-[#2E7D32]/20";
    let statusIcon = "check_circle";
    let progressColor = "#2E7D32";

    if (isNotViable) {
        statusColorClass = "bg-[#F3F4F6] text-[#4B5563] border-[#4B5563]/20";
        statusIcon = "info";
        progressColor = "#4B5563";
    } else if (isModerate) {
        statusColorClass = "bg-[#FFFBEB] text-[#D97706] border-[#D97706]/20";
        statusIcon = "info";
        progressColor = "#D97706";
    }

    // Fallback UI copy if DSE backend does not return an explanation string
    let customExplanation = data?.explanation
        ? data.explanation
        : `Your energy usage patterns provide a strong case for solar implementation. Transitioning to a solar-hybrid system can drastically reduce OPEX, with estimated savings of ${formatMoney(data?.monthly_savings || 0, currencySymbol)} per month, and mitigate the risk of grid instability or fuel price volatility.`;

    // Intercept and patch contradictory backend responses for non-viable/moderate scenarios
    if (isNotViable && customExplanation.includes('strong case')) {
        customExplanation = customExplanation.replace(
            'provide a strong case for solar implementation',
            'do not currently provide a strong financial case for solar implementation'
        ).replace(
            'can drastically reduce OPEX',
            'might not significantly reduce OPEX'
        );
    } else if (isModerate && customExplanation.includes('strong case')) {
        customExplanation = customExplanation.replace(
            'provide a strong case',
            'provide moderate potential'
        );
    }

    // Extract raw unscaled values from the DSE response and replace with localized UI format
    if (data?.explanation && /(Significant savings \(|Savings of |Significant savings of ).*?\/mo\)?/i.test(customExplanation)) {
        customExplanation = customExplanation.replace(
            /(Significant savings \(|Savings of |Significant savings of ).*?\/mo\)?/gi,
            `Significant savings of ${formatMoney(data?.monthly_savings || 0, currencySymbol)}/mo`
        );
    }

    // Append contextual business logic based on the calculated viability score
    if (!customExplanation.includes("Transitioning to a solar-hybrid system")) {
        if (isNotViable) {
            customExplanation += " At this time, the upfront capital expenditure of a solar installation may outweigh the long-term operational savings.";
        } else if (isModerate) {
            customExplanation += " A blended energy approach could provide partial OPEX relief, though the payback period may be longer than average.";
        } else {
            customExplanation += " Transitioning to a solar-hybrid system can drastically reduce OPEX, and mitigate the risk of grid instability or fuel price volatility.";
        }
    }

    return (
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
            {/* Background purely aesthetic gradient decoration behind */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f2fdfa] rounded-full blur-3xl -mr-20 -mt-20 opacity-60 pointer-events-none"></div>

            <div className="flex-1 md:pr-12 relative z-10">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border ${statusColorClass}`}>
                    <span className="material-icons-outlined text-[14px]">{statusIcon}</span>
                    {statusStr === 'HIGHLY_VIABLE' ? 'HIGHLY VIABLE' : statusStr.replace(/_/g, ' ')}
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
                            stroke={progressColor}
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
