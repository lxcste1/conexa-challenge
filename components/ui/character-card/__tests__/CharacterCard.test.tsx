import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterCard } from "../CharacterCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.ComponentProps<"img"> & { width?: number; height?: number },
  ) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

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

const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive" as const,
  species: "Human",
  type: "",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
  url: "",
  created: "",
};

describe("CharacterCard", () => {
  it("renders character name", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        selected={false}
        accent="primary"
        onSelect={jest.fn()}
      />,
    );
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("renders episode count", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        selected={false}
        accent="primary"
        onSelect={jest.fn()}
      />,
    );
    expect(screen.getByText("2 episodes")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const onSelect = jest.fn();
    render(
      <CharacterCard
        character={mockCharacter}
        selected={false}
        accent="primary"
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledWith(mockCharacter);
  });

  it("shows selected state", () => {
    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        selected={true}
        accent="primary"
        onSelect={jest.fn()}
      />,
    );
    expect(container.querySelector("[aria-pressed='true']")).toBeTruthy();
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        selected={false}
        disabled={true}
        accent="primary"
        onSelect={jest.fn()}
      />,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        selected={false}
        accent="primary"
        onSelect={jest.fn()}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
