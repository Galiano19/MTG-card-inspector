"use client";

import { ErrorState } from "@/components/pattern";
import LayoutPage from "@/components/pattern/LayoutPage/LayoutPage";
import Header from "@/components/pattern/Sets/Header";
import Set from "@/components/pattern/Sets/Set";
import LayoutItem from "@/components/ui/layoutItem";
import { useSetCards } from "@/hooks/useSets";
import { useParams } from "next/navigation";
import Sentinel from "@/components/pattern/Shared/Sentinel";

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
        {hasNextPage && (
          <Sentinel onIntersect={() => fetchNextPage()}>
            {isFetchingNextPage && (
              <span className="text-sm text-[--clr-surface-tonal-a20]">
                Loading more...
              </span>
            )}
          </Sentinel>
        )}
      </LayoutItem>
    </LayoutPage>
  );
}
