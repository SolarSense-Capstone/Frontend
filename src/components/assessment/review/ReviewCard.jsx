import React from "react";
import Typography from "../../ui/Typography";
import Card from "../../ui/Card";
import DieselDetails from "./DieselDetails";
import EquipmentSummary from "./EquipmentSummary";

export default function ReviewCard({ data, scenarioLabel }) {
  return (
    <Card className="p-6 bg-white border-gray-100">
      <div className="space-y-6">
        <div className="flex justify-between border-b border-gray-50 pb-4">
          <div>
            <Typography
              variant="caption"
              className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1"
            >
              Business
            </Typography>
            <Typography
              variant="body1"
              className="font-bold text-gray-800 capitalize"
            >
              {data.businessType?.replace?.("-", " ") || "—"}
            </Typography>
            {data.businessName ? (
              <Typography
                variant="caption"
                color="textSecondary"
                className="text-[11px]"
              >
                {data.businessName}
              </Typography>
            ) : null}
          </div>

          <div className="text-right">
            <Typography
              variant="caption"
              className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1"
            >
              Location
            </Typography>
            <Typography variant="body1" className="font-bold text-gray-800">
              {data.location?.city}, {data.location?.country}
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 border-b border-gray-50 pb-4">
          <div>
            <Typography
              variant="caption"
              className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1"
            >
              Scenario
            </Typography>
            <Typography variant="body1" className="font-bold text-[#2E7D32]">
              {scenarioLabel}
            </Typography>
          </div>

          <div>
            <Typography
              variant="caption"
              className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1"
            >
              Monthly Cost
            </Typography>
            <Typography variant="body1" className="font-bold text-gray-800">
              {data.currencySymbol || data.currencyCode || "$"}{" "}
              {Number(data.energy?.monthly_cost || 0).toLocaleString()}
            </Typography>
          </div>
        </div>

        {data.energy?.energy_scenario === "diesel_replacement" &&
        data.energy?.diesel ? (
          <DieselDetails data={data} />
        ) : null}

        <EquipmentSummary data={data} />
      </div>
    </Card>
  );
}
