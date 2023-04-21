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
      id: 1,
    },
    {
      name: 'ELUCIA"',
      url: "elucia url",
      id: 2,
    },
    {
      name: 'EVANS"',
      url: "evans url",
      id: 3,
    },
  ],
  charSelection2: [
    {
      name: "Spyro",
      url: "spyro url",
      id: 4,
    },
    {
      name: 'Arthur"',
      url: "arthur url",
      id: 5,
    },
    {
      name: 'Marco"',
      url: "marco url",
      id: 6,
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

  describe("Loads the selected game version", () => {
    it("Loads the Anime Crossover verions", () => {
      const router = createMemoryRouter(routes, {
        initialEntries: ["/game/animeX"],
      });
      render(<RouterProvider router={router} />);

      const evansImg = screen.getByAltText(/evans/i);

      fireEvent.load(evansImg);

      expect(screen.queryByAltText(/game crossover/i)).not.toBeInTheDocument();

      expect(screen.getByAltText(/anime crossover/i)).toBeInTheDocument();
    });

    it("Loads the Game Crossover verions", () => {
      const router = createMemoryRouter(routes, {
        initialEntries: ["/game/gameX"],
      });
      render(<RouterProvider router={router} />);

      const marcoImg = screen.getByAltText(/marco/i);

      fireEvent.load(marcoImg);

      expect(screen.queryByAltText(/anime crossover/i)).not.toBeInTheDocument();

      expect(screen.getByAltText(/game crossover/i)).toBeInTheDocument();
    });
  });

  it("Starts the time after the game loads", async () => {
    let delay = 0;
    const router = createMemoryRouter(routes, {
      initialEntries: ["/game/gameX"],
    });

    render(<RouterProvider router={router} />);
    const ms = screen.getByText("0ms");
    const marcoImg = screen.getByAltText(/marco/i);
    expect(
      screen.getByRole("heading", { name: /loading/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      if (delay === 0) {
        delay += 1;
        throw new Error("Did not delay");
      }
      expect(ms.textContent).toMatch("0ms");
    });
    fireEvent.load(marcoImg);
    await waitFor(() => {
      if (delay === 1) {
        delay += 1;
        throw new Error("Did not delay");
      }
    });
    expect(
      screen.queryByRole("heading", { name: /loading/i })
    ).not.toBeInTheDocument();
    expect(ms.textContent).not.toMatch("0ms");
  });

  it("Reveals the character buttons when the map is cliked", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/game/gameX"],
    });
    render(<RouterProvider router={router} />);

    const marcoImg = screen.getByAltText(/marco/i);

    fireEvent.load(marcoImg);

    const mapSection = screen.getByTestId("map");
    user.click(mapSection);

    await waitFor(() => {
      if (screen.getAllByRole("button").length === 0)
        throw new Error("Buttons did not load");
    });

    expect(screen.getByRole("button", { name: /spyro/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /arthur/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /marco/i })).toBeInTheDocument();
  });
});
