"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import LayoutPage from "@/components/pattern/LayoutPage/LayoutPage";
import LayoutItem from "@/components/ui/layoutItem";
import Card from "@/components/pattern/Card/Card";
import { ErrorState } from "@/components/pattern";
import Similar from "@/components/pattern/Card/Similar";
import { Separator } from "@/components/ui/separator";
import { useCardSearch } from "@/hooks/useCardSearch";
import { useEffect } from "react";

export default function CardPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params.slug as string;
  const cardName = slug.replace(/-/g, " ");
  const cardId = searchParams.get("id");

  const { data: card, isLoading, error } = useCardSearch(
    cardId ? { id: cardId } : cardName
  );

  useEffect(() => {
    if (card && cardId && card.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") !== slug) {
      router.replace(`/card/${slug}`);
    }
  }, [card, cardId, slug, router]);

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

  if (error || !card) {
    return (
      <LayoutPage>
        <LayoutItem>
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-sm text-[--clr-surface-tonal-a20]">
              <ErrorState error={"Card not found"} />
            </div>
          </div>
        </LayoutItem>
      </LayoutPage>
    );
  }

  return (
    <LayoutPage>
      <LayoutItem><Card card={card} /></LayoutItem>
      <>
        <LayoutItem>
          <Separator />
        </LayoutItem>
        <LayoutItem isFullWidth>
          <Similar card={card} />
        </LayoutItem>
      </>
    </LayoutPage>
  );
}
