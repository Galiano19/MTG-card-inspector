import { ScryfallCard } from "../../types/scryfall";
import Image from "next/image";

interface CardDisplayProps {
  card: ScryfallCard;
}

export function CardDisplay({ card }: CardDisplayProps) {
  return (
    <div>
      {card.image_uris && (
        <Image
          src={card.image_uris.normal}
          alt={card.name}
          width={300}
          height={420}
          className='rounded-lg mx-auto'
          priority
        />
      )}
    </div>
  );
}
