import { CardFace, ScryfallCard } from "@/types/scryfall";

export function getIsTransformable(card: ScryfallCard): boolean {
  const transformanbleLayouts = [
    "transform",
    "modal_dfc",
    "meld",
    "double_faced_token",
    "art_series",
    "reversible_card",
  ];
  if (card.layout && transformanbleLayouts.includes(card.layout)) {
    return true;
  }

  return false;
}

export function getHasMultipleFaces(card: ScryfallCard): boolean {
  const MultipleFaceLayouts = [
    "split",
    "flip",
    "adventure",
    "double_faced_token",
    "art_series",
    "reversible_card",
  ];
  if (card.layout && MultipleFaceLayouts.includes(card.layout)) {
    return true;
  }

  return false;
}

function getDataIsFace(data: CardFace | ScryfallCard): boolean {
  return !("card_faces" in data);
}

export function getOracleText(data: CardFace | ScryfallCard) {
  if (getDataIsFace(data)) {
    if (!data.oracle_text) {
      return null;
    }
    return data.oracle_text;
  }

  if (!data.oracle_text) {
    return null;
  }

  return data.oracle_text;
}

export function getFlavorText(data: CardFace | ScryfallCard) {
  if (getDataIsFace(data)) {
    if (!data.flavor_text) {
      return null;
    }
    return data.flavor_text;
  }

  if (!data.flavor_text) {
    return null;
  }

  return data.flavor_text;
}

export function getTypeLine(data: CardFace | ScryfallCard) {
  return data.type_line;
}

// export function getTypeLine({
//   face,
//   card,
// }: {
//   face?: CardFace;
//   card: ScryfallCard;
// }) {
//   if (getIsTransformable(card)) {
//     return face?.type_line || card.type_line;
//   }
//   return card.type_line;
// }

export function getManaCost(data: CardFace | ScryfallCard) {
  if (getDataIsFace(data)) {
    if (!data.mana_cost) {
      return null;
    }
    return sanitizeSymbol(data.mana_cost);
  }

  if (!data.mana_cost) {
    return null;
  }

  return sanitizeSymbol(data.mana_cost);
}

export function getPowerToughness({
  face,
  card,
}: {
  face?: CardFace;
  card: ScryfallCard;
}) {
  if (getIsTransformable(card)) {
    if (face?.power && face?.toughness) {
      return `${face.power}/${face.toughness}`;
    }
    return null;
  }
  if (card.power && card.toughness) {
    return `${card.power}/${card.toughness}`;
  }
  return null;
}

export function sanitizeSymbol(manaCost?: string): string[] {
  if (!manaCost) return [];

  const regex = /\{([^}]+)\}/g;
  const matches = [];
  let match;

  while ((match = regex.exec(manaCost)) !== null) {
    let symbol = match[1].toLowerCase().replace(/\//g, "");
    if (symbol) {
      matches.push(symbol);
    }
  }

  return matches;
}
