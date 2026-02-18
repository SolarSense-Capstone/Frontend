import React from "react";
import Button from "../ui/Button";

export default function StickyContinue({ canContinue, onClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 z-50 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={onClick}
          className={`w-full py-4 text-lg shadow-lg ${
            !canContinue
              ? "opacity-50 cursor-not-allowed grayscale"
              : "hover:-translate-y-1 active:scale-95"
          }`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
