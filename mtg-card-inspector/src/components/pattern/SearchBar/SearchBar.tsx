import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useAutocomplete } from "../../../hooks/useCardSearch";
import { Suggestions } from "./Suggestions";
import useCardRoute from "@/hooks/useCardRoute";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const { handleSearch, isLoading, isFetching } = useCardRoute({
    navigateToCardOnId: true,
  });

  const showLoading = isLoading || isFetching;

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
      const trimmed = query.trim();
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      if (uuidRegex.test(trimmed)) {
        handleSearch({ id: trimmed });
        setShowSuggestions(false);
        return;
      }

      if (shouldShowSuggestions) {
        handleSearch({ name: suggestions[0] });
        setQuery(suggestions[0]);
        setShowSuggestions(false);
      } else if (trimmed.length > 0) {
        handleSearch({ name: trimmed });
        setShowSuggestions(false);
      }
    },
    [shouldShowSuggestions, suggestions, handleSearch, query],
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      handleSearch({ name: suggestion });
      setShowSuggestions(false);
    },
    [handleSearch],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showSuggestions || !suggestions.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, suggestions.length - 1),
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
    [showSuggestions, suggestions, selectedIndex, handleSuggestionClick],
  );

  const clearInput = useCallback(() => {
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative ">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-[--clr-dark-a0] pointer-events-none" />
          <Input
            id="search-bar"
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
            placeholder="Search for a MTG card..."
            className="pl-5 pr-28 h-14 text-base md:text-lg bg-[--clr-surface-a20] backdrop-blur rounded-2xl shadow-lg shadow-[--clr-surface-a0]/50 focus:shadow-xl focus:shadow-[--clr-primary-a0]/10 transition-all duration-300"
            aria-label="Search for Magic: The Gathering cards"
            aria-describedby="search-hint"
            aria-autocomplete="list"
            aria-controls="suggestions-list"
          />
          {query && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-20 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <Button
            type="submit"
            disabled={showLoading || !query.trim()}
            className="absolute right-2"
          >
            {showLoading ? (
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
        onSearch={handleSearch}
        setShowSuggestions={setShowSuggestions}
      />
    </div>
  );
}
