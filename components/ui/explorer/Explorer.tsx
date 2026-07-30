"use client";

import { useExplorer } from "@/hooks/useExplorer";
import { CharacterColumn } from "@/components/ui/character-column/CharacterColumn";
import { EpisodeSection } from "@/components/ui/episode-section/EpisodeSection";
import { SummaryChip } from "./components/SummaryChip";
import { EmptyGate } from "./components/EmptyGate";
import type { ExplorerProps } from "@/types/explorer";

export function Explorer({ initialCharacters, initialInfo }: ExplorerProps) {
  const {
    first,
    second,
    onlyFirstIds,
    sharedIds,
    onlySecondIds,
    bothSelected,
    handleSelectFirst,
    handleSelectSecond,
  } = useExplorer();

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <SummaryChip
          character={first}
          accent="primary"
          placeholder="Pick Character #1"
        />
        <SummaryChip
          character={second}
          accent="accent"
          placeholder="Pick Character #2"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <CharacterColumn
          title="Character #1"
          label="Selection 01"
          accent="primary"
          selected={first}
          disabledId={second?.id}
          onSelect={handleSelectFirst}
          initialCharacters={initialCharacters}
          initialInfo={initialInfo}
        />
        <CharacterColumn
          title="Character #2"
          label="Selection 02"
          accent="accent"
          selected={second}
          disabledId={first?.id}
          onSelect={handleSelectSecond}
        />
      </div>

      {bothSelected ? (
        <div className="grid gap-4 lg:grid-cols-3">
          <EpisodeSection
            title={`${first!.name} — Only Episodes`}
            subtitle="Episodes with Character #1 only"
            accent="primary"
            episodeIds={onlyFirstIds}
          />
          <EpisodeSection
            title="Shared Episodes"
            subtitle="Character #1 & Character #2 together"
            accent="shared"
            episodeIds={sharedIds}
          />
          <EpisodeSection
            title={`${second!.name} — Only Episodes`}
            subtitle="Episodes with Character #2 only"
            accent="accent"
            episodeIds={onlySecondIds}
          />
        </div>
      ) : (
        <EmptyGate first={first} second={second} />
      )}
    </div>
  );
}
