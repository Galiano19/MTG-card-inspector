import { CardFace, ScryfallCard } from "@/types/scryfall";
import OracleText from "./OracleText";
import FlavorText from "./FlavorText";
import { getHasMultipleFaces } from "@/lib/card/utils";
import NameArea from "./NameArea";

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
            <NameArea nameLabel={face?.name || ""} card={card} face={face} />
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
