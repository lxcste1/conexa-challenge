import {
  fetchCharacters,
  fetchCharacter,
  fetchEpisodes,
  fetcher,
  charactersUrl,
  episodeIdsFromUrls,
  episodesUrl,
} from "@/utils/api";

const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive" as const,
  species: "Human",
  type: "",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  origin: { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1" },
  location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

const mockEpisode = {
  id: 1,
  name: "Pilot",
  episode: "S01E01",
  air_date: "December 2, 2013",
  characters: [
    "https://rickandmortyapi.com/api/character/1",
  ],
  url: "https://rickandmortyapi.com/api/episode/1",
  created: "2017-11-10T12:56:33.798Z",
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

  it("normalizes single episode response to array", async () => {
    mockFetch(mockEpisode);

    const result = await fetchEpisodes([1]);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("throws on non-OK response", async () => {
    mockFetch(null, false, 404, "Not Found");

    await expect(fetchEpisodes([1])).rejects.toThrow("API request failed: 404 Not Found");
  });
});

describe("fetcher", () => {
  it("returns parsed JSON on success", async () => {
    mockFetch(mockCharacter);

    const result = await fetcher<typeof mockCharacter>(
      "https://rickandmortyapi.com/api/character/1",
    );

    expect(result).toEqual(mockCharacter);
  });

  it("throws with status on non-OK response", async () => {
    mockFetch(null, false, 404, "Not Found");

    await expect(
      fetcher("https://rickandmortyapi.com/api/character/9999"),
    ).rejects.toThrow("API request failed: 404");
  });
});

describe("charactersUrl", () => {
  it("builds URL for page 1", () => {
    expect(charactersUrl(1)).toBe(
      "https://rickandmortyapi.com/api/character/?page=1",
    );
  });

  it("builds URL with name filter", () => {
    const url = charactersUrl(1, "rick");
    expect(url).toContain("page=1");
    expect(url).toContain("name=rick");
  });
});

describe("episodeIdsFromUrls", () => {
  it("extracts numeric IDs from episode URLs", () => {
    const urls = [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/25",
    ];
    expect(episodeIdsFromUrls(urls)).toEqual([1, 25]);
  });

  it("filters out invalid URLs", () => {
    expect(episodeIdsFromUrls([])).toEqual([]);
    expect(episodeIdsFromUrls(["invalid"])).toEqual([]);
  });
});

describe("episodesUrl", () => {
  it("builds URL for multiple IDs", () => {
    expect(episodesUrl([1, 2, 3])).toBe(
      "https://rickandmortyapi.com/api/episode/1,2,3",
    );
  });

  it("returns null for empty array", () => {
    expect(episodesUrl([])).toBeNull();
  });
});
