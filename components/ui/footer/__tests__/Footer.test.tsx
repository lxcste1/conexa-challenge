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
    }
  );
});

import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("renders the brand name PortalDex", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: /Portal Dex/i })
    ).toBeInTheDocument();
  });

  it("renders GitHub social link", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: "GitHub repository" })
    ).toHaveAttribute("href", "https://github.com/lxcste1/conexa-challenge");
  });

  it("renders LinkedIn social link", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: "LinkedIn" })
    ).toHaveAttribute("href", "https://www.linkedin.com/in/tellolucas/");
  });

  it("renders Email social link", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: "Email" })
    ).toHaveAttribute("href", "mailto:lucastello97@gmail.com");
  });

  it("renders author credit with link", () => {
    render(<Footer />);
    expect(screen.getByText(/development by/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "@lxcste" })
    ).toHaveAttribute("href", "https://github.com/lxcste1");
  });

  it("matches snapshot", () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
