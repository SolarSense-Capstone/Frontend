import React from "react";
import Typography from "../../../components/ui/Typography";
import Card from "../../../components/ui/Card";

export default function MonthlyCostCard({ monthlyCost, setMonthlyCost }) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-500">
      <Card className="p-6">
        <div className="mb-4 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <span className="material-icons-outlined text-green-600 text-2xl">
              attach_money
            </span>
          </div>
          <div>
            <Typography variant="body1" className="font-semibold text-gray-800">
              Estimated monthly cost
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Your current energy bills
            </Typography>
          </div>
        </div>

        <input
          type="number"
          value={monthlyCost}
          onChange={(e) => setMonthlyCost(e.target.value)}
          placeholder="Enter amount"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 font-bold focus:ring-2 focus:ring-[#2E7D32] outline-none"
        />
      </Card>
    </div>
  );
}
