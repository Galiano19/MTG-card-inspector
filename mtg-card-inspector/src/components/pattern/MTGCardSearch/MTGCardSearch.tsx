import React, { useState, useCallback } from "react";
import { useCardSearch } from "../../../hooks/useCardSearch";
import {
  SearchBar,
  CardDisplay,
  PriceComparison,
  LoadingState,
  ErrorState,
  WelcomeState,
} from "../index";
import { BackgroundDecoration } from "./BackgroundDecoration";
import { Header } from "./Header";
import { Footer } from "./Footer";
import RelatedCardArtworks from "../RelatedCardArtworks/RelatedCardArtworks";

export default function MTGCardSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: card,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useCardSearch(searchQuery);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleRetry = useCallback(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery, refetch]);

  const showLoading = isLoading || isFetching;
  const showError = error && !showLoading;
  const showCard = card && !showLoading && !error;
  const showWelcome = !searchQuery && !showLoading && !error;

  return (
    <div className="bg-[--clr-surface-a10] from-slate-50 via-white to-teal-50 rounded-2xl">
      <BackgroundDecoration />

      <div id="main-content" className="relative z-10 ">
        <Header />

        <section id="search-section" className="px-4 pb-6 md:pb-8">
          <SearchBar onSearch={handleSearch} isSearching={showLoading} />
        </section>

        <main id="results-section" className="px-4 pb-8 md:pb-12">
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
            {showLoading && <LoadingState />}

            {showError && <ErrorState error={error} onRetry={handleRetry} />}

            {showCard && (
              <>
                <CardDisplay card={card} />
                <RelatedCardArtworks card={card} />
                {card.market_prices && (
                  <PriceComparison marketPrices={card.market_prices} />
                )}
              </>
            )}

            {showWelcome && <WelcomeState />}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
