import type { FeatureCardProps } from "@/types/home";

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-colors hover:border-primary/40">
      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 font-display text-lg text-card-foreground">{title}</h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
