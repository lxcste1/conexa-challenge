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
import { Header } from "../Header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders the brand name PortalDex", () => {
    expect(screen.getByRole("link", { name: /Portal Dex/i })).toBeInTheDocument();
  });

  it("renders a Home link pointing to /", () => {
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders an Explorer link pointing to /explorer", () => {
    const explorerLink = screen.getByText("Explorer").closest("a");
    expect(explorerLink).toHaveAttribute("href", "/explorer");
  });

  it("matches snapshot", () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
