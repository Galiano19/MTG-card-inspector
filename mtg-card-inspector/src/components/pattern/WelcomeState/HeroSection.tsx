import { Sparkles } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <div id="hero-section" className="mb-8 md:mb-12">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={96}
        height={96}
        className="mx-auto mb-4"
      />
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold  mb-2 md:mb-3">
        Search for any Magic card
      </h2>
      <p className="max-w-md mx-auto text-sm md:text-base">
        Enter a card name above to view detailed information, artwork, and
        current market prices from multiple sellers.
      </p>
    </div>
  );
}
