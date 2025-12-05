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
import { DollarSign } from "lucide-react";
import Image from "next/image";

function RelatedCardArtworksContent({ data, isLoading, isFetching }: any) {
  if (isLoading || isFetching) {
    return <p>Loading related artworks...</p>;
  }
  if (!data || data.length === 0) {
    return <p>No related artworks found.</p>;
  }
  return (
    <Carousel>
      <CarouselContent>
        {data.map((card: any) => (
          <CarouselItem key={card.id}>
            <Image
              src={card.image_uris.normal}
              alt="Related Artwork"
              width={223}
              height={310}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default function RelatedCardArtworks({ card }: { card: ScryfallCard }) {
  const { data, isLoading, isFetching } = useRelatedCards(
    card.prints_search_uri
  );

  console.log("Rendering RelatedCardArtworks for card:", data);
  return (
    <Card className="bg-[--clr-surface-a20] backdrop-blur shadow-xl shadow-[--clr-surface-a0]/30">
      <CardHeader className="pb-3 md:pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-[--clr-primary-a0] rounded-lg md:rounded-xl">
              <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
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
