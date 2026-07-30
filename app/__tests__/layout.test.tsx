jest.mock("next/font/google", () => {
  const mockFont = (options: { variable: string }) => ({
    variable: options.variable,
  });
  return new Proxy(
    {},
    {
      get() {
        return mockFont;
      },
    }
  );
});

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
        return () => null;
      },
    }
  );
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
    expect(document.documentElement.className).toContain("--font-inter");
    expect(document.documentElement.className).toContain("--font-bungee");

    expect(document.body).toBeInTheDocument();
    expect(document.body).toHaveTextContent("Test");
    expect(document.body).toMatchSnapshot();
  });
});
