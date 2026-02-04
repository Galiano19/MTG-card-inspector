"use client";

import { MTGCardSearch } from "@/components/pattern";
import LayoutPage from "@/components/pattern/LayoutPage/LayoutPage";
import { Header } from "@/components/pattern/MTGCardSearch/Header";
import TrendingCards from "@/components/pattern/TrendingCards/TrendingCards";
import useCardRoute from "@/hooks/useCardRoute";

export default function Home() {
  const { handleSearch } = useCardRoute({
    navigateToCardOnId: true,
  });

  return (
    <LayoutPage>
      <Header />
      <MTGCardSearch />
      <TrendingCards onSearch={handleSearch} />
    </LayoutPage>
  );
}
