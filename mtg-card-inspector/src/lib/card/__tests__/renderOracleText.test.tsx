import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderOracleText } from "../renderOracleText";

describe("renderOracleText", () => {
  it("renders plain text without symbols", () => {
    const { container } = render(<>{renderOracleText("Hello World")}</>);
    expect(container.textContent).toBe("Hello World");
  });

  it("renders mana symbols", () => {
    const { container } = render(<>{renderOracleText("{W}{U}{B}{R}{G}")}</>);

    const icons = container.querySelectorAll("i");
    expect(icons).toHaveLength(5);
    expect(icons[0]).toHaveClass("ms-w", "ms-cost");
    expect(icons[1]).toHaveClass("ms-u", "ms-cost");
    expect(icons[2]).toHaveClass("ms-b", "ms-cost");
    expect(icons[3]).toHaveClass("ms-r", "ms-cost");
    expect(icons[4]).toHaveClass("ms-g", "ms-cost");
  });

  it("renders text with parentheses", () => {
    const { container } = render(
      <>{renderOracleText("Text (in parentheses)")}</>,
    );

    expect(container.textContent).toBe("Text ( in parentheses )");
    expect(container.querySelector(".italic")).toHaveTextContent(
      "in parentheses",
    );
  });

  it("renders symbols inside parentheses", () => {
    const { container } = render(<>{renderOracleText("Cost ({W}{U})")}</>);

    expect(container.textContent).toBe("Cost (  )");
    const icons = container.querySelectorAll("i");
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveClass("ms-w", "ms-cost");
    expect(icons[1]).toHaveClass("ms-u", "ms-cost");
    expect(container.querySelector(".italic")).toBeTruthy();
  });

  it("handles tap symbols", () => {
    const { container } = render(<>{renderOracleText("{T}")}</>);

    const icon = container.querySelector("i");
    expect(icon).toHaveClass("ms-tap", "ms-cost");
  });

  it("handles hybrid mana symbols", () => {
    const { container } = render(<>{renderOracleText("{W/U}")}</>);

    const icon = container.querySelector("i");
    expect(icon).toHaveClass("ms-wu", "ms-cost");
  });

  it("handles complex oracle text", () => {
    const text =
      "{T}: Add {W}. ({G}{U}): Target creature gains flying until end of turn.";
    const { container } = render(<>{renderOracleText(text)}</>);

    const icons = container.querySelectorAll("i");
    expect(icons).toHaveLength(4);
    expect(icons[0]).toHaveClass("ms-tap", "ms-cost");
    expect(icons[1]).toHaveClass("ms-w", "ms-cost");
    expect(icons[2]).toHaveClass("ms-g", "ms-cost");
    expect(icons[3]).toHaveClass("ms-u", "ms-cost");
    expect(container.textContent).toBe(
      ": Add . (  ): Target creature gains flying until end of turn.",
    );
    expect(container.querySelector(".italic")).toBeTruthy();
  });
});
