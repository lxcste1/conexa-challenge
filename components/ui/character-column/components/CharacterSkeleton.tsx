import { Skeleton } from "@/components/ui/skeleton/Skeleton";

interface CharacterSkeletonProps {
  count?: number;
}

export function CharacterSkeleton({ count = 5 }: CharacterSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-xl border border-border p-1.5 sm:gap-3 sm:p-2.5"
        >
          <Skeleton className="size-12 rounded-lg sm:size-20" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </>
  );
}
