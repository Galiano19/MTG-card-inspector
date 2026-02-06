import { CardFace, ScryfallCard } from "@/types/scryfall";
import { ManaSymbol } from "./ManaSymbol";
import SetInfo from "./SetInfo";

export default function MetaInfo({
  card,
  face,
}: {
  card: ScryfallCard;
  face: CardFace | undefined;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-4 rounded-xl border  bg-[--clr-surface-a20] backdrop-blur shadow-xl shadow-[--clr-surface-a0]/30">
      <div className="flex flex-col md:border-r border-b md:border-b-0 md:pr-8 pb-4 md:pb-0">
        <span className=" text-xs font-bold uppercase tracking-wider">
          Mana cost
        </span>
        <span className="mt-2">
          <ManaSymbol card={card} face={face} />
        </span>
      </div>
      <div className="flex flex-col md:border-r border-b md:border-b-0 md:pr-8 pb-4 md:pb-0">
        <span className=" text-xs font-bold uppercase tracking-wider">
          Rarity
        </span>
        <span className={`text-sm font-bold mt-2 uppercase `}>
          {card.rarity}
        </span>
      </div>
      <div className="flex flex-col">
        <span className=" text-xs font-bold uppercase tracking-wider">Set</span>
        <span className="text-sm font-bold mt-1 flex items-center gap-2">
          <SetInfo {...card} />
        </span>
      </div>
    </div>
  );
}
