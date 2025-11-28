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
}
