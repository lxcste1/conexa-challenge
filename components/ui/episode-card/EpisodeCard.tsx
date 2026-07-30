import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge/Badge";
import type { EpisodeCardProps } from "@/types/episode";

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <article className="flex items-center gap-2 rounded-xl border border-border bg-card/70 p-2 transition-colors hover:border-foreground/20 sm:gap-3 sm:p-3">
      <Badge variant="outline" className="shrink-0 font-mono">
        {episode.episode}
      </Badge>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-xs font-medium text-card-foreground sm:text-sm">
          {episode.name}
        </h4>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays className="size-3" />
          {episode.air_date}
        </p>
      </div>
    </article>
  );
}
