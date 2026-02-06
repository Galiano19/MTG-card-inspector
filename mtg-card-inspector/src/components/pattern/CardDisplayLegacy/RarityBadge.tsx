import { Badge } from "lucide-react";

export function RarityBadge({ rarity }: { rarity: string }) {
  const rarityStyles = {
    common: "bg-slate-100 text-slate-700 border-slate-200",
    uncommon: "bg-slate-200 text-slate-800 border-slate-300",
    rare: "bg-amber-100 text-amber-800 border-amber-200",
    mythic: "bg-orange-100 text-orange-800 border-orange-200",
    special: "bg-purple-100 text-purple-800 border-purple-200",
    bonus: "bg-violet-100 text-violet-800 border-violet-200",
  };

  return (
    <Badge
      className={`${
        rarityStyles[rarity as keyof typeof rarityStyles] || rarityStyles.common
      } capitalize font-medium`}
    >
      {rarity}
    </Badge>
  );
}
