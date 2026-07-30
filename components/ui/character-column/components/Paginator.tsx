"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button/Button";

interface PaginatorProps {
  page: number;
  totalPages?: number;
  hasPrev: boolean;
  hasNext: boolean;
  isLoading: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function Paginator({
  page,
  totalPages,
  hasPrev,
  hasNext,
  isLoading,
  onPrev,
  onNext,
}: PaginatorProps) {
  return (
    <footer className="flex items-center justify-between gap-1 border-t border-border p-2 sm:gap-2 sm:p-3">
      <Button
        type="button"
        variant="outline"
        size="icon-xs"
        disabled={!hasPrev || isLoading}
        onClick={onPrev}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-3 sm:size-4" />
      </Button>
      <span className="text-[0.65rem] text-muted-foreground sm:text-xs">
        {page}
        {totalPages ? <span className="hidden sm:inline"> / {totalPages}</span> : ""}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon-xs"
        disabled={!hasNext || isLoading}
        onClick={onNext}
        aria-label="Next page"
      >
        <ChevronRight className="size-3 sm:size-4" />
      </Button>
    </footer>
  );
}
