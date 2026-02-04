import React, { memo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTrendingCards } from "@/hooks/useCardSearch";
import { ScryfallCard } from "@/types/scryfall";
import Image from "next/image";
import FoilEffect from "../CardDisplay/FoilEffect";
import { TrendingUp } from "lucide-react";
import LoadingSkeleton from "../RelatedCardArtworks/LoadingSkeleton";
import ErrorState from "../ErrorState/ErrorState";
import { scrollToTop } from "@/lib/utils";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="pb-3 md:pb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-[--clr-primary-a0] rounded-lg md:rounded-xl">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="text-lg md:text-xl font-bold ">Trending Cards</div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function TrendingCards({
  onSearch,
}: {
  onSearch: (query: any) => void;
}) {
  const { data, isLoading, isFetching, error } = useTrendingCards(50);

  if (isLoading || isFetching) {
    return (
      <Wrapper>
        <LoadingSkeleton />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <ErrorState error={error} />
      </Wrapper>
    );
  }

  if (!data || data.length === 0) return null;

  const TrendingItem = memo(({ card }: { card: ScryfallCard }) => {
    const isFoil = card.foil;
    const cardEurPrice = isFoil ? card.prices?.eur_foil : card.prices?.eur;
    const cardUsdPrice = isFoil ? card.prices?.usd_foil : card.prices?.usd;

    const handleOnClick = () => {
      onSearch({ id: card.id });
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
        </button>
      </CarouselItem>
    );
  });

  return (
    <Wrapper>
      <Carousel>
        <div className="relative">
          <CarouselContent className="pl-2 ">
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
