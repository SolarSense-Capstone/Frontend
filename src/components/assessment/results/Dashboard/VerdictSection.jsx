import React from 'react';

export default function VerdictSection({ data, score }) {
    // Score mapping logic
    const normalizedScore = typeof score === 'number' ? score : (data?.viability_score || 0);

    // Dynamic theming based on status
    const rawStatus = (data?.status || '').toUpperCase().replace(' ', '_');
    let themeColor = "#2E7D32"; // default green
    let bgColor = "#EEFbf4";
    let blurColor = "#f2fdfa";
    let iconName = "check_circle";

    if (rawStatus.includes('MODERATE') || rawStatus === 'VIABLE') {
        themeColor = "#F59E0B"; // amber
        bgColor = "#FEF3C7";
        blurColor = "#fffbeb";
        iconName = "info";
    } else if (rawStatus.includes('NOT') || rawStatus.includes('LOW')) {
        themeColor = "#EF4444"; // red
        bgColor = "#FEE2E2";
        blurColor = "#fef2f2";
        iconName = "warning";
    }

    // SVG drawing logic for the semi-circle
    const radius = 60;
    const strokeWidth = 12;
    const circumference = Math.PI * radius; // length of half circle
    const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

    return (
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
            {/* Background purely aesthetic gradient decoration behind */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[80px] -mr-32 -mt-32 opacity-40 pointer-events-none" style={{ backgroundColor: blurColor }}></div>

            <div className="flex-1 md:pr-12 relative z-10">
                <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4"
                    style={{ backgroundColor: bgColor, color: themeColor }}
                >
                    <span className="material-icons-outlined text-[13px]">{iconName}</span>
                    {data?.status?.replace('_', ' ')}
                </div>

                <h2 className="text-[26px] font-bold text-gray-900 mb-3 tracking-tight">
                    Solar Viability Verdict {data?.business_name && `(${data.business_name})`}
                </h2>

                <p className="text-gray-600 leading-relaxed text-[14px] max-w-2xl mb-6">
                    {data?.explanation || "Analysis complete. Your solar viability assessment is ready."}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400">
                    <span className="material-icons-outlined text-[14px]">auto_graph</span>
                    Confidence Level: <span className="text-gray-700">{typeof data?.confidence === "number" ? `${Math.round(data.confidence)}%` : "N/A"}</span>
                </div>
            </div>

            <div className="mt-10 md:mt-0 flex flex-col items-center relative z-10 md:scale-110 md:mr-6">
                <div className="relative w-40 h-24 flex items-end justify-center">
                    {/* SVG Semi Circle Gauge */}
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 160 80">
                        {/* Background Track */}
                        <path
                            d="M 20 80 A 60 60 0 0 1 140 80"
                            fill="none"
                            stroke="#F3F6FF"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                        />
                        {/* Progress Arc */}
                        <path
                            d="M 20 80 A 60 60 0 0 1 140 80"
                            fill="none"
                            stroke={themeColor}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="flex flex-col items-center leading-none mb-1 translate-y-2">
                        <span className="text-[32px] font-black text-gray-900 tracking-tight">{normalizedScore.toFixed(1)}</span>
                        <span className="text-[9px] uppercase font-bold text-gray-400 tracking-[0.2em] mt-1">Score</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
