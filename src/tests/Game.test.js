import "@testing-library/jest-dom";
import {
  screen,
  render,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../components/Game";
import useGameData from "../assists/useGameData";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { signInAnonymously } from "firebase/auth";

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
jest.setTimeout(11000);

jest.mock("../assists/useGameData", () => {
  return () => fetchedData;
});

jest.mock("firebase/auth", () => {
  const originalModule = jest.requireActual("firebase/auth");

  return {
    __esModule: true,
    ...originalModule,

    signInAnonymously: jest.fn(() => Promise.resolve({})),
  };
});

describe("Game component", () => {
  beforeEach(() => {
    Object.keys(fetchedData.charSelection1).forEach((keys, i) => {
      fetchedData.charSelection1[keys].isFound = false;
    });
    Object.keys(fetchedData.charSelection2).forEach((keys, i) => {
      fetchedData.charSelection2[keys].isFound = false;
    });
  });
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

        render(<RouterProvider router={router} />);

        const marcoImg = screen.getByAltText(/marco/i);

        fireEvent.load(marcoImg);
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
        runGame();

        const mapSection = screen.getByTestId("map");
        await user.click(mapSection);

        const spyroBtn = screen.getByRole("button", { name: /spyro/i });

        await user.click(spyroBtn);

        expect(
          screen.getByRole("heading", { level: 2, name: /you found/i })
        ).toBeInTheDocument();

        await user.click(mapSection);
        expect(
          screen.queryByRole("button", { name: /spyro/i })
        ).not.toBeInTheDocument();
      });

      it("Inform the user if a wrong character is selected", async () => {
        fetchedData.charSelection2[0].checkPosn = function checkPosn() {
          this.isFound = false;
        };

        runGame();

        const mapSection = screen.getByTestId("map");
        await user.click(mapSection);

        const spyroBtn = screen.getByRole("button", { name: /spyro/i });

        await user.click(spyroBtn);

        expect(
          screen.getByRole("heading", { level: 2, name: /was not found/i })
        ).toBeInTheDocument();

        await user.click(mapSection);
        expect(
          screen.getByRole("button", { name: /spyro/i })
        ).toBeInTheDocument();
      });

      it("Should stop the timer when all the characters are found", async () => {
        runGame();

        const mapSection = screen.getByTestId("map");
        let milliSeconds = screen.getByText("0ms");
        await user.click(mapSection);
        expect(milliSeconds.textContent).not.toBe("0ms");
        const spyroBtn = screen.getByRole("button", { name: /spyro/i });
        let timerSave = milliSeconds.textContent;
        await user.click(spyroBtn);
        await user.click(mapSection);
        const arthurBtn = screen.getByRole("button", { name: /arthur/i });
        await user.click(arthurBtn);
        expect(milliSeconds.textContent).not.toBe(timerSave);
        await user.click(mapSection);
        const marcoBtn = screen.getByRole("button", { name: /marco/i });
        await user.click(marcoBtn);
        const notice = await screen.findByRole("heading", {
          name: /you found/i,
        });
        timerSave = milliSeconds.textContent;
        let isTimerTicking = true;
        let timerStopByTimes = 0;
        await waitFor(
          () => {
            if (isTimerTicking) {
              if (timerSave === milliSeconds.textContent) {
                if (timerStopByTimes === 5) {
                  isTimerTicking = false;
                }
                timerStopByTimes += 1;
              }
              timerSave = milliSeconds.textContent;
              throw new Error("Timer still ticking");
            }
            timerSave = milliSeconds.textContent;
            return expect(notice).not.toBeInTheDocument();
          },
          { timeout: 10000, interval: 1200 }
        );
        expect(milliSeconds.textContent).toBe(timerSave);
      });

      it("Shows the form entry after the game", async () => {
        Object.keys(fetchedData.charSelection2).forEach((keys, i) => {
          if (i === 2) return;
          fetchedData.charSelection2[keys].isFound = true;
        });

        runGame();

        const mapSection = screen.getByTestId("map");
        await user.click(mapSection);

        const marcoBtn = screen.getByRole("button");
        await user.click(marcoBtn);

        await waitFor(
          () => {
            if (!screen.getByRole("button", { name: /submit/i }))
              throw new Error("Form did not appear");
            return expect(screen.getByLabelText("Name:")).toBeInTheDocument();
          },
          { timeout: 5000 }
        );
      });
    });
  });
});
