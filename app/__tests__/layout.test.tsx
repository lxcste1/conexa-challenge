jest.mock("next/font/google", () => {
  const mockFont = (options: { variable: string; subsets: string[] }) => ({
    variable: options.variable,
    subsets: options.subsets,
  });

  return {
    Geist: mockFont,
    Geist_Mono: mockFont,
  };
});

import { render } from "@testing-library/react";
import RootLayout from "../layout";

describe("RootLayout", () => {
  it("matches snapshot", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <RootLayout>
        <p>Test</p>
      </RootLayout>
    );

    spy.mockRestore();

    expect(document.documentElement.lang).toBe("en");
    expect(document.documentElement.className).toContain("--font-geist-sans");
    expect(document.documentElement.className).toContain("--font-geist-mono");

    expect(document.body).toBeInTheDocument();
    expect(document.body).toHaveTextContent("Test");
    expect(document.body).toMatchSnapshot();
  });
});
