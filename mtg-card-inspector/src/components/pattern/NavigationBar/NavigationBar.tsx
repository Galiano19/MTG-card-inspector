import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

export default function NavigationBar() {
  return (
    <nav className=" from-slate-50 via-white to-teal-50 rounded-2xl transition-all duration-500 ease-in-out mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <h1 className="text-xl font-bold text-[--clr-primary]">
            MTG Card Inspector
          </h1>
        </a>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
