import React, { useMemo, useState } from "react";
import { usdToLocal } from "../utils/currency/converter";
import { sendAssessmentReport } from "../services/api";

import FailureCard from "../components/assessment/results/FailureCard";

// New Dashboard Components
import VerdictSection from "../components/assessment/results/Dashboard/VerdictSection";
import MetricsRow from "../components/assessment/results/Dashboard/MetricsRow";
import CoverageAndFinancialRow from "../components/assessment/results/Dashboard/CoverageAndFinancialRow";
import CostAndEnergyMixRow from "../components/assessment/results/Dashboard/CostAndEnergyMixRow";
import ProjectionAndSeasonalityRow from "../components/assessment/results/Dashboard/ProjectionAndSeasonalityRow";

// Helper to convert known money-related fields from backend USD to local
const mapDataToLocalCurrency = (data, currencyCode) => {
  if (!data || !currencyCode) return data;

  const mapped = { ...data };

  // Convert root level money fields
  const moneyFields = [
    'monthly_savings',
    'system_cost'
  ];

  moneyFields.forEach(field => {
    if (typeof mapped[field] === 'number') {
      mapped[field] = usdToLocal(mapped[field], currencyCode);
    }
  });

  // Convert current energy baseline fields
  if (mapped.current_energy_cost) {
    mapped.current_energy_cost = { ...mapped.current_energy_cost };
    const currentEnergyFields = [
      'total_monthly',
      'diesel_monthly',
      'grid_monthly'
    ];
    currentEnergyFields.forEach(field => {
      if (typeof mapped.current_energy_cost[field] === 'number') {
        mapped.current_energy_cost[field] = usdToLocal(mapped.current_energy_cost[field], currencyCode);
      }
    });
  }

  // Convert nested diesel fields
  if (mapped.diesel_details) {
    mapped.diesel_details = { ...mapped.diesel_details };
    const dieselMoneyFields = [
      'effective_tariff',
      'price_per_liter'
    ];
    dieselMoneyFields.forEach(field => {
      if (typeof mapped.diesel_details[field] === 'number') {
        mapped.diesel_details[field] = usdToLocal(mapped.diesel_details[field], currencyCode);
      }
    });
  }

  return mapped;
};

export default function ResultsScreen({ onReset, currencySymbol, currencyCode, outcome }) {
  // outcome: { ok: boolean, data?: object, error?: object }
  const ok = outcome?.ok;

  // Apply conversion strictly for display
  const data = useMemo(() => {
    return ok && outcome?.data ? mapDataToLocalCurrency(outcome.data, currencyCode) : null;
  }, [ok, outcome?.data, currencyCode]);

  const [showHelp, setShowHelp] = useState(false);

  // Email Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async () => {
    if (!emailValue) return;
    setIsSending(true);
    try {
      const id = data?.assessment_id || "placeholder_id";
      await sendAssessmentReport(id, emailValue);
      alert("Report sent to your email successfully!");
      setIsEmailModalOpen(false);
      setEmailValue("");
    } catch (err) {
      console.error(err);
      alert("Failed to send report. Please ensure the backend is running and configured correctly.");
    } finally {
      setIsSending(false);
    }
  };

  if (!ok) {
    return (
      <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto w-full">
          <FailureCard
            outcome={outcome}
            onReset={onReset}
            showHelp={showHelp}
            setShowHelp={setShowHelp}
          />
        </div>
      </div>
    );
  }

  // Generate a mock score if one doesn't exist
  const score = typeof data?.viability_score === 'number' ? data.viability_score : 92.4;

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-4 md:px-8 py-10 relative">
      <div className="max-w-[1200px] mx-auto w-full space-y-6 animate-slide-up opacity-0">

        {/* Top Verdict Section */}
        <VerdictSection data={data} score={score} />

        {/* 4 Metrics Row */}
        <MetricsRow data={data} currencySymbol={currencySymbol} />

        {/* Solar Coverage Analysis & Financial Impact */}
        <CoverageAndFinancialRow data={data} currencySymbol={currencySymbol} />

        {/* Monthly Energy Cost Comparison & Energy Mix */}
        <CostAndEnergyMixRow data={data} currencySymbol={currencySymbol} />

        {/* 25-Year Projection & Seasonality */}
        <ProjectionAndSeasonalityRow data={data} />

        {/* Action Buttons Footer */}
        <div className="pt-10 pb-20 flex flex-col items-center">
          <button onClick={onReset} className="flex items-center gap-1.5 text-[#00A190] font-bold text-sm mb-6 hover:opacity-80 transition-opacity">
            <span className="material-icons-outlined text-[16px]">refresh</span>
            Run Another Assessment
          </button>

          <div className="flex flex-col sm:flex-row w-full max-w-2xl gap-4">
            <button
              onClick={() => {
                if (data?.report_url) {
                  window.open(data.report_url, "_blank");
                } else {
                  alert("The report PDF URL is not available. The backend needs to supply 'report_url' in its response.");
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#2E7D32] text-white py-4 rounded-xl font-bold hover:bg-[#1B5E20] transition-colors shadow-lg"
            >
              <span className="material-icons-outlined text-[18px]">download</span>
              Download Detailed Report
            </button>
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-[#2E7D32] border border-[#2E7D32] py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              <span className="material-icons-outlined text-[18px]">email</span>
              Send to Email
            </button>
          </div>
        </div>

      </div>

      {/* Email Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-up">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Send Report to Email</h2>
            <p className="text-sm text-gray-500 mb-6">Enter your email address to receive a detailed PDF breakdown of this solar assessment.</p>

            <input
              type="email"
              placeholder="name@company.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#00A190] focus:ring-1 focus:ring-[#00A190] mb-6"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />

            <div className="flex gap-4">
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSending || !emailValue}
                className="flex-1 py-3 bg-[#00A190] text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isSending ? (
                  <>
                    <span className="material-icons-outlined animate-spin text-[18px]">autorenew</span>
                    Sending...
                  </>
                ) : (
                  "Send Report"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
