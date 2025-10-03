import React from "react";
import HeroSection from "./components/HeroSection";
import ConsultancySection from "./components/ConsultancySection";
import FeatureSlider from "./components/FeatureSlider";
import BenefitsSection from "./components/BenefitsSection";
const DoctorHome = () => {
  return (
    <div className="text-gray-800 font-sans">
      <main className="bg-gray-50">
        <HeroSection />
        <FeatureSlider />
        <ConsultancySection />
        <BenefitsSection />
      </main>
    </div>
  );
};

export default DoctorHome;
