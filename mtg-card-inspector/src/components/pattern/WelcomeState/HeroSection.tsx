import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <div id="hero-section" className="mb-8 md:mb-12">
      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
        <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
      </div>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-2 md:mb-3">
        Search for any Magic card
      </h2>
      <p className="text-slate-500 max-w-md mx-auto text-sm md:text-base">
        Enter a card name above to view detailed information, artwork, and
        current market prices from multiple sellers.
      </p>
    </div>
  );
}
