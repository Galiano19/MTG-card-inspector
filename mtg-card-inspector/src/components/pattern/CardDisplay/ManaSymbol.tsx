import { getManaCost } from "@/lib/card/utils";
import { CardFace, ScryfallCard } from "@/types/scryfall";

export function ManaSymbol({
  card,
  face,
}: {
  card: ScryfallCard;
  face?: CardFace;
}) {
  const manaColors: { [key: string]: string } = {
    W: "bg-amber-100 text-amber-800",
    U: "bg-blue-100 text-blue-800",
    B: "bg-slate-700 text-white",
    R: "bg-red-100 text-red-800",
    G: "bg-green-100 text-green-800",
    C: "bg-slate-200 text-slate-700",
  };

  const manaCost = getManaCost({ card, face });

  if (manaCost.length === 0) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-1 flex-wrap">
      {manaCost.map((symbol, index) => (
        <div key={index}>{symbol}</div>
      ))}
    </div>
  );
}
