"use client";

import { useMemo } from "react";
import { episodeIdsFromUrls } from "@/utils/api";
import type { Character } from "@/types/character";

export interface EpisodePartition {
  onlyFirstIds: number[];
  sharedIds: number[];
  onlySecondIds: number[];
}

export function useEpisodePartition(
  first: Character | null,
  second: Character | null,
): EpisodePartition {
  return useMemo(() => {
    const firstIds = new Set(first ? episodeIdsFromUrls(first.episode) : []);
    const secondIds = new Set(
      second ? episodeIdsFromUrls(second.episode) : [],
    );

    const onlyFirstIds: number[] = [];
    const sharedIds: number[] = [];
    const onlySecondIds: number[] = [];

    firstIds.forEach((id) => {
      if (secondIds.has(id)) sharedIds.push(id);
      else onlyFirstIds.push(id);
    });
    secondIds.forEach((id) => {
      if (!firstIds.has(id)) onlySecondIds.push(id);
    });

    const asc = (a: number, b: number) => a - b;
    return {
      onlyFirstIds: onlyFirstIds.sort(asc),
      sharedIds: sharedIds.sort(asc),
      onlySecondIds: onlySecondIds.sort(asc),
    };
  }, [first, second]);
}
