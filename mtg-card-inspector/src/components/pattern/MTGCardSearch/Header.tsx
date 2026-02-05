import { Sparkles } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="pb-4 pt-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-4 ">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
            Find ANY <br />
            <span className="text-primary">Magic The Gathering Card</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-xl mx-auto">
            Search through thousands of MTG cards with real-time pricing,
            legality, and variations.
          </p>
        </div>
      </div>
    </header>
  );
}
