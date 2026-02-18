import React from "react";
import Typography from "../../ui/Typography";

export default function VerdictBadge({ data, verdict }) {
  return (
    <div
      className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${verdict.bg} ${verdict.text}`}
    >
      <span className="material-icons-outlined text-[18px] mr-2">
        {verdict.icon}
      </span>
      <Typography
        variant="caption"
        className="font-black uppercase tracking-widest text-[10px]"
      >
        {data.status}
      </Typography>
    </div>
  );
}
