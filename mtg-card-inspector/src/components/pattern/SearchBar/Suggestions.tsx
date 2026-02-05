import { Loader2, Search } from "lucide-react";

interface SuggestionsProps {
  shouldShowSuggestions: boolean;
  suggestionsRef: React.RefObject<HTMLDivElement | null>;
  suggestions: string[];
  isFetchingSuggestions: boolean;
  selectedIndex: number;
  onSuggestionClick: (suggestion: string) => void;
}

export function Suggestions({
  shouldShowSuggestions,
  suggestionsRef,
  suggestions,
  isFetchingSuggestions,
  selectedIndex,
  onSuggestionClick,
}: SuggestionsProps) {
  if (!shouldShowSuggestions) {
    return null;
  }

  return (
    <div
      ref={suggestionsRef}
      id="suggestions-list"
      role="listbox"
      className="absolute top-full left-0 right-0 mt-2 bg-[--clr-surface-a30] rounded-xl shadow-xl shadow-[--clr-surface-a0]/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {isFetchingSuggestions && (
        <div className="px-4 py-2 text-sm flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading suggestions...
        </div>
      )}
      {suggestions.slice(0, 8).map((suggestion: string, index: number) => (
        <button
          key={suggestion}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSuggestionClick(suggestion);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSuggestionClick(suggestion);
          }}
          className={`w-full px-4 py-3 text-left flex items-center gap-3 min-h-[48px] ${
            index === selectedIndex ? "bg-teal-50" : ""
          }`}
          role="option"
          aria-selected={index === selectedIndex}
        >
          <Search className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{suggestion}</span>
        </button>
      ))}
    </div>
  );
}
