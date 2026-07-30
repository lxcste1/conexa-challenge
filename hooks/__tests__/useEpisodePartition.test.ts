import { renderHook } from "@testing-library/react";
import { useEpisodePartition } from "../useEpisodePartition";
import type { Character } from "@/types/character";

function makeCharacter(
  id: number,
  episodeIds: number[],
): Character {
  return {
    id,
    name: `Character ${id}`,
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    image: "",
    origin: { name: "", url: "" },
    location: { name: "", url: "" },
    episode: episodeIds.map((eid) => `https://rickandmortyapi.com/api/episode/${eid}`),
    url: "",
    created: "",
  };
}

describe("useEpisodePartition", () => {
  it("returns all empty when both characters are null", () => {
    const { result } = renderHook(() => useEpisodePartition(null, null));
    expect(result.current.onlyFirstIds).toEqual([]);
    expect(result.current.sharedIds).toEqual([]);
    expect(result.current.onlySecondIds).toEqual([]);
  });

  it("puts all episodes in onlyFirstIds when second is null", () => {
    const char1 = makeCharacter(1, [1, 2, 3]);
    const { result } = renderHook(() => useEpisodePartition(char1, null));
    expect(result.current.onlyFirstIds).toEqual([1, 2, 3]);
    expect(result.current.sharedIds).toEqual([]);
    expect(result.current.onlySecondIds).toEqual([]);
  });

  it("splits overlapping episodes correctly", () => {
    const char1 = makeCharacter(1, [1, 2, 3]);
    const char2 = makeCharacter(2, [2, 3, 4]);
    const { result } = renderHook(() => useEpisodePartition(char1, char2));
    expect(result.current.onlyFirstIds).toEqual([1]);
    expect(result.current.sharedIds).toEqual([2, 3]);
    expect(result.current.onlySecondIds).toEqual([4]);
  });

  it("returns no shared when characters have no overlap", () => {
    const char1 = makeCharacter(1, [1, 2]);
    const char2 = makeCharacter(2, [3, 4]);
    const { result } = renderHook(() => useEpisodePartition(char1, char2));
    expect(result.current.onlyFirstIds).toEqual([1, 2]);
    expect(result.current.sharedIds).toEqual([]);
    expect(result.current.onlySecondIds).toEqual([3, 4]);
  });

  it("sorts results ascending", () => {
    const char1 = makeCharacter(1, [5, 1, 3]);
    const char2 = makeCharacter(2, [4, 2]);
    const { result } = renderHook(() => useEpisodePartition(char1, char2));
    expect(result.current.onlyFirstIds).toEqual([1, 3, 5]);
  });
});
