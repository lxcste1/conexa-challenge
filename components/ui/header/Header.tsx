import Link from "next/link";
import { Atom } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Atom className="size-5" />
          </span>
          <span className="font-display text-base leading-none text-foreground">
            Portal<span className="text-primary">Dex</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="rounded-lg px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/explorer"
            className="rounded-lg px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            Explorer
          </Link>
        </nav>
      </div>
    </header>
  );
}
