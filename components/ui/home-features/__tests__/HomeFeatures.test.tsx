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
import { HomeFeatures } from "../HomeFeatures";

describe("HomeFeatures", () => {
  it("renders three feature cards", () => {
    const { container } = render(<HomeFeatures />);
    const articles = container.querySelectorAll("article");
    expect(articles).toHaveLength(3);
  });

  it("renders the Dual selection card", () => {
    render(<HomeFeatures />);
    expect(screen.getByText("Dual selection")).toBeInTheDocument();
  });

  it("renders the Solo & shared episodes card", () => {
    render(<HomeFeatures />);
    expect(screen.getByText("Solo & shared episodes")).toBeInTheDocument();
  });

  it("renders the Live from the API card", () => {
    render(<HomeFeatures />);
    expect(screen.getByText("Live from the API")).toBeInTheDocument();
  });

  it("renders as a section element", () => {
    const { container } = render(<HomeFeatures />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<HomeFeatures />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
