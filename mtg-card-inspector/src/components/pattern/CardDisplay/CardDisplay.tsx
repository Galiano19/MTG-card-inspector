import React, { useEffect, useState } from "react";
import { RefreshCw, Sparkles, Hash, Layers, Brush } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ManaSymbol } from "./ManaSymbol";
import { RarityBadge } from "./RarityBadge";
import { Button } from "@/components/ui/button";
import { Legalities } from "./Legalities";
import { CardFace, ScryfallCard } from "@/types/scryfall";
import { GameChangerBadge } from "./GameChangerBadge";
import CardImage from "./CardImage";
import {
  getFlavorText,
  getPowerToughness,
  getTypeLine,
  getIsTransformable,
} from "@/lib/card/utils";
import OracleText from "./OracleText";

// TODO: enhance types
export default function CardDisplay({ card }: { card: ScryfallCard }) {
  const [showBackFace, setShowBackFace] = useState(false);
  const [face, setFace] = useState<CardFace | undefined>(undefined);
  const isTransformable = getIsTransformable(card);

  console.log(card);

  useEffect(() => {
    if (isTransformable) {
      //@ts-ignore -- isTransformable already checks if cardFaces array contains items
      setFace(card.card_faces[0]);
    }

    return () => {
      setFace(undefined);
    };
  }, [card, isTransformable]);

  const handleShowBackFace = () => {
    if (isTransformable) {
      setShowBackFace(!showBackFace);
      //@ts-ignore -- isTransformable already checks if cardFaces array contains items
      setFace(card.card_faces[showBackFace ? 0 : 1]);
    }
  };

  return (
    <Card className="bg-[--clr-surface-a20] backdrop-blur shadow-xl shadow-[--clr-surface-a0]/30">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          <div
            id="image-section"
            className="relative lg:w-[320px] flex-shrink-0 bg-[--clr-surface-a30] p-4 md:p-6 flex items-center justify-center bg-cover bg-center rounded-t-xl lg:rounded-t-none lg:rounded-tl-xl lg:rounded-bl-xl"
            style={{
              backgroundImage: `linear-gradient(to right, var(--clr-surface-a30), rgba(0,0,0,0)), url('${card.image_uris?.art_crop}')`,
            }}
          >
            <div className="relative group flex flex-col h-full w-full gap-2">
              <CardImage
                cardName={card.name}
                isTransformable={isTransformable}
                face={face}
                urlLarge={card.image_uris?.large}
                urlNormal={card.image_uris?.normal}
                isFoil={card.foil}
              />
              {isTransformable && (
                <Button
                  onClick={handleShowBackFace}
                  className="absolute bottom-4 right-4 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label={
                    showBackFace ? "Show front face" : "Show back face"
                  }
                >
                  <RefreshCw
                    className={`w-5 h-5 transition-transform duration-500 ${
                      showBackFace ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              )}
              <div className="margin-top-auto">
                <div className="flex items-center gap-2 ">
                  <Brush className="w-4 h-4" />
                  <span className="tracking-wide">
                    <i>{card.artist}</i>
                  </span>
                </div>
              </div>
            </div>
            {isTransformable && (
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-xs bg-[--clr-surface-a10] px-3 py-1 rounded-full">
                  {showBackFace ? "Back Face" : "Front Face"} • Tap to flip
                </span>
              </div>
            )}
          </div>

          <div
            id="details-section"
            className="flex-1 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6"
          >
            <div id="header" className="flex gap-2 flex-col">
              <div className="flex flex-wrap items-start justify-between gap-2 md:gap-3 align-center">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold  ">
                    {isTransformable ? face?.name : card.name}
                  </h2>
                  {card.game_changer && <GameChangerBadge />}
                </div>
                <ManaSymbol card={card} face={face} />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <i>{getTypeLine({ face, card })}</i>
                {getPowerToughness({ face, card }) && (
                  <Badge className="font-bold">
                    {getPowerToughness({ face, card })}
                  </Badge>
                )}
              </div>
            </div>

            <OracleText face={face} card={card} />

            {Boolean(getFlavorText({ face, card })) && (
              <div id="flavor-text" className="space-y-2">
                <div className="flex items-center gap-2 ">
                  <Sparkles className="w-4 h-4  " />
                  <span className="text-sm font-medium uppercase tracking-wide font-bold  ">
                    Flavor Text
                  </span>
                </div>
                <p className="italic border-l-4 border-[--clr-primary-a0] pl-4 text-sm md:text-base">
                  &ldquo;{getFlavorText({ face, card })}&rdquo;
                </p>
              </div>
            )}

            <div
              id="info-grid"
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            >
              <div>
                <div className="flex items-center gap-2 ">
                  <Layers className="w-4 h-4" />
                  <span className="font-medium uppercase tracking-wide font-bold  ">
                    Set
                  </span>
                </div>
                <p>{card.set_name}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 ">
                  <Hash className="w-4 h-4  " />
                  <span className="font-medium uppercase tracking-wide font-bold  ">
                    Number
                  </span>
                </div>
                <p>#{card.collector_number}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 ">
                  <Sparkles className="w-4 h-4  " />
                  <span className="font-medium uppercase tracking-wide font-bold  ">
                    Rarity
                  </span>
                </div>
                <RarityBadge rarity={card.rarity} />
              </div>
              <Legalities legalities={card.legalities} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
