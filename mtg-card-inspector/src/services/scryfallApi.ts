import { RelatedArt, ScryfallCard, ScryfallCardRuling } from "@/types/scryfall";
import mapScryfallCardToInternal, {
  mapRulingsOfCard,
  mapScryfallSetsToInternal,
  mapScryfallSetToInternal,
} from "./mappers/ScryfallApi.mapper";

const SCRYFALL_BASE_URL = "https://api.scryfall.com";
const EDHREC_BASE_URL = "https://json.edhrec.com/pages";

/**
 * Sleep for a given number of milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Enrich card data by fetching rulings and similar cards
 * @param {ScryfallCard} mapData - The mapped card data
 * @returns {Promise<ScryfallCard>} - Enriched card data
 */
const enrichCardData = async (mapData: ScryfallCard): Promise<ScryfallCard> => {
  const rulings = await fetchRulingOfTheCard(mapData.rulings_uri).catch(
    () => [],
  );
  mapData.rulings = rulings;

  const similarCards = await fetchSimilarCardsIds(mapData.curated_name).catch(
    () => [],
  );
  mapData.similar_cards = similarCards;

  return mapData;
};

/**
 * Fetch a single card by name using fuzzy search
 * @param {string} cardName - The card name to search for
 * @returns {Promise<ScryfallCard>} - Card data object
 */
export const fetchCardByName = async (cardName: string) => {
  const response = await fetch(
    `${SCRYFALL_BASE_URL}/cards/named?fuzzy=${encodeURIComponent(cardName)}`,
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.details || `Card not found: ${cardName}`);
  }

  await delay(50);

  const data = await response.json();
  const mapData = mapScryfallCardToInternal(data);
  return enrichCardData(mapData);
};

/**
 * Fetch a card by its Scryfall ID
 * @param {string} id - The Scryfall card ID
 * @returns {Promise<ScryfallCard>}
 */
export const fetchCardById = async (id: string) => {
  const response = await fetch(`${SCRYFALL_BASE_URL}/cards/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.details || `Card not found by ID: ${id}`);
  }

  await delay(50);

  const data = await response.json();
  const mapData = mapScryfallCardToInternal(data);
  return enrichCardData(mapData);
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
    `${SCRYFALL_BASE_URL}/cards/autocomplete?q=${encodeURIComponent(query)}`,
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

/**
 * Fetch trending EDH cards ordered by EDHREC popularity
 * Returns up to `limit` cards (default 20)
 */
export const fetchTrendingCards = async (limit = 100) => {
  const response = await fetch(
    `${SCRYFALL_BASE_URL}/cards/search?q=format:edh&order=edhrec&dir=asc`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending cards");
  }

  const data = await response.json();
  // Map items to internal shape using existing mapper
  const items = (data.data || [])
    .slice(0, limit)
    .map((item: any) => mapScryfallCardToInternal(item));
  return items;
};

/**
 * Fetch ruling of the card by provided URI
 * @param {string} query - The URI to fetch ruling of the card from
 * @returns {Promise<ScryfallCardRuling[]>} - Array of ruling data
 */
export const fetchRulingOfTheCard = async (query: string) => {
  const response = await fetch(query);
  if (!response.ok) {
    throw new Error("Failed to fetch ruling of the card");
  }

  const data = await response.json();
  return mapRulingsOfCard(data.data || []);
};

/**
 * Fetch similar cards by provided curated name
 * @param {string} query - The curated name to fetch similar cards from
 * @returns {Promise<string[]>} - Array of similar card IDs
 */
export const fetchSimilarCardsIds = async (query: string) => {
  if (!query) return [];

  const response = await fetch(
    `${EDHREC_BASE_URL}/cards/${encodeURIComponent(query)}.json`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch similar cards");
  }

  const data = await response.json();

  // EDHREC responses have varied shapes across environments; be defensive.
  // Accept any of: data.similar, data.data.similar, or top-level similar arrays.
  const rawCandidates = data?.similar ?? data?.data?.similar ?? [];
  const candidatesData = Array.isArray(rawCandidates) ? rawCandidates : [];
  const candidatesId = candidatesData
    .map((item: any) => item.id)
    .filter((id: any) => typeof id === "string");
  return candidatesId;
};

/**
 * Fetch similar cards by provided ids array
 * @param {string[]} ids - Array of card IDs to fetch
 * @returns {Promise<ScryfallCard[]>} - Array of cards data
 */
export const fetchSimilarCardsContent = async (
  ids: string[],
): Promise<ScryfallCard[]> => {
  if (!ids || ids.length === 0) return [];

  return Promise.all(ids.map((id) => fetchCardById(id)));
};

/* ------------------------------------------------------------------------------------------------------------------ */
/* SETS */

/**
 * Fetch set list from Scryfall API
 * @returns {Promise<InternalSet[]>}
 */
export const fetchSetList = async () => {
  const response = await fetch(`${SCRYFALL_BASE_URL}/sets/`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.details || `No sets found`);
  }

  await delay(50);

  const data = await response.json();
  const mappedData = mapScryfallSetsToInternal(data.data || []);
  return mappedData;
};

/**
 * Fetch set info from Scryfall API
 * @returns {Promise<any{}>}
 */
export const fetchSet = async (setCode: string) => {
  const response = await fetch(`${SCRYFALL_BASE_URL}/sets/${setCode}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.details || `No set found`);
  }

  await delay(50);

  const data = await response.json();

  if (data && data?.object !== "error") {
    const responseSetCards = await fetchSetCards(data.code);

    responseSetCards && (data.cards = responseSetCards);
  }

  return mapScryfallSetToInternal(data || {});
};

/**
 * Fetch set cards by provided URI
 * @param {string} query - The URI to fetch set cards from
 * @returns {Promise<ScryfallCard[]>} - Array of set cards
 */
export const fetchSetCards = async (query: string) => {
  const response = await fetch(
    `${SCRYFALL_BASE_URL}/cards/search?q=e%3A${encodeURIComponent(query)}&include_extras=true&include_variations=true&unique=prints`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch set cards");
  }

  const data = await response.json();
  const mappedData = data.data.map((card: any) =>
    mapScryfallCardToInternal(card),
  );
  return mappedData;
};
