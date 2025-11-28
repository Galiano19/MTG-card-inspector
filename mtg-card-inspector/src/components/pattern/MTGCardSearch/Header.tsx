import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="pt-6 pb-4 px-4 md:pt-8 md:pb-6 lg:pt-12 lg:pb-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="p-1.5 md:p-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg md:rounded-xl shadow-lg shadow-teal-500/20">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-teal-700 to-emerald-700 bg-clip-text text-transparent">
            MTG Card Search
          </h1>
        </div>
        <p className="text-slate-500 text-xs md:text-sm lg:text-base max-w-md mx-auto">
          Find cards, compare prices, and discover the magic
        </p>
      </div>
    </header>
  );
}
