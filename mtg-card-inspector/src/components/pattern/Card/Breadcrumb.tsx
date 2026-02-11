import { ScryfallCard } from "@/types/scryfall";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb(card: ScryfallCard) {
  return (
    <div className="text-sm breadcrumbs mb-6">
      <ol
        aria-label="Breadcrumb"
        className="flex gap-2 text=sm items-center flex-wrap"
      >
        <li className="flex gap-1 items-center">
          <a href="/">Home</a>
          <ChevronRight size={16} />
        </li>
        <li className="flex gap-1 items-center">
          <a href={`/sets/${card.set}`}>{card.set_name}</a>
          <ChevronRight size={16} />
        </li>
        <li aria-current="page" className="font-bold">
          {card.name}
        </li>
      </ol>
    </div>
  );
}
