import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useCardRoute from "@/hooks/useCardRoute";
import { useSimilarCards } from "@/hooks/useCardSearch";
import { scrollToTop } from "@/lib/utils";
import { ScryfallCard } from "@/types/scryfall";
import { ArrowRightLeft } from "lucide-react";
import { memo } from "react";
import Image from "next/image";
import FoilEffect from "@/lib/card/FoilEffect";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className=" pb-3 md:pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4 pb-2">
          <div className="flex items-center gap-2 md:gap-3 px-4">
            <div className="p-1.5 md:p-2 bg-[--clr-primary-a0] rounded-lg md:rounded-xl">
              <ArrowRightLeft className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="text-lg md:text-xl font-bold ">Similar Cards</div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function SimilarCards({ card }: { card: ScryfallCard }) {
  const { data, isLoading, isFetching, error } = useSimilarCards(
    card.similar_cards || [],
  );
  const { handleSearch } = useCardRoute({
    navigateToCardOnId: true,
  });

  if (isLoading || isFetching) {
    return (
      <Wrapper>
        <div className="px-2 py-2 overflow-x-hidden">
          <div className="animate-pulse flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg bg-[--clr-surface-a20] min-h-[310px] min-w-[223px]"
              />
            ))}
          </div>
        </div>
      </Wrapper>
    );
  }

  if (error) {
    return null;
  }

  if (!data || data.length === 0) return null;

  const TrendingItem = memo(({ card }: { card: ScryfallCard }) => {
    const isFoil = card.foil;
    const cardEurPrice = isFoil ? card.prices?.eur_foil : card.prices?.eur;

    const handleOnClick = () => {
      handleSearch({ id: card.id });
      scrollToTop();
    };

    return (
      <CarouselItem key={card.id} className="px-2 py-2">
        <button
          onClick={handleOnClick}
          className="relative flex flex-col gap-2"
        >
          <div className="relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
            <div className="w-full bg-transparent relative">
              {isFoil && <FoilEffect />}
              {card.image_uris ? (
                <Image
                  src={card.image_uris.normal}
                  alt={card.name}
                  width={223}
                  height={310}
                />
              ) : (
                <div className="flex w-[223px] h-[310px] bg-[--clr-surface-a0] justify-center items-center">
                  Artwork not found
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex ">
              <p className="font-medium text-slate-900 dark:text-slate-200 truncate text-left">
                {card.name}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {cardEurPrice && <span className="text-xs">€{cardEurPrice}</span>}
              {card.set && (
                <>
                  <span className="text-xs">•</span>
                  <span className="text-xs">{card.set.toUpperCase()}</span>
                </>
              )}
              {isFoil && (
                <>
                  <span className="text-xs">•</span>
                  <span className="text-xs">FOIL</span>
                </>
              )}
            </div>
          </div>
        </button>
      </CarouselItem>
    );
  });

  return (
    <Wrapper>
      <Carousel>
        <div className="relative">
          <CarouselContent className="px-6 ">
            {data.map((card: any) => (
              <TrendingItem key={card.id} card={card} />
            ))}
          </CarouselContent>
        </div>
        <div className="flex items-center gap-2  w-auto justify-self-end mt-2 md:mr-6 mr-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </Wrapper>
  );
}
