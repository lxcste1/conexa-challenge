import type { ApiInfo } from "@/types/api";

export type CharacterStatus = "Alive" | "Dead" | "unknown";

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterCardProps {
  character: Character;
  selected: boolean;
  disabled?: boolean;
  accent: "primary" | "accent";
  onSelect: (character: Character) => void;
}

export interface CharacterColumnProps {
  title: string;
  label: string;
  accent: "primary" | "accent";
  selected: Character | null;
  disabledId?: number;
  onSelect: (character: Character | null) => void;
  initialCharacters?: Character[];
  initialInfo?: ApiInfo;
}

export interface StatusDotProps {
  status: CharacterStatus;
  species?: string;
  className?: string;
}

