import * as scryfallApi from "../scryfallApi";

describe("fetchSimilarCardsIds", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns ids from top-level similar array", async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ similar: [{ id: "a" }, { id: "b" }] }),
    });

    const result = await scryfallApi.fetchSimilarCardsIds("foo");
    expect(result).toEqual(["a", "b"]);
    expect((global as any).fetch).toHaveBeenCalled();
  });

  it("returns ids from data.similar shape", async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { similar: [{ id: "x" }] } }),
    });

    const result = await scryfallApi.fetchSimilarCardsIds("bar");
    expect(result).toEqual(["x"]);
  });

  it("returns empty array if similar is not an array", async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ similar: { not: "an-array" } }),
    });

    const result = await scryfallApi.fetchSimilarCardsIds("baz");
    expect(result).toEqual([]);
  });

  it("throws when response not ok", async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ details: "not found" }),
    });

    await expect(scryfallApi.fetchSimilarCardsIds("qux")).rejects.toThrow(
      "Failed to fetch similar cards",
    );
  });

  it("returns [] when called with empty query", async () => {
    const result = await scryfallApi.fetchSimilarCardsIds("");
    expect(result).toEqual([]);
  });
});

describe("fetchSimilarCardsContent", () => {
  beforeEach(() => jest.resetAllMocks());

  it("fetches card content for each id by calling Scryfall endpoints", async () => {
    // Mock fetch to respond to Scryfall card, rulings and EDHREC requests
    (global as any).fetch = jest.fn().mockImplementation((url: string) => {
      if (url.includes("/cards/")) {
        const id = url.split("/").pop();
        return Promise.resolve({
          ok: true,
          json: async () => ({
            id,
            name: `Card ${id}`,
            rulings_uri: `https://rulings/${id}`,
          }),
        });
      }
      if (url.includes("rulings")) {
        return Promise.resolve({ ok: true, json: async () => ({ data: [] }) });
      }
      if (url.includes("json.edhrec.com")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ similar: [] }),
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });

    const result = await scryfallApi.fetchSimilarCardsContent(["one", "two"]);

    expect((global as any).fetch).toHaveBeenCalled();
    expect(result.length).toBe(2);
    expect(result[0].id).toBe("one");
    expect(result[1].id).toBe("two");
  });

  it("returns [] for empty ids array", async () => {
    const result = await scryfallApi.fetchSimilarCardsContent([]);
    expect(result).toEqual([]);
  });
});
