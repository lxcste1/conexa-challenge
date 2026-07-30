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
  return fetchFromAPI<Episode[]>(`${BASE_URL}/episode/${ids.join(",")}`);
}
