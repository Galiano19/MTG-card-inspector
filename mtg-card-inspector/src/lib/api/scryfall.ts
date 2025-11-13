import { ScryfallCard } from "@/types/scryfall";

const SCRYFALL_BASE_URL = "https://api.scryfall.com";

export class ScryfallError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ScryfallError";
  }
}

async function fetchFromScryfall<T>(endpoint: string): Promise<T> {
  const url = `${SCRYFALL_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ScryfallError(
        errorData.details || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.code
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ScryfallError) {
      throw error;
    }
    throw new ScryfallError(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

export async function fetchCardByName(
  cardName: string,
  includeVariations: boolean = true
): Promise<ScryfallCard> {
  const params = new URLSearchParams({
    fuzzy: cardName,
    ...(includeVariations && { include_variations: "true" }),
  });

  return fetchFromScryfall<ScryfallCard>(`/cards/named?${params}`);
}
