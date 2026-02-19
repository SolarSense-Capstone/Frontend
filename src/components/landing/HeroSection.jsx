import React from "react";
import Typography from "../ui/Typography";
import Button from "../ui/Button";

export default function HeroSection({ onStart, scrollToSection }) {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center pt-36 md:pt-48 pb-12 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[60%] lg:w-1/2 h-full bg-[#F1F8E9] -skew-x-12 translate-x-1/4 z-0" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2E7D32]/5 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
        <div className="animate-slide-up flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-[#E8F5E9] px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-8 border border-[#2E7D32]/10">
            <span className="w-2 h-2 bg-[#2E7D32] rounded-full animate-ping" />
            <Typography
              variant="caption"
              className="text-[#2E7D32] font-black uppercase tracking-widest text-[14px] md:text-[10px]"
            >
              Independent Solar Intelligence for SMEs
            </Typography>
          </div>

          <Typography
            variant="h1"
            className="text-[52px] md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 md:mb-8 tracking-tighter"
          >
            Stop Guessing. <br />
            <span className="text-[#2E7D32]">Start Saving.</span>
          </Typography>

          <Typography
            variant="body1"
            className="text-base md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            The first independent tool built for Sub-Saharan African businesses
            to accurately assess solar potential without the sales pitch.
          </Typography>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              onClick={onStart}
              className="w-full sm:w-auto px-6 py-3 text-sm md:px-10 md:py-5 md:text-lg font-bold rounded-2xl shadow-xl shadow-[#2E7D32]/30 hover:-translate-y-1 transition-all"
            >
              Check Solar Viability
            </Button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="flex items-center space-x-3 text-gray-700 font-bold hover:text-[#2E7D32] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-[#F1F8E9] transition-colors">
                <span className="material-icons-outlined text-gray-700">
                  play_arrow
                </span>
              </div>
              <span>See how it works</span>
            </button>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-3 gap-2 md:gap-8 pt-6 md:pt-8 border-t border-gray-100 max-w-[240px] md:max-w-none mx-auto lg:mx-0">
            <div>
              <Typography
                variant="h3"
                className="text-lg md:text-2xl font-black text-gray-900"
              >
                5 Min
              </Typography>
              <Typography
                variant="caption"
                className="text-gray-500 font-medium text-[8px] md:text-xs"
              >
                Quick Assessment
              </Typography>
            </div>
            <div className="w-px h-10 bg-gray-200 justify-self-center" />
            <div>
              <Typography
                variant="h3"
                className="text-lg md:text-2xl font-black text-gray-900"
              >
                100%
              </Typography>
              <Typography
                variant="caption"
                className="text-gray-500 font-medium text-[8px] md:text-xs"
              >
                Unbiased Data
              </Typography>
            </div>
          </div>
        </div>

        <div className="animate-fade-in animation-delay-400 lg:mt-0 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 bg-white p-4 md:p-6 rounded-3xl shadow-2xl border border-gray-50 z-20 animate-bounce-slow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2E7D32] rounded-full flex items-center justify-center text-white">
                  <span className="material-icons-outlined text-sm md:text-base">
                    trending_down
                  </span>
                </div>
                <div>
                  <Typography
                    variant="caption"
                    className="text-gray-400 font-bold uppercase text-[8px] md:text-[9px]"
                  >
                    Potential Saving
                  </Typography>
                  <Typography
                    variant="body1"
                    className="font-black text-gray-900 text-sm md:text-base"
                  >
                    45% Monthly
                  </Typography>
                </div>
              </div>
              <div className="w-full h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[45%] h-full bg-[#2E7D32]" />
              </div>
            </div>

            <div className="rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl border-4 md:border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800"
                alt="Solar Panel Installation"
                className="w-full h-[180px] sm:h-[350px] md:h-[500px] object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[#111827] text-white p-4 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl max-w-[180px] md:max-w-xs z-20">
              <Typography
                variant="body1"
                className="italic font-medium mb-2 md:mb-4 opacity-90 text-[10px] md:text-sm leading-relaxed"
              >
                Cut energy costs with confidence.
              </Typography>

              <Typography
                variant="caption"
                className="font-semibold text-[#2E7D32] text-[10px] md:text-xs tracking-wide"
              >
                Discover potential savings, system size, and ROI before
                investing in solar.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
