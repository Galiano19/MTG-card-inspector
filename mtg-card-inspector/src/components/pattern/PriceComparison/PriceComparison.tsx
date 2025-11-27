import React from "react";
import { ExternalLink, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { priceMarkets } from "../../../services/scryfallApi";

interface PriceCardProps {
  market: string;
  price: string | null | undefined;
  currency: string;
  color: string;
  purchaseUrl?: string;
}
const PriceCard = ({
  market,
  price,
  currency,
  color,
  purchaseUrl,
}: PriceCardProps) => {
  const hasPrice = price && price !== "null" && price !== null;

  return (
    <div className="relative bg-white rounded-xl p-3 md:p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs md:text-sm font-medium text-slate-600 truncate">
          {market}
        </span>
        {purchaseUrl && hasPrice && (
          <a
            href={purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-100 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center -m-1.5"
            aria-label={`Buy on ${market}`}
          >
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        {hasPrice ? (
          <>
            <span className="text-xl md:text-2xl font-bold" style={{ color }}>
              {currency === "tix" ? "" : currency}
              {price}
            </span>
            {currency === "tix" && (
              <span className="text-xs md:text-sm text-slate-500">tix</span>
            )}
          </>
        ) : (
          <span className="text-base md:text-lg text-slate-400">N/A</span>
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl opacity-80"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

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

const PriceComparison = ({ prices, purchaseUris }: PriceComparisonProps) => {
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
};

export default PriceComparison;
