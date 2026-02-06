import { ScryfallCard } from "@/types/scryfall";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getRarityColor } from "@/lib/card/utils";

export default function SetInfo(card: ScryfallCard) {
  return (
    <>
      <div id="set-info">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger>
              <i
                className={`ss ss-${
                  card.set
                } [-webkit-text-stroke:1px_rgba(0,0,0,0.3)] text-2xl ${getRarityColor(
                  card.rarity,
                )}`}
              ></i>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-sm uppercase font-bold">{card.set}</span>
            </TooltipContent>
          </Tooltip>

          <span className="text-sm font-medium  tracking-wide font-bold">
            {card.set_name}
          </span>
        </div>
      </div>
    </>
  );
}
