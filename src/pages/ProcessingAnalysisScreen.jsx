import React, { useEffect, useState } from "react";
import StepsCard from "../components/assessment/processing/StepsCard";
import ErrorStateCard from "../components/assessment/processing/ErrorStateCard";
import ProcessingHeader from "../components/assessment/processing/ProcessingHeader";
import { analyzeAssessment } from "../services/api";
import buildAnalyzePayload from "../utils/assessment/buildAnalyzePayload";

const STEPS = [
  "Submitting your inputs to the backend",
  "Running solar + ROI models",
  "Assembling your results",
];

export default function ProcessingAnalysisScreen({ onComplete, formData }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const payload = buildAnalyzePayload(formData);
        const data = await analyzeAssessment(payload);

        // Backend doc: may return 503 with { status: "INCOMPLETE" }
        if (data?.status === "INCOMPLETE") {
          throw Object.assign(new Error("Analysis incomplete"), {
            status: 503,
            data,
          });
        }

        if (!cancelled) setResult(data);
      } catch (err) {
        if (cancelled) return;
        setErrorState({
          status: err.status || 0,
          message:
            err.data?.message ||
            err.data?.error ||
            err.message ||
            "Unable to complete analysis",
        });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [formData]);

  useEffect(() => {
    const interval = 1000;
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStepIndex === STEPS.length - 1) {
      if (result) {
        const t = setTimeout(() => onComplete({ ok: true, data: result }), 700);
        return () => clearTimeout(t);
      }
      if (errorState) {
        const t = setTimeout(
          () => onComplete({ ok: false, error: errorState }),
          700,
        );
        return () => clearTimeout(t);
      }
    }
  }, [currentStepIndex, result, errorState, onComplete]);

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 py-12 md:py-24 items-center justify-center">
      <div className="max-w-md w-full text-center">
        <ProcessingHeader />

        <StepsCard steps={STEPS} currentStepIndex={currentStepIndex} />

        {errorState ? <ErrorStateCard errorState={errorState} /> : null}
      </div>
    </div>
  );
}
