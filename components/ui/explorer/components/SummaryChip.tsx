"use client";

import { Users } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StatusDot } from "@/components/ui/status-dot/StatusDot";
import { accentBorder, accentDot } from "@/utils/accent-variants";
import type { SummaryChipProps } from "@/types/explorer";

export function SummaryChip({
  character,
  accent,
  placeholder,
}: SummaryChipProps) {
  if (!character) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-card/40 p-2 text-muted-foreground sm:gap-3 sm:p-3">
        <span className="flex size-8 items-center justify-center rounded-lg bg-muted sm:size-10">
          <Users className="size-4 sm:size-5" />
        </span>
        <span className="text-xs sm:text-sm">{placeholder}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border bg-card/70 p-2 sm:gap-3 sm:p-3",
        accentBorder({ accent: accent as "primary" | "accent" }),
      )}
    >
      <span className="relative">
        <Image
          src={character.image || "/placeholder.svg"}
          alt={character.name}
          width={40}
          height={40}
          className="size-8 rounded-lg object-cover sm:size-10"
        />
        <span
          className={cn(
            "absolute -right-1 -top-1 size-2.5 rounded-full ring-2 ring-card sm:size-3",
            accentDot({ accent: accent as "primary" | "accent" }),
          )}
          aria-hidden="true"
        />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-card-foreground sm:text-sm">
          {character.name}
        </p>
        <StatusDot
          status={character.status}
          species={character.species}
          className="mt-0.5"
        />
      </div>
    </div>
  );
}
