import type { Character } from "@/types/character";
import type { Episode } from "@/types/episode";
import type { PaginatedResponse } from "@/types/api";

const BASE_URL = "https://rickandmortyapi.com/api";
const REVALIDATE = 86400;

async function fetchFromAPI<T>(url: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: REVALIDATE } });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchCharacters(
  page: number,
): Promise<PaginatedResponse<Character>> {
  return fetchFromAPI<PaginatedResponse<Character>>(
    `${BASE_URL}/character?page=${page}`,
  );
}

export async function fetchCharacter(id: number): Promise<Character> {
  return fetchFromAPI<Character>(`${BASE_URL}/character/${id}`);
}

export async function fetchEpisodes(ids: number[]): Promise<Episode[]> {
  const data = await fetchFromAPI<Episode | Episode[]>(
    `${BASE_URL}/episode/${ids.join(",")}`,
  );
  return Array.isArray(data) ? data : [data];
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error(
      `API request failed: ${res.status}`,
    ) as Error & { status?: number };
    error.status = res.status;
    throw error;
  }
  return res.json() as Promise<T>;
};

export const charactersUrl = (page = 1, name = ""): string => {
  const params = new URLSearchParams({ page: String(page) });
  if (name.trim()) params.set("name", name.trim());
  return `${BASE_URL}/character/?${params.toString()}`;
};

export const episodeIdsFromUrls = (urls: string[]): number[] =>
  urls
    .map((url) => Number(url.split("/").pop()))
    .filter((id) => Number.isFinite(id));

export const episodesUrl = (ids: number[]): string | null => {
  if (ids.length === 0) return null;
  return `${BASE_URL}/episode/${ids.join(",")}`;
};
