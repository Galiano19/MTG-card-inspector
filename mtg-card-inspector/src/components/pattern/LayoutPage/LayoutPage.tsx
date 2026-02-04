import { BackgroundDecoration } from "../MTGCardSearch/BackgroundDecoration";
import { Footer } from "../MTGCardSearch/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-full">
      <NavigationBar />
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <BackgroundDecoration />
          <div className="relative z-10 flex flex-col">
            <div id="results-section" className=" flex-1 content-center">
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
