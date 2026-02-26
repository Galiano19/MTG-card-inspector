"use client";

import useCardRoute from "@/hooks/useCardRoute";
import LayoutPage from "@/components/pattern/LayoutPage/LayoutPage";
import LayoutItem from "@/components/ui/layoutItem";
import Card from "@/components/pattern/Card/Card";
import { ErrorState } from "@/components/pattern";
import Similar from "@/components/pattern/Card/Similar";
import { Separator } from "@/components/ui/separator";

export default function CardPage() {
  const { card, isLoading, error } = useCardRoute({
    navigateToCardOnId: false,
  });

  const showLoading = isLoading;
  const showError = !!error && !showLoading;
  const showCard = !!card && !showLoading && !error;

  if (showLoading) {
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

  if (showError) {
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
      <LayoutItem>{showCard && <Card card={card} />}</LayoutItem>
      {showCard && (
        <>
          <LayoutItem>
            <Separator />
          </LayoutItem>
          <LayoutItem isFullWidthMobile>
            <Similar card={card} />
          </LayoutItem>
        </>
      )}
    </LayoutPage>
  );
}
