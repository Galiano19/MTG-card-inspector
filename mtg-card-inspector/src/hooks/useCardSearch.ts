import { useQuery } from "@tanstack/react-query";
import {
  fetchCardByName,
  fetchAutocompleteSuggestions,
  fetchRelatedCards,
} from "../services/scryfallApi";

export const cardQueryKeys = {
  all: ["cards"],
  card: (name: string) => [...cardQueryKeys.all, "card", name],
  autocomplete: (query: string) => [
    ...cardQueryKeys.all,
    "autocomplete",
    query,
  ],
};

/**
 * Hook to fetch a single card by name
 *
 * @param {string} cardName - The card name to search for
 * @param {Object} options - Additional query options
 * @returns {Object} Query result with data, isLoading, error, etc.
 */
export const useCardSearch = (cardName: string, options = {}) => {
  return useQuery({
    queryKey: cardQueryKeys.card(cardName),
    queryFn: () => fetchCardByName(cardName),
    enabled: Boolean(cardName) && cardName.trim().length > 0,
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
    queryKey: cardQueryKeys.card(uri),
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
