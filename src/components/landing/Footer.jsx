import React from "react";
import Typography from "../ui/Typography";
import NewsletterForm from "./NewsletterForm";

export default function Footer({
  scrollToSection,
  onStart,
  email,
  setEmail,
  subscribed,
  handleSubscribe,
}) {
  return (
    <footer className="bg-[#111827] text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 md:mb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#2E7D32] rounded-xl flex items-center justify-center text-white">
                <span className="material-icons-outlined text-2xl">
                  wb_sunny
                </span>
              </div>
              <Typography
                variant="h3"
                className="font-black tracking-tight text-white"
              >
                SolarSense <span className="text-[#2E7D32]">AI</span>
              </Typography>
            </div>

            <Typography
              variant="body1"
              className="text-gray-400 text-sm leading-relaxed font-medium"
            >
              We provide independent, AI-driven solar viability assessments for
              SMEs across Sub-Saharan Africa. No bias, just results.
            </Typography>

            <div className="flex items-center space-x-4">
              {["facebook", "alternate_email", "language"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#2E7D32] hover:text-white hover:border-[#2E7D32] transition-all"
                >
                  <span className="material-icons-outlined text-lg">
                    {icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <Typography
              variant="caption"
              className="text-white font-black uppercase tracking-widest text-[11px] mb-6 md:mb-8 block"
            >
              Navigation
            </Typography>

            <ul className="space-y-4">
              {[
                { label: "Home", action: () => scrollToSection("home") },
                {
                  label: "How it works",
                  action: () => scrollToSection("how-it-works"),
                },
                {
                  label: "Why trust us",
                  action: () => scrollToSection("why-trust-us"),
                },
                { label: "Start Assessment", action: onStart },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-gray-400 hover:text-[#2E7D32] text-sm font-black transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography
              variant="caption"
              className="text-white font-black uppercase tracking-widest text-[11px] mb-6 md:mb-8 block"
            >
              Resources
            </Typography>

            <ul className="space-y-4">
              {[
                "Knowledge Base",
                "Solar ROI Calculator",
                "Installer Directory",
                "Energy Policy",
                "SME Grants",
              ].map((label) => (
                <li
                  key={label}
                  className="text-gray-400 text-sm font-black opacity-80 cursor-default"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography
              variant="caption"
              className="text-white font-black uppercase tracking-widest text-[11px] mb-6 md:mb-8 block"
            >
              Join our Newsletter
            </Typography>

            <Typography
              variant="body1"
              className="text-gray-400 text-xs mb-6 font-medium leading-relaxed"
            >
              Receive the latest insights on commercial solar technology and
              energy savings tips.
            </Typography>

            <NewsletterForm
              email={email}
              setEmail={setEmail}
              subscribed={subscribed}
              handleSubscribe={handleSubscribe}
            />
          </div>
        </div>

        <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          <Typography
            variant="caption"
            className="text-gray-500 text-[10px] font-bold uppercase tracking-widest"
          >
            &copy; {new Date().getFullYear()} SolarSense AI. Independent
            Decision Support.
          </Typography>

          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
