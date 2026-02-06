import { getFlavorText } from "@/lib/card/utils";
import { CardFace, ScryfallCard } from "@/types/scryfall";
import { Sparkles } from "lucide-react";

export default function FlavorText({
  face,
  card,
}: {
  face?: CardFace;
  card: ScryfallCard;
}) {
  const flavorText = getFlavorText(face ? face : card);

  if (!flavorText) {
    return null;
  }

  return (
    <div id="flavor-text" className="space-y-2">
      <div className="flex items-center gap-2 ">
        <Sparkles className="w-4 h-4  " />
        <span className="text-sm font-medium uppercase tracking-wide font-bold  ">
          Flavor Text
        </span>
      </div>
      <p className="italic border-l-4 border-[--clr-primary-a0] pl-4 text-sm md:text-base">
        &ldquo;{flavorText}&rdquo;
      </p>
    </div>
  );
}
