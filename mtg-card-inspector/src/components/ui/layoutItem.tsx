interface LayoutItemProps {
  children: React.ReactNode;
  isFullWidth?: boolean;
  isFullWidthMobile?: boolean;
  removePaddingTop?: boolean;
}

export default function LayoutItem({
  children,
  isFullWidth = false,
  isFullWidthMobile = false,
}: LayoutItemProps) {
  const layoutWidthOptions = {
    isFullWidth: "w-full  ",
    isFullWidthMobile: "w-full md:max-w-6xl",
    default: "px-4 max-w-6xl",
  };

  const getLayoutWidth = () => {
    if (isFullWidth) return layoutWidthOptions.isFullWidth;
    if (isFullWidthMobile) return layoutWidthOptions.isFullWidthMobile;
    return layoutWidthOptions.default;
  };

  return (
    <div
      className={`animate-in fade-in slide-in-from-bottom-4 duration-700  mx-auto pb-8 md:pb-12 ${getLayoutWidth()}`}
    >
      {children}
    </div>
  );
}
