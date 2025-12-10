import { useQuery } from "@tanstack/react-query";
import {
  fetchCardByName,
  fetchAutocompleteSuggestions,
  fetchRelatedCards,
  fetchCardById,
} from "../services/scryfallApi";

export const cardQueryKeys = {
  all: ["cards"],
  card: ({ name, id }: { name?: string; id?: string }) => {
    if (id) {
      return [...cardQueryKeys.all, "card", id];
    }
    return [...cardQueryKeys.all, "card", name];
  },
  autocomplete: (query: string) => [
    ...cardQueryKeys.all,
    "autocomplete",
    query,
  ],
};

export type QueryCardSearchInput =
  | string
  | {
      name?: string;
      id?: string;
    };

/**
 * Hook to fetch a single card by name or ID
 *
 * @param {QueryCardSearchInput} input - The card name to search for
 * @param {Object} options - Additional query options
 * @returns {Object} Query result with data, isLoading, error, etc.
 */
export const useCardSearch = (input: QueryCardSearchInput, options = {}) => {
  const queryParams = getQueryParams(input);

  return useQuery({
    queryKey: queryParams.cardId
      ? cardQueryKeys.card({ id: queryParams.cardId })
      : cardQueryKeys.card({ name: queryParams.cardName }),
    queryFn: () =>
      queryParams.cardId
        ? fetchCardById(queryParams.cardId)
        : fetchCardByName(queryParams.cardName),
    enabled:
      Boolean(queryParams.cardId) ||
      (Boolean(queryParams.cardName) && queryParams.cardName.trim().length > 0),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error.message.includes("not found")) return false;
      return failureCount < 2;
    },
    ...options,
  });
};

/**
 * Hook to fetch autocomplete suggestions
 * Only fetch when query is at least 2 characters - IMPORTANT due to ScryFall API limits
 *
 * @param {string} query - The partial card name
 * @param {Object} options - Additional query options
 * @returns {Object} Query result with suggestions array
 */
export const useAutocomplete = (query: string, options = {}) => {
  return useQuery({
    queryKey: cardQueryKeys.autocomplete(query),
    queryFn: () => fetchAutocompleteSuggestions(query),
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    placeholderData: [], // return empty array if error or no data
    ...options,
  });
};

/**
 * Hook to fetch related cards
 *
 * @param {string} uri - The URI to fetch related cards from
 * @returns {Object} Query result with suggestions array
 */
export const useRelatedCards = (uri: string, options = {}) => {
  return useQuery({
    queryKey: cardQueryKeys.card({ name: uri }),
    queryFn: () => fetchRelatedCards(uri),
    enabled: Boolean(uri) && uri.trim().length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error.message.includes("not found")) return false;
      return failureCount < 2;
    },
    ...options,
  });
};

function getQueryParams(input: QueryCardSearchInput): {
  cardName: string;
  cardId: string | undefined;
} {
  if (typeof input === "string") {
    return { cardName: input, cardId: undefined };
  }
  return {
    cardName: input.name || "",
    cardId: input.id,
  };
}
