import { useEffect, useRef } from "react";

interface SentinelProps {
  children: React.ReactNode;
  onIntersect: () => void;
}

export default function Sentinel({ children, onIntersect }: SentinelProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin: "200px", // preload before reaching exact bottom
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect]);

  return (
    <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
      {children}
    </div>
  );
}
