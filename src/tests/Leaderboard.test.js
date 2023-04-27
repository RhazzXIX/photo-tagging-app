import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Leaderboard from "../components/Leaderboard";
import useGameData from "../assists/useGameData";
import { getDocs, query, where } from "firebase/firestore";

const user = userEvent.setup();
const fetchedMapData = {
  firstMap: {
    miniUrl: "mini url 1",
    name: "Anime Crossover",
    url: "url 2",
  },
  scndMap: {
    miniUrl: "mini url 2",
    name: "Game Crossover",
    url: "url 2",
  },
};

const fetchedAnimeData = [
  {
    data() {
      return {
        userName: "test1A",
        time: 5500,
        id: 1,
        gameVer: "Anime Crossover",
      };
    },
  },
  {
    data() {
      return {
        userName: "test2A",
        time: 5600,
        id: 2,
        gameVer: "Anime Crossover",
      };
    },
  },
];

const fetchedGameData = [
  {
    data() {
      return {
        userName: "test1G",
        time: 5500,
        id: 4,
        gameVer: "Game Crossover",
      };
    },
  },
  {
    data() {
      return {
        userName: "test2G",
        time: 5600,
        id: 5,
        gameVer: "Game Crossover",
      };
    },
  },
];

jest.mock("../assists/useGameData");

jest.mock("firebase/firestore", () => {
  const originalModules = jest.requireActual("firebase/firestore");

  return {
    __esModule: true,
    ...originalModules,
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
  };
});

jest.mock("../assists/useGameData", () => {
  return () => fetchedMapData;
});

describe("Leaderboard component", () => {
  it("Renders on screen", () => {
    const { container } = render(<Leaderboard />);
    expect(container).toMatchSnapshot();
  });

  it("Renders the fetched images", () => {
    render(<Leaderboard />);

    expect(screen.getByAltText("Anime Crossover")).toBeInTheDocument();
    expect(screen.getByAltText("Game Crossover")).toBeInTheDocument();
  });
  describe("Fething game records", () => {
    it.only("Initially fetches the Anime Crossover records", async () => {
      query.mockReturnValue("Anime Crossover");
      getDocs.mockResolvedValue(fetchedAnimeData);
      render(<Leaderboard />);

      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        "Anime Crossover"
      );

      expect(where).toHaveBeenCalled();
      expect(where.mock.calls[0][2]).toBe("animeX");
      expect(query).toHaveBeenCalled();
      expect(getDocs).toHaveBeenCalled();

      const listItems = await screen.findAllByRole("listitem");

      expect(listItems.length).toBe(2);
      expect(screen.getByText(/test1a/i)).toBeInTheDocument();
      expect(screen.getByText(/test2a/i)).toBeInTheDocument();
    });

    it.skip("Fetches the Game Crossover records", async () => {
      render(<Leaderboard />);

      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        "Anime Crossover"
      );
      const gameXBtn = screen.getByAltText("Game Crossover");

      await user.click(gameXBtn);

      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        "Game Crossover"
      );
      const listItems = screen.getAllByRole("list");

      console.log(listItems);

      expect(listItems.length).toBe(2);
    });
  });
});
