"use client";

import { useState, useEffect, useMemo } from "react";
import { episodesUrl, fetcher } from "@/utils/api";
import type { Episode } from "@/types/episode";

export function useEpisodes(ids: number[]) {
  const key = episodesUrl(ids);
  const [data, setData] = useState<Episode | Episode[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(key));

  useEffect(() => {
    if (!key) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    fetcher<Episode | Episode[]>(key)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  const episodes = useMemo<Episode[]>(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }, [data]);

  return { episodes, isLoading, error };
}
