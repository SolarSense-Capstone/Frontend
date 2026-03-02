import React from 'react';
import formatMoney from "../../../../utils/format/formatMoney";
import formatNumber from "../../../../utils/format/formatNumber";

export default function CoverageAndFinancialRow({ data, currencySymbol }) {

    const coveragePercent = data?.predicted_generation_kwh && data?.estimated_consumption_kwh
        ? Math.round((data.predicted_generation_kwh / data.estimated_consumption_kwh) * 100)
        : 100;

    const clampedCoverage = Math.min(100, Math.max(0, coveragePercent));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            {/* Solar Coverage Analysis - 2/3 width */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Solar Coverage Analysis</h3>
                    <span className="text-xs font-bold text-[#00A190] bg-[#EEFbf4] px-2 py-1 rounded-md">{coveragePercent}% Coverage</span>
                </div>

                <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div
                        className="absolute top-0 left-0 h-full bg-[#00A190] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${clampedCoverage}%` }}
                    ></div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                    <span className="uppercase tracking-widest text-[#00A190] font-bold">Solar can cover {coveragePercent}% of your energy needs</span>
                    <span>{formatNumber(data.predicted_generation_kwh)} / {formatNumber(data.estimated_consumption_kwh)} kWh</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">Based on estimated consumption and projected generation.</p>
            </div>

            {/* Financial Impact - 1/3 width */}
            <div className="lg:col-span-1 bg-[#00A190] rounded-2xl p-6 md:p-8 text-white shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>

                <h3 className="text-sm font-bold opacity-80 uppercase tracking-widest mb-4 z-10 relative">Financial Impact</h3>

                <div className="mb-6 z-10 relative">
                    <p className="text-2xl md:text-3xl font-black leading-none mb-1 shadow-sm">{formatMoney(data.monthly_savings, currencySymbol)}</p>
                    <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Estimated Monthly Savings</p>
                </div>

                <div className="z-10 relative">
                    <p className="text-xl font-bold leading-none mb-1">{typeof data.roi_percentage === 'number' ? data.roi_percentage.toFixed(1) : '—'}%</p>
                    <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Projected ROI</p>
                </div>
            </div>

        </div>
    );
}
