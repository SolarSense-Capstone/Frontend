import React from "react";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import MobileNavDropdown from "./MobileNavDropdown";

export default function LandingHeader({
  isScrolled,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onStart,
  scrollToSection,
}) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => scrollToSection("home")}
        >
          <div className="w-10 h-10 bg-[#2E7D32] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#2E7D32]/20 transform transition-transform group-hover:rotate-12">
            <span className="material-icons-outlined text-2xl">wb_sunny</span>
          </div>
          <Typography
            variant="h3"
            className={`font-black tracking-tight text-xl md:text-2xl transition-colors text-[#111827]`}
          >
            SolarSense <span className="text-[#2E7D32]">AI</span>
          </Typography>
        </div>

        <nav className="hidden md:flex items-center space-x-10">
          {["How it works", "Why trust us"].map((item) => (
            <button
              key={item}
              onClick={() =>
                scrollToSection(item.toLowerCase().replace(/ /g, "-"))
              }
              className={`text-sm font-bold transition-all hover:text-[#2E7D32] text-gray-700`}
            >
              {item}
            </button>
          ))}
          <Button
            onClick={onStart}
            className="px-6 py-2.5 text-sm rounded-full shadow-md"
          >
            Start Assessment
          </Button>
        </nav>

        <button
          className={`md:hidden p-2 rounded-lg transition-colors text-gray-900`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-icons-outlined text-3xl">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      <MobileNavDropdown
        isMobileMenuOpen={isMobileMenuOpen}
        onStart={onStart}
        scrollToSection={scrollToSection}
      />
    </header>
  );
}
