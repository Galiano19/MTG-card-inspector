import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { Card, CardContent, CardHeader } from "../../ui/card";

const LoadingState = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Card Skeleton */}
      <Card className="bg-white/80 backdrop-blur border-slate-200 shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Image skeleton */}
            <div className="lg:w-[320px] flex-shrink-0 bg-slate-100 p-4 md:p-6 flex items-center justify-center">
              <Skeleton className="w-full max-w-[280px] aspect-[5/7] rounded-xl" />
            </div>

            {/* Content skeleton */}
            <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
              {/* Title skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>

              {/* Oracle text skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>

              {/* Flavor text skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-16 w-full" />
              </div>

              {/* Info grid skeleton */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

      {/* Price skeleton */}
      <Card className="bg-white/80 backdrop-blur border-slate-200 shadow-xl">
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
                className="bg-slate-50 rounded-xl p-3 md:p-4 space-y-2"
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
};

export default LoadingState;
