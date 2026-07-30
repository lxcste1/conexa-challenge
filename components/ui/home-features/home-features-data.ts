import { Users, Split, Tv } from "lucide-react";
import type { FeatureCardProps } from "@/types/home";

export const FEATURES: FeatureCardProps[] = [
  {
    icon: Users,
    title: "Dual selection",
    description:
      "Browse the full paginated roster and lock in Character #1 and Character #2 from independent columns.",
  },
  {
    icon: Split,
    title: "Solo & shared episodes",
    description:
      "Instantly split their appearances into three lists: each one solo, plus the episodes they share.",
  },
  {
    icon: Tv,
    title: "Live from the API",
    description:
      "Every character, status and episode is pulled straight from the official Rick and Morty API.",
  },
];
