import React from "react";
import Typography from "../ui/Typography";
import Button from "../ui/Button";

export default function CallToActionSection({ onStart }) {
  return (
    <section className="py-20 md:py-32 bg-[#2E7D32] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Typography
          variant="h2"
          className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 tracking-tighter uppercase"
        >
          Empower Your Business Today.
        </Typography>
        <Typography
          variant="body1"
          className="text-white/80 text-lg md:text-xl mb-10 md:mb-12 leading-relaxed"
        >
          Don't leave your energy future to chance. Get a data-backed assessment
          in less than 5 minutes.
        </Typography>
        <Button
          onClick={onStart}
          className="w-full sm:w-auto bg-white !text-[#2E7D32] hover:bg-[#F1F8E9] px-12 py-5 md:py-6 text-lg md:text-xl font-black rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          Start Your Free Analysis
        </Button>
      </div>
    </section>
  );
}
