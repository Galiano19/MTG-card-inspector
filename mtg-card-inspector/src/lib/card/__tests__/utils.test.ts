import {
  getIsDoubleFaced,
  getOracleText,
  getFlavorText,
  getTypeLine,
  getManaCost,
  getPowerToughness,
} from "../utils";
import { ScryfallCard, CardFace } from "@/types/scryfall";

const mockSingleFaceCard: ScryfallCard = {
  oracle_text: "anOracleText",
  flavor_text: "aFlavorText",
  type_line: "aTypeLine",
  mana_cost: "{aManaCost}",
  power: "aPower",
  toughness: "aToughness",
} as ScryfallCard;

const mockDoubleFaceCard: ScryfallCard = {
  card_faces: [
    {
      oracle_text: "aFrontOracleText",
      flavor_text: "aFrontFlavorText",
      type_line: "aFrontTypeLine",
      mana_cost: "{aFrontManaCost}",
      power: "aFrontPower",
      toughness: "aFrontToughness",
    } as CardFace,
    {
      oracle_text: "anBackOracleText",
      flavor_text: "aBackFlavorText",
      type_line: "aBackTypeLine",
      mana_cost: "{aBackManaCost}",
      power: "aBackPower",
      toughness: "aBackToughness",
    } as CardFace,
  ],
  type_line: "aDoubleFaceTypeLine",
  mana_cost: "{aDoubleFaceManaCost}",
} as ScryfallCard;

describe("getIsDoubleFaced", () => {
  it("returns false for single-faced card", () => {
    expect(getIsDoubleFaced(mockSingleFaceCard)).toBe(false);
  });

  it("returns true for double-faced card", () => {
    expect(getIsDoubleFaced(mockDoubleFaceCard)).toBe(true);
  });

  it("returns false when card_faces is undefined", () => {
    expect(getIsDoubleFaced({} as ScryfallCard)).toBe(false);
  });
});

describe("getOracleText", () => {
  it("returns card oracle text for single-faced card", () => {
    expect(getOracleText({ card: mockSingleFaceCard })).toBe("anOracleText");
  });

  it("returns face oracle text for double-faced card", () => {
    expect(
      getOracleText({
        face: mockDoubleFaceCard.card_faces![0],
        card: mockDoubleFaceCard,
      })
    ).toBe("aFrontOracleText");
  });

  it("returns empty string when no oracle text", () => {
    expect(getOracleText({ card: {} as ScryfallCard })).toBe("");
  });
});

describe("getFlavorText", () => {
  it("returns card flavor text for single-faced card", () => {
    expect(getFlavorText({ card: mockSingleFaceCard })).toBe("aFlavorText");
  });

  it("returns face flavor text for double-faced card", () => {
    expect(
      getFlavorText({
        face: mockDoubleFaceCard.card_faces![0],
        card: mockDoubleFaceCard,
      })
    ).toBe("aFrontFlavorText");
  });

  it("returns empty string when no flavor text", () => {
    expect(getFlavorText({ card: {} as ScryfallCard })).toBe("");
  });
});

describe("getTypeLine", () => {
  it("returns card type line for single-faced card", () => {
    expect(getTypeLine({ card: mockSingleFaceCard })).toBe("aTypeLine");
  });

  it("returns face type line for double-faced card", () => {
    expect(
      getTypeLine({
        face: mockDoubleFaceCard.card_faces![0],
        card: mockDoubleFaceCard,
      })
    ).toBe("aFrontTypeLine");
  });

  it("falls back to card type line when face has no type line", () => {
    expect(
      getTypeLine({ face: {} as CardFace, card: mockDoubleFaceCard })
    ).toBe("aDoubleFaceTypeLine");
  });
});

describe("getManaCost", () => {
  it("returns card mana cost for single-faced card", () => {
    expect(getManaCost({ card: mockSingleFaceCard })).toStrictEqual([
      "amanacost",
    ]);
  });

  it("returns face mana cost for double-faced card", () => {
    expect(
      getManaCost({
        face: mockDoubleFaceCard.card_faces![0],
        card: mockDoubleFaceCard,
      })
    ).toStrictEqual(["afrontmanacost"]);
  });

  it("returns empty string when no mana cost", () => {
    expect(getManaCost({ card: {} as ScryfallCard })).toStrictEqual([]);
  });
});

describe("getPowerToughness", () => {
  it("returns power/toughness for single-faced card", () => {
    expect(getPowerToughness({ card: mockSingleFaceCard })).toBe(
      "aPower/aToughness"
    );
  });

  it("returns face power/toughness for double-faced card", () => {
    expect(
      getPowerToughness({
        face: mockDoubleFaceCard.card_faces![0],
        card: mockDoubleFaceCard,
      })
    ).toBe("aFrontPower/aFrontToughness");
  });

  it("returns null when no power/toughness", () => {
    expect(getPowerToughness({ card: {} as ScryfallCard })).toBe(null);
  });

  it("returns null when only power exists", () => {
    expect(
      getPowerToughness({ card: { power: "aPower" } as ScryfallCard })
    ).toBe(null);
  });
});

describe("sanitizeSymbol", () => {
  it("returns empty array if no mana cost is provided", () => {
    expect(getManaCost({ card: {} as ScryfallCard })).toEqual([]);
  });

  it("correctly sanitizes a mana cost string", () => {
    const manaCost = "{2}{U}{U}{B/R}{G/P}";
    expect(
      getManaCost({ card: { mana_cost: manaCost } as ScryfallCard })
    ).toEqual(["2", "u", "u", "br", "gp"]);
  });
});
