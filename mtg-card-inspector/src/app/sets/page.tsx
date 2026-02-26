"use client";

import LayoutPage from "@/components/pattern/LayoutPage/LayoutPage";
import Sets from "@/components/pattern/Sets/Sets";
import LayoutItem from "@/components/ui/layoutItem";
import { useSets } from "@/hooks/useSets";

export default function SetPage() {
  const { data, isLoading, isError } = useSets();

  if (isLoading) {
    return (
      <LayoutPage>
        <LayoutItem>
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-sm text-[--clr-surface-tonal-a20]">
              Loading...
            </div>
          </div>
        </LayoutItem>
      </LayoutPage>
    );
  }

  return (
    <LayoutPage>
      <LayoutItem>
        <Sets data={data || []} />
      </LayoutItem>
    </LayoutPage>
  );
}
