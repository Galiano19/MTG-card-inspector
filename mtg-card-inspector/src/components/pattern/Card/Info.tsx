import { CardFace, ScryfallCard } from "@/types/scryfall";
import Name from "./Name";

interface InfoProps {
  nameLabel?: string;
  face?: CardFace;
  card: ScryfallCard;
}

export default function Info({ nameLabel, face, card }: InfoProps) {
  return (
    <Name nameLabel={nameLabel || undefined} card={card} activeFace={face} />
  );
}
