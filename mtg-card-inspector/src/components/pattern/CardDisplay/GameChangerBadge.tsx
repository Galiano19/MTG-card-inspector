import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScryfallCard } from "@/types/scryfall";

export function GameChangerBadge(card: ScryfallCard) {
  if (!card.game_changer) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge className="h-full" variant="outline">
          GC
        </Badge>
      </TooltipTrigger>
      <TooltipContent>This Card is considered a "Game Changer"</TooltipContent>
    </Tooltip>
  );
}
