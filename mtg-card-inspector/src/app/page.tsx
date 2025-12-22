"use client";

import { MTGCardSearch } from "@/components/pattern";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 content-center">
      <div className="fixed bottom-4 z-20 flex justify-end max-w-6xl mx-auto mb-6">
        <ThemeToggle />
      </div>
      <div className="max-w-6xl mx-auto">
        <MTGCardSearch />
      </div>
    </main>
  );
}
