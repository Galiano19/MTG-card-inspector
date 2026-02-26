import { fetchSet, fetchSetCards, fetchSetList } from "@/services/scryfallApi";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch Sets
 *
 * @returns {Object} Query result with sets array
 */
export const useSets = (options = {}) => {
  return useQuery({
    queryKey: ["sets"],
    queryFn: () => fetchSetList(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    ...options,
  });
};

/**
 * Hook to fetch Set information
 *
 * @returns {Object} Query result with set object
 */
export const useSetCards = (input: string, options = {}) => {
  return useInfiniteQuery({
    queryKey: ["setCards", input],
    queryFn: ({ pageParam }) => fetchSetCards(input, pageParam as number),
    initialPageParam: 1,

    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },

    staleTime: 1000 * 60 * 60 * 24,
    ...options,
  });
};
