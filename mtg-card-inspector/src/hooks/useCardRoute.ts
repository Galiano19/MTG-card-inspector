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
      if (typeof query === "object" && query.id) {
        const params = new URLSearchParams(
          Array.from(searchParams?.entries() || []),
        );
        params.set("id", query.id);

        if (navigateToCardOnId) {
          router.push(`/card?${params.toString()}`);
        } else {
          // stay on the same page and update the query params
          router.replace(`${pathname}?${params.toString()}`);
        }
        return;
      }

      if (typeof query === "string") {
        const params = new URLSearchParams(
          Array.from(searchParams?.entries() || []),
        );
        params.set("name", query);
        params.delete("id");
        router.replace(`${pathname}?${params.toString()}`);
        setSearchQuery(query);
        return;
      }

      setSearchQuery(query);
    },
    [router, searchParams, navigateToCardOnId, pathname],
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
