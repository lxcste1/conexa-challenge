import { cva } from "class-variance-authority";

export type Accent = "primary" | "accent" | "shared";

export const accentText = cva("", {
  variants: {
    accent: {
      primary: "text-primary",
      accent: "text-accent",
      shared: "",
    },
  },
});

export const accentBar = cva("", {
  variants: {
    accent: {
      primary: "bg-primary",
      accent: "bg-accent",
      shared: "bg-gradient-to-b from-primary to-accent",
    },
  },
});

export const accentBorder = cva("", {
  variants: {
    accent: {
      primary: "border-primary/40",
      accent: "border-accent/40",
      shared: "",
    },
  },
});

export const accentDot = cva("", {
  variants: {
    accent: {
      primary: "bg-primary",
      accent: "bg-accent",
      shared: "",
    },
  },
});

export const accentCount = cva("", {
  variants: {
    accent: {
      primary: "text-primary",
      accent: "text-accent",
      shared: "text-foreground",
    },
  },
});

export const accentRing = cva("", {
  variants: {
    accent: {
      primary:
        "ring-primary border-primary/60 shadow-[0_0_0_1px_var(--primary),0_8px_30px_-12px_var(--primary)]",
      accent:
        "ring-accent border-accent/60 shadow-[0_0_0_1px_var(--accent),0_8px_30px_-12px_var(--accent)]",
      shared: "",
    },
  },
});

export const accentBadge = cva("", {
  variants: {
    accent: {
      primary: "bg-primary text-primary-foreground",
      accent: "bg-accent text-accent-foreground",
      shared: "",
    },
  },
});
