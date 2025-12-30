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

  if (manaCost?.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 flex-wrap self-center">
      {manaCost?.map((symbol, index) => (
        <i key={index} className={`ms ms-${symbol} ms-cost`}></i>
      ))}
    </div>
  );
}
