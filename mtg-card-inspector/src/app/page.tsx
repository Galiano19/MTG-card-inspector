"use client";

import { MTGCardSearch } from "@/components/pattern";
import Layout from "@/components/pattern/Layout/Layout";
import { Header } from "@/components/pattern/MTGCardSearch/Header";
import TrendingCards from "@/components/pattern/TrendingCards/TrendingCards";
import useCardRoute from "@/hooks/useCardRoute";

export default function Home() {
  const { handleSearch } = useCardRoute({
    navigateToCardOnId: true,
  });

  return (
    <Layout>
      <Header />
      <MTGCardSearch />
      <TrendingCards onSearch={handleSearch} />
    </Layout>
  );
}
