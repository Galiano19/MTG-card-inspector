"use client";

import { MTGCardSearch } from "@/components/pattern";
import LayoutPage from "@/components/pattern/LayoutPage/LayoutPage";
import { Header } from "@/components/pattern/MTGCardSearch/Header";
import TrendingCards from "@/components/pattern/TrendingCards/TrendingCards";
import LayoutItem from "@/components/ui/layoutItem";

export default function Home() {
  return (
    <LayoutPage showSearchBar={false} showNavigationBorder={false}>
      <LayoutItem>
        <Header />
      </LayoutItem>
      <LayoutItem>
        <MTGCardSearch />
      </LayoutItem>
      <LayoutItem isFullWidthMobile>
        <TrendingCards />
      </LayoutItem>
    </LayoutPage>
  );
}
