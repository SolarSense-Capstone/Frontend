import React from "react";
import Typography from "../../../components/ui/Typography";
import Card from "../../../components/ui/Card";

export default function FridgeStepperCard({
  fridgeCount,
  incrementFridge,
  decrementFridge,
}) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-200">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-[#F1F8E9] p-3 rounded-xl">
              <span className="material-icons-outlined text-[#2E7D32] text-2xl">
                kitchen
              </span>
            </div>
            <div>
              <Typography
                variant="body1"
                className="font-semibold text-gray-800"
              >
                Refrigerators or freezers
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Estimate your main cooling load
              </Typography>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={decrementFridge}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#2E7D32] hover:bg-[#F1F8E9] active:scale-90 transition-all"
            >
              <span className="material-icons-outlined">remove</span>
            </button>

            <Typography
              variant="h3"
              className="w-8 text-center font-bold text-[#111827]"
            >
              {fridgeCount}
            </Typography>

            <button
              onClick={incrementFridge}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#2E7D32] hover:bg-[#F1F8E9] active:scale-90 transition-all"
            >
              <span className="material-icons-outlined">add</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
