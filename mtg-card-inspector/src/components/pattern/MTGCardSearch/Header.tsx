import { Sparkles } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="pt-6 pb-4 px-4 md:pt-8 md:pb-6 lg:pt-12 lg:pb-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          <Image src="/logo.svg" alt="Logo" width={64} height={64} />
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-[--clr-primary-a0] via-[--clr-primary-a20] to-[--clr-primary-a10] bg-clip-text text-transparent">
            MTG Card Inspector
          </h1>
        </div>
        <p className=" text-xs md:text-sm lg:text-base max-w-md mx-auto">
          Find cards, compare prices, and discover the magic
        </p>
      </div>
    </header>
  );
}
