"use client";

import { MTGCardSearch } from "@/components/pattern";
import Layout from "@/components/pattern/Layout/Layout";
import { Header } from "@/components/pattern/MTGCardSearch/Header";

export default function Home() {
  return (
    <Layout>
      <Header />
      <MTGCardSearch />
    </Layout>
  );
}
