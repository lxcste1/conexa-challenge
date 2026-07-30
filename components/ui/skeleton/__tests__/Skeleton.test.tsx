import { render } from "@testing-library/react";
import { Skeleton } from "../Skeleton";

describe("Skeleton", () => {
  it("renders with default classes", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
    expect(container.firstChild).toHaveClass("bg-muted");
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="h-16 w-full rounded-xl" />);
    expect(container.firstChild).toHaveClass("h-16");
    expect(container.firstChild).toHaveClass("rounded-xl");
  });

  it("matches snapshot", () => {
    const { container } = render(<Skeleton className="h-16 w-full rounded-xl" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
