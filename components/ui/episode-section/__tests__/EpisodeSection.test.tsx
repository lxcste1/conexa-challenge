import { render, screen } from "@testing-library/react";
import { EpisodeSection } from "../EpisodeSection";

jest.mock("../../../../hooks/useEpisodes", () => ({
  useEpisodes: jest.fn(),
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

import { useEpisodes } from "../../../../hooks/useEpisodes";

const mockEpisode = {
  id: 1,
  name: "Pilot",
  episode: "S01E01",
  air_date: "December 2, 2013",
  characters: [],
  url: "",
  created: "",
};

describe("EpisodeSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and subtitle", () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      episodes: [],
      isLoading: false,
      error: null,
    });
    render(
      <EpisodeSection
        title="Shared Episodes"
        subtitle="Both characters"
        accent="shared"
        episodeIds={[]}
      />,
    );
    expect(screen.getByText("Shared Episodes")).toBeInTheDocument();
    expect(screen.getByText("Both characters")).toBeInTheDocument();
  });

  it("shows empty state when no episode ids", () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      episodes: [],
      isLoading: false,
      error: null,
    });
    render(
      <EpisodeSection
        title="Only Episodes"
        subtitle="Solo"
        accent="primary"
        episodeIds={[]}
      />,
    );
    expect(
      screen.getByText("No episodes in this category."),
    ).toBeInTheDocument();
  });

  it("renders episode cards when data loaded", () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      episodes: [mockEpisode],
      isLoading: false,
      error: null,
    });
    render(
      <EpisodeSection
        title="Only Episodes"
        subtitle="Solo"
        accent="primary"
        episodeIds={[1]}
      />,
    );
    expect(screen.getByText("Pilot")).toBeInTheDocument();
  });

  it("displays episode count", () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      episodes: [],
      isLoading: false,
      error: null,
    });
    render(
      <EpisodeSection
        title="Test"
        subtitle="Test"
        accent="primary"
        episodeIds={[1, 2, 3]}
      />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      episodes: [mockEpisode],
      isLoading: false,
      error: null,
    });
    const { container } = render(
      <EpisodeSection
        title="Only Episodes"
        subtitle="Solo"
        accent="primary"
        episodeIds={[1]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
