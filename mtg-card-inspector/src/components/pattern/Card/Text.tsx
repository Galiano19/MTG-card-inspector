import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { renderOracleText } from "@/lib/card/renderOracleText";
import { getFlavorText, getOracleText } from "@/lib/card/utils";
import { CardFace, ScryfallCard } from "@/types/scryfall";
import { BookOpen, Sparkles } from "lucide-react";

interface TextProps {
  face?: CardFace;
  card: ScryfallCard;
}

export default function Text({ face, card }: TextProps) {
  const oracleText = getOracleText(face ? face : card);
  const flavorText = getFlavorText(face ? face : card);

  return (
    <Accordion type="multiple" defaultValue={[`${card.id}-item-1`]}>
      {oracleText && (
        <AccordionItem value={`${card.id}-item-1`}>
          <AccordionTrigger>
            <BookOpen className="w-4 h-4" />
            <span className="uppercase tracking-wide">Oracle Text</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="whitespace-pre-line leading-relaxed text-sm md:text-base">
              {renderOracleText(oracleText)}
            </p>
          </AccordionContent>
        </AccordionItem>
      )}
      {flavorText && (
        <AccordionItem value={`${card.id}-item-2`}>
          <AccordionTrigger>
            <Sparkles className="w-4 h-4  " />
            <span className="uppercase tracking-wide">Flavor Text</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="italic text-sm md:text-base">
              &ldquo;{flavorText}&rdquo;
            </p>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
