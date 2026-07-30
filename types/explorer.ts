import type { Character } from "@/types/character";

export interface ExplorerProps {
  initialCharacters: Character[];
  initialInfo: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export interface SelectionSummaryProps {
  first: Character | null;
  second: Character | null;
}

export interface SummaryChipProps {
  character: Character | null;
  accent: "primary" | "accent";
  placeholder: string;
}

export interface EmptyGateProps {
  first: Character | null;
  second: Character | null;
}
