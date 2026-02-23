import React, { useMemo, useState } from "react";
import { usdToLocal } from "../utils/currency/converter";

import FailureCard from "../components/assessment/results/FailureCard";

import VerdictSection from "../components/assessment/results/Dashboard/VerdictSection";
import MetricsRow from "../components/assessment/results/Dashboard/MetricsRow";
import CoverageAndFinancialRow from "../components/assessment/results/Dashboard/CoverageAndFinancialRow";
import CostAndEnergyMixRow from "../components/assessment/results/Dashboard/CostAndEnergyMixRow";
import ProjectionAndSeasonalityRow from "../components/assessment/results/Dashboard/ProjectionAndSeasonalityRow";

const mapDataToLocalCurrency = (data, currencyCode) => {
  if (!data || !currencyCode) return data;
  const mapped = { ...data };

  // Root-level money fields
  ['monthly_savings', 'system_cost', 'system_cost_estimate'].forEach(field => {
    if (typeof mapped[field] === 'number') {
      mapped[field] = usdToLocal(mapped[field], currencyCode);
    }
  });

  // current_energy_cost sub-fields
  if (mapped.current_energy_cost) {
    mapped.current_energy_cost = { ...mapped.current_energy_cost };
    ['total_monthly', 'diesel_monthly', 'grid_monthly'].forEach(field => {
      if (typeof mapped.current_energy_cost[field] === 'number') {
        mapped.current_energy_cost[field] = usdToLocal(mapped.current_energy_cost[field], currencyCode);
      }
    });
  }

  // diesel_details sub-fields
  if (mapped.diesel_details) {
    mapped.diesel_details = { ...mapped.diesel_details };
    ['effective_tariff', 'price_per_liter'].forEach(field => {
      if (typeof mapped.diesel_details[field] === 'number') {
        mapped.diesel_details[field] = usdToLocal(mapped.diesel_details[field], currencyCode);
      }
    });
  }

  // Replace "$" with local currency symbol in explanation if it exists
  if (mapped.explanation && typeof mapped.explanation === 'string') {
    mapped.explanation = mapped.explanation.replace(/\$/g, currencySymbol);
  }

  return mapped;
};

export default function ResultsScreen({ onReset, currencySymbol, currencyCode, outcome }) {
  const ok = outcome?.ok;

  const data = useMemo(() => {
    return ok && outcome?.data ? mapDataToLocalCurrency(outcome.data, currencyCode, currencySymbol) : null;
  }, [ok, outcome?.data, currencyCode, currencySymbol]);

  const [showHelp, setShowHelp] = useState(false);

  const handleFeatureUnavailable = () => {
    alert("This feature is temporarily unavailable. Please screenshot your results.");
  };

  if (!ok) {
    return (
      <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto w-full">
          <FailureCard outcome={outcome} onReset={onReset} showHelp={showHelp} setShowHelp={setShowHelp} />
        </div>
      </div>
    );
  }

  const score = data?.viability_score || 0;

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-4 md:px-8 py-8">
      <div className="max-w-[1100px] mx-auto w-full animate-slide-up opacity-0">

        {/* Verdict */}
        <VerdictSection data={data} score={score} />

        {/* Metric Cards */}
        <MetricsRow data={data} currencySymbol={currencySymbol} />

        {/* 2-Column Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <CoverageAndFinancialRow data={data} currencySymbol={currencySymbol} leftColumnOnly />
            <CostAndEnergyMixRow data={data} currencySymbol={currencySymbol} leftColumnOnly />
            <ProjectionAndSeasonalityRow data={data} leftColumnOnly />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            <CoverageAndFinancialRow data={data} currencySymbol={currencySymbol} rightColumnOnly />
            <CostAndEnergyMixRow data={data} currencySymbol={currencySymbol} rightColumnOnly />
            <ProjectionAndSeasonalityRow data={data} rightColumnOnly />
          </div>
        </div>

        {/* Footer Actions — always BELOW all cards */}
        <div className="mt-12 mb-6 flex flex-col items-center gap-6">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-[#0F9D58] font-bold text-[14px] hover:opacity-75 transition-opacity"
          >
            <span className="material-icons-outlined text-[16px]">refresh</span>
            Run Another Assessment
          </button>

          <div className="w-full max-w-sm">
            <button
              onClick={handleFeatureUnavailable}
              className="w-full flex items-center justify-center gap-2 bg-[#2D7337] text-white py-4 rounded-xl font-bold hover:bg-[#1f5628] transition-colors shadow-lg shadow-[#2D7337]/20 text-[14px]"
            >
              <span className="material-icons-outlined text-[18px]">email</span>
              Send to Email
            </button>
          </div>
        </div>

        {data?.analyzed_at && (
          <div className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 pb-12 opacity-60">
            Assessment generated on {new Date(data.analyzed_at).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        )}
      </div>
    </div>
  );
}
