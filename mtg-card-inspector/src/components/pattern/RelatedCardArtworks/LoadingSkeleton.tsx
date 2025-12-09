export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse flex gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg bg-[--clr-surface-a10] h-[300px] w-[223px]"
        />
      ))}
    </div>
  );
}
