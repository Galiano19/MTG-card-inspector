import { Button } from "@/components/ui/button";
import { InternalSet } from "@/types/scryfall";
import { Calendar, Database, Share2 } from "lucide-react";

export default function Header({ data }: { data: InternalSet }) {
  const bgImage = (data.cards && data.cards[0]?.image_uris?.art_crop) || "";

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${data.setInfo.name} set - MTG Inspector`,
          text: `Check out this Magic set: ${data.setInfo.name} in MTG Inspector`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <section className="relative h-[350px] w-full flex items-end">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: ` url('${bgImage}')`,
          filter: "brightness(0.4) contrast(1.2)",
          backgroundPosition: "30% 30%",
        }}
      ></div>
      <div className="absolute inset-0"></div>
      <div className="relative layout-container w-full px-6  pb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-6xl mx-auto">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-4xl text-primary">
              <i
                className={`ss ss-${
                  data.setInfo.code
                } [-webkit-text-stroke:1px_rgba(0,0,0,0.3)] `}
              />
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              {data.setInfo.name}
            </h1>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <span className="bg-[--clr-surface-a20] px-2 py-1 rounded text-sm text-white border uppercase">
              {data.setInfo.code}
            </span>
            <span className="flex items-center gap-2">
              <span className=" text-sm">
                <Calendar />
              </span>
              {data.setInfo.released_at}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-sm">
                <Database />
              </span>
              {data.setInfo.card_count}
            </span>
          </div>
        </div>
        <div className="flex ">
          <Button onClick={handleShareClick}>
            <Share2 />
          </Button>
        </div>
      </div>
    </section>
  );
}
