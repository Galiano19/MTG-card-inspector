import {
  MarketPrice,
  Prices,
  purchaseUris,
  ScryfallCard,
  ScryfallCardRuling,
} from "@/types/scryfall";

export default function mapScryfallCardToInternal(response: any): ScryfallCard {
  if (!response || typeof response !== "object") {
    throw new Error("Invalid Scryfall API response");
  }

  return {
    all_parts: response.all_parts,
    artist: response.artist,
    artist_ids: response.artist_ids,
    booster: response.booster,
    border_color: response.border_color,
    card_back_id: response.card_back_id,
    card_faces: response.card_faces,
    cardmarket_id: response.cardmarket_id,
    cmc: response.cmc,
    collector_number: response.collector_number,
    color_identity: response.color_identity,
    colors: response.colors,
    digital: response.digital,
    edhrec_rank: response.edhrec_rank,
    finishes: response.finishes,
    flavor_text: response.flavor_text,
    foil: response.foil,
    frame: response.frame,
    frame_effects: response.frame_effects,
    full_art: response.full_art,
    game_changer: response.game_changer,
    games: response.games,
    highres_image: response.highres_image,
    id: response.id,
    image_status: response.image_status,
    image_uris: response.image_uris,
    keywords: response.keywords,
    lang: response.lang,
    layout: response.layout,
    legalities: response.legalities,
    mana_cost: response.mana_cost,
    market_prices: mapMarketPrices(response.prices, response.purchase_uris),
    mtgo_id: response.mtgo_id,
    multiverse_ids: response.multiverse_ids,
    name: response.name,
    curated_name: curateName(response.name),
    nonfoil: response.nonfoil,
    object: response.object,
    oracle_id: response.oracle_id,
    oracle_text: response.oracle_text,
    oversized: response.oversized,
    power: response.power,
    preview: response.preview,
    prices: response.prices,
    prints_search_uri: response.prints_search_uri,
    produced_mana: response.produced_mana,
    promo: response.promo,
    promo_types: response.promo_types,
    purchase_uris: response.purchase_uris,
    related_uris: response.related_uris,
    released_at: response.released_at,
    rarity: response.rarity,
    reprint: response.reprint,
    reserved: response.reserved,
    rulings_uri: response.rulings_uri,
    rulings: mapRulingsOfCard(response.rulings || []),
    scryfall_uri: response.scryfall_uri,
    set_name: response.set_name,
    set_search_uri: response.set_search_uri,
    set_type: response.set_type,
    set_uri: response.set_uri,
    set: response.set,
    similar_cards: response.similar_cards,
    story_spotlight: response.story_spotlight,
    tcgplayer_id: response.tcgplayer_id,
    type_line: response.type_line,
    scryfall_set_uri: response.scryfall_set_uri,
    set_id: response.set_id,
    textless: response.textless,
    toughness: response.toughness,
    uri: response.uri,
    variation: response.variation,
  };
}

export function curateName(name: string): string {
  return name.replace(/\s+/g, "-").toLowerCase();
}

export function mapMarketPrices(
  prices: Prices,
  purchaseUris: purchaseUris,
): MarketPrice[] | undefined {
  if (!prices || !purchaseUris) return [];

  const mappingRules = [
    {
      keys: ["usd", "usd_foil", "usd_etched"],
      currency: "$",
      color: "#5c6bc0",
      url: purchaseUris.tcgplayer,
      name: "TCGPlayer",
    },
    {
      keys: ["eur", "eur_foil"],
      currency: "€",
      color: "#7e57c2",
      url: purchaseUris.cardmarket,
      name: "CardMarket",
    },
    {
      keys: ["tix"],
      currency: "tix",
      color: "#00897b",
      url: purchaseUris.cardhoarder,
      name: "Cardhoarder (MTGO)",
    },
  ];

  const result: MarketPrice[] = [];

  for (const rule of mappingRules) {
    for (const key of rule.keys) {
      if (key in prices) {
        if (!prices[key as keyof Prices]) continue;

        // Determine variant suffix
        let variantName = rule.name;
        if (key.endsWith("_foil")) variantName += " (Foil)";
        else if (key.endsWith("_etched")) variantName += " (Etched)";

        result.push({
          name: variantName,
          key,
          currency: rule.currency,
          color: rule.color,
          url: rule.url,
          amount: prices[key as keyof Prices] || null,
        });
      }
    }
  }

  return result;
}

export function mapRulingsOfCard(
  rulings: ScryfallCardRuling[],
): ScryfallCardRuling[] {
  return rulings.map((ruling) => ({
    ...ruling,
  }));
}
