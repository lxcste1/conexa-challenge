"use client";

import { useState, useCallback } from "react";
import { useEpisodePartition } from "@/hooks/useEpisodePartition";
import type { Character } from "@/types/character";

export function useExplorer() {
  const [first, setFirst] = useState<Character | null>(null);
  const [second, setSecond] = useState<Character | null>(null);

  const bothSelected = Boolean(first && second);
  const { onlyFirstIds, sharedIds, onlySecondIds } = useEpisodePartition(
    first,
    second,
  );

  const handleSelectFirst = useCallback((character: Character | null) => {
    setFirst(character);
  }, []);

  const handleSelectSecond = useCallback((character: Character | null) => {
    setSecond(character);
  }, []);

  return {
    first,
    second,
    onlyFirstIds,
    sharedIds,
    onlySecondIds,
    bothSelected,
    handleSelectFirst,
    handleSelectSecond,
  };
}
