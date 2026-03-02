import React from "react";
import Button from "../../ui/Button";

export default function ReviewStickyActions({ onBack, onContinue }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 z-50 animate-fade-in">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-1/2 py-4 text-lg shadow-xl hover:-translate-y-1 active:scale-95 group"
        >
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="w-full sm:w-1/2 py-4 text-lg shadow-xl hover:-translate-y-1 active:scale-95 group"
        >
          <span>Start Analysis</span>
          {/* <span className="material-icons-outlined ml-2 group-hover:translate-x-1 transition-transform">
            analytics
          </span> */}
        </Button>
      </div>
    </div>
  );
}
