import type { Metadata } from "next";
import { fetchCharacters } from "@/utils/api";
import { Explorer } from "@/components/ui/explorer/Explorer";

export const metadata: Metadata = {
  title: "Explorer | Rick & Morty Character Episodes",
  description:
    "Select Character #1 and Character #2 to compare their solo and shared episodes.",
};

export default async function ExplorerPage() {
  const data = await fetchCharacters(1);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Character Explorer
        </p>
        <h1 className="mt-1 font-display text-2xl leading-tight text-foreground sm:text-3xl text-balance">
          Compare characters across the multiverse
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
          Pick one character in each column. Once both are selected, we break
          down the episodes they appear in solo and the ones they share.
        </p>
      </div>
      <Explorer
        initialCharacters={data.results}
        initialInfo={data.info}
      />
    </main>
  );
}
