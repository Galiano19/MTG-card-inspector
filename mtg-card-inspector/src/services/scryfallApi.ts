import { RelatedArt, ScryfallCard } from "@/types/scryfall";
import mapScryfallCardToInternal from "./mappers/ScryfallApi.mapper";

const SCRYFALL_BASE_URL = "https://api.scryfall.com";

/**
 * Fetch a single card by name using fuzzy search
 * @param {string} cardName - The card name to search for
 * @returns {Promise<ScryfallCard>} - Card data object
 */
export const fetchCardByName = async (cardName: string) => {
  const response = await fetch(
    `${SCRYFALL_BASE_URL}/cards/named?fuzzy=${encodeURIComponent(cardName)}`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.details || `Card not found: ${cardName}`);
  }

  const data = await response.json();
  return mapScryfallCardToInternal(data);
};

/**
 * Fetch autocomplete suggestions for card names
 * @param {string} query - The partial card name to search for
 * @returns {Promise<string[]>} - Array of card name suggestions
 */
export const fetchAutocompleteSuggestions = async (query: string) => {
  if (query.length < 2) {
    return [];
  }

  const response = await fetch(
    `${SCRYFALL_BASE_URL}/cards/autocomplete?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }

  const data = await response.json();
  return data.data || [];
};

/**
 * Fetch related cards by provided URI
 * @param {string} query - The URI to fetch related cards from
 * @returns {Promise<RelatedArt[]>} - Array of related cards
 */
export const fetchRelatedCards = async (query: string) => {
  const response = await fetch(query);
  if (!response.ok) {
    throw new Error("Failed to fetch related cards");
  }

  const data = await response.json();
  return data.data || [];
};
