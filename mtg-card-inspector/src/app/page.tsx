"use client";

import { MTGCardSearch } from "@/components/pattern";
import LayoutPage from "@/components/pattern/LayoutPage/LayoutPage";
import { Header } from "@/components/pattern/MTGCardSearch/Header";
import TrendingCards from "@/components/pattern/TrendingCards/TrendingCards";
import LayoutItem from "@/components/ui/layoutItem";
import useCardRoute from "@/hooks/useCardRoute";

export default function Home() {
  const { handleSearch } = useCardRoute({
    navigateToCardOnId: true,
  });

  return (
    <LayoutPage>
      <LayoutItem>
        <Header />
      </LayoutItem>
      <LayoutItem>
        <MTGCardSearch />
      </LayoutItem>
      <LayoutItem isFullWidth>
        <TrendingCards onSearch={handleSearch} />
      </LayoutItem>
    </LayoutPage>
  );
}
