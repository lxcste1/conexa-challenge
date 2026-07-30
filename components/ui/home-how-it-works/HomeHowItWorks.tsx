import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button/button-styles";
import { STEPS } from "./home-how-it-works-data";
import { StepCard } from "./components/StepCard";

export function HomeHowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur sm:p-10">
        <h2 className="text-center font-display text-2xl text-foreground text-balance">
          Three steps to the answer
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <Link
            href="/explorer"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "font-semibold",
            )}
          >
            Start exploring
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
