import { fetchCardByName, ScryfallError } from "../scryfall";
import { mockCardData } from "./mockCardData";

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe("Scryfall API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchCardByName", () => {
    it("should fetch a card successfully with default parameters", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockCardData),
      };
      mockFetch.mockResolvedValue(mockResponse as unknown as Response);

      const result = await fetchCardByName("Lightning Bolt");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.scryfall.com/cards/named?fuzzy=Lightning+Bolt&include_variations=true"
      );
      expect(result).toEqual(mockCardData);
    });

    it("should fetch a card with include_variations=false", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockCardData),
      };
      mockFetch.mockResolvedValue(mockResponse as unknown as Response);

      await fetchCardByName("Lightning Bolt", false);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.scryfall.com/cards/named?fuzzy=Lightning+Bolt"
      );
    });

    it("should handle special characters in card names", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockCardData),
      };
      mockFetch.mockResolvedValue(mockResponse as unknown as Response);

      await fetchCardByName("Jace, the Mind Sculptor");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.scryfall.com/cards/named?fuzzy=Jace%2C+the+Mind+Sculptor&include_variations=true"
      );
    });

    it("should throw ScryfallError on HTTP error response", async () => {
      const mockErrorResponse = {
        ok: false,
        status: 404,
        statusText: "Not Found",
        json: jest.fn().mockResolvedValue({
          details: "No card found",
          code: "not_found",
        }),
      };
      mockFetch.mockResolvedValue(mockErrorResponse as unknown as Response);

      await expect(fetchCardByName("Nonexistent Card")).rejects.toThrow(
        ScryfallError
      );
      await expect(fetchCardByName("Nonexistent Card")).rejects.toThrow(
        "No card found"
      );

      try {
        await fetchCardByName("Nonexistent Card");
      } catch (error) {
        expect(error).toBeInstanceOf(ScryfallError);
        expect((error as ScryfallError).status).toBe(404);
        expect((error as ScryfallError).code).toBe("not_found");
      }
    });

    it("should throw ScryfallError on network error", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      await expect(fetchCardByName("Test Card")).rejects.toThrow(ScryfallError);
      await expect(fetchCardByName("Test Card")).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("ScryfallError", () => {
    it("should create error with message only", () => {
      const error = new ScryfallError("Test error");

      expect(error.name).toBe("ScryfallError");
      expect(error.message).toBe("Test error");
      expect(error.status).toBeUndefined();
      expect(error.code).toBeUndefined();
    });

    it("should create error with message, status, and code", () => {
      const error = new ScryfallError("Test error", 404, "not_found");

      expect(error.name).toBe("ScryfallError");
      expect(error.message).toBe("Test error");
      expect(error.status).toBe(404);
      expect(error.code).toBe("not_found");
    });
  });
});
