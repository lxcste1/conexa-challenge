jest.mock("../../../utils/api", () => ({
  fetchCharacters: jest.fn(),
}));

jest.mock("../../../components/ui/explorer/Explorer", () => ({
  Explorer: ({
    initialCharacters,
  }: {
    initialCharacters: unknown[];
    initialInfo: unknown;
  }) => (
    <div data-testid="explorer" data-characters={JSON.stringify(initialCharacters)}>
      Explorer Mock
    </div>
  ),
}));

import { render } from "@testing-library/react";
import ExplorerPage from "../page";
import { fetchCharacters } from "../../../utils/api";

describe("ExplorerPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders page heading", async () => {
    (fetchCharacters as jest.Mock).mockResolvedValue({
      info: { count: 826, pages: 42, next: null, prev: null },
      results: [],
    });

    const Page = await ExplorerPage();
    const { getByText } = render(Page);
    expect(
      getByText("Compare characters across the multiverse"),
    ).toBeInTheDocument();
  });

  it("passes initial characters to Explorer", async () => {
    const mockCharacters = [
      {
        id: 1,
        name: "Rick",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        image: "",
        origin: { name: "", url: "" },
        location: { name: "", url: "" },
        episode: [],
        url: "",
        created: "",
      },
    ];

    (fetchCharacters as jest.Mock).mockResolvedValue({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: mockCharacters,
    });

    const Page = await ExplorerPage();
    const { getByTestId } = render(Page);
    expect(getByTestId("explorer")).toBeInTheDocument();
  });
});
