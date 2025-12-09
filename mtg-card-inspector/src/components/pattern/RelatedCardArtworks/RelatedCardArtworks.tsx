import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRelatedCards } from "@/hooks/useCardSearch";
import { ScryfallCard } from "@/types/scryfall";
import Image from "next/image";
import FoilEffect from "../CardDisplay/FoilEffect";
import { GalleryHorizontalEnd } from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";
import NoRelatedArtworks from "./NoRelatedArtworks";

function RelatedCardArtworksContent({ data, isLoading, isFetching }: any) {
  if (isLoading || isFetching) {
    return <LoadingSkeleton />;
  }
  if (!data || data.length === 0) {
    return <NoRelatedArtworks />;
  }
  return (
    <Carousel>
      <CarouselContent>
        {data.map((card: any) => (
          <CarouselItem key={card.id}>
            <div className=" w-full bg-transparent relative">
              {card.foil && <FoilEffect />}
              <Image
                src={card.image_uris.normal}
                alt="Related Artwork"
                width={223}
                height={310}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center gap-2 rounded-full border w-auto justify-self-end mt-2">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

export default function RelatedCardArtworks({ card }: { card: ScryfallCard }) {
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
        />
      </CardContent>
    </Card>
  );
}
