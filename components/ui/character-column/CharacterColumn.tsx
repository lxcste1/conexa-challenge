"use client";

import { cn } from "@/lib/utils";
import { accentText, accentBar } from "@/utils/accent-variants";
import { useCharacterColumn } from "@/hooks/useCharacterColumn";
import { CharacterCard } from "@/components/ui/character-card/CharacterCard";
import { Paginator } from "./components/Paginator";
import { CharacterSkeleton } from "./components/CharacterSkeleton";
import type { CharacterColumnProps } from "@/types/character";
import type { Character } from "@/types/character";

export function CharacterColumn({
  title,
  label,
  accent,
  selected,
  disabledId,
  onSelect,
  initialCharacters,
  initialInfo,
}: CharacterColumnProps) {
  const { characters, info, isLoading, page, setPage } = useCharacterColumn({
    initialCharacters,
    initialInfo,
  });

  return (
    <section
      aria-label={title}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur"
    >
      <header className="flex items-center gap-2 border-b border-border p-3 sm:gap-3 sm:p-4">
        <span
          className={cn(
            "h-6 w-1 rounded-full sm:h-8",
            accentBar({ accent: accent as "primary" | "accent" }),
          )}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              accentText({ accent: accent as "primary" | "accent" }),
            )}
          >
            {label}
          </p>
          <h2 className="truncate font-display text-base leading-tight text-card-foreground sm:text-lg">
            {title}
          </h2>
        </div>
      </header>

      <div className="flex-1 space-y-1.5 p-1.5 sm:space-y-2 sm:p-3">
        {isLoading ? (
          <CharacterSkeleton />
        ) : characters.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <p className="text-sm">No characters found.</p>
          </div>
        ) : (
          characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              accent={accent}
              selected={selected?.id === character.id}
              disabled={disabledId === character.id}
              onSelect={(c: Character) =>
                onSelect(selected?.id === c.id ? null : c)
              }
            />
          ))
        )}
      </div>

      <Paginator
        page={page}
        totalPages={info?.pages}
        hasPrev={Boolean(info?.prev)}
        hasNext={Boolean(info?.next)}
        isLoading={isLoading}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
      />
    </section>
  );
}
