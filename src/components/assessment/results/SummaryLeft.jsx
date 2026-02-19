import React from "react";
import Typography from "../../ui/Typography";
import VerdictBadge from "./VerdictBadge";

export default function SummaryLeft({ data, verdict }) {
  return (
    <>
      <VerdictBadge data={data} verdict={verdict} />

      <Typography variant="h3" className="mb-3 font-bold text-2xl">
        Viability Score:{" "}
        {typeof data.viability_score === "number"
          ? data.viability_score.toFixed(1)
          : "—"}{" "}
        / 100
      </Typography>

      <Typography
        variant="body1"
        className="text-gray-600 leading-relaxed mb-6"
      >
        {data.explanation || "—"}
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <Typography
            variant="caption"
            className="font-bold text-gray-400 uppercase tracking-widest text-[9px] mb-1 block"
          >
            Location
          </Typography>
          <Typography
            variant="body1"
            className="font-bold text-gray-800 text-sm"
          >
            {data.location || "—"}
          </Typography>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <Typography
            variant="caption"
            className="font-bold text-gray-400 uppercase tracking-widest text-[9px] mb-1 block"
          >
            Confidence
          </Typography>
          <Typography
            variant="body1"
            className="font-bold text-gray-800 text-sm"
          >
            {typeof data.confidence === "number"
              ? `${Math.round(data.confidence)}%`
              : "—"}
          </Typography>
        </div>
      </div>
    </>
  );
}
