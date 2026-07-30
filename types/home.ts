import type { LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StepCardProps {
  number: string;
  title: string;
  description: string;
}
