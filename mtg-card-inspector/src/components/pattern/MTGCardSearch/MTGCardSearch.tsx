import React from "react";
import useCardRoute from "../../../hooks/useCardRoute";
import { SearchBar } from "../index";
import { BackgroundDecoration } from "./BackgroundDecoration";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function MTGCardSearch() {
  const { handleSearch, isLoading, isFetching } = useCardRoute({
    navigateToCardOnId: true,
  });

  const showLoading = isLoading || isFetching;

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
        </div>

        <Footer />
      </div>
    </div>
  );
}
