// Scryfall API types
export interface ScryfallCard {
  all_parts?: RelatedCard[];
  artist?: string;
  artist_ids?: string[];
  booster: boolean;
  border_color: string;
  card_back_id?: string;
  card_faces?: CardFace[];
  cardmarket_id?: number;
  cmc: number;
  collector_number: string;
  color_identity: string[];
  colors?: string[];
  digital: boolean;
  edhrec_rank?: number;
  finishes: string[];
  flavor_text?: string;
  foil: boolean;
  frame: string;
  frame_effects?: string[];
  full_art: boolean;
  game_changer: boolean;
  games: string[];
  highres_image: boolean;
  id: string;
  image_status: string;
  image_uris?: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  keywords: string[];
  lang: string;
  legalities: ScryfallLegalities;
  mana_cost?: string;
  market_prices?: MarketPrice[];
  mtgo_id?: number;
  multiverse_ids: number[];
  name: string;
  nonfoil: boolean;
  object: string;
  oracle_id: string;
  oracle_text?: string;
  oversized: boolean;
  power?: string;
  preview?: Preview;
  prices: Prices;
  prints_search_uri: string;
  produced_mana?: string[];
  promo: boolean;
  promo_types?: string[];
  purchase_uris: purchaseUris;
  related_arts?: RelatedArt[];
  related_uris: Record<string, string>;
  released_at: string;
  rarity: string;
  reprint: boolean;
  reserved: boolean;
  rulings_uri: string;
  scryfall_set_uri: string;
  scryfall_uri: string;
  security_stamp?: string;
  set: string;
  set_id: string;
  set_name: string;
  set_search_uri: string;
  set_type: string;
  set_uri: string;
  story_spotlight: boolean;
  tcgplayer_id?: number;
  textless: boolean;
  toughness?: string;
  type_line: string;
  uri: string;
  variation: boolean;
}

export interface RelatedArt {
  id: string;
  image_normal: string;
  image_large: string;
}

export interface purchaseUris {
  cardhoarder?: string;
  cardmarket?: string;
  tcgplayer?: string;
}

export interface MarketPrice {
  name: string;
  key: string;
  currency: string;
  color: string;
  url?: string;
  amount: string | null;
}

interface CardFace {
  object: "card_face";
  name: string;
  mana_cost: string;
  type_line: string;
  flavor_text?: string;
  oracle_text: string;
  power?: string;
  toughness?: string;
  colors: string[];
  artist: string;
  artist_id: string;
  illustration_id: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
}

interface RelatedCard {
  object: "related_card";
  id: string;
  component: string;
  name: string;
  type_line: string;
  uri: string;
}

export interface Prices {
  usd?: string | null;
  usd_foil?: string | null;
  usd_etched?: string | null;
  eur?: string | null;
  eur_foil?: string | null;
  tix?: string | null;
}

interface Preview {
  source: string;
  source_uri: string;
  previewed_at: string;
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
