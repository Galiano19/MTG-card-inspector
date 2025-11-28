export function ManaSymbol({ symbol }: { symbol: string }) {
  const manaColors: { [key: string]: string } = {
    W: "bg-amber-100 text-amber-800",
    U: "bg-blue-100 text-blue-800",
    B: "bg-slate-700 text-white",
    R: "bg-red-100 text-red-800",
    G: "bg-green-100 text-green-800",
    C: "bg-slate-200 text-slate-700",
  };

  const match = symbol?.match(/\{([^}]+)\}/g);
  if (!match) return <span>{symbol}</span>;

  return (
    <span className="inline-flex items-center gap-1 flex-wrap">
      {match.map((m, i) => {
        const char = m.replace(/[{}]/g, "");
        const isNumber = !isNaN(Number(char));
        const isHybrid = char.includes("/");
        return (
          <span
            key={i}
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
              isNumber || isHybrid
                ? "bg-slate-200 text-slate-700"
                : manaColors[char] || "bg-slate-200 text-slate-700"
            }`}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
