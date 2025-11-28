import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useAutocomplete } from "../../../hooks/useCardSearch";
import { Suggestions } from "./Suggestions";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export default function SearchBar({ onSearch, isSearching }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  // Debounce the query for autocomplete
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: suggestions = [], isFetching: isFetchingSuggestions } =
    useAutocomplete(debouncedQuery, {
      enabled: debouncedQuery.length >= 2,
    });

  const shouldShowSuggestions =
    showSuggestions && suggestions.length > 0 && debouncedQuery.length >= 2;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        suggestionsRef.current &&
        target &&
        !suggestionsRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (query.trim()) {
        onSearch(query.trim());
        setShowSuggestions(false);
      }
    },
    [query, onSearch]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      onSearch(suggestion);
      setShowSuggestions(false);
    },
    [onSearch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showSuggestions || !suggestions.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, suggestions.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, -1));
          break;
        case "Enter":
          if (selectedIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[selectedIndex]);
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          break;
        default:
          break;
      }
    },
    [showSuggestions, suggestions, selectedIndex, handleSuggestionClick]
  );

  const clearInput = useCallback(() => {
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
              if (e.target.value.length >= 2) {
                setShowSuggestions(true);
              }
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
            placeholder="Search for a Magic card..."
            className="pl-12 pr-24 h-14 text-base md:text-lg bg-white/90 backdrop-blur border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50 focus:shadow-xl focus:shadow-teal-500/10 transition-all duration-300 placeholder:text-slate-400"
            aria-label="Search for Magic: The Gathering cards"
            aria-describedby="search-hint"
            aria-autocomplete="list"
            aria-controls="suggestions-list"
            aria-expanded={shouldShowSuggestions}
          />
          {query && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-20 p-2 text-slate-400 hover:text-slate-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <Button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-2 h-10 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 min-w-[80px]"
          >
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
        <p id="search-hint" className="sr-only">
          Type at least 2 characters for autocomplete suggestions
        </p>
      </form>

      <Suggestions
        shouldShowSuggestions={shouldShowSuggestions}
        suggestionsRef={suggestionsRef}
        suggestions={suggestions}
        isFetchingSuggestions={isFetchingSuggestions}
        selectedIndex={selectedIndex}
        setQuery={setQuery}
        onSearch={onSearch}
        setShowSuggestions={setShowSuggestions}
      />
    </div>
  );
}
