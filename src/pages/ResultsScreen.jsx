import React, { useMemo, useState } from "react";
import Card from "../components/ui/Card";

import formatMoney from "../utils/format/formatMoney";
import formatNumber from "../utils/format/formatNumber";
import statusColor from "../utils/results/statusColor";

import ResultsHeader from "../components/assessment/results/ResultsHeader";
import FailureCard from "../components/assessment/results/FailureCard";
import SummaryLeft from "../components/assessment/results/SummaryLeft";
import SavingsCard from "../components/assessment/results/SavingsCard";
import KeyMetricsCard from "../components/assessment/results/KeyMetricsCard";
import DieselEconomicsCard from "../components/assessment/results/DieselEconomicsCard";
import ResultsActions from "../components/assessment/results/ResultsActions";

export default function ResultsScreen({ onReset, currencySymbol, outcome }) {
  // outcome: { ok: boolean, data?: object, error?: object }
  const ok = outcome?.ok;
  const data = outcome?.data;

  const [showHelp, setShowHelp] = useState(false);

  const verdict = useMemo(() => {
    if (!ok || !data) return null;
    return statusColor(data.status);
  }, [ok, data]);

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

  // Derived values per doc
  const coveragePercent =
    data?.predicted_generation_kwh && data?.estimated_consumption_kwh
      ? Math.round(
          (data.predicted_generation_kwh / data.estimated_consumption_kwh) *
            100,
        )
      : null;

  const annualSavings =
    typeof data?.monthly_savings === "number"
      ? data.monthly_savings * 12
      : null;

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 py-12 md:py-20">
      <div className="max-w-5xl mx-auto w-full">
        <ResultsHeader data={data} />

        <div className="space-y-6 animate-slide-up opacity-0">
          <Card className="p-8 border-none shadow-xl bg-white">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <SummaryLeft data={data} verdict={verdict} />
              </div>

              <div className="w-full lg:w-[360px] flex flex-col gap-4">
                <SavingsCard
                  data={data}
                  currencySymbol={currencySymbol}
                  annualSavings={annualSavings}
                  formatMoney={formatMoney}
                />

                <KeyMetricsCard
                  data={data}
                  currencySymbol={currencySymbol}
                  coveragePercent={coveragePercent}
                  formatMoney={formatMoney}
                  formatNumber={formatNumber}
                />
              </div>
            </div>
          </Card>

          {data.energy_scenario === "diesel_replacement" &&
          data.diesel_details ? (
            <DieselEconomicsCard data={data} />
          ) : null}

          <ResultsActions onReset={onReset} data={data} />
        </div>
      </div>
    </div>
  );
}
