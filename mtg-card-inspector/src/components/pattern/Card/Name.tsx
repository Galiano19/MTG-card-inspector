import { CardFace, ScryfallCard } from "@/types/scryfall";
import { getTypeLine } from "@/lib/card/utils";

export default function Name({
  nameLabel,
  card,
  activeFace,
}: {
  nameLabel?: string;
  card: ScryfallCard;
  activeFace?: CardFace;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-start justify-between gap-2 md:gap-3 align-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold  ">
            {nameLabel || card.name}
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <i>{getTypeLine(activeFace || card)}</i>
      </div>
    </div>
  );
}
