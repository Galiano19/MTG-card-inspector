"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { QueryCardSearchInput, useCardSearch } from "./useCardSearch";

type UseCardRouteOptions = {
  navigateToCardOnId?: boolean;
};

export default function useCardRoute({
  navigateToCardOnId = false,
}: UseCardRouteOptions = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState<QueryCardSearchInput>(
    "" as any,
  );

  useEffect(() => {
    const id = searchParams?.get("id");
    const name = searchParams?.get("name");
    if (id) {
      setSearchQuery({ id });
      return;
    }
    if (name) {
      setSearchQuery(name);
      return;
    }
    setSearchQuery("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const {
    data: card,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useCardSearch(searchQuery);

  const handleSearch = useCallback(
    (query: QueryCardSearchInput) => {
      if (typeof query === "object" && query.name) {
        const slug = query.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const url = query.id ? `/card/${slug}?id=${query.id}` : `/card/${slug}`;
        router.push(url);
        return;
      }

      if (typeof query === "string") {
        const slug = query.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        router.push(`/card/${slug}`);
        return;
      }

      setSearchQuery(query);
    },
    [router],
  );

  useEffect(() => {
    if (card?.id) {
      const currentId = searchParams?.get("id");
      if (currentId !== card.id) {
        const params = new URLSearchParams(
          Array.from(searchParams?.entries() || []),
        );
        params.set("id", card.id);
        const target = navigateToCardOnId ? "/card" : pathname;
        router.replace(`${target}?${params.toString()}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card?.id, navigateToCardOnId]);

  const handleRetry = useCallback(() => {
    if (searchQuery) refetch();
  }, [searchQuery, refetch]);

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleRetry,
    card,
    isLoading,
    isFetching,
    error,
    refetch,
  } as const;
}
