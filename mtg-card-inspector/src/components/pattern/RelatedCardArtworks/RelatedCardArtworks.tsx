import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  QueryCardSearchInput,
  useCardSearch,
  useRelatedCards,
} from "@/hooks/useCardSearch";
import { ScryfallCard } from "@/types/scryfall";
import Image from "next/image";
import FoilEffect from "../CardDisplay/FoilEffect";
import { GalleryHorizontalEnd } from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";
import NoRelatedArtworks from "./NoRelatedArtworks";
import { memo } from "react";

interface RelatedCardArtworksContentProps {
  data: ScryfallCard[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  onSearch: (query: QueryCardSearchInput) => void;
}

function RelatedCardArtworksContent({
  data,
  isLoading,
  isFetching,
  onSearch,
}: RelatedCardArtworksContentProps) {
  if (isLoading || isFetching) {
    return <LoadingSkeleton />;
  }
  if (!data || data.length === 0) {
    return <NoRelatedArtworks />;
  }

  const RelatedCardArtwork = memo(({ card }: { card: any }) => (
    <CarouselItem key={card.id} className="px-2 py-4">
      <button
        onClick={() => onSearch({ id: card.id })}
        className="rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
      >
        <div className="w-full bg-transparent relative">
          {card.foil && <FoilEffect />}
          {card.image_uris ? (
            <Image
              src={card.image_uris.normal}
              alt="Related Artwork"
              width={223}
              height={310}
            />
          ) : (
            <div className="flex w-[223px] h-[310px] bg-[--clr-surface-a0] justify-center items-center">
              Artwork not found
            </div>
          )}
        </div>
      </button>
    </CarouselItem>
  ));

  return (
    <Carousel>
      <CarouselContent className="pl-2 pr-4">
        {data.map((card: any) => (
          <RelatedCardArtwork key={card.id} card={card} />
        ))}
      </CarouselContent>
      <div className="flex items-center gap-2 rounded-full border w-auto justify-self-end mt-2">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

export default function RelatedCardArtworks({
  card,
  onSearch,
}: {
  card: ScryfallCard;
  onSearch: (query: QueryCardSearchInput) => void;
}) {
  const { data, isLoading, isFetching } = useRelatedCards(
    card.prints_search_uri
  );

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Card className="bg-[--clr-surface-a20] backdrop-blur shadow-xl shadow-[--clr-surface-a0]/30">
      <CardHeader className="pb-3 md:pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-[--clr-primary-a0] rounded-lg md:rounded-xl">
              <GalleryHorizontalEnd className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <CardTitle className="text-lg md:text-xl font-bold ">
              Related Artworks
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <RelatedCardArtworksContent
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          onSearch={onSearch}
        />
      </CardContent>
    </Card>
  );
}
