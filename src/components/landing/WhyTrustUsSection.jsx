import React from "react";
import Typography from "../ui/Typography";
import Card from "../ui/Card";

export default function WhyTrustUsSection() {
  return (
    <section
      id="why-trust-us"
      className="py-20 md:py-32 bg-[#F9FAFB] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div>
          <Typography
            variant="caption"
            className="text-[#2E7D32] font-black uppercase tracking-[0.3em] mb-4 block"
          >
            Our Commitment
          </Typography>
          <Typography
            variant="h2"
            className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight"
          >
            Independence is Our Product
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 text-base md:text-lg mb-10 leading-relaxed"
          >
            Unlike solar installers, we don't make money by selling you panels.
            Our only goal is to give you the truth about your energy costs.
          </Typography>

          <div className="space-y-6">
            {[
              {
                title: "No Commission Bias",
                desc: "We are 100% independent. We take zero referral fees from solar companies.",
              },
              {
                title: "Regional Specificity",
                desc: "Our AI models account for grid instability and diesel costs common in SSA.",
              },
              {
                title: "Conservative Modeling",
                desc: "We assume worst-case scenarios so your results are realistic, not optimistic.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-[#2E7D32]/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-icons-outlined text-[#2E7D32] text-sm">
                    check
                  </span>
                </div>
                <div>
                  <Typography
                    variant="body1"
                    className="font-black text-gray-900 mb-1"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-gray-500 font-medium text-xs md:text-sm"
                  >
                    {item.desc}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-8 items-start">
          <div className="space-y-4 md:space-y-8">
            <Card className="p-6 md:p-8 bg-white border-none shadow-xl flex flex-col items-center text-center transform transition-transform hover:-translate-y-2">
              <span className="material-icons-outlined text-[#2E7D32] text-3xl md:text-4xl mb-4 md:mb-6">
                security
              </span>
              <Typography
                variant="h3"
                className="text-2xl md:text-3xl font-black text-gray-900 mb-1"
              >
                100%
              </Typography>
              <Typography
                variant="caption"
                className="text-gray-400 font-bold uppercase tracking-widest text-[8px] md:text-[10px]"
              >
                Private Data
              </Typography>
            </Card>

            <Card className="p-6 md:p-8 bg-white border-none shadow-xl flex flex-col items-center text-center transform transition-transform hover:-translate-y-2">
              <span className="material-icons-outlined text-[#2E7D32] text-3xl md:text-4xl mb-4 md:mb-6">
                public
              </span>
              <Typography
                variant="h3"
                className="text-2xl md:text-3xl font-black text-gray-900 mb-1"
              >
                Local
              </Typography>
              <Typography
                variant="caption"
                className="text-gray-400 font-bold uppercase tracking-widest text-[8px] md:text-[10px]"
              >
                Energy Markets
              </Typography>
            </Card>
          </div>

          <div className="space-y-4 md:space-y-8 mt-6 md:mt-12">
            <Card className="p-6 md:p-8 bg-white border-none shadow-xl flex flex-col items-center text-center transform transition-transform hover:-translate-y-2">
              <span className="material-icons-outlined text-[#2E7D32] text-3xl md:text-4xl mb-4 md:mb-6">
                bolt
              </span>
              <Typography
                variant="h3"
                className="text-xl md:text-2xl font-black text-gray-900 mb-1 leading-tight"
              >
                AI-Powered
              </Typography>
              <Typography
                variant="caption"
                className="text-gray-400 font-bold uppercase tracking-widest text-[8px] md:text-[10px]"
              >
                Precision Analysis
              </Typography>
            </Card>

            <Card className="p-6 md:p-8 bg-white border-none shadow-xl flex flex-col items-center text-center transform transition-transform hover:-translate-y-2">
              <span className="material-icons-outlined text-[#2E7D32] text-3xl md:text-4xl mb-4 md:mb-6">
                description
              </span>
              <Typography
                variant="h3"
                className="text-2xl md:text-3xl font-black text-gray-900 mb-1"
              >
                Zero
              </Typography>
              <Typography
                variant="caption"
                className="text-gray-400 font-bold uppercase tracking-widest text-[8px] md:text-[10px]"
              >
                Sales Pressure
              </Typography>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
