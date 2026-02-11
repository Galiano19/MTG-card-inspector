import { getIsTransformable } from "@/lib/card/utils";
import { InternalSet } from "@/types/scryfall";

export default function Set({ data }: { data: InternalSet }) {
  if (!data?.cards) {
    return null;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {data.cards.map((card) => (
        <a key={card.id} href={`/card/${card.curated_name}?id=${card.id}`}>
          <img
            src={
              !getIsTransformable(card)
                ? card.image_uris?.normal
                : card.card_faces && card.card_faces[0].image_uris?.normal
            }
            alt={card.name}
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}
