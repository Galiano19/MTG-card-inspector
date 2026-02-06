export default function Loading() {
  return (
    <div className="animate-pulse flex gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg bg-[--clr-surface-a20] min-h-[310px] min-w-[223px]"
        />
      ))}
    </div>
  );
}
