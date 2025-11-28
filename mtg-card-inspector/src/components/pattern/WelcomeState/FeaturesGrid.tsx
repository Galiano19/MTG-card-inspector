import { Card, CardContent } from "@/components/ui/card";
import { Search, TrendingUp, Zap } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find any Magic card with intelligent autocomplete suggestions",
  },
  {
    icon: TrendingUp,
    title: "Price Comparison",
    description: "Compare prices across TCGPlayer, CardMarket, and more",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get card details, artwork, and pricing in seconds",
  },
];

export function FeaturesGrid() {
  return (
    <div
      id="features-grid"
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
    >
      {features.map((feature, index) => (
        <Card
          key={feature.title}
          className="bg-white/60 backdrop-blur border-slate-100 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-4 md:p-6">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 rounded-xl bg-slate-100 flex items-center justify-center">
              <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1 md:mb-2 text-sm md:text-base">
              {feature.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-500">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
