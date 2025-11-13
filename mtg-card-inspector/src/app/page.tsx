"use client";

import { CardSearch } from "../components/pattern/CardSearch";

export default function Home() {
  return (
    <main className='min-h-screen bg-gray-50 py-12 px-4'>
      <div className='max-w-6xl mx-auto'>
        <CardSearch />
      </div>
    </main>
  );
}
