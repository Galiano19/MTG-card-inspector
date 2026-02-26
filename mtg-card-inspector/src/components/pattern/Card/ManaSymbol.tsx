import { getManaCost } from "@/lib/card/utils";
import { CardFace, ScryfallCard } from "@/types/scryfall";

export function ManaSymbol({
  card,
  face,
}: {
  card: ScryfallCard;
  face?: CardFace;
}) {
  const manaCost = getManaCost(face ? face : card);

  if (manaCost?.length === 0 || !manaCost) {
    return null;
  }

  return (
    <div className="flex flex-col md:border-r border-b md:border-b-0 md:pr-8 pb-4 md:pb-0">
      <span className=" text-xs font-bold uppercase tracking-wider">
        Mana cost
      </span>
      <span className="mt-2">
        <div className="flex items-center gap-1 flex-wrap self-center">
          {manaCost?.map((symbol, index) => (
            <i key={index} className={`ms ms-${symbol} ms-cost`}></i>
          ))}
        </div>
      </span>
    </div>
  );
}
