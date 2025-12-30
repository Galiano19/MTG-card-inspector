import { renderOracleText } from "../renderOracleText";

describe("renderOracleText", () => {
  it("should render plain text without changes", () => {
    const input = "This is a simple card text.";
    const expected = "This is a simple card text.";
    expect(renderOracleText(input)).toBe(expected);
  });

  it("should render mana symbols correctly", () => {
    const input = "Pay {1}{W} to activate.";
    const expected =
      'Pay <span class="mana-symbol">{1}</span><span class="mana-symbol">{W}</span> to activate.';
    expect(renderOracleText(input)).toBe(expected);
  });

  it("should handle keyword abilities with line breaks", () => {
    const input = "Flying\nVigilance";
    const expected = "<p>Flying</p><p>Vigilance</p>";
    expect(renderOracleText(input)).toBe(expected);
  });

  it("should return empty string for empty input", () => {
    const input = "";
    const expected = "";
    expect(renderOracleText(input)).toBe(expected);
  });

  it("should handle complex text with symbols and keywords", () => {
    const input =
      "Target creature gets +2/+2 until end of turn.\n{2}{U}: Draw a card.";
    const expected =
      '<p>Target creature gets +2/+2 until end of turn.</p><p><span class="mana-symbol">{2}</span><span class="mana-symbol">{U}</span>: Draw a card.</p>';
    expect(renderOracleText(input)).toBe(expected);
  });
});
