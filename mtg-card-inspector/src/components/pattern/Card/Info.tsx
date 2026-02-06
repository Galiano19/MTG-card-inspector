import { CardFace, ScryfallCard } from "@/types/scryfall";
import Name from "./Name";
import MetaInfo from "./MetaInfo";
import Text from "./Text";

interface InfoProps {
  nameLabel?: string;
  face?: CardFace;
  card: ScryfallCard;
}

export default function Info({ nameLabel, face, card }: InfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <Name nameLabel={nameLabel || undefined} card={card} activeFace={face} />
      <MetaInfo card={card} face={face} />
      <Text face={face} card={card} />
    </div>
  );
}
