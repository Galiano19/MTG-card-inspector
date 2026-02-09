import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScryfallCard, ScryfallCardRuling } from "@/types/scryfall";
import { Gavel } from "lucide-react";

export default function Rulings({ card }: { card: ScryfallCard }) {
  if (!card.rulings || card.rulings.length === 0) {
    return null;
  }

  return (
    <AccordionItem value={`${card.id}-item-3`}>
      <AccordionTrigger>
        <Gavel className="w-4 h-4  " />
        <span className="uppercase tracking-wide">Rulings</span>
      </AccordionTrigger>
      <AccordionContent>
        {card.rulings.map((ruling: ScryfallCardRuling) => (
          <div key={ruling.oracle_id} className="mb-2">
            <span className="text-xs">
              {ruling.source.toUpperCase()} -{" "}
              {new Date(ruling.published_at).toLocaleDateString()}
            </span>
            <p className="text-sm italic mb-1">{ruling.comment}</p>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
