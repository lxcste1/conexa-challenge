import type { Metadata } from "next";
import { HomeHero } from "@/components/ui/home-hero/HomeHero";
import { HomeFeatures } from "@/components/ui/home-features/HomeFeatures";
import { HomeHowItWorks } from "@/components/ui/home-how-it-works/HomeHowItWorks";

export const metadata: Metadata = {
  title: "Rick & Morty | Character Episode Explorer",
  description:
    "Compare two Rick and Morty characters and discover their solo and shared episodes across the multiverse.",
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeFeatures />
      <HomeHowItWorks />
    </main>
  );
}
