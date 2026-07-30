import { render } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("renders default variant with children", () => {
    const { container } = render(<Badge>Status</Badge>);
    expect(container.firstChild).toHaveTextContent("Status");
  });

  it("renders outline variant", () => {
    const { container } = render(<Badge variant="outline">S01E01</Badge>);
    expect(container.firstChild).toHaveTextContent("S01E01");
  });

  it("applies custom className", () => {
    const { container } = render(<Badge className="font-mono">Test</Badge>);
    expect(container.firstChild).toHaveClass("font-mono");
  });

  it("matches snapshot", () => {
    const { container } = render(<Badge variant="outline">S01E01</Badge>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
