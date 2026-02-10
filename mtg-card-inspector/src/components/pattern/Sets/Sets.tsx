import { InternalSet } from "@/types/scryfall";

export default function Sets({ data }: { data: InternalSet[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((set) => (
        <div key={set.code} className="border rounded p-4 flex gap-2">
          <img
            src={set.icon_svg_uri}
            alt={`Set symbol for ${set.code}`}
            width={16}
            height={16}
          />
          <span className="text-sm font-bold">{set.name}</span>
        </div>
      ))}
    </div>
  );
}
