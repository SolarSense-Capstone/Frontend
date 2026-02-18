import React, { useState } from "react";
import LandingHeader from "../components/landing/LandingHeader";
import HeroSection from "../components/landing/HeroSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import WhyTrustUsSection from "../components/landing/WhyTrustUsSection";
import CallToActionSection from "../components/landing/CallToActionSection";
import Footer from "../components/landing/Footer";
import useScrollShadow from "../hooks/useScrollShadow";

const LandingScreen = ({ onStart }) => {
  const isScrolled = useScrollShadow(20);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToSection = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-x-hidden">
      <LandingHeader
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onStart={onStart}
        scrollToSection={scrollToSection}
      />

      <main className="flex-1">
        <HeroSection onStart={onStart} scrollToSection={scrollToSection} />
        <HowItWorksSection />
        <WhyTrustUsSection />
        <CallToActionSection onStart={onStart} />
      </main>

      <Footer
        scrollToSection={scrollToSection}
        onStart={onStart}
        email={email}
        setEmail={setEmail}
        subscribed={subscribed}
        handleSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default LandingScreen;
