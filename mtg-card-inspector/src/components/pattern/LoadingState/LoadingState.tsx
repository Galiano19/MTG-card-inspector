import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { Card, CardContent, CardHeader } from "../../ui/card";

export default function LoadingState() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Card
        id="card-skeleton"
        className="bg-[--clr-surface-a20] backdrop-blur shadow-xl overflow-hidden"
      >
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            <div
              id="image-skeleton"
              className="lg:w-[320px] flex-shrink-0 bg-[--clr-surface-a30] p-4 md:p-6 flex items-center justify-center"
            >
              <Skeleton className="w-full max-w-[280px] aspect-[5/7] rounded-xl" />
            </div>

            <div
              id="content-skeleton"
              className="flex-1 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6"
            >
              <div id="title-skeleton" className="space-y-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>

              <div id="oracle-text-skeleton" className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="bg-background rounded-xl p-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>

              <div id="flavor-text-skeleton" className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-16 w-full" />
              </div>

              <div
                id="info-grid-skeleton"
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        id="price-skeleton"
        className="bg-[--clr-surface-a20] backdrop-blur shadow-xl"
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="h-6 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-[--clr-surface-a30] rounded-xl p-3 md:p-4 space-y-2"
              >
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
