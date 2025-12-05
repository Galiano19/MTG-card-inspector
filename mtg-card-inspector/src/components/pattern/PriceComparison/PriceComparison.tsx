import React from "react";
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import PriceCard from "./PriceCard";
import { MarketPrice } from "@/types/scryfall";

export default function PriceComparison({
  marketPrices,
}: {
  marketPrices: MarketPrice[];
}) {
  return (
    <Card className="bg-[--clr-surface-a20] backdrop-blur shadow-xl shadow-[--clr-surface-a0]/30">
      <CardHeader className="pb-3 md:pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-[--clr-primary-a0] rounded-lg md:rounded-xl">
              <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <CardTitle className="text-lg md:text-xl font-bold ">
              Market Prices
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
          {marketPrices.map((market) => (
            <PriceCard
              key={market.key}
              market={market.name}
              price={market.amount}
              currency={market.currency}
              color={market.color}
              purchaseUrl={market.url}
            />
          ))}
        </div>
        <p className="text-xs mt-3 md:mt-4 text-center">
          Prices sourced from Scryfall • Updated regularly • Click to purchase
        </p>
      </CardContent>
    </Card>
  );
}
