jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.ComponentProps<"img"> & { width?: number; height?: number },
  ) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("lucide-react", () => {
  return new Proxy(
    {},
    {
      get() {
        return () => <span data-testid="icon" />;
      },
    },
  );
});

import { render, screen } from "@testing-library/react";
import { HomeHero } from "../HomeHero";

describe("HomeHero", () => {
  it("renders the badge text", () => {
    render(<HomeHero />);
    expect(
      screen.getByText("Multiverse Episode Explorer"),
    ).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(<HomeHero />);
    expect(
      screen.getByRole("heading", {
        name: /Compare any two Rick and Morty characters/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<HomeHero />);
    expect(
      screen.getByText(/Pick two characters and see exactly which episodes/),
    ).toBeInTheDocument();
  });

  it("renders CTA link to /explorer", () => {
    render(<HomeHero />);
    const links = screen.getAllByRole("link");
    const cta = links.find((link) => link.getAttribute("href") === "/explorer");
    expect(cta).toBeInTheDocument();
  });

  it("renders as a section element", () => {
    const { container } = render(<HomeHero />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<HomeHero />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
