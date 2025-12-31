import { CardFace, ScryfallCard } from "@/types/scryfall";
import { ManaSymbol } from "./ManaSymbol";
import { getTypeLine } from "@/lib/card/utils";
import PowerToughness from "./PowerToughness";

interface NameAreaProps {
  nameLabel: string;
  face?: CardFace;
  card: ScryfallCard;
}

export default function NameArea({ nameLabel, face, card }: NameAreaProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-start justify-between gap-2 md:gap-3 align-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold  ">
            {nameLabel}
          </h2>
        </div>
        <ManaSymbol card={card} face={face} />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <i>{getTypeLine(face || card)}</i>
      </div>
      <PowerToughness face={face} card={card} />
    </div>
  );
}
