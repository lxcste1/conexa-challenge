import Link from "next/link";
import { Atom } from "lucide-react";
import { SOCIALS } from "./components/items";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Atom className="size-5" />
          </span>
          <span className="font-display text-base leading-none text-foreground">
            Portal<span className="text-primary">Dex</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2" aria-label="Social links">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              aria-label={label}
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </nav>

        <p className="text-xs text-muted-foreground">
          development by{" "}
          <a
            href="https://github.com/lxcste1"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            @lxcste
          </a>
        </p>
      </div>
    </footer>
  );
}
