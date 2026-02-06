import { Badge } from "@/components/ui/badge";
import { getPowerToughness } from "@/lib/card/utils";
import { CardFace, ScryfallCard } from "@/types/scryfall";
import { Swords } from "lucide-react";

export default function PowerToughness({
  face,
  card,
}: {
  face?: CardFace;
  card: ScryfallCard;
}) {
  const powerToughness = getPowerToughness(face ? face : card);

  if (!powerToughness) {
    return null;
  }

  return (
    <div className="flex gap-1 items-center ">
      <Swords className="w-4 h-4 " />
      <Badge className="font-bold">{powerToughness}</Badge>
    </div>
  );
}
