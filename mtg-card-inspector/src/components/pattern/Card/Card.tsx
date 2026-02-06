import { CardFace, ScryfallCard } from "@/types/scryfall";
import CardImage from "./CardImage";
import { useState } from "react";

export default function Card({ card }: { card: ScryfallCard }) {
  const [activeFace, setActiveFace] = useState<CardFace | undefined>(undefined);

  return (
    <div>
      <CardImage
        card={card}
        activeFace={activeFace}
        setActiveFace={setActiveFace}
      />
    </div>
  );
}
