import React from "react";

export default function ErrorStateCard({ errorState }) {
  return (
    <div className="p-4 rounded-xl bg-white border border-red-100 text-left">
      <div className="flex items-start gap-2">
        <span className="material-icons-outlined text-red-500">
          error_outline
        </span>
        <div>
          <p className="text-sm font-bold text-gray-900">
            We couldn’t complete your assessment.
          </p>
          <p className="text-xs text-gray-500 mt-1">{errorState.message}</p>
          {errorState.status ? (
            <p className="text-[10px] text-gray-400 mt-2">
              Error code: {errorState.status}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
