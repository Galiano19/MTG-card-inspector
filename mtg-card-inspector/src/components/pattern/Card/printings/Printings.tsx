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
import { memo, useState } from "react";
import FoilEffect from "../FoilEffect";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContentProps {
  data: ScryfallCard[];
  currentCardId: string;
}

const AllPrintingsCard = memo(
  ({
    card,
    currentCardId,
    onCardClick,
  }: {
    card: ScryfallCard;
    currentCardId: string;
    onCardClick: () => void;
  }) => {
    if (card.id === currentCardId) return null;

    const isFoil = card.foil;
    const cardEurPrice = isFoil ? card.prices?.eur_foil : card.prices?.eur;
    const cardUsdPrice = isFoil ? card.prices?.usd_foil : card.prices?.usd;

    return (
      <button
        onClick={onCardClick}
        className="relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
      >
        {isFoil && (
          <div className="absolute z-[1] top-0 bg-[--clr-primary-a10] left-1/2 transform -translate-x-1/2  pl-2 pr-2 rounded-b-md text-[--clr-dark-a0] flex">
            <span className="text-xs">FOIL</span>
          </div>
        )}
        {(cardEurPrice || cardUsdPrice) && (
          <div className="absolute z-[1] bottom-0 bg-[--clr-primary-a10] left-1/2 transform -translate-x-1/2 flex gap-1 items-center pl-2 pr-2 rounded-t-md text-[--clr-dark-a0]">
            {cardEurPrice && <span className="text-xs">€{cardEurPrice}</span>}
            {cardUsdPrice && <span className="text-xs">${cardUsdPrice}</span>}
          </div>
        )}
        <div className="w-full bg-transparent relative">
          {card.foil && <FoilEffect />}
          {card.image_uris ? (
            <Image
              src={card.image_uris.normal}
              alt={card.name}
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
    );
  },
);
AllPrintingsCard.displayName = "AllPrintingsCard";

function Content({ data, currentCardId }: ContentProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { handleSearch } = useCardRoute({
    navigateToCardOnId: true,
  });

  const MAX_CAROUSEL_ITEMS = 8;
  const carouselData = data.slice(0, MAX_CAROUSEL_ITEMS);
  const hasMoreCards = data.length > MAX_CAROUSEL_ITEMS;

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
  ContentArtwork.displayName = "ContentArtwork";

  return (
    <>
      <Carousel>
        <div className="relative">
          <CarouselContent className="pl-6  pr-6">
            {carouselData.map((card: any) => (
              <ContentArtwork key={card.id} card={card} />
            ))}
            {hasMoreCards && (
              <CarouselItem key="see-all" className="px-2 py-2">
                <button
                  onClick={() => setSheetOpen(true)}
                  className="relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 w-[167px] h-[233px] bg-[--clr-surface-a20] flex items-center justify-center border-2 border-dashed border-[--clr-primary-a0]"
                >
                  <div className="text-center flex flex-col items-center gap-2">
                    <span className="text-sm font-bold">See all</span>
                    <span className="text-xs text-[--clr-surface-tonal-a30]">
                      +{data.length - MAX_CAROUSEL_ITEMS} more
                    </span>
                  </div>
                </button>
              </CarouselItem>
            )}
          </CarouselContent>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-[--clr-surface-a10] to-transparent"></div>
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-4
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

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[90vh] flex flex-col">
          <SheetHeader>
            <SheetTitle>All Printings</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 w-full h-[80vh] ">
            <div className="flex flex-wrap gap-4 p-4">
              {data.map((card) => (
                <AllPrintingsCard
                  key={card.id}
                  card={card}
                  currentCardId={currentCardId}
                  onCardClick={() => {
                    handleSearch({ id: card.id });
                    scrollToTop();
                    setSheetOpen(false);
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
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
