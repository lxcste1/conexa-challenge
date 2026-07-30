"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { charactersUrl, fetcher } from "@/utils/api";
import type { Character } from "@/types/character";
import type { ApiInfo } from "@/types/api";

const PER_PAGE = 10;

interface UseCharacterColumnOptions {
  initialCharacters?: Character[];
  initialInfo?: ApiInfo;
}

export function useCharacterColumn({
  initialCharacters,
  initialInfo,
}: UseCharacterColumnOptions = {}) {
  const [clientPage, setClientPage] = useState(1);
  const [allFetched, setAllFetched] = useState<Character[]>(
    initialCharacters ?? [],
  );
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(initialInfo ?? null);
  const [isLoading, setIsLoading] = useState(!initialCharacters);
  const [error, setError] = useState<Error | null>(null);
  const initialLoadedRef = useRef(Boolean(initialCharacters));

  const apiPage = Math.ceil((clientPage * PER_PAGE) / 20) || 1;

  useEffect(() => {
    if (apiPage === 1 && initialLoadedRef.current) {
      initialLoadedRef.current = false;
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    fetcher<{ info: ApiInfo; results: Character[] }>(charactersUrl(apiPage))
      .then((data) => {
        if (!cancelled) {
          setAllFetched(data.results);
          setApiInfo(data.info);
          setIsLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          const status = (err as Error & { status?: number }).status;
          if (status === 404) {
            setAllFetched([]);
            setIsLoading(false);
          } else {
            setError(err);
            setIsLoading(false);
          }
        }
      });

    return () => {
      cancelled = true;
    };
  }, [apiPage]);

  const characters = useMemo(() => {
    const start = ((clientPage - 1) * PER_PAGE) % 20;
    return allFetched.slice(start, start + PER_PAGE);
  }, [allFetched, clientPage]);

  const totalClientPages = apiInfo?.pages
    ? Math.ceil((apiInfo.pages * 20) / PER_PAGE)
    : undefined;

  const hasPrev = clientPage > 1;
  const hasNext = totalClientPages ? clientPage < totalClientPages : Boolean(apiInfo?.next);

  const info: ApiInfo | null = apiInfo
    ? {
        ...apiInfo,
        pages: totalClientPages ?? apiInfo.pages,
        prev: hasPrev ? "prev" : null,
        next: hasNext ? "next" : null,
      }
    : null;

  return {
    characters,
    info,
    isLoading,
    error,
    page: clientPage,
    setPage: setClientPage,
  };
}
