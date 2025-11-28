import { Loader2, Search } from "lucide-react";
import { useCallback } from "react";

interface SuggestionsProps {
  shouldShowSuggestions: boolean;
  suggestionsRef: React.RefObject<HTMLDivElement | null>;
  suggestions: string[];
  isFetchingSuggestions: boolean;
  selectedIndex: number;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (query: string) => void;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Suggestions({
  shouldShowSuggestions,
  suggestionsRef,
  suggestions,
  isFetchingSuggestions,
  selectedIndex,
  setQuery,
  onSearch,
  setShowSuggestions,
}: SuggestionsProps) {
  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      onSearch(suggestion);
      setShowSuggestions(false);
    },
    [onSearch]
  );

  if (!shouldShowSuggestions) {
    return null;
  }

  return (
    <div
      ref={suggestionsRef}
      id="suggestions-list"
      role="listbox"
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {isFetchingSuggestions && (
        <div className="px-4 py-2 text-sm text-slate-400 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading suggestions...
        </div>
      )}
      {suggestions.slice(0, 8).map((suggestion: string, index: number) => (
        <button
          key={suggestion}
          onClick={() => handleSuggestionClick(suggestion)}
          className={`w-full px-4 py-3 text-left text-slate-700 hover:bg-teal-50 transition-colors flex items-center gap-3 min-h-[48px] ${
            index === selectedIndex ? "bg-teal-50" : ""
          }`}
          role="option"
          aria-selected={index === selectedIndex}
        >
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="truncate">{suggestion}</span>
        </button>
      ))}
    </div>
  );
}
