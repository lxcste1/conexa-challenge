jest.mock("@base-ui/react/button", () => ({
  Button: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"button">) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}));

import { render, screen } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("renders outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Outline");
  });

  it("renders size xs", () => {
    render(<Button size="xs">Small</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders icon button", () => {
    render(<Button size="icon-xs" aria-label="Close" />);
    expect(screen.getByLabelText("Close")).toBeInTheDocument();
  });

  it("applies disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<Button className="custom">Styled</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom");
  });

  it("matches snapshot", () => {
    const { container } = render(<Button variant="outline">Snapshot</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
