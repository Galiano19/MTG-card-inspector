import React, { useState, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { useCardSearch } from "../../../hooks/useCardSearch";
import {
  SearchBar,
  CardDisplay,
  PriceComparison,
  LoadingState,
  ErrorState,
  WelcomeState,
} from "../index";

const MTGCardSearch = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <div
        id="background-decoration"
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-40 -right-40 w-60 md:w-80 h-60 md:h-80 bg-teal-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -left-40 w-60 md:w-80 h-60 md:h-80 bg-emerald-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 right-1/3 w-60 md:w-80 h-60 md:h-80 bg-cyan-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div id="main-content" className="relative z-10">
        <header className="pt-6 pb-4 px-4 md:pt-8 md:pb-6 lg:pt-12 lg:pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="p-1.5 md:p-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg md:rounded-xl shadow-lg shadow-teal-500/20">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-teal-700 to-emerald-700 bg-clip-text text-transparent">
                MTG Card Search
              </h1>
            </div>
            <p className="text-slate-500 text-xs md:text-sm lg:text-base max-w-md mx-auto">
              Find cards, compare prices, and discover the magic
            </p>
          </div>
        </header>

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
                <PriceComparison
                  prices={card.prices}
                  purchaseUris={card.purchase_uris}
                />
              </>
            )}

            {showWelcome && <WelcomeState />}
          </div>
        </main>

        <footer
          id="footer"
          className="py-4 md:py-6 px-4 border-t border-slate-100 bg-white/50 backdrop-blur"
        >
          <div className="max-w-4xl mx-auto text-center text-xs md:text-sm text-slate-400">
            <p>
              Powered by{" "}
              <a
                href="https://scryfall.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Scryfall API
              </a>
            </p>
            <p className="mt-1">
              Magic: The Gathering is © Wizards of the Coast
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MTGCardSearch;
