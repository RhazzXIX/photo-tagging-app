import "@testing-library/jest-dom";
import useGameData from "../assists/useGameData";
import { render } from "@testing-library/react";
import Selection from "../components/Selection";
import { BrowserRouter } from "react-router-dom";

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

jest.mock("../assists/useGameData", () => {
  return () => fetchedData;
});

describe("Selection component", () => {
  it("Renders on screen", () => {
    const { container } = render(
      <BrowserRouter>
        <Selection />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
