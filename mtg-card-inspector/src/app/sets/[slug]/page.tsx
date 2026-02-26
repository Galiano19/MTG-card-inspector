"use client";

import { useEffect, useRef } from "react";
import { ErrorState } from "@/components/pattern";
import LayoutPage from "@/components/pattern/LayoutPage/LayoutPage";
import Header from "@/components/pattern/Sets/Header";
import Set from "@/components/pattern/Sets/Set";
import LayoutItem from "@/components/ui/layoutItem";
import { useSetCards } from "@/hooks/useSets";
import { useParams } from "next/navigation";

export default function SetPage() {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSetCards(slug);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px", // preload before reaching exact bottom
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <LayoutPage>
        <LayoutItem>
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-sm text-[--clr-surface-tonal-a20]">
              Loading...
            </div>
          </div>
        </LayoutItem>
      </LayoutPage>
    );
  }

  if (isError || !data) {
    return (
      <LayoutPage>
        <LayoutItem>
          <div className="flex items-center justify-center h-[70vh]">
            <ErrorState error="Set not found" />
          </div>
        </LayoutItem>
      </LayoutPage>
    );
  }

  const cards = data.pages.flatMap((page) => page.cards);

  return (
    <LayoutPage hasHero>
      <LayoutItem isFullWidth>
        <Header data={data.pages[0]} />
      </LayoutItem>

      <LayoutItem>
        <Set data={cards} />

        {/* 👇 Sentinel element */}
        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="h-10 flex items-center justify-center"
          >
            {isFetchingNextPage && (
              <span className="text-sm text-[--clr-surface-tonal-a20]">
                Loading more...
              </span>
            )}
          </div>
        )}
      </LayoutItem>
    </LayoutPage>
  );
}
