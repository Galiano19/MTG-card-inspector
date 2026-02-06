// @ts-ignore
import { CardFace, ScryfallCard } from "@/types/scryfall";
import FoilEffect from "./FoilEffect";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brush, RefreshCw } from "lucide-react";
import { getIsTransformable } from "@/lib/card/utils";

interface ImageProps {
  card: ScryfallCard;
  activeFace: CardFace | undefined;
  setActiveFace: (face: CardFace | undefined) => void;
}

export default function Image({ card, activeFace, setActiveFace }: ImageProps) {
  if (!card) {
    return null;
  }

  const [isClient, setIsClient] = useState(false);
  const [showBackFace, setShowBackFace] = useState(false);
  const isTransformable = getIsTransformable(card);
  const isFoil = card.foil;

  useEffect(() => {
    if (isTransformable) {
      //@ts-ignore -- isTransformable already checks if cardFaces array contains items
      setActiveFace(card.card_faces[0]);
    }

    return () => {
      setActiveFace(undefined);
    };
  }, [card, isTransformable]);

  useEffect(() => {
    import("hover-tilt/web-component");
    setIsClient(true);
  }, []);

  const getImageUrl = () => {
    if (isTransformable) {
      return activeFace?.image_uris?.normal || activeFace?.image_uris?.large;
    }
    return card.image_uris?.large || card.image_uris?.normal;
  };
  const handleShowBackFace = () => {
    if (isTransformable) {
      setShowBackFace(!showBackFace);
      //@ts-ignore -- isTransformable already checks if cardFaces array contains items
      setActiveFace(card.card_faces[showBackFace ? 0 : 1]);
    }
  };

  const imageContent = (
    <>
      {isFoil && (
        <div className="rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 rounded-xl mix-blend-multiply"
            style={{
              background:
                "linear-gradient(135deg, #fcf4c9 10%, #fee3e2, #fbcdf2, #e8befa, #abbfff, #bbf3c0 90%)",
            }}
          />
          <FoilEffect />
        </div>
      )}
      <img
        src={getImageUrl()}
        alt={card.name}
        className="w-full max-w-[280px] rounded-xl shadow-2xl transition-transform duration-500 self-center"
        loading="lazy"
      />
    </>
  );

  if (!isClient) {
    return <div className="flex self-center">{imageContent}</div>;
  }

  return (
    <div
      id="image-section"
      className="relative lg:w-[320px] flex-shrink-0 bg-[--clr-surface-a30] p-4 md:p-6 flex items-center justify-center bg-cover bg-center rounded-xl"
      style={{
        backgroundImage: `linear-gradient(to right, var(--clr-surface-a30), rgba(0,0,0,0)), url('${
          activeFace
            ? activeFace.image_uris?.art_crop
            : card.image_uris?.art_crop
        }')`,
      }}
    >
      <div className="relative group flex flex-col h-full w-full gap-2">
        <div className="flex self-center">
          {/* @ts-ignore */}
          <hover-tilt
            tilt-factor="1.5"
            scale-factor="1.2"
            class="[&::part(container)]:rounded-xl"
            shadow
            shadowBlur={30}
            glare-intensity={isFoil ? "1.5" : "0.5"}
            glare-mask={isFoil ? "url(/img/foil/cosmos-middle-trans.png)" : ""}
            glare-mask-mode={isFoil ? "alpha" : "luminosity"}
            exit-delay="500"
          >
            {imageContent}
            {/* @ts-ignore */}
          </hover-tilt>
        </div>
        {isTransformable && (
          <Button
            onClick={handleShowBackFace}
            className="absolute bottom-4 right-4 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label={showBackFace ? "Show front face" : "Show back face"}
          >
            <RefreshCw
              className={`w-5 h-5 transition-transform duration-500 ${
                showBackFace ? "rotate-180" : ""
              }`}
            />
          </Button>
        )}
        <div className="mt-auto">
          <div className="flex items-end gap-2 justify-between">
            <div className="flex items-center gap-2 ">
              <Brush className="w-4 h-4" />
              <span className="tracking-wide">
                <i>{card.artist}</i>
              </span>
            </div>
            <div className="flex flex-col items-end text-xs">
              <span className="leading-[0.9]">
                <i>#{card.collector_number}</i>
              </span>
              <span className="leading-[0.9]">
                <i>
                  {card.set.toUpperCase()} - {card.rarity}
                </i>
              </span>
            </div>
          </div>
        </div>
      </div>

      {isTransformable && (
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-xs bg-[--clr-surface-a10] px-3 py-1 rounded-full">
            {showBackFace ? "Back Face" : "Front Face"}
          </span>
        </div>
      )}
    </div>
  );
}
