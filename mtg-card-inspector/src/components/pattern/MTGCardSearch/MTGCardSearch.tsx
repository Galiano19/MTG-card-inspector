import React from "react";
import useCardRoute from "../../../hooks/useCardRoute";
import { SearchBar } from "../index";

export default function MTGCardSearch() {
  const { handleSearch, isLoading, isFetching } = useCardRoute({
    navigateToCardOnId: true,
  });

  const showLoading = isLoading || isFetching;

  return (
    <section id="search-section" className="pb-6 md:pb-8 ">
      <SearchBar onSearch={handleSearch} isSearching={showLoading} />
    </section>
  );
}
