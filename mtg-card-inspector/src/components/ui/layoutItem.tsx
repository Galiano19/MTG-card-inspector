interface LayoutItemProps {
  children: React.ReactNode;
  isFullWidth?: boolean;
}

export default function LayoutItem({
  children,
  isFullWidth = false,
}: LayoutItemProps) {
  return (
    <div className={isFullWidth ? "w-full" : "px-4 pb-8 md:pb-12"}>
      {children}
    </div>
  );
}
