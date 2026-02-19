import React from "react";
import Typography from "../../ui/Typography";
import Card from "../../ui/Card";

export default function StepsCard({ steps, currentStepIndex }) {
  return (
    <Card className="p-8 text-left mb-6 shadow-xl border-gray-100">
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isComplete = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          return (
            <div
              key={index}
              className={`flex items-center space-x-4 transition-all duration-500 ${
                isActive ? "scale-105 origin-left" : "scale-100"
              } ${index > currentStepIndex ? "opacity-30" : "opacity-100"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isComplete
                    ? "bg-[#2E7D32]"
                    : isActive
                      ? "bg-[#F9A825]"
                      : "bg-gray-200"
                }`}
              >
                {isComplete ? (
                  <span className="material-icons-outlined text-white text-[16px]">
                    check
                  </span>
                ) : (
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                )}
              </div>

              <Typography
                variant="body1"
                className={`font-semibold ${
                  isActive
                    ? "text-[#111827]"
                    : isComplete
                      ? "text-[#2E7D32]"
                      : "text-[#6B7280]"
                }`}
              >
                {step}
              </Typography>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
