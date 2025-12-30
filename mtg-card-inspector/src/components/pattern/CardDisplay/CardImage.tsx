// @ts-ignore
import { CardFace } from "@/types/scryfall";
import FoilEffect from "./FoilEffect";
import { useEffect, useState } from "react";

interface CardImageProps {
  cardName: string;
  isTransformable?: boolean;
  face?: CardFace;
  urlLarge?: string;
  urlNormal?: string;
  isFoil?: boolean;
}

export default function CardImage({
  cardName,
  isTransformable,
  face,
  urlLarge,
  urlNormal,
  isFoil,
}: CardImageProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    import("hover-tilt/web-component");
    setIsClient(true);
  }, []);

  const getImageUrl = () => {
    if (isTransformable) {
      return face?.image_uris?.normal || face?.image_uris?.large;
    }
    return urlNormal || urlLarge;
  };

  const imageContent = (
    <>
      {isFoil && (
        <div className="rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 rounded-xl mix-blend-multiply"
            style={{
              background:
                "linear-gradient(135deg, #fcf4c9 10%, #fee3e2, #fbcdf2, #e8befa, #abbfff, #bbf3c0 90%)",
            }}
          />
          <FoilEffect />
        </div>
      )}
      <img
        src={getImageUrl()}
        alt={cardName}
        className="w-full max-w-[280px] rounded-xl shadow-2xl transition-transform duration-500 self-center"
        loading="lazy"
      />
    </>
  );

  if (!isClient) {
    return <div className="flex self-center">{imageContent}</div>;
  }

  return (
    <div className="flex self-center">
      {/* @ts-ignore */}
      <hover-tilt
        tilt-factor="1.5"
        scale-factor="1.2"
        class="[&::part(container)]:rounded-xl"
        shadow
        shadowBlur={30}
        glare-intensity={isFoil ? "1.5" : "0.5"}
        glare-mask={isFoil ? "url(/img/foil/cosmos-middle-trans.png)" : ""}
        glare-mask-mode={isFoil ? "alpha" : "luminosity"}
        exit-delay="500"
      >
        {imageContent}
        {/* @ts-ignore */}
      </hover-tilt>
    </div>
  );
}
