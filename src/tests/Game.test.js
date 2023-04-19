import "@testing-library/jest-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../components/Game";
import useGameData from "../assists/useGameData";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

const routes = [
  {
    path: "/game/:gameVer",
    element: <Game />,
  },
];

const fetchedData = {
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
  charSelection1: [
    {
      name: 'Yato "Yaboku"',
      url: "yato url",
    },
    {
      name: 'ELUCIA"',
      url: "elucia url",
    },
    {
      name: 'EVANS"',
      url: "evans url",
    },
  ],
  charSelection2: [
    {
      name: "Spyro",
      url: "spyro url",
    },
    {
      name: 'Arthur"',
      url: "arthur url",
    },
    {
      name: 'Marco"',
      url: "marco url",
    },
  ],
};

const user = userEvent.setup();

jest.mock("../assists/useGameData", () => {
  return () => fetchedData;
});

describe("Game component", () => {
  it("Renders on screen", () => {
    const { container } = render(<Game />);

    expect(container).toMatchSnapshot();
  });

  it("Loading section is removed after the game is loaded", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/game", "/game/gameX"],
      initialIndex: 1,
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole("heading", { name: /loading/i })
    ).toBeInTheDocument();
    const marcoImg = screen.getByAltText(/marco/i);

    fireEvent.load(marcoImg);

    expect(
      screen.queryByRole("heading", { name: /loading/i })
    ).not.toBeInTheDocument();
  });
});
