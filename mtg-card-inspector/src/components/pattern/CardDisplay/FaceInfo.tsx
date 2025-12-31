import { CardFace, ScryfallCard } from "@/types/scryfall";
import OracleText from "./OracleText";
import FlavorText from "./FlavorText";
import { get } from "http";
import {
  getHasMultipleFaces,
  getPowerToughness,
  getTypeLine,
} from "@/lib/card/utils";
import { ManaSymbol } from "./ManaSymbol";
import { Badge } from "@/components/ui/badge";
import { Swords } from "lucide-react";

export default function FaceInfo({
  face,
  card,
}: {
  face?: CardFace;
  card: ScryfallCard;
}) {
  if (getHasMultipleFaces(card)) {
    return (
      <div className="space-y-4">
        {card.card_faces?.map((face, index) => (
          <div key={index} className=" flex flex-col gap-2">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-2 md:gap-3 align-center">
                <div className="flex items-center gap-2">
                  <h2 className=" md:text-2xl lg:text-2xl font-bold">
                    {face?.name}
                  </h2>
                </div>
                <ManaSymbol card={card} face={face} />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <i>{getTypeLine(face || card)}</i>
              </div>
              <div>
                {getPowerToughness(face ? face : card) && (
                  <>
                    <Swords className="w-4 h-4 inline-block mr-1" />
                    <Badge className="font-bold">
                      {getPowerToughness(face ? face : card)}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <OracleText face={face} card={card} />
            <FlavorText face={face} card={card} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <OracleText face={face} card={card} />
      <FlavorText face={face} card={card} />
    </div>
  );
}
