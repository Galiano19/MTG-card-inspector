import { fetchSet, fetchSetList } from "@/services/scryfallApi";
import { useQuery } from "@tanstack/react-query";

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
export const useSet = (input: string, options = {}) => {
  return useQuery({
    queryKey: ["sets"],
    queryFn: () => fetchSet(input),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    ...options,
  });
};
