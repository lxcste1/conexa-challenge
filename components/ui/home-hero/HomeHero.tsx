import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button/button-styles";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/portal-glow.png"
        alt=""
        fill
        className="pointer-events-none object-cover opacity-40 -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-background/60 via-background/85 to-background"
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Layers className="size-3.5" />
          Multiverse Episode Explorer
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] text-foreground text-balance sm:text-6xl">
          Compare any two{" "}
          <span className="text-primary">Rick and Morty</span> characters
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
          Pick two characters and see exactly which episodes they starred in
          solo and which adventures they shared across the multiverse.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/explorer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "font-semibold",
            )}
          >
            Launch the Explorer
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
