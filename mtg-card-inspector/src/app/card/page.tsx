"use client";

import React from "react";
import {
  SearchBar,
  CardDisplay,
  LoadingState,
  ErrorState,
  PriceComparison,
} from "@/components/pattern";
import useCardRoute from "@/hooks/useCardRoute";
import RelatedCardArtworks from "@/components/pattern/RelatedCardArtworks/RelatedCardArtworks";
import Layout from "@/components/pattern/Layout/Layout";

export default function CardPage() {
  const { handleSearch, handleRetry, card, isLoading, error } = useCardRoute({
    navigateToCardOnId: false,
  });

  const showLoading = isLoading;
  const showError = !!error && !showLoading;
  const showCard = !!card && !showLoading && !error;

  return (
    <Layout>
      <section id="search-section" className="pb-6 md:pb-8 ">
        <SearchBar onSearch={handleSearch} isSearching={showLoading} />
      </section>
      <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 ">
        {showLoading && <LoadingState />}

        {showError && <ErrorState error={error} onRetry={handleRetry} />}

        {showCard && (
          <div className="animate-in slide-in-from-bottom-4 duration-500 flex flex-col gap-4">
            <CardDisplay card={card} />
            <RelatedCardArtworks card={card} onSearch={handleSearch} />
            {card.market_prices && (
              <PriceComparison marketPrices={card.market_prices} />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
