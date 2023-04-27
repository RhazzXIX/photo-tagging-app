import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Leaderboard from "../components/Leaderboard";
import useGameData from "../assists/useGameData";
import { doc, getDoc } from "firebase/firestore";

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

const fetchedLeaderBoardData = {
  record0: {
    userName: "test1",
    time: 5500,
  },
  record1: {
    userName: "test1",
    time: 5500,
  },
};

jest.mock("../assists/useGameData");
jest.mock("firebase/firestore");

doc.mockReturnValue("testRef");
getDoc.mockResolvedValue({
  data() {
    return fetchedLeaderBoardData;
  },
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
});
