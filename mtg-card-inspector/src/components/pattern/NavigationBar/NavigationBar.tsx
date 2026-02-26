import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";
import SearchBar from "../SearchBar/SearchBar";

export default function NavigationBar({
  showSearchBar = true,
  showBorder = true,
}: {
  showSearchBar?: boolean;
  showBorder?: boolean;
}) {
  return (
    <nav
      className={` from-slate-50 via-white to-teal-50 transition-all duration-500 ease-in-out min-h-[80px] flex items-center w-full ${showBorder ? "border-b border-slate-200/50 dark:border-slate-700/50" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between w-full">
        <a
          href="/"
          className="flex items-center gap-2 text-slate-900 dark:text-white"
        >
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <span className="text-xl font-bold text-[--clr-primary] flex items-center gap-1">
            <span className="text-primary">MTG</span>
            Inspector
          </span>
        </a>
        <div className="flex flex-1 px-4 items-center justify-end">
          <a href="/sets" className="font-bold uppercase">
            Sets
          </a>
        </div>
        <div className="flex items-center gap-2">
          {showSearchBar && (
            <div className="flex items-center gap-4">
              <SearchBar sheetAsMobile />
            </div>
          )}

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
