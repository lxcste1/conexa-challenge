import { render, screen } from "@testing-library/react";
import { EpisodeCard } from "../EpisodeCard";

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

const mockEpisode = {
  id: 1,
  name: "Pilot",
  episode: "S01E01",
  air_date: "December 2, 2013",
  characters: [],
  url: "https://rickandmortyapi.com/api/episode/1",
  created: "2017-11-10T12:56:33.798Z",
};

describe("EpisodeCard", () => {
  it("renders episode code in badge", () => {
    render(<EpisodeCard episode={mockEpisode} />);
    expect(screen.getByText("S01E01")).toBeInTheDocument();
  });

  it("renders episode name", () => {
    render(<EpisodeCard episode={mockEpisode} />);
    expect(screen.getByText("Pilot")).toBeInTheDocument();
  });

  it("renders air date", () => {
    render(<EpisodeCard episode={mockEpisode} />);
    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<EpisodeCard episode={mockEpisode} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
