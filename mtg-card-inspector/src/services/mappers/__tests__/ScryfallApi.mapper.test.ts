import mapScryfallCardToInternal from "../ScryfallApi.mapper";

describe("mapScryfallCardToInternal", () => {
  const mockResponse = {
    all_parts: [],
    artist: "John Doe",
    artist_ids: ["artist-1"],
    booster: true,
    border_color: "black",
    card_back_id: "back123",
    card_faces: [],
    cardmarket_id: 123,
    cmc: 3,
    collector_number: "045",
    color_identity: ["U"],
    colors: ["U"],
    digital: false,
    edhrec_rank: 2000,
    finishes: ["nonfoil"],
    flavor_text: "Some flavor text",
    foil: false,
    frame: "2015",
    frame_effects: [],
    full_art: false,
    game_changer: false,
    games: ["paper"],
    highres_image: true,
    id: "abc123",
    image_status: "highres_scan",
    image_uris: { small: "img.jpg" },
    keywords: ["Flying"],
    lang: "en",
    legalities: { standard: "not_legal" },
    mana_cost: "{U}{U}",
    market_prices: [
      {
        name: "TCGPlayer",
        key: "usd",
        currency: "$",
        color: "#5c6bc0",
        url: "url",
        amount: "1.00",
      },
      {
        name: "TCGPlayer (Foil)",
        key: "usd_foil",
        currency: "$",
        color: "#5c6bc0",
        url: "url",
        amount: "1.00",
      },
      {
        name: "CardMarket",
        key: "eur",
        currency: "€",
        color: "#7e57c2",
        url: "url",
        amount: "1.00",
      },
      {
        name: "CardMarket (Foil)",
        key: "eur_foil",
        currency: "€",
        color: "#7e57c2",
        url: "url",
        amount: "1.00",
      },
      {
        name: "Cardhoarder (MTGO)",
        key: "tix",
        currency: "tix",
        color: "#00897b",
        url: "url",
        amount: "1.00",
      },
    ],
    mtgo_id: 555,
    multiverse_ids: [111],
    name: "Test Card",
    nonfoil: true,
    object: "card",
    oracle_id: "oracle-123",
    oracle_text: "Some oracle text",
    oversized: false,
    preview: {},
    prices: {
      eur: "1.00",
      eur_foil: "1.00",
      tix: "1.00",
      usd: "1.00",
      usd_etched: null,
      usd_foil: "1.00",
    },
    prints_search_uri: "https://prints",
    produced_mana: ["U"],
    promo: false,
    promo_types: [],
    purchase_uris: {
      cardhoarder: "url",
      cardmarket: "url",
      tcgplayer: "url",
    },
    related_uris: { gatherer: "url" },
    released_at: "2021-01-01",
    rarity: "common",
    reprint: false,
    reserved: false,
    rulings_uri: "https://rulings",
    scryfall_uri: "https://scryfall",
    set_name: "Test Set",
    set_search_uri: "https://set",
    set_type: "core",
    set_uri: "https://seturi",
    set: "tst",
    story_spotlight: false,
    tcgplayer_id: 999,
    type_line: "Creature — Test",
    scryfall_set_uri: "https://seturi2",
    set_id: "set123",
    textless: false,
    uri: "https://card",
    variation: false,
  };

  it("should map all fields correctly", () => {
    const result = mapScryfallCardToInternal(mockResponse);

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when response is null", () => {
    expect(() => mapScryfallCardToInternal(null)).toThrow(
      "Invalid Scryfall API response"
    );
  });

  it("should throw an error when response is not an object", () => {
    expect(() => mapScryfallCardToInternal("not-an-object")).toThrow(
      "Invalid Scryfall API response"
    );
  });

  it("should throw an error when response is undefined", () => {
    expect(() => mapScryfallCardToInternal(undefined)).toThrow(
      "Invalid Scryfall API response"
    );
  });
});
