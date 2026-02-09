// @ts-ignore
import { CardFace, ScryfallCard } from "@/types/scryfall";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brush, RefreshCw } from "lucide-react";
import { getIsTransformable } from "@/lib/card/utils";
import FoilEffect from "@/lib/card/FoilEffect";
import { Dialog } from "radix-ui";

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

  if (!isClient) {
    return (
      <div className="flex self-center">
        <>
          {isFoil && (
            <div className="rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 rounded-2xl mix-blend-multiply "
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
            className="rounded-2xl shadow-2xl transition-transform duration-500 self-center md:max-h-[70vh]"
            loading="lazy"
          />
        </>
      </div>
    );
  }

  return (
    <div
      id="image-section"
      className="relative lg:w-[320px] flex-shrink-0 bg-[--clr-surface-a30] p-4 md:p-6 flex items-center justify-center bg-cover bg-center rounded-2xl h-auto "
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
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button>
                <div className="hidden md:block">
                  {/* @ts-ignore */}
                  <hover-tilt
                    tilt-factor="1.5"
                    scale-factor="1.2"
                    class="[&::part(container)]:rounded-2xl"
                    shadow
                    shadowBlur={30}
                    glare-intensity={isFoil ? "1.5" : "0.5"}
                    glare-mask={
                      isFoil ? "url(/img/foil/cosmos-middle-trans.png)" : ""
                    }
                    glare-mask-mode={isFoil ? "alpha" : "luminosity"}
                    exit-delay="500"
                  >
                    <>
                      {isFoil && (
                        <div className="rounded-2xl overflow-hidden">
                          <div
                            className="absolute inset-0 rounded-2xl mix-blend-multiply "
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
                        className="rounded-2xl shadow-2xl transition-transform duration-500 self-center md:max-h-[450px]"
                        loading="lazy"
                      />
                    </>
                    {/* @ts-ignore */}
                  </hover-tilt>
                </div>
                <div className="block md:hidden relative">
                  <div>
                    <>
                      {isFoil && (
                        <div className="rounded-2xl overflow-hidden">
                          <div
                            className="absolute inset-0 rounded-2xl mix-blend-multiply "
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
                        className="rounded-2xl shadow-2xl transition-transform duration-500 self-center md:max-h-[350px]"
                        loading="lazy"
                      />
                    </>
                  </div>
                </div>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay />
              <Dialog.Content
                className="data-open:animate-in 
              data-closed:animate-out data-closed:fade-out-0 
              data-open:fade-in-0 data-closed:zoom-out-95 
              data-open:zoom-in-95 ring-foreground/10 
              fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100%-2rem)] 
              -translate-x-1/2 -translate-y-1/2 
              ring-1 duration-100 outline-none w-[90vw] md:w-auto h-auto"
              >
                {/* @ts-ignore */}
                <hover-tilt
                  tilt-factor="1.5"
                  scale-factor="1.2"
                  class="[&::part(container)]:rounded-2xl"
                  shadow
                  shadowBlur={30}
                  glare-intensity={isFoil ? "1.5" : "0.5"}
                  glare-mask={
                    isFoil ? "url(/img/foil/cosmos-middle-trans.png)" : ""
                  }
                  glare-mask-mode={isFoil ? "alpha" : "luminosity"}
                  exit-delay="500"
                >
                  <>
                    {isFoil && (
                      <div className="rounded-2xl overflow-hidden">
                        <div
                          className="absolute inset-0 rounded-2xl mix-blend-multiply "
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
                      className="rounded-2xl shadow-2xl transition-transform duration-500 self-center md:max-h-[70vh]"
                      loading="lazy"
                    />
                  </>
                  {/* @ts-ignore */}
                </hover-tilt>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
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
