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
import { FeatureCard } from "../FeatureCard";
import { Users } from "lucide-react";

describe("FeatureCard", () => {
  const defaultProps = {
    icon: Users,
    title: "Dual selection",
    description: "Browse the full paginated roster.",
  };

  it("renders the title", () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByText("Dual selection")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByText("Browse the full paginated roster.")).toBeInTheDocument();
  });

  it("renders the title as an h3", () => {
    render(<FeatureCard {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: "Dual selection", level: 3 }),
    ).toBeInTheDocument();
  });

  it("uses article element", () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    expect(container.querySelector("article")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
