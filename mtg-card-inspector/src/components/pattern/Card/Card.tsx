import { CardFace, ScryfallCard } from "@/types/scryfall";
import Image from "./Image";
import { useState } from "react";
import { getHasMultipleFaces } from "@/lib/card/utils";
import Info from "./Info";
import Printings from "./printings/Printings";
import Price from "./Price";
import Legalities from "./Legalities";
import Similar from "./Similar";

export default function Card({ card }: { card: ScryfallCard }) {
  const [activeFace, setActiveFace] = useState<CardFace | undefined>(undefined);
  const displayName = getHasMultipleFaces(card);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-4 lg:w-[320px] flex-shrink-0">
          <Image
            card={card}
            activeFace={activeFace}
            setActiveFace={setActiveFace}
          />
          <div className="hidden lg:block">
            <Printings card={card} showHeader={false} />
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          {!displayName ? (
            <Info card={card} face={activeFace} />
          ) : (
            card.card_faces?.map((face, index) => (
              <div key={index} className=" flex flex-col gap-2">
                <Info nameLabel={face?.name || ""} card={card} face={face} />
              </div>
            ))
          )}
          <Price {...card} />
          <div className="lg:hidden">
            <Printings card={card} />
          </div>
          <Legalities legalities={card.legalities} />
        </div>
      </div>
    </>
  );
}
