import { renderOracleText } from "@/lib/card/renderOracleText";
import { getHasMultipleFaces, getOracleText } from "@/lib/card/utils";
import { CardFace, ScryfallCard } from "@/types/scryfall";
import { BookOpen } from "lucide-react";

export default function OracleText({
  face,
  card,
}: {
  face?: CardFace;
  card: ScryfallCard;
}) {
  const oracleText = getOracleText(face ? face : card);

  if (!oracleText) {
    return null;
  }

  return (
    <>
      <div id="oracle-text" className="space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium uppercase tracking-wide font-bold">
            Oracle Text
          </span>
        </div>
        <div className="bg-[--clr-surface-a10] rounded-xl p-3 md:p-4 border border-[--clr-surface-a20]">
          <p className="whitespace-pre-line leading-relaxed text-sm md:text-base">
            {renderOracleText(oracleText)}
          </p>
        </div>
      </div>
    </>
  );
}
