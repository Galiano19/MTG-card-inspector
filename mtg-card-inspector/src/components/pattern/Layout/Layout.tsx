import { ThemeToggle } from "@/components/ThemeToggle";
import { BackgroundDecoration } from "../MTGCardSearch/BackgroundDecoration";
import { Header } from "../MTGCardSearch/Header";
import { Footer } from "../MTGCardSearch/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen py-12 px-4 content-center">
      <div className="fixed bottom-4 z-20 flex justify-end max-w-6xl mx-auto mb-6">
        <ThemeToggle />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="bg-[--clr-surface-a10] from-slate-50 via-white to-teal-50 rounded-2xl transition-all duration-500 ease-in-out">
          <BackgroundDecoration />
          <div id="main-content" className="relative z-10 flex flex-col">
            <div
              id="results-section"
              className="px-4 pb-8 md:pb-12 flex-1 content-center"
            >
              <Header />
              {children}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
