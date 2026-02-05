import { BackgroundDecoration } from "../MTGCardSearch/BackgroundDecoration";
import { Footer } from "../MTGCardSearch/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";

interface LayoutPageProps {
  children: React.ReactNode;
  showSearchBar?: boolean;
  showNavigationBorder?: boolean;
}

export default function LayoutPage({
  children,
  showSearchBar = true,
  showNavigationBorder = true,
}: LayoutPageProps) {
  return (
    <main className="min-h-full">
      <NavigationBar
        showSearchBar={showSearchBar}
        showBorder={showNavigationBorder}
      />
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
