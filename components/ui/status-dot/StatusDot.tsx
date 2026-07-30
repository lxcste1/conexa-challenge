import { cn } from "@/lib/utils";
import { STATUS_STYLES } from "@/utils/status-styles";
import type { StatusDotProps } from "@/types/character";

export function StatusDot({ status, species, className }: StatusDotProps) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.unknown;

  return (
    <span
      className={cn("flex items-center gap-1.5 text-xs font-medium", className)}
    >
      <span
        className={cn("size-2 shrink-0 rounded-full", style.dot)}
        aria-hidden="true"
      />
      <span className="text-foreground">
        {style.label}
        {species ? (
          <span className="text-muted-foreground"> &middot; {species}</span>
        ) : null}
      </span>
    </span>
  );
}
