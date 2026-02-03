"use client";

import { MTGCardSearch } from "@/components/pattern";
import Layout from "@/components/pattern/Layout/Layout";
import { Header } from "@/components/pattern/MTGCardSearch/Header";
import TrendingCards from "@/components/pattern/TrendingCards/TrendingCards";

export default function Home() {
  return (
    <Layout>
      <Header />
      <MTGCardSearch />
      <TrendingCards
        onSearch={(query) => console.log("Trending card search:", query)}
      />
    </Layout>
  );
}
