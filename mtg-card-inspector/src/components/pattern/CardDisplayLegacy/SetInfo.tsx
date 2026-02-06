import { ScryfallCard } from "@/types/scryfall";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SetInfo(card: ScryfallCard) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "uncommon":
        return "text-[--clr-rarity-uncommon]";
      case "rare":
        return "text-[--clr-rarity-rare]";
      case "mythic":
        return "text-[--clr-rarity-mythic]";
      case "special":
        return "text-[--clr-rarity-special]";
      case "bonus":
        return "text-[--clr-rarity-bonus]";
      default:
        return "text-[--clr-rarity-common]";
    }
  };

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
                  card.rarity
                )}`}
              ></i>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-sm uppercase font-bold">
                {card.set} - {card.rarity}
              </span>
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
