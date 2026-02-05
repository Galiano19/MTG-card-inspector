interface LayoutItemProps {
  children: React.ReactNode;
  isFullWidth?: boolean;
}

export default function LayoutItem({
  children,
  isFullWidth = false,
}: LayoutItemProps) {
  return (
    <div
      className={`animate-in fade-in slide-in-from-bottom-4 duration-700 ${isFullWidth ? "w-full" : "px-4 pb-8 md:pb-12"}`}
    >
      {children}
    </div>
  );
}
