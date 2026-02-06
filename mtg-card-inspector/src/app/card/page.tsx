"use client";

import useCardRoute from "@/hooks/useCardRoute";
import LayoutPage from "@/components/pattern/LayoutPage/LayoutPage";
import LayoutItem from "@/components/ui/layoutItem";
import Card from "@/components/pattern/Card/Card";

export default function CardPage() {
  const { handleSearch, handleRetry, card, isLoading, error } = useCardRoute({
    navigateToCardOnId: false,
  });

  const showLoading = isLoading;
  const showError = !!error && !showLoading;
  const showCard = !!card && !showLoading && !error;

  return (
    <LayoutPage>
      <LayoutItem>{showCard && <Card card={card} />}</LayoutItem>
    </LayoutPage>
  );
}
