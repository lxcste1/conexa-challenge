"use client";

import { Tv, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentBar, accentCount } from "@/utils/accent-variants";
import { useEpisodes } from "@/hooks/useEpisodes";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { EpisodeCard } from "@/components/ui/episode-card/EpisodeCard";
import type { EpisodeSectionProps } from "@/types/episode";

export function EpisodeSection({
  title,
  subtitle,
  accent,
  episodeIds,
}: EpisodeSectionProps) {
  const { episodes, isLoading } = useEpisodes(episodeIds);

  return (
    <section
      aria-label={title}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur"
    >
      <header className="flex items-start gap-2 border-b border-border p-3 sm:gap-3 sm:p-4">
        <span
          className={cn(
            "mt-0.5 h-7 w-1 rounded-full sm:h-9",
            accentBar({ accent }),
          )}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-xs font-semibold leading-tight text-card-foreground sm:text-sm">
            {title}
          </h3>
          <p className="mt-0.5 text-[0.65rem] text-muted-foreground sm:text-xs">
            {subtitle}
          </p>
        </div>
        <span
          className={cn(
            "flex items-center gap-1 rounded-full bg-background/60 px-2 py-0.5 text-xs font-semibold",
            accentCount({ accent }),
          )}
        >
          <Tv className="size-3" />
          {episodeIds.length}
        </span>
      </header>

      <div className="flex-1 space-y-1.5 overflow-y-auto p-2 max-h-104 sm:space-y-2 sm:p-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))
        ) : episodeIds.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <Loader2 className="size-5 opacity-50" />
            <p className="text-sm text-balance">
              No episodes in this category.
            </p>
          </div>
        ) : (
          episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))
        )}
      </div>
    </section>
  );
}
