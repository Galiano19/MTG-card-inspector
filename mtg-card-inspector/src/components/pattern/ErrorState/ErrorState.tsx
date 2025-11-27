import React from "react";
import { AlertCircle, SearchX, RefreshCw } from "lucide-react";
import { Button } from "../../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";

const ErrorState = ({
  error,
  onRetry,
}: {
  error: any;
  onRetry?: () => void;
}) => {
  const errorMessage =
    error?.message || error || "An unexpected error occurred";
  const isNotFound =
    errorMessage.toLowerCase().includes("not found") ||
    errorMessage.toLowerCase().includes("no card");

  return (
    <div className="w-full max-w-lg mx-auto py-8 md:py-12 px-4">
      <Alert
        variant={isNotFound ? "default" : "destructive"}
        className={`${
          isNotFound
            ? "border-amber-200 bg-amber-50"
            : "border-red-200 bg-red-50"
        }`}
      >
        <div className="flex flex-col items-center text-center py-4">
          <div
            className={`w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 rounded-full flex items-center justify-center ${
              isNotFound ? "bg-amber-100" : "bg-red-100"
            }`}
          >
            {isNotFound ? (
              <SearchX className="w-8 h-8 md:w-10 md:h-10 text-amber-500" />
            ) : (
              <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-red-500" />
            )}
          </div>

          <AlertTitle
            className={`text-lg md:text-xl font-bold mb-2 ${
              isNotFound ? "text-amber-800" : "text-red-800"
            }`}
          >
            {isNotFound ? "Card Not Found" : "Oops! Something went wrong"}
          </AlertTitle>

          <AlertDescription className="text-slate-600 mb-4 md:mb-6 text-sm md:text-base">
            {isNotFound
              ? "We couldn't find a card matching your search. Try checking the spelling or searching for a different card."
              : errorMessage}
          </AlertDescription>

          {onRetry && (
            <Button
              onClick={onRetry}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl px-6 min-h-[44px]"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}

          <div className="mt-6 md:mt-8 text-sm text-slate-400">
            <p className="font-medium mb-2">Tips for better results:</p>
            <ul className="space-y-1 text-left">
              <li>• Use the full card name</li>
              <li>• Check for typos</li>
              <li>• Try partial names for suggestions</li>
            </ul>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default ErrorState;
