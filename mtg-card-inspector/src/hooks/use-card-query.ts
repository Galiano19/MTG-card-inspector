import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ScryfallCard } from "../types/scryfall";
import { fetchCardByName, ScryfallError } from "../lib/api/scryfall";

interface UseCardQueryOptions {
  enabled?: boolean;
}

export function useCardQuery(
  cardName: string,
  includeVariations: boolean = true,
  options: UseCardQueryOptions = {}
): UseQueryResult<ScryfallCard, ScryfallError> {
  return useQuery({
    queryKey: ["card", cardName, includeVariations],
    queryFn: () => fetchCardByName(cardName, includeVariations),
    enabled: options.enabled !== false && !!cardName.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry for 404 errors (card not found)
      if (error instanceof ScryfallError && error.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
