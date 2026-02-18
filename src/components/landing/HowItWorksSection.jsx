import React from "react";
import Typography from "../ui/Typography";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <Typography
            variant="caption"
            className="text-[#2E7D32] font-black uppercase tracking-[0.3em] mb-4 block"
          >
            The Process
          </Typography>
          <Typography
            variant="h2"
            className="text-3xl md:text-5xl font-black text-gray-900 mb-6"
          >
            Simple Steps to Clarity
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg"
          >
            We've simplified complex energy engineering into a user-friendly
            process for busy entrepreneurs.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative">
          <div className="hidden md:block absolute top-1/4 left-[15%] right-[15%] h-px border-t-2 border-dashed border-gray-100 z-0" />

          {[
            {
              step: "01",
              title: "Describe Your Setup",
              desc: "Tell us about your refrigerators, freezers, and typical operating hours.",
              icon: "inventory_2",
              color: "bg-blue-50 text-blue-600",
            },
            {
              step: "02",
              title: "Location Context",
              desc: "We use regional irradiation data and local utility tariffs for precise modeling.",
              icon: "location_on",
              color: "bg-orange-50 text-orange-600",
            },
            {
              step: "03",
              title: "Instant Verdict",
              desc: "Get a clear status: Viable, Conditional, or Not Recommended, with saving estimates.",
              icon: "verified",
              color: "bg-green-50 text-green-600",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div
                className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:-translate-y-2 duration-300`}
              >
                <span className="material-icons-outlined text-3xl">
                  {item.icon}
                </span>
              </div>
              <Typography
                variant="caption"
                className="text-gray-300 font-black text-3xl mb-3 group-hover:text-gray-100 transition-colors"
              >
                {item.step}
              </Typography>
              <Typography
                variant="h3"
                className="text-xl font-black text-gray-900 mb-4"
              >
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                className="text-gray-500 leading-relaxed font-medium"
              >
                {item.desc}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
