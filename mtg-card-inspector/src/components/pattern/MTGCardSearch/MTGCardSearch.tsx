import React, { useState, useCallback } from "react";
import {
  QueryCardSearchInput,
  useCardSearch,
} from "../../../hooks/useCardSearch";
import {
  SearchBar,
  CardDisplay,
  PriceComparison,
  LoadingState,
  ErrorState,
} from "../index";
import { BackgroundDecoration } from "./BackgroundDecoration";
import { Header } from "./Header";
import { Footer } from "./Footer";
import RelatedCardArtworks from "../RelatedCardArtworks/RelatedCardArtworks";

export default function MTGCardSearch() {
  const [searchQuery, setSearchQuery] = useState<QueryCardSearchInput>("");

  const {
    data: card,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useCardSearch(searchQuery);

  const handleSearch = useCallback((query: QueryCardSearchInput) => {
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

  return (
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
        </div>

        <Footer />
      </div>
    </div>
  );
}
