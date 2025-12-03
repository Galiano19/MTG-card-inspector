import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GameChangerBadge() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline">GC</Badge>
      </TooltipTrigger>
      <TooltipContent>This Card is considered a "Game Changer"</TooltipContent>
    </Tooltip>
  );
}
