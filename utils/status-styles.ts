import type { CharacterStatus } from "@/types/character";

export const STATUS_STYLES: Record<
  CharacterStatus,
  { dot: string; label: string }
> = {
  Alive: {
    dot: "bg-status-alive shadow-[0_0_8px_var(--status-alive)]",
    label: "Alive",
  },
  Dead: {
    dot: "bg-status-dead shadow-[0_0_8px_var(--status-dead)]",
    label: "Dead",
  },
  unknown: { dot: "bg-status-unknown", label: "Unknown" },
};
