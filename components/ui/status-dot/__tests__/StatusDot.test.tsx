import { render, screen } from "@testing-library/react";
import { StatusDot } from "../StatusDot";

describe("StatusDot", () => {
  it("renders Alive status with species", () => {
    render(<StatusDot status="Alive" species="Human" />);
    expect(screen.getByText(/Alive/)).toBeInTheDocument();
    expect(screen.getByText(/Human/)).toBeInTheDocument();
  });

  it("renders Dead status", () => {
    render(<StatusDot status="Dead" />);
    expect(screen.getByText("Dead")).toBeInTheDocument();
  });

  it("renders unknown status", () => {
    render(<StatusDot status="unknown" />);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("matches snapshot for Alive with species", () => {
    const { container } = render(<StatusDot status="Alive" species="Human" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
