"use client";

import { ErrorState } from "@/components/pattern";
import LayoutPage from "@/components/pattern/LayoutPage/LayoutPage";
import Header from "@/components/pattern/Sets/Header";
import Set from "@/components/pattern/Sets/Set";
import LayoutItem from "@/components/ui/layoutItem";
import { useSet } from "@/hooks/useSets";
import { useParams } from "next/navigation";

export default function SetPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading, isError } = useSet(slug);

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

  if (isError || !data) {
    return (
      <LayoutPage>
        <LayoutItem>
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-sm text-[--clr-surface-tonal-a20]">
              <ErrorState error={"Set not found"} />
            </div>
          </div>
        </LayoutItem>
      </LayoutPage>
    );
  }

  return (
    <LayoutPage hasHero>
      <LayoutItem isFullWidth>
        <Header data={data} />
      </LayoutItem>
      <LayoutItem>
        <Set data={data} />
      </LayoutItem>
    </LayoutPage>
  );
}
