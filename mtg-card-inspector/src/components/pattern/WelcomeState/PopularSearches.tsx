import { Card, CardContent } from "@/components/ui/card";

/* TODO: Replace with dynamic popular searches in the future */
const popularCards = [
  "Lightning Bolt",
  "Black Lotus",
  "Counterspell",
  "Sol Ring",
  "Thoughtseize",
];

export function PopularSearches() {
  return (
    <Card
      id="popular-searches"
      className="bg-white/40 backdrop-blur border-slate-100"
    >
      <CardContent className="p-4 md:p-6">
        <h3 className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wide mb-3 md:mb-4">
          Popular Searches
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {popularCards.map((card) => (
            <span
              key={card}
              className="px-3 md:px-4 py-1.5 md:py-2 bg-white rounded-full text-xs md:text-sm text-slate-600 border border-slate-200 hover:border-teal-300 hover:text-teal-700 transition-colors cursor-default"
            >
              {card}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
