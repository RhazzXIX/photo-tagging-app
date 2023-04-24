import "@testing-library/jest-dom";
import {
  screen,
  render,
  waitFor,
  fireEvent,
  getByRole,
} from "@testing-library/react";
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
      checkPosn() {
        this.isFound = true;
      },
      isFound: false,
    },
    {
      name: 'ELUCIA"',
      url: "elucia url",
      id: 2,
      checkPosn() {
        this.isFound = true;
      },
      isFound: false,
    },
    {
      name: 'EVANS"',
      url: "evans url",
      id: 3,
      checkPosn() {
        this.isFound = true;
      },
      isFound: false,
    },
  ],
  charSelection2: [
    {
      name: "Spyro",
      url: "spyro url",
      id: 4,
      checkPosn() {
        this.isFound = true;
      },
      isFound: false,
    },
    {
      name: 'Arthur"',
      url: "arthur url",
      id: 5,
      checkPosn() {
        this.isFound = true;
      },
      isFound: false,
    },
    {
      name: 'Marco"',
      url: "marco url",
      id: 6,
      checkPosn() {
        this.isFound = true;
      },
      isFound: false,
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

  describe("Loads the selected game versions", () => {
    it("Loads the Anime Crossover version", () => {
      const router = createMemoryRouter(routes, {
        initialEntries: ["/game/animeX"],
      });
      render(<RouterProvider router={router} />);

      const evansImg = screen.getByAltText(/evans/i);

      fireEvent.load(evansImg);

      expect(screen.queryByAltText(/game crossover/i)).not.toBeInTheDocument();

      expect(screen.getByAltText(/anime crossover/i)).toBeInTheDocument();
    });

    it("Loads the Game Crossover version", () => {
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

  describe("Game loads", () => {
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
    it("Starts the timer after the game loads", async () => {
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

    describe("Playing the game", () => {
      beforeEach(() => {
        fetchedData.charSelection2[0].isFound = false;
      });

      const runGame = () => {
        const router = createMemoryRouter(routes, {
          initialEntries: ["/game/gameX"],
        });

        const { rerender } = render(<RouterProvider router={router} />);

        const marcoImg = screen.getByAltText(/marco/i);

        fireEvent.load(marcoImg);
        return { rerender, router };
      };

      it("Reveals the character buttons when the map is clicked", async () => {
        runGame();
        expect(
          screen.queryByRole("button", { name: /spyro/i })
        ).not.toBeInTheDocument();
        const mapSection = screen.getByTestId("map");
        await user.click(mapSection);

        expect(
          screen.getByRole("button", { name: /spyro/i })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /arthur/i })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /marco/i })
        ).toBeInTheDocument();
      });

      it("Inform the user that they found the character", async () => {
        const { rerender, router } = runGame();

        const mapSection = screen.getByTestId("map");
        await user.click(mapSection);

        const spyroBtn = screen.getByRole("button", { name: /spyro/i });

        await user.click(spyroBtn);

        rerender(<RouterProvider router={router} />);

        expect(
          screen.getByRole("heading", { level: 2, name: /you found/i })
        ).toBeInTheDocument();
      });

      it("Inform the user if a wrong character is selected", async () => {
        fetchedData.charSelection2[0].checkPosn = function checkPosn() {
          this.isFound = false;
        };

        const { rerender, router } = runGame();

        const mapSection = screen.getByTestId("map");
        await user.click(mapSection);

        const spyroBtn = screen.getByRole("button", { name: /spyro/i });

        await user.click(spyroBtn);
        rerender(<RouterProvider router={router} />);

        expect(
          screen.getByRole("heading", { level: 2, name: /was not found/i })
        ).toBeInTheDocument();
      });
    });
  });
});
