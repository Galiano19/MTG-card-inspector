"use client";

import React, { useState } from "react";
import { useCardQuery } from "../../hooks/use-card-query";
import { CardDisplay } from "./CardDisplay";
import { Spinner } from "../ui/Spinner";
import { ErrorBox } from "./ErrorBox";
import { Button } from "../ui/Button";

export function CardSearch() {
  const [cardName, setCardName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: card,
    isLoading,
    error,
    refetch,
  } = useCardQuery(
    searchTerm,
    true, // include variations as specified in URL
    { enabled: !!searchTerm }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardName.trim()) {
      setSearchTerm(cardName.trim());
    }
  };

  const handleClear = () => {
    setCardName("");
    setSearchTerm("");
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className='flex gap-2 items-end'>
          <div className='flex-1 flex gap-1 flex-col'>
            <label htmlFor='cardName' className='block text-sm'>
              Card Name
            </label>
            <input
              type='text'
              id='cardName'
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder='Enter a Magic card name (e.g., Lightning Bolt, Mabel Heir)'
              className='px-3 py-2 border'
            />
          </div>
          <Button
            type='submit'
            disabled={!cardName.trim() || isLoading}
            variant={"default"}
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
          {searchTerm && (
            <Button type='button' onClick={handleClear} variant={"default"}>
              Clear
            </Button>
          )}
        </div>
      </form>

      {/* Search Results */}
      {searchTerm && (
        <div>
          {isLoading && (
            <div className='text-center'>
              <Spinner />
            </div>
          )}

          {error && (
            <ErrorBox
              title='Card not found'
              message={
                error.message || `Could not find a card named "${searchTerm}".`
              }
            >
              <Button type='button' variant={"ghost"} onClick={() => refetch()}>
                Try again
              </Button>
            </ErrorBox>
          )}

          {card && !isLoading && (
            <div className='flex justify-center'>
              <CardDisplay card={card} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
