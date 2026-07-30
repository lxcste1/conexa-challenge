import type { StepCardProps } from "@/types/home";

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <li className="flex flex-col gap-2">
      <span className="font-display text-3xl text-primary/70">{number}</span>
      <h3 className="text-base font-semibold text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </li>
  );
}
