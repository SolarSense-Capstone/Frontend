import React from 'react';
import formatMoney from "../../../../utils/format/formatMoney";
import formatNumber from "../../../../utils/format/formatNumber";

export default function CoverageAndFinancialRow({ data, currencySymbol, leftColumnOnly, rightColumnOnly }) {

    const coveragePercent = data?.predicted_generation_kwh && data?.estimated_consumption_kwh
        ? Math.round((data.predicted_generation_kwh / data.estimated_consumption_kwh) * 100)
        : 100;

    const clampedCoverage = Math.min(100, Math.max(0, coveragePercent));

    if (leftColumnOnly) {
        return (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col justify-center min-h-[160px]">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">Solar Coverage Analysis</h3>
                    <div className="bg-[#E8F5E9] text-[#2E7D32] px-3 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-bold">
                        {coveragePercent}% Coverage
                    </div>
                </div>

                <div className="relative w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div
                        className="absolute top-0 left-0 h-full bg-[#0F9D58] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${clampedCoverage}%` }}
                    ></div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[9px] uppercase font-bold tracking-[0.15em] text-gray-400 mb-1.5">
                    <span>SOLAR CAN COVER {coveragePercent}% OF YOUR ENERGY NEEDS</span>
                    <span className="text-gray-500 font-semibold tracking-normal">{formatNumber(data?.predicted_generation_kwh || 0)} / {formatNumber(data?.estimated_consumption_kwh || 0)} KWH</span>
                </div>
                <p className="text-[9px] text-gray-400 italic font-medium pt-1 border-t border-gray-100/50 mt-2">
                    Based on estimated consumption and projected generation.
                </p>
            </div>
        );
    }

    if (rightColumnOnly) {
        return (
            <div className="bg-[#0F9D58] rounded-xl p-6 md:p-8 text-white shadow-sm overflow-hidden relative">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-4 z-10 relative opacity-80">FINANCIAL IMPACT</h3>

                <div className="mb-6 z-10 relative">
                    <p className="text-[28px] font-bold leading-none mb-1.5">{formatMoney(data?.monthly_savings || 0, currencySymbol)}</p>
                    <p className="text-[9px] uppercase font-bold tracking-[0.15em] opacity-80">ESTIMATED MONTHLY SAVINGS</p>
                </div>

                <div className="z-10 relative">
                    <p className="text-[20px] font-bold leading-none mb-1.5">{typeof data?.roi_percentage === 'number' ? data.roi_percentage.toFixed(1) : '—'}%</p>
                    <p className="text-[9px] uppercase font-bold tracking-[0.15em] opacity-80">PROJECTED ROI</p>
                </div>
            </div>
        );
    }

    return null;
}
