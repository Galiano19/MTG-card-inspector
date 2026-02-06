import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useCardRoute from "@/hooks/useCardRoute";
import { useRelatedCards } from "@/hooks/useCardSearch";
import { scrollToTop } from "@/lib/utils";
import { ScryfallCard } from "@/types/scryfall";
import { GalleryHorizontalEnd } from "lucide-react";
import { memo } from "react";
import FoilEffect from "../FoilEffect";
import Image from "next/image";

interface ContentProps {
  data: ScryfallCard[];
  currentCardId: string;
}

function Content({ data, currentCardId }: ContentProps) {
  const { handleSearch } = useCardRoute({
    navigateToCardOnId: true,
  });

  const ContentArtwork = memo(({ card }: { card: ScryfallCard }) => {
    if (card.id === currentCardId) return null;

    const isFoil = card.foil;
    const cardEurPrice = isFoil ? card.prices?.eur_foil : card.prices?.eur;
    const cardUsdPrice = isFoil ? card.prices?.usd_foil : card.prices?.usd;

    const handleOnClick = () => {
      handleSearch({ id: card.id });
      scrollToTop();
    };

    return (
      <CarouselItem key={card.id} className="px-2 py-2">
        <button
          onClick={handleOnClick}
          className="relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
        >
          {isFoil && (
            <div className="absolute z-[1] top-0 bg-[--clr-primary-a10] left-1/2 transform -translate-x-1/2  pl-3 pr-3 rounded-b-md text-[--clr-dark-a0] flex">
              <span className="text-xs">FOIL</span>
            </div>
          )}
          {(cardEurPrice || cardUsdPrice) && (
            <div className="absolute z-[1] bottom-0 bg-[--clr-primary-a10] left-1/2 transform -translate-x-1/2 flex gap-2 items-center pl-3 pr-3 rounded-t-md text-[--clr-dark-a0]">
              {cardEurPrice && <span className="text-xs">€{cardEurPrice}</span>}
              {cardUsdPrice && (
                <span className="text-xs"> ${cardUsdPrice}</span>
              )}
            </div>
          )}
          <div className="w-full bg-transparent relative">
            {card.foil && <FoilEffect />}
            {card.image_uris ? (
              <Image
                src={card.image_uris.normal}
                alt="Related Artwork"
                width={167}
                height={233}
              />
            ) : (
              <div className="flex w-[167px] h-[233px] bg-[--clr-surface-a0] justify-center items-center">
                Artwork not found
              </div>
            )}
          </div>
        </button>
      </CarouselItem>
    );
  });

  return (
    <Carousel>
      <div className="relative">
        <CarouselContent className="pl-6 md:pl-8 md:pr-10">
          {data.map((card: any) => (
            <ContentArtwork key={card.id} card={card} />
          ))}
        </CarouselContent>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-6 md:w-8 bg-gradient-to-r from-[--clr-surface-a10] to-transparent"></div>
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-6 md:w-8
              bg-gradient-to-l from-[--clr-surface-a10] to-transparent"
        ></div>
      </div>
      <div className="absolute top-1/2 left-0  flex justify-between transform -translate-y-1/2 px-1">
        <CarouselPrevious variant="secondary" />
      </div>
      <div className="absolute top-1/2 right-0 flex justify-between transform -translate-y-1/2 px-1">
        <CarouselNext variant="secondary" />
      </div>
    </Carousel>
  );
}

export default function Printings({
  card,
  showHeader = true,
}: {
  card: ScryfallCard;
  showHeader?: boolean;
}) {
  const { data, isLoading, isFetching } = useRelatedCards(
    card.prints_search_uri,
  );

  if (!data || data.length <= 1) {
    return null;
  }

  if (isLoading || isFetching) {
    return null;
  }

  return (
    <div className="flex flex-col rounded-xl  bg-[--clr-surface-a20] backdrop-blur shadow-xl shadow-[--clr-surface-a0]/30">
      {showHeader && (
        <div className="flex items-center gap-2 p-4">
          <GalleryHorizontalEnd className="w-4 h-4 md:w-5 md:h-5" />
          <div className="font-bold uppercase">Other printings</div>
        </div>
      )}
      <div
        className={`  bg-[--clr-surface-a10] ${showHeader ? "rounded-b-xl" : "rounded-xl"} py-2`}
      >
        <Content data={data} currentCardId={card.id} />
      </div>
    </div>
  );
}
