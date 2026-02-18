import React from "react";
import Button from "../../ui/Button";

export default function ResultsActions({ onReset }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-2">
      <Button
        onClick={() => {
          alert(
            "PDF download is backend-owned. Ask backend to provide report_url or assessment_id for /report.",
          );
        }}
        className="flex-1 py-4 shadow-xl group"
      >
        <span>Download PDF Summary</span>
        <span className="material-icons-outlined ml-2 group-hover:translate-y-1 transition-transform">
          download
        </span>
      </Button>

      <Button
        variant="outline"
        onClick={onReset}
        className="flex-1 py-4 font-bold border-2"
      >
        Re-run Assessment
      </Button>
    </div>
  );
}
