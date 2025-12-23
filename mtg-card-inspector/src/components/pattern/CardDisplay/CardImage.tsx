// @ts-ignore
import { CardFace } from "@/types/scryfall";
import "hover-tilt/web-component";

interface CardImageProps {
  cardName: string;
  isDoubleFaced?: boolean;
  face?: CardFace;
  urlLarge?: string;
  urlNormal?: string;
}

export default function CardImage({
  cardName,
  isDoubleFaced,
  face,
  urlLarge,
  urlNormal,
}: CardImageProps) {
  const getImageUrl = () => {
    if (isDoubleFaced) {
      return face?.image_uris?.normal || face?.image_uris?.large;
    }
    return urlNormal || urlLarge;
  };

  return (
    <>
      {/* @ts-ignore */}
      <hover-tilt
        tilt-factor="1.5"
        scale-factor="1.1"
        class="[&::part(container)]:rounded-xl"
      >
        <img
          src={getImageUrl()}
          alt={cardName}
          className="w-full max-w-[280px] rounded-xl shadow-2xl transition-transform duration-500 self-center"
          loading="lazy"
        />
        {/* @ts-ignore */}
      </hover-tilt>
    </>
  );
}
