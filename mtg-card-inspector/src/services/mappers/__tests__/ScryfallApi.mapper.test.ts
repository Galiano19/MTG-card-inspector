import { Prices, purchaseUris, ScryfallCardRuling } from "@/types/scryfall";
import mapScryfallCardToInternal, {
  mapMarketPrices,
  mapRulingsOfCard,
} from "../ScryfallApi.mapper";

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
    layout: "normal",
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
    power: "2",
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
    rulings: [],
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
    toughness: "3",
    uri: "https://card",
    variation: false,
  };

  it("should map all fields correctly", () => {
    const result = mapScryfallCardToInternal(mockResponse);

    // Verify main fields are preserved
    expect(result.id).toBe(mockResponse.id);
    expect(result.name).toBe(mockResponse.name);
    expect(result.type_line).toBe(mockResponse.type_line);
    expect(result.oracle_text).toBe(mockResponse.oracle_text);
    expect(result.mana_cost).toBe(mockResponse.mana_cost);
    expect(result.rarity).toBe(mockResponse.rarity);
    expect(result.set).toBe(mockResponse.set);
    expect(result.set_name).toBe(mockResponse.set_name);
    expect(result.artist).toBe(mockResponse.artist);
    expect(result.released_at).toBe(mockResponse.released_at);

    // Verify arrays/objects are preserved
    expect(result.colors).toEqual(mockResponse.colors);
    expect(result.color_identity).toEqual(mockResponse.color_identity);
    expect(result.keywords).toEqual(mockResponse.keywords);
    expect(result.legalities).toEqual(mockResponse.legalities);
    expect(result.purchase_uris).toEqual(mockResponse.purchase_uris);
    expect(result.image_uris).toEqual(mockResponse.image_uris);

    // Verify market prices are calculated
    expect(result.market_prices).toBeDefined();
    expect(result.market_prices?.length).toBeGreaterThan(0);

    // Verify rulings are mapped (empty array from empty input)
    expect(result.rulings).toEqual([]);
  });

  it("should throw an error when response is null", () => {
    expect(() => mapScryfallCardToInternal(null)).toThrow(
      "Invalid Scryfall API response",
    );
  });

  it("should throw an error when response is not an object", () => {
    expect(() => mapScryfallCardToInternal("not-an-object")).toThrow(
      "Invalid Scryfall API response",
    );
  });

  it("should throw an error when response is undefined", () => {
    expect(() => mapScryfallCardToInternal(undefined)).toThrow(
      "Invalid Scryfall API response",
    );
  });
});

describe("mapMarketPrices", () => {
  const purchaseUrisMock: purchaseUris = {
    tcgplayer: "https://tcgplayer.com",
    cardmarket: "https://cardmarket.com",
    cardhoarder: "https://cardhoarder.com",
  };

  it("should map USD prices with variants correctly", () => {
    const prices: Prices = {
      usd: "1.42",
      usd_foil: "2.08",
      usd_etched: null,
    };

    const result = mapMarketPrices(prices, purchaseUrisMock);

    expect(result).toEqual([
      {
        name: "TCGPlayer",
        key: "usd",
        currency: "$",
        color: "#5c6bc0",
        url: purchaseUrisMock.tcgplayer,
        amount: "1.42",
      },
      {
        name: "TCGPlayer (Foil)",
        key: "usd_foil",
        currency: "$",
        color: "#5c6bc0",
        url: purchaseUrisMock.tcgplayer,
        amount: "2.08",
      },
      // usd_etched is skipped because it is null
    ]);
  });

  it("should map EUR prices including foil variant", () => {
    const prices: Prices = {
      eur: "2.03",
      eur_foil: "3.66",
    };

    const result = mapMarketPrices(prices, purchaseUrisMock);

    expect(result).toEqual([
      {
        name: "CardMarket",
        key: "eur",
        currency: "€",
        color: "#7e57c2",
        url: purchaseUrisMock.cardmarket,
        amount: "2.03",
      },
      {
        name: "CardMarket (Foil)",
        key: "eur_foil",
        currency: "€",
        color: "#7e57c2",
        url: purchaseUrisMock.cardmarket,
        amount: "3.66",
      },
    ]);
  });

  it("should map TIX prices", () => {
    const prices: Prices = { tix: "0.98" };

    const result = mapMarketPrices(prices, purchaseUrisMock);

    expect(result).toEqual([
      {
        name: "Cardhoarder (MTGO)",
        key: "tix",
        currency: "tix",
        color: "#00897b",
        url: purchaseUrisMock.cardhoarder,
        amount: "0.98",
      },
    ]);
  });

  it("should return an empty array if prices or purchaseUris are missing", () => {
    expect(mapMarketPrices(null as any, purchaseUrisMock)).toEqual([]);
    expect(mapMarketPrices({ usd: "1.0" }, null as any)).toEqual([]);
  });

  it("should skip null or undefined prices", () => {
    const prices: Prices = {
      usd: null,
      usd_foil: undefined as any,
      eur: "2.03",
    };

    const result = mapMarketPrices(prices, purchaseUrisMock);

    expect(result).toEqual([
      {
        name: "CardMarket",
        key: "eur",
        currency: "€",
        color: "#7e57c2",
        url: purchaseUrisMock.cardmarket,
        amount: "2.03",
      },
    ]);
  });

  it("should handle empty prices object", () => {
    const result = mapMarketPrices({}, purchaseUrisMock);
    expect(result).toEqual([]);
  });

  it("should map etched variant correctly", () => {
    const prices: Prices = {
      usd: "10.00",
      usd_etched: "12.50",
    };

    const result = mapMarketPrices(prices, purchaseUrisMock);

    expect(result).toContainEqual({
      name: "TCGPlayer",
      key: "usd",
      currency: "$",
      color: "#5c6bc0",
      url: purchaseUrisMock.tcgplayer,
      amount: "10.00",
    });

    expect(result).toContainEqual({
      name: "TCGPlayer (Etched)",
      key: "usd_etched",
      currency: "$",
      color: "#5c6bc0",
      url: purchaseUrisMock.tcgplayer,
      amount: "12.50",
    });
  });

  it("should handle only EUR variant without foil", () => {
    const prices: Prices = {
      eur: "2.50",
    };

    const result = mapMarketPrices(prices, purchaseUrisMock);

    expect(result).toEqual([
      {
        name: "CardMarket",
        key: "eur",
        currency: "€",
        color: "#7e57c2",
        url: purchaseUrisMock.cardmarket,
        amount: "2.50",
      },
    ]);
    expect(result.length).toBe(1);
  });

  it("should handle high and low price values", () => {
    const prices: Prices = {
      usd: "0.01",
      usd_foil: "999.99",
    };

    const result = mapMarketPrices(prices, purchaseUrisMock);

    expect(result[0].amount).toBe("0.01");
    expect(result[1].amount).toBe("999.99");
  });

  it("should skip price entries with false/zero values if they exist", () => {
    const prices: Prices = {
      usd: "0.00",
      eur: "1.50",
    };

    const result = mapMarketPrices(prices, purchaseUrisMock);

    // 0.00 is still a valid price, should be included
    expect(result.some((p) => p.key === "usd")).toBe(true);
    expect(result.some((p) => p.key === "eur")).toBe(true);
  });

  it("should handle multiple price currencies at once", () => {
    const prices: Prices = {
      usd: "5.00",
      usd_foil: "7.50",
      eur: "4.50",
      eur_foil: "6.75",
      tix: "2.25",
    };

    const result = mapMarketPrices(prices, purchaseUrisMock);

    expect(result.length).toBe(5);

    const usdEntries = result.filter((p) => p.key.startsWith("usd"));
    expect(usdEntries.length).toBe(2);

    const eurEntries = result.filter((p) => p.key.startsWith("eur"));
    expect(eurEntries.length).toBe(2);

    const tixEntries = result.filter((p) => p.key === "tix");
    expect(tixEntries.length).toBe(1);
  });

  it("should use correct URLs for each market", () => {
    const prices: Prices = {
      usd: "1.00",
      eur: "1.00",
      tix: "1.00",
    };

    const result = mapMarketPrices(prices, purchaseUrisMock);

    const usd = result.find((p) => p.key === "usd");
    expect(usd?.url).toBe(purchaseUrisMock.tcgplayer);

    const eur = result.find((p) => p.key === "eur");
    expect(eur?.url).toBe(purchaseUrisMock.cardmarket);

    const tix = result.find((p) => p.key === "tix");
    expect(tix?.url).toBe(purchaseUrisMock.cardhoarder);
  });

  it("should return empty array if prices is null and purchaseUris exist", () => {
    const result = mapMarketPrices(null as any, purchaseUrisMock);
    expect(result).toEqual([]);
  });

  it("should return empty array if purchaseUris is null and prices exist", () => {
    const prices: Prices = { usd: "1.00" };
    const result = mapMarketPrices(prices, null as any);
    expect(result).toEqual([]);
  });

  it("should return empty array if both prices and purchaseUris are null", () => {
    const result = mapMarketPrices(null as any, null as any);
    expect(result).toEqual([]);
  });
});

describe("mapRulingsOfCard", () => {
  it("should map rulings correctly", () => {
    const mockRulings: ScryfallCardRuling[] = [
      {
        object: "ruling",
        oracle_id: "oracle-123",
        source: "wotc",
        published_at: "2021-01-01",
        comment: "This card does something special",
      },
      {
        object: "ruling",
        oracle_id: "oracle-123",
        source: "wotc",
        published_at: "2021-06-15",
        comment: "Another ruling about this card",
      },
    ];

    const result = mapRulingsOfCard(mockRulings);

    expect(result).toEqual(mockRulings);
    expect(result.length).toBe(2);
    expect(result[0].comment).toBe("This card does something special");
    expect(result[1].published_at).toBe("2021-06-15");
  });

  it("should handle empty rulings array", () => {
    const result = mapRulingsOfCard([]);

    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it("should preserve all ruling properties", () => {
    const mockRuling: ScryfallCardRuling = {
      object: "ruling",
      oracle_id: "oracle-456",
      source: "wotc",
      published_at: "2023-01-15",
      comment: "Test ruling with all properties",
    };

    const result = mapRulingsOfCard([mockRuling]);

    expect(result[0].object).toBe("ruling");
    expect(result[0].oracle_id).toBe("oracle-456");
    expect(result[0].source).toBe("wotc");
    expect(result[0].published_at).toBe("2023-01-15");
    expect(result[0].comment).toBe("Test ruling with all properties");
  });

  it("should handle multiple rulings without modification", () => {
    const mockRulings: ScryfallCardRuling[] = Array.from(
      { length: 5 },
      (_, i) => ({
        object: "ruling",
        oracle_id: `oracle-${i}`,
        source: "wotc",
        published_at: `2021-0${i + 1}-01`,
        comment: `Ruling ${i + 1}`,
      }),
    );

    const result = mapRulingsOfCard(mockRulings);

    expect(result.length).toBe(5);
    expect(result).toEqual(mockRulings);
  });
});

describe("mapScryfallCardToInternal - Extended Tests", () => {
  const createMockResponse = (overrides = {}) => ({
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
    layout: "normal",
    legalities: { standard: "not_legal" },
    mana_cost: "{U}{U}",
    mtgo_id: 555,
    multiverse_ids: [111],
    name: "Test Card",
    nonfoil: true,
    object: "card",
    oracle_id: "oracle-123",
    oracle_text: "Some oracle text",
    oversized: false,
    power: "2",
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
    toughness: "3",
    uri: "https://card",
    variation: false,
    ...overrides,
  });

  it("should map card with rulings", () => {
    const rulings: ScryfallCardRuling[] = [
      {
        object: "ruling",
        oracle_id: "oracle-123",
        source: "wotc",
        published_at: "2021-03-15",
        comment: "Can be cast for alternate mana costs",
      },
    ];

    const mockResponse = createMockResponse({ rulings });
    const result = mapScryfallCardToInternal(mockResponse);

    expect(result.rulings).toEqual(rulings);
    expect(result.rulings?.length).toBe(1);
  });

  it("should handle cards with no optional fields", () => {
    const minimalMockResponse = createMockResponse({
      flavor_text: undefined,
      keywords: [],
      produced_mana: [],
      preview: undefined,
    });

    const result = mapScryfallCardToInternal(minimalMockResponse);

    expect(result.id).toBe(minimalMockResponse.id);
    expect(result.name).toBe(minimalMockResponse.name);
    expect(result.flavor_text).toBeUndefined();
    expect(result.keywords).toEqual([]);
  });

  it("should preserve multi-color card data", () => {
    const multicolorMockResponse = createMockResponse({
      name: "Dual Color Card",
      colors: ["U", "R"],
      color_identity: ["U", "R"],
      mana_cost: "{U}{R}",
    });

    const result = mapScryfallCardToInternal(multicolorMockResponse);

    expect(result.colors).toEqual(["U", "R"]);
    expect(result.color_identity).toEqual(["U", "R"]);
    expect(result.mana_cost).toBe("{U}{R}");
  });

  it("should handle cards with multiple legalities", () => {
    const multiLegalityMockResponse = createMockResponse({
      legalities: {
        standard: "not_legal",
        modern: "legal",
        commander: "legal",
        vintage: "legal",
        legacy: "legal",
      },
    });

    const result = mapScryfallCardToInternal(multiLegalityMockResponse);

    expect(result.legalities?.modern).toBe("legal");
    expect(result.legalities?.commander).toBe("legal");
    expect(Object.keys(result.legalities || {})).toHaveLength(5);
  });

  it("should correctly calculate market prices for all variants", () => {
    const mockResponse = createMockResponse();
    const result = mapScryfallCardToInternal(mockResponse);

    const marketPrices = result.market_prices;
    expect(marketPrices).toBeDefined();
    expect(marketPrices?.length).toBeGreaterThan(0);

    // Should have USD, USD Foil entries
    const usdPrices = marketPrices?.filter((p) => p.key.includes("usd"));
    expect(usdPrices?.length).toBeGreaterThan(0);

    // Should have EUR and EUR Foil entries
    const eurPrices = marketPrices?.filter((p) => p.key.includes("eur"));
    expect(eurPrices?.length).toBeGreaterThan(0);

    // Should have TIX entry
    const tixPrices = marketPrices?.filter((p) => p.key === "tix");
    expect(tixPrices?.length).toBe(1);
  });

  it("should handle card data with special characters", () => {
    const specialCharMockResponse = createMockResponse({
      name: "Über-Card — Test",
      type_line: "Creature — Dragon/Angel",
      oracle_text: "This card has 'special' abilities & effects",
    });

    const result = mapScryfallCardToInternal(specialCharMockResponse);

    expect(result.name).toBe("Über-Card — Test");
    expect(result.type_line).toBe("Creature — Dragon/Angel");
    expect(result.oracle_text).toContain("special");
  });

  it("should preserve numeric power and toughness as strings", () => {
    const powerToughnessMockResponse = createMockResponse({
      power: "5",
      toughness: "6",
    });

    const result = mapScryfallCardToInternal(powerToughnessMockResponse);

    expect(result.power).toBe("5");
    expect(result.toughness).toBe("6");
  });

  it("should handle variable power and toughness", () => {
    const variableStatsMockResponse = createMockResponse({
      power: "*",
      toughness: "1+*",
    });

    const result = mapScryfallCardToInternal(variableStatsMockResponse);

    expect(result.power).toBe("*");
    expect(result.toughness).toBe("1+*");
  });
});
