"use client";

import { Sparkles } from "lucide-react";
import type { EmptyGateProps } from "@/types/explorer";

export function EmptyGate({ first, second }: EmptyGateProps) {
  const remaining = [!first && "Character #1", !second && "Character #2"].filter(
    Boolean,
  );

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card/30 px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles className="size-7" />
      </span>
      <h3 className="font-display text-lg text-foreground">Episodes locked</h3>
      <p className="max-w-sm text-pretty text-sm text-muted-foreground">
        Select a character in {remaining.join(" and ")} to reveal the solo and
        shared episode breakdown across the multiverse.
      </p>
    </div>
  );
}
