import { ExternalLink } from "lucide-react";

interface PriceCardProps {
  market: string;
  price: string | null | undefined;
  currency: string;
  color: string;
  purchaseUrl?: string;
}

export default function PriceCard({
  market,
  price,
  currency,
  color,
  purchaseUrl,
}: PriceCardProps) {
  const hasPrice = price && price !== "null" && price !== null;

  return (
    <a
      className="relative bg-[--clr-surface-a30] rounded-t-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
      href={purchaseUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs md:text-sm font-medium truncate">
          {market}
        </span>
        {purchaseUrl && (
          <div
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center -m-1.5"
            aria-label={`Buy on ${market}`}
          >
            <ExternalLink className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        {hasPrice ? (
          <>
            <span className="text-xl md:text-2xl font-bold">
              {currency === "tix" ? "" : currency}
              {price}
            </span>
            {currency === "tix" && (
              <span className="text-xs md:text-sm">tix</span>
            )}
          </>
        ) : (
          <span className="text-base md:text-lg">N/A</span>
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl opacity-80"
        style={{ backgroundColor: color }}
      />
    </a>
  );
}
