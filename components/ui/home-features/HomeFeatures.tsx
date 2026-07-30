import { FEATURES } from "./home-features-data";
import { FeatureCard } from "./components/FeatureCard";

export function HomeFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
