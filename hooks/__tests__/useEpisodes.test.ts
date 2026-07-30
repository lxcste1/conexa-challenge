import { renderHook, waitFor } from "@testing-library/react";
import { useEpisodes } from "../useEpisodes";

const mockEpisode = {
  id: 1,
  name: "Pilot",
  episode: "S01E01",
  air_date: "December 2, 2013",
  characters: [],
  url: "https://rickandmortyapi.com/api/episode/1",
  created: "2017-11-10T12:56:33.798Z",
};

beforeEach(() => {
  jest.restoreAllMocks();
});

function mockFetch(data: unknown) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(data),
  });
}

describe("useEpisodes", () => {
  it("returns empty array and isLoading false for empty ids", () => {
    const { result } = renderHook(() => useEpisodes([]));
    expect(result.current.episodes).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it("fetches and normalizes single episode to array", async () => {
    mockFetch(mockEpisode);

    const { result } = renderHook(() => useEpisodes([1]));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.episodes).toHaveLength(1);
    expect(result.current.episodes[0].id).toBe(1);
  });

  it("fetches and returns multiple episodes", async () => {
    mockFetch([mockEpisode, { ...mockEpisode, id: 2 }]);

    const { result } = renderHook(() => useEpisodes([1, 2]));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.episodes).toHaveLength(2);
  });

  it("handles fetch error", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn(),
    });

    const { result } = renderHook(() => useEpisodes([1]));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
  });
});
