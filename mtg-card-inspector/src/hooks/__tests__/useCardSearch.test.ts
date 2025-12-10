import {
  useCardSearch,
  useAutocomplete,
  useRelatedCards,
  cardQueryKeys,
} from "../useCardSearch";
import { useQuery } from "@tanstack/react-query";

import {
  fetchCardByName,
  fetchAutocompleteSuggestions,
  fetchRelatedCards,
  fetchCardById,
} from "../../services/scryfallApi";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("../../services/scryfallApi", () => ({
  fetchCardByName: jest.fn(),
  fetchAutocompleteSuggestions: jest.fn(),
  fetchRelatedCards: jest.fn(),
  fetchCardById: jest.fn(),
}));

describe("cardQueryKeys", () => {
  it(" generates correct key with name", () => {
    expect(cardQueryKeys.card({ name: "aCardName" })).toEqual([
      "cards",
      "card",
      "aCardName",
    ]);
  });

  it("generates correct key with id", () => {
    expect(cardQueryKeys.card({ id: "anId" })).toEqual([
      "cards",
      "card",
      "anId",
    ]);
  });

  it("generates correct key for autocomplete", () => {
    expect(cardQueryKeys.autocomplete("anAutocom")).toEqual([
      "cards",
      "autocomplete",
      "anAutocom",
    ]);
  });
});

describe("useCardSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("searches by name when input is a string", () => {
    useCardSearch("aCardName");

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["cards", "card", "aCardName"],
        enabled: true,
      })
    );

    const config = (useQuery as jest.Mock).mock.calls[0][0];
    config.queryFn();
    expect(fetchCardByName).toHaveBeenCalledWith("aCardName");
  });

  it("searches by name when input has name field", () => {
    useCardSearch({ name: "aCardName" });
    const config = (useQuery as jest.Mock).mock.calls[0][0];
    expect(config.queryKey).toEqual(["cards", "card", "aCardName"]);

    config.queryFn();
    expect(fetchCardByName).toHaveBeenCalledWith("aCardName");
  });

  it("searches by ID when input has id field", () => {
    useCardSearch({ id: "anId" });
    const config = (useQuery as jest.Mock).mock.calls[0][0];

    expect(config.queryKey).toEqual(["cards", "card", "anId"]);

    config.queryFn();
    expect(fetchCardById).toHaveBeenCalledWith("anId");
  });

  it("is disabled when empty string", () => {
    useCardSearch("");

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    );
  });

  it("is enabled when input is id", () => {
    useCardSearch({ id: "anId" });

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: true,
      })
    );
  });
});

describe("useAutocomplete", () => {
  beforeEach(() => jest.clearAllMocks());

  it("is disabled when query length < 2", () => {
    useAutocomplete("a");

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    );
  });

  it("calls fetchAutocompleteSuggestions when >= 2 chars", () => {
    useAutocomplete("AnAutocom");

    const config = (useQuery as jest.Mock).mock.calls[0][0];

    expect(config.queryKey).toEqual(["cards", "autocomplete", "AnAutocom"]);
    expect(config.enabled).toBe(true);

    config.queryFn();
    expect(fetchAutocompleteSuggestions).toHaveBeenCalledWith("AnAutocom");
  });
});

describe("useRelatedCards", () => {
  beforeEach(() => jest.clearAllMocks());

  it("is disabled when URI is empty", () => {
    useRelatedCards("");

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    );
  });

  it("calls fetchRelatedCards with correct URI", () => {
    useRelatedCards("http://anUri.com/related");

    const config = (useQuery as jest.Mock).mock.calls[0][0];

    expect(config.queryKey).toEqual([
      "cards",
      "card",
      "http://anUri.com/related",
    ]);

    config.queryFn();
    expect(fetchRelatedCards).toHaveBeenCalledWith("http://anUri.com/related");
  });
});
