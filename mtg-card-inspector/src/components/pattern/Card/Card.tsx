import { CardFace, ScryfallCard } from "@/types/scryfall";
import Image from "./Image";
import { useState } from "react";
import Name from "./Name";
import { getHasMultipleFaces } from "@/lib/card/utils";

export default function Card({ card }: { card: ScryfallCard }) {
  const [activeFace, setActiveFace] = useState<CardFace | undefined>(undefined);
  const displayName = getHasMultipleFaces(card); // if the card has multiple faces, we want to display the name of the active face instead of the card name

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <Image
        card={card}
        activeFace={activeFace}
        setActiveFace={setActiveFace}
      />
      <div className="flex-1">
        {!displayName ? (
          <Name card={card} activeFace={activeFace} />
        ) : (
          card.card_faces?.map((face, index) => (
            <div key={index} className=" flex flex-col gap-2">
              <Name
                nameLabel={face?.name || ""}
                card={card}
                activeFace={face}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
