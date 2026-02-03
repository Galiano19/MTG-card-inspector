"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import {
  SearchBar,
  CardDisplay,
  LoadingState,
  ErrorState,
  PriceComparison,
} from "@/components/pattern";
import useCardRoute from "@/hooks/useCardRoute";
import RelatedCardArtworks from "@/components/pattern/RelatedCardArtworks/RelatedCardArtworks";
import { BackgroundDecoration } from "@/components/pattern/MTGCardSearch/BackgroundDecoration";
import { Header } from "@/components/pattern/MTGCardSearch/Header";
import { Footer } from "@/components/pattern/MTGCardSearch/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function CardPage() {
  const { handleSearch, handleRetry, card, isLoading, error } = useCardRoute({
    navigateToCardOnId: false,
  });

  const showLoading = isLoading;
  const showError = !!error && !showLoading;
  const showCard = !!card && !showLoading && !error;

  return (
    <main className="min-h-screen py-12 px-4 content-center">
      <div className="fixed bottom-4 z-20 flex justify-end max-w-6xl mx-auto mb-6">
        <ThemeToggle />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="bg-[--clr-surface-a10] from-slate-50 via-white to-teal-50 rounded-2xl transition-all duration-500 ease-in-out">
          <BackgroundDecoration />

          <div id="main-content" className="relative z-10 flex flex-col">
            <div
              id="results-section"
              className="px-4 pb-8 md:pb-12 flex-1 content-center"
            >
              <Header />

              <section id="search-section" className="pb-6 md:pb-8 ">
                <SearchBar onSearch={handleSearch} isSearching={showLoading} />
              </section>
              <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 ">
                {showLoading && <LoadingState />}

                {showError && (
                  <ErrorState error={error} onRetry={handleRetry} />
                )}

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
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
