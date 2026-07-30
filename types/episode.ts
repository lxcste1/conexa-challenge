export interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodeCardProps {
  episode: Episode;
}

export interface EpisodeSectionProps {
  title: string;
  subtitle: string;
  accent: "primary" | "accent" | "shared";
  episodeIds: number[];
}
