import { useRelatedCards } from "@/hooks/useCardSearch";
import { ScryfallCard } from "@/types/scryfall";

export default function RelatedCardArtworks({ card }: { card: ScryfallCard }) {
  const { data, isLoading, isFetching, error, refetch } = useRelatedCards(
    card.prints_search_uri
  );

  console.log("Rendering RelatedCardArtworks for card:", data);
  return <div>Related Card Artworks Component</div>;
}
