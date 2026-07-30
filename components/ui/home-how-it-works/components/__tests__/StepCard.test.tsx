import { render, screen } from "@testing-library/react";
import { StepCard } from "../StepCard";

describe("StepCard", () => {
  const defaultProps = {
    number: "01",
    title: "Select Character #1",
    description: "Search and pick from the first column.",
  };

  it("renders the number", () => {
    render(<StepCard {...defaultProps} />);
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<StepCard {...defaultProps} />);
    expect(screen.getByText("Select Character #1")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<StepCard {...defaultProps} />);
    expect(screen.getByText("Search and pick from the first column.")).toBeInTheDocument();
  });

  it("renders as an li element", () => {
    const { container } = render(<StepCard {...defaultProps} />);
    expect(container.querySelector("li")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<StepCard {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
