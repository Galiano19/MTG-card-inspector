import React, { ReactElement } from "react";

export const renderOracleText = (text: string): ReactElement[] => {
  const parts = text.split(/(\([^)]*\))/);
  return parts.flatMap((part, index) => {
    if (part.match(/\([^)]*\)/)) {
      const innerText = part.slice(1, -1);
      const innerParts = innerText.split(/(\{[^}]+\})/);
      const renderedInner = innerParts.map((innerPart, innerIndex) => {
        if (innerPart.match(/\{[^}]+\}/)) {
          const symbol = curateSymbol(
            innerPart.slice(1, -1).toLowerCase().replace("/", ""),
          );
          return <i key={innerIndex} className={`ms ms-${symbol} ms-cost`} />;
        }
        return <span key={innerIndex}>{innerPart}</span>;
      });
      return (
        <span key={index}>
          ( <span className="italic">{renderedInner}</span> )
        </span>
      );
    } else {
      const subParts = part.split(/(\{[^}]+\})/);
      return subParts.map((subPart, subIndex) => {
        if (subPart.match(/\{[^}]+\}/)) {
          const symbol = curateSymbol(
            subPart.slice(1, -1).toLowerCase().replace("/", ""),
          );
          return (
            <i
              key={`${index}-${subIndex}`}
              className={`ms ms-${symbol} ms-cost mr-1`}
            />
          );
        }
        return <span key={`${index}-${subIndex}`}>{subPart}</span>;
      });
    }
  });
};

function curateSymbol(symbol: string) {
  const symbolMap = {
    t: "tap",
  };

  const curated = symbolMap[symbol as keyof typeof symbolMap] || symbol;

  return curated;
}
