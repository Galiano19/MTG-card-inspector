import React from "react";
import { TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { priceMarkets } from "../../../services/scryfallApi";
import PriceCard from "./PriceCard";

interface PriceComparisonProps {
  prices: {
    usd: string | null;
    usd_foil: string | null;
    eur: string | null;
    tix: string | null;
    eur_foil: string | null;
  } | null;
  purchaseUris: {
    tcgplayer?: string;
  } | null;
}

export default function PriceComparison({
  prices,
  purchaseUris,
}: PriceComparisonProps) {
  const getLowestPrice = () => {
    const usdPrices = [
      prices?.usd ? parseFloat(prices.usd) : null,
      prices?.usd_foil ? parseFloat(prices.usd_foil) : null,
    ].filter((p): p is number => p !== null && !isNaN(p));

    if (usdPrices.length === 0) return null;
    return Math.min(...usdPrices).toFixed(2);
  };

  const lowestPrice = getLowestPrice();

  return (
    <Card className="bg-white/80 backdrop-blur border-slate-200 shadow-xl shadow-slate-200/30">
      <CardHeader className="pb-3 md:pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg md:rounded-xl">
              <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <CardTitle className="text-lg md:text-xl font-bold text-slate-800">
              Market Prices
            </CardTitle>
          </div>
          {lowestPrice && (
            <div className="flex items-center gap-2 bg-emerald-50 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
              <span className="text-xs md:text-sm font-medium text-emerald-700">
                From ${lowestPrice}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
          {priceMarkets.map((market) => (
            <PriceCard
              key={market.key}
              market={market.name}
              price={prices?.[market.key as keyof typeof prices]}
              currency={market.currency}
              color={market.color}
              purchaseUrl={purchaseUris?.tcgplayer}
            />
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3 md:mt-4 text-center">
          Prices sourced from Scryfall • Updated regularly • Click to purchase
        </p>
      </CardContent>
    </Card>
  );
}
