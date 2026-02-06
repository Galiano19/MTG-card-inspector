import { ScryfallCard } from "@/types/scryfall";
import { DollarSign, ExternalLink } from "lucide-react";

export default function Price(card: ScryfallCard) {
  if (!card.market_prices) {
    return null;
  }

  return (
    <div className="flex flex-col rounded-xl  bg-[--clr-surface-a20] backdrop-blur shadow-xl shadow-[--clr-surface-a0]/30">
      <div className="flex items-center gap-2 p-4">
        <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
        <div className="font-bold uppercase">Market Prices</div>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 bg-[--clr-surface-a10] rounded-b-xl gap-2">
        {card.market_prices.map((market) => (
          <a
            className="relative bg-[--clr-surface-a30] rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            href={market.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: market.color, filter: "saturate(0.3)" }}
          >
            <div className="flex items-center text-white ">
              <span className="text-xs md:text-sm font-medium truncate">
                {market.name}
              </span>
              {market.url && (
                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center -m-1.5"
                  aria-label={`Buy on ${market}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </div>
              )}
              <div className="flex gap-1 ml-auto">
                {market.amount &&
                market.amount !== "null" &&
                market.amount !== null ? (
                  <>
                    <span className=" font-bold">
                      {market.currency === "tix" ? "" : market.currency}
                      {market.amount}
                    </span>
                    {market.currency === "tix" && (
                      <span className="text-xs md:text-sm">tix</span>
                    )}
                  </>
                ) : (
                  <span className="text-base md:text-lg">N/A</span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
