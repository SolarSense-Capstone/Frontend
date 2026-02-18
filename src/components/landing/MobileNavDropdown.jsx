import React from "react";
import Button from "../ui/Button";

export default function MobileNavDropdown({
  isMobileMenuOpen,
  onStart,
  scrollToSection,
}) {
  return (
    <div
      className={`absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-2xl transition-all duration-300 transform md:hidden overflow-hidden ${
        isMobileMenuOpen
          ? "max-h-[400px] opacity-100"
          : "max-h-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="p-6 flex flex-col space-y-5">
        <button
          onClick={() => scrollToSection("how-it-works")}
          className="text-left text-sm font-black text-gray-800 hover:text-[#2E7D32] py-2"
        >
          How it works
        </button>
        <button
          onClick={() => scrollToSection("why-trust-us")}
          className="text-left text-sm font-black text-gray-800 hover:text-[#2E7D32] py-2"
        >
          Why trust us
        </button>
        <Button
          onClick={onStart}
          className="w-full py-4 text-sm font-black rounded-2xl shadow-xl"
        >
          Start Assessment
        </Button>
      </div>
    </div>
  );
}
