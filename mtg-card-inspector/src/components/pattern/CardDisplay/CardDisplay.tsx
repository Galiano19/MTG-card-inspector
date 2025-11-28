import React, { useState } from "react";
import {
  RefreshCw,
  Palette,
  BookOpen,
  Sparkles,
  Hash,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";

/* ManaSymbol Component - Renders mana cost symbols, for now, only styled for basic colors */
const ManaSymbol = ({ symbol }: { symbol: string }) => {
  const manaColors: { [key: string]: string } = {
    W: "bg-amber-100 text-amber-800",
    U: "bg-blue-100 text-blue-800",
    B: "bg-slate-700 text-white",
    R: "bg-red-100 text-red-800",
    G: "bg-green-100 text-green-800",
    C: "bg-slate-200 text-slate-700",
  };

  const match = symbol?.match(/\{([^}]+)\}/g);
  if (!match) return <span>{symbol}</span>;

  return (
    <span className="inline-flex items-center gap-1 flex-wrap">
      {match.map((m, i) => {
        const char = m.replace(/[{}]/g, "");
        const isNumber = !isNaN(Number(char));
        const isHybrid = char.includes("/");
        return (
          <span
            key={i}
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
              isNumber || isHybrid
                ? "bg-slate-200 text-slate-700"
                : manaColors[char] || "bg-slate-200 text-slate-700"
            }`}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

const RarityBadge = ({ rarity }: { rarity: string }) => {
  const rarityStyles = {
    common: "bg-slate-100 text-slate-700 border-slate-200",
    uncommon: "bg-slate-200 text-slate-800 border-slate-300",
    rare: "bg-amber-100 text-amber-800 border-amber-200",
    mythic: "bg-orange-100 text-orange-800 border-orange-200",
    special: "bg-purple-100 text-purple-800 border-purple-200",
    bonus: "bg-violet-100 text-violet-800 border-violet-200",
  };

  return (
    <Badge
      className={`${
        rarityStyles[rarity as keyof typeof rarityStyles] || rarityStyles.common
      } capitalize font-medium`}
    >
      {rarity}
    </Badge>
  );
};

// TODO: enhance types
const CardDisplay = ({ card }: { card: any }) => {
  const [showBackFace, setShowBackFace] = useState(false);
  const isDoubleFaced = card.card_faces && card.card_faces.length > 1;

  const getCurrentFace = () => {
    if (!isDoubleFaced) return null;
    return showBackFace ? card.card_faces[1] : card.card_faces[0];
  };

  const getImageUrl = () => {
    if (isDoubleFaced) {
      const face = getCurrentFace();
      return face?.image_uris?.normal || face?.image_uris?.large;
    }
    return card.image_uris?.normal || card.image_uris?.large;
  };

  const getOracleText = () => {
    if (isDoubleFaced) {
      return getCurrentFace()?.oracle_text || "";
    }
    return card.oracle_text || "";
  };

  const getTypeLine = () => {
    if (isDoubleFaced) {
      return getCurrentFace()?.type_line || card.type_line;
    }
    return card.type_line;
  };

  const getManaCost = () => {
    if (isDoubleFaced) {
      return getCurrentFace()?.mana_cost || card.mana_cost || "";
    }
    return card.mana_cost || "";
  };

  const getPowerToughness = () => {
    if (isDoubleFaced) {
      const face = getCurrentFace();
      if (face?.power && face?.toughness) {
        return `${face.power}/${face.toughness}`;
      }
      return null;
    }
    if (card.power && card.toughness) {
      return `${card.power}/${card.toughness}`;
    }
    return null;
  };

  return (
    <Card className="bg-white/80 backdrop-blur border-slate-200 shadow-xl shadow-slate-200/30 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          <div
            id="image-section"
            className="relative lg:w-[320px] flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-50 p-4 md:p-6 flex items-center justify-center"
          >
            <div className="relative group">
              <img
                src={getImageUrl()}
                alt={card.name}
                className="w-full max-w-[280px] rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              {isDoubleFaced && (
                <button
                  onClick={() => setShowBackFace(!showBackFace)}
                  className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label={
                    showBackFace ? "Show front face" : "Show back face"
                  }
                >
                  <RefreshCw
                    className={`w-5 h-5 text-slate-700 transition-transform duration-500 ${
                      showBackFace ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>
            {isDoubleFaced && (
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-xs text-slate-500 bg-white/80 px-3 py-1 rounded-full">
                  {showBackFace ? "Back Face" : "Front Face"} • Tap to flip
                </span>
              </div>
            )}
          </div>

          <div
            id="details-section"
            className="flex-1 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6"
          >
            <div id="header" className="space-y-2 md:space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2 md:gap-3">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800">
                  {isDoubleFaced ? getCurrentFace()?.name : card.name}
                </h2>
                {getManaCost() && <ManaSymbol symbol={getManaCost()} />}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-slate-600 font-medium">{getTypeLine()}</p>
                {getPowerToughness() && (
                  <Badge variant="outline" className="font-bold">
                    {getPowerToughness()}
                  </Badge>
                )}
              </div>
            </div>

            {getOracleText() && (
              <div id="oracle-text" className="space-y-2">
                <div className="flex items-center gap-2 text-slate-500">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wide">
                    Oracle Text
                  </span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 md:p-4 border border-slate-100">
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed text-sm md:text-base">
                    {getOracleText()}
                  </p>
                </div>
              </div>
            )}

            {card.flavor_text && !isDoubleFaced && (
              <div id="flavor-text" className="space-y-2">
                <div className="flex items-center gap-2 text-slate-500">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wide">
                    Flavor Text
                  </span>
                </div>
                <p className="text-slate-500 italic border-l-4 border-slate-200 pl-4 text-sm md:text-base">
                  &ldquo;{card.flavor_text}&rdquo;
                </p>
              </div>
            )}

            <div
              id="info-grid"
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">Set</span>
                </div>
                <p className="text-slate-700 font-medium text-sm md:text-base">
                  {card.set_name}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Hash className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">
                    Number
                  </span>
                </div>
                <p className="text-slate-700 font-medium text-sm md:text-base">
                  #{card.collector_number}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">
                    Rarity
                  </span>
                </div>
                <RarityBadge rarity={card.rarity} />
              </div>
              <div className="space-y-1 col-span-2 md:col-span-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <Palette className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">
                    Artist
                  </span>
                </div>
                <p className="text-slate-700 font-medium text-sm md:text-base">
                  {card.artist}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDisplay;
