"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { accentRing, accentBadge } from "@/utils/accent-variants";
import { StatusDot } from "@/components/ui/status-dot/StatusDot";
import type { CharacterCardProps } from "@/types/character";

export function CharacterCard({
  character,
  selected,
  disabled,
  accent,
  onSelect,
}: CharacterCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => onSelect(character)}
      className={cn(
        "group relative flex w-full items-center gap-2 rounded-xl border border-border bg-card p-1.5 text-left transition-all sm:gap-3 sm:p-2.5",
        "hover:border-foreground/25 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        selected && accentRing({ accent }),
      )}
    >
      <Image
        src={character.image || "/placeholder.svg"}
        alt={character.name}
        width={80}
        height={80}
        className="size-12 shrink-0 rounded-lg object-cover sm:size-20"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-xs font-semibold text-card-foreground sm:text-base">
          {character.name}
        </h3>
        <div className="mt-1">
          <StatusDot status={character.status} species={character.species} />
        </div>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {character.episode.length} episode
          {character.episode.length === 1 ? "" : "s"}
        </p>
      </div>
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all sm:size-6",
          selected
            ? cn(accentBadge({ accent }), "border-transparent")
            : "border-border text-transparent",
        )}
        aria-hidden="true"
      >
        <Check className="size-3 sm:size-3.5" strokeWidth={3} />
      </span>
    </button>
  );
}
