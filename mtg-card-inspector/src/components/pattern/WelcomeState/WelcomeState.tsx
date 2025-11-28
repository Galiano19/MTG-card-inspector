import React from "react";
import { HeroSection } from "./HeroSection";
import { FeaturesGrid } from "./FeaturesGrid";

export default function WelcomeState() {
  return (
    <div className="w-full max-w-4xl mx-auto text-center py-6 md:py-8 lg:py-12 px-4">
      <HeroSection />
      <FeaturesGrid />
      <FeaturesGrid />
    </div>
  );
}
