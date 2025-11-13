import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useCardQuery } from "../use-card-query";
import * as scryfallApi from "@/lib/api/scryfall";
import { mockCardData } from "./mockCardData";

jest.mock("@/lib/api/scryfall");
const mockedScryfallApi = scryfallApi as jest.Mocked<typeof scryfallApi>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useCardQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch card data successfully", async () => {
    mockedScryfallApi.fetchCardByName.mockResolvedValue(mockCardData);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useCardQuery("Lightning Bolt", true), {
      wrapper,
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCardData);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBe(null);
    expect(mockedScryfallApi.fetchCardByName).toHaveBeenCalledWith(
      "Lightning Bolt",
      true
    );
  });

  it("should handle API errors", async () => {
    const mockError = new scryfallApi.ScryfallError("Card not found", 404);
    mockedScryfallApi.fetchCardByName.mockRejectedValue(mockError);

    const wrapper = createWrapper();
    const { result } = renderHook(
      () => useCardQuery("Nonexistent Card", true),
      { wrapper }
    );

    await waitFor(() => {
      expect(mockedScryfallApi.fetchCardByName).toHaveBeenCalled();
    });

    await waitFor(
      () => {
        expect(result.current.isPending).toBe(false);
      },
      { timeout: 5000 }
    );

    expect(result.current.isError).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should not fetch when card name is empty", async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useCardQuery("", true), { wrapper });

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current.fetchStatus).toBe("idle");
    expect(result.current.data).toBeUndefined();
    expect(mockedScryfallApi.fetchCardByName).not.toHaveBeenCalled();
  });

  it("should not fetch when card name is only whitespace", async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useCardQuery("   ", true), { wrapper });

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current.fetchStatus).toBe("idle");
    expect(result.current.data).toBeUndefined();
    expect(mockedScryfallApi.fetchCardByName).not.toHaveBeenCalled();
  });
});
