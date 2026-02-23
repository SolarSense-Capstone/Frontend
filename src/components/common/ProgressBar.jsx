import React from 'react';

export default function ProgressBar({ step, totalSteps }) {
    const percentage = Math.min(100, Math.max(0, Math.round((step / totalSteps) * 100)));

    return (
        <div className="w-full max-w-2xl mx-auto mb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                <span>Step {step} of {totalSteps}</span>
                <span className="text-[#2E7D32]">{percentage}% Complete</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#2E7D32] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
