import { InternalSetInfo } from "@/types/scryfall";

export default function Sets({ data }: { data: InternalSetInfo[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((set) => (
        <a
          key={set.code}
          className="flex items-center border rounded p-2 flex gap-2 bg-[--clr-surface-a20] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
          aria-label={`See all card for set ${set.name}`}
          href={`/sets/${set.code}`}
        >
          <i
            className={`ss ss-${
              set.code
            } [-webkit-text-stroke:1px_rgba(0,0,0,0.3)] `}
          />
          <span className="text-sm font-bold">{set.name}</span>
        </a>
      ))}
    </div>
  );
}
