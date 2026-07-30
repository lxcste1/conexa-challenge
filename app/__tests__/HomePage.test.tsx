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
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the hero section heading", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", {
        name: /Compare any two Rick and Morty characters/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("renders the features section", () => {
    render(<HomePage />);
    expect(screen.getByText("Dual selection")).toBeInTheDocument();
    expect(screen.getByText("Solo & shared episodes")).toBeInTheDocument();
    expect(screen.getByText("Live from the API")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    render(<HomePage />);
    expect(
      screen.getByText("Three steps to the answer"),
    ).toBeInTheDocument();
  });

  it("renders as a main element", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector("main")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<HomePage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
