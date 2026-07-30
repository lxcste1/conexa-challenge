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
import { HomeHowItWorks } from "../HomeHowItWorks";

describe("HomeHowItWorks", () => {
  it("renders the section heading", () => {
    render(<HomeHowItWorks />);
    expect(
      screen.getByText("Three steps to the answer"),
    ).toBeInTheDocument();
  });

  it("renders three step cards", () => {
    const { container } = render(<HomeHowItWorks />);
    const items = container.querySelectorAll("li");
    expect(items).toHaveLength(3);
  });

  it("renders step 01 title", () => {
    render(<HomeHowItWorks />);
    expect(screen.getByText("Select Character #1")).toBeInTheDocument();
  });

  it("renders step 03 title", () => {
    render(<HomeHowItWorks />);
    expect(screen.getByText("Reveal the episodes")).toBeInTheDocument();
  });

  it("renders CTA link to /explorer", () => {
    render(<HomeHowItWorks />);
    const links = screen.getAllByRole("link");
    const cta = links.find((link) => link.getAttribute("href") === "/explorer");
    expect(cta).toBeInTheDocument();
  });

  it("renders as a section element", () => {
    const { container } = render(<HomeHowItWorks />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<HomeHowItWorks />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
