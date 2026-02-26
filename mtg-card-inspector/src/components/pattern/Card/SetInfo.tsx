import { ScryfallCard } from "@/types/scryfall";
import { getRarityColor } from "@/lib/card/utils";

export default function SetInfo(card: ScryfallCard) {
  return (
    <>
      <div id="set-info">
        <div className="flex items-center gap-2">
          <a href={`/sets/${card.set}`}>
            <i
              className={`ss ss-${
                card.set
              } [-webkit-text-stroke:1px_rgba(0,0,0,0.3)] text-2xl ${getRarityColor(
                card.rarity,
              )}`}
            ></i>
            <span className="text-sm font-medium  tracking-wide font-bold ml-2">
              {card.set_name}
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
