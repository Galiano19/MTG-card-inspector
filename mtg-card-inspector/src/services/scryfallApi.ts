import mapScryfallCardToInternal from "./mappers/ScryfallApi.mapper";

const SCRYFALL_BASE_URL = "https://api.scryfall.com";

/**
 * Fetch a single card by name using fuzzy search
 * @param {string} cardName - The card name to search for
 * @returns {Promise<Object>} - Card data object
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

export const priceMarkets = [
  { name: "TCGPlayer", key: "usd", currency: "$", color: "#5c6bc0" },
  {
    name: "TCGPlayer (Foil)",
    key: "usd_foil",
    currency: "$",
    color: "#7e57c2",
  },
  { name: "CardMarket", key: "eur", currency: "€", color: "#26a69a" },
  {
    name: "CardMarket (Foil)",
    key: "eur_foil",
    currency: "€",
    color: "#00897b",
  },
  { name: "Cardhoarder (MTGO)", key: "tix", currency: "tix", color: "#ef5350" },
];
