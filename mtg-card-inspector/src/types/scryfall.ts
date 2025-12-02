// Scryfall API types
export interface ScryfallCard {
  object: string;
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  mtgo_id?: number;
  mtgo_foil_id?: number;
  tcgplayer_id?: number;
  cardmarket_id?: number;
  name: string;
  lang: string;
  released_at: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_status: string;
  image_uris?: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  mana_cost?: string;
  cmc: number;
  type_line: string;
  oracle_text?: string;
  power?: string;
  toughness?: string;
  colors?: string[];
  color_identity: string[];
  keywords: string[];
  legalities: Record<string, string>;
  games: string[];
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set_id: string;
  set: string;
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: string;
  card_back_id: string;
  artist?: string;
  artist_ids?: string[];
  illustration_id?: string;
  border_color: string;
  frame: string;
  frame_effects?: string[];
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  edhrec_rank?: number;
  preview?: {
    source: string;
    source_uri: string;
    previewed_at: string;
  };
  prices: {
    usd?: string;
    usd_foil?: string;
    usd_etched?: string;
    eur?: string;
    eur_foil?: string;
    tix?: string;
  };
  related_uris: {
    gatherer?: string;
    tcgplayer_infinite_articles?: string;
    tcgplayer_infinite_decks?: string;
    edhrec?: string;
  };
  purchase_uris?: {
    tcgplayer?: string;
    cardmarket?: string;
    cardhoarder?: string;
  };
}

export interface ScryfallLegalities {
  alchemy: "not_legal" | "legal" | "banned" | "restricted";
  brawl: "not_legal" | "legal" | "banned" | "restricted";
  commander: "not_legal" | "legal" | "banned" | "restricted";
  duel: "not_legal" | "legal" | "banned" | "restricted";
  future: "not_legal" | "legal" | "banned" | "restricted";
  gladiator: "not_legal" | "legal" | "banned" | "restricted";
  historic: "not_legal" | "legal" | "banned" | "restricted";
  legacy: "not_legal" | "legal" | "banned" | "restricted";
  modern: "not_legal" | "legal" | "banned" | "restricted";
  oathbreaker: "not_legal" | "legal" | "banned" | "restricted";
  oldschool: "not_legal" | "legal" | "banned" | "restricted";
  pauper: "not_legal" | "legal" | "banned" | "restricted";
  paupercommander: "not_legal" | "legal" | "banned" | "restricted";
  penny: "not_legal" | "legal" | "banned" | "restricted";
  pioneer: "not_legal" | "legal" | "banned" | "restricted";
  predh: "not_legal" | "legal" | "banned" | "restricted";
  premodern: "not_legal" | "legal" | "banned" | "restricted";
  standard: "not_legal" | "legal" | "banned" | "restricted";
  standardbrawl: "not_legal" | "legal" | "banned" | "restricted";
  timeless: "not_legal" | "legal" | "banned" | "restricted";
  vintage: "not_legal" | "legal" | "banned" | "restricted";
}
