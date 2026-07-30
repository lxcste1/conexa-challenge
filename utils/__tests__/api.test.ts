import { fetchCharacters, fetchCharacter, fetchEpisodes } from "@/utils/api";

const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
};

const mockEpisode = {
  id: 1,
  name: "Pilot",
  episode: "S01E01",
  air_date: "December 2, 2013",
  characters: [
    "https://rickandmortyapi.com/api/character/1",
  ],
};

beforeEach(() => {
  jest.restoreAllMocks();
});

function mockFetch(response: unknown, ok = true, status = 200, statusText = "OK") {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    statusText,
    json: jest.fn().mockResolvedValue(response),
  });
}

describe("fetchCharacters", () => {
  it("returns paginated character data", async () => {
    const mockResponse = {
      info: { count: 2, pages: 1, next: null, prev: null },
      results: [mockCharacter],
    };
    mockFetch(mockResponse);

    const result = await fetchCharacters(1);

    expect(result).toEqual(mockResponse);
    expect(result.results).toHaveLength(1);
    expect(result.info.count).toBe(2);
  });

  it("calls the correct URL for page 1", async () => {
    const mockResponse = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
    mockFetch(mockResponse);

    await fetchCharacters(1);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character?page=1",
      expect.objectContaining({ next: { revalidate: 86400 } })
    );
  });

  it("throws on non-OK response", async () => {
    mockFetch(null, false, 404, "Not Found");

    await expect(fetchCharacters(1)).rejects.toThrow("API request failed: 404 Not Found");
  });
});

describe("fetchCharacter", () => {
  it("returns a single character", async () => {
    mockFetch(mockCharacter);

    const result = await fetchCharacter(1);

    expect(result).toEqual(mockCharacter);
    expect(result.id).toBe(1);
    expect(result.name).toBe("Rick Sanchez");
  });

  it("calls the correct URL", async () => {
    mockFetch(mockCharacter);

    await fetchCharacter(1);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character/1",
      expect.objectContaining({ next: { revalidate: 86400 } })
    );
  });

  it("throws on non-OK response", async () => {
    mockFetch(null, false, 404, "Not Found");

    await expect(fetchCharacter(1)).rejects.toThrow("API request failed: 404 Not Found");
  });
});

describe("fetchEpisodes", () => {
  it("returns array of episodes", async () => {
    mockFetch([mockEpisode, { ...mockEpisode, id: 2 }]);

    const result = await fetchEpisodes([1, 2]);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });

  it("calls the correct URL with comma-separated IDs", async () => {
    mockFetch([mockEpisode]);

    await fetchEpisodes([1, 2, 3]);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/episode/1,2,3",
      expect.objectContaining({ next: { revalidate: 86400 } })
    );
  });

  it("throws on non-OK response", async () => {
    mockFetch(null, false, 404, "Not Found");

    await expect(fetchEpisodes([1])).rejects.toThrow("API request failed: 404 Not Found");
  });
});
