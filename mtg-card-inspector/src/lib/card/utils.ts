import { CardFace, ScryfallCard } from "@/types/scryfall";

export function getIsDoubleFaced(card: ScryfallCard): boolean {
  if (!card.card_faces) {
    return false;
  }
  return card.card_faces && card.card_faces.length > 1;
}

export function getOracleText({
  face,
  card,
}: {
  face?: CardFace;
  card: ScryfallCard;
}) {
  if (getIsDoubleFaced(card)) {
    return face?.oracle_text || "";
  }
  return card.oracle_text || "";
}

export function getFlavorText({
  face,
  card,
}: {
  face?: CardFace;
  card: ScryfallCard;
}) {
  if (getIsDoubleFaced(card)) {
    return face?.flavor_text || "";
  }
  return card.flavor_text || "";
}

export function getTypeLine({
  face,
  card,
}: {
  face?: CardFace;
  card: ScryfallCard;
}) {
  if (getIsDoubleFaced(card)) {
    return face?.type_line || card.type_line;
  }
  return card.type_line;
}

export function getManaCost({
  face,
  card,
}: {
  face?: CardFace;
  card: ScryfallCard;
}) {
  if (getIsDoubleFaced(card)) {
    return face?.mana_cost || card.mana_cost || "";
  }
  return card.mana_cost || "";
}

export function getPowerToughness({
  face,
  card,
}: {
  face?: CardFace;
  card: ScryfallCard;
}) {
  if (getIsDoubleFaced(card)) {
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
