import {
  getIsTransformable,
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
  layout: "normal",
} as ScryfallCard;

const mockTransformableCard: ScryfallCard = {
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
  layout: "transform",
} as ScryfallCard;

describe("getIsTransformable", () => {
  it("returns false for single-faced card", () => {
    expect(getIsTransformable(mockSingleFaceCard)).toBe(false);
  });

  it("returns true for double-faced card", () => {
    expect(getIsTransformable(mockTransformableCard)).toBe(true);
  });

  it("returns false when card_faces is undefined", () => {
    expect(getIsTransformable({} as ScryfallCard)).toBe(false);
  });
});

describe("getOracleText", () => {
  it("returns card oracle text for single-faced card", () => {
    expect(getOracleText(mockSingleFaceCard)).toStrictEqual("anOracleText");
  });

  it("returns face oracle text for double-faced card", () => {
    expect(getOracleText(mockTransformableCard.card_faces![0])).toStrictEqual(
      "aFrontOracleText"
    );
  });

  it("returns null when no oracle text", () => {
    expect(getOracleText({} as ScryfallCard)).toStrictEqual(null);
  });
});

describe("getFlavorText", () => {
  it("returns card flavor text for single-faced card", () => {
    expect(getFlavorText(mockSingleFaceCard)).toBe("aFlavorText");
  });

  it("returns face flavor text for double-faced card", () => {
    expect(getFlavorText(mockTransformableCard.card_faces![0])).toBe(
      "aFrontFlavorText"
    );
  });

  it("returns empty string when no flavor text", () => {
    expect(getFlavorText({} as ScryfallCard)).toBe(null);
  });
});

describe("getTypeLine", () => {
  it("returns card type line for single-faced card", () => {
    expect(getTypeLine(mockSingleFaceCard)).toBe("aTypeLine");
  });

  it("returns face type line for double-faced card", () => {
    expect(getTypeLine(mockTransformableCard.card_faces![0])).toBe(
      "aFrontTypeLine"
    );
  });

  it("return null when face has no type line", () => {
    expect(getTypeLine({} as CardFace)).toBe(null);
  });
});

describe("getManaCost", () => {
  it("returns card mana cost for single-faced card", () => {
    expect(getManaCost(mockSingleFaceCard)).toStrictEqual(["amanacost"]);
  });

  it("returns face mana cost for double-faced card", () => {
    expect(getManaCost(mockTransformableCard.card_faces![0])).toStrictEqual([
      "afrontmanacost",
    ]);
  });

  it("returns null when no mana cost", () => {
    expect(getManaCost({} as ScryfallCard)).toStrictEqual(null);
  });
});

describe("getPowerToughness", () => {
  it("returns power/toughness for single-faced card", () => {
    expect(getPowerToughness(mockSingleFaceCard)).toBe("aPower/aToughness");
  });

  it("returns face power/toughness for double-faced card", () => {
    expect(getPowerToughness(mockTransformableCard.card_faces![0])).toBe(
      "aFrontPower/aFrontToughness"
    );
  });

  it("returns null when no power/toughness", () => {
    expect(getPowerToughness({} as ScryfallCard)).toBe(null);
  });

  it("returns null when only power exists", () => {
    expect(getPowerToughness({ power: "aPower" } as ScryfallCard)).toBe(null);
  });
});

describe("sanitizeSymbol", () => {
  it("returns null if no mana cost is provided", () => {
    expect(getManaCost({} as ScryfallCard)).toEqual(null);
  });

  it("correctly sanitizes a mana cost string", () => {
    const manaCost = "{2}{U}{U}{B/R}{G/P}";
    expect(getManaCost({ mana_cost: manaCost } as ScryfallCard)).toEqual([
      "2",
      "u",
      "u",
      "br",
      "gp",
    ]);
  });
});
