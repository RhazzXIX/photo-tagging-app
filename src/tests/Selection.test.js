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

const fetchedKidsData = {
  firstMap: {
    miniUrl: "kids mini url 1",
    name: "Peppa Pig Talse",
    url: "kids url 2",
  },
  scndMap: {
    miniUrl: "kids mini url 2",
    name: "Robocar Poli",
    url: "kids url 2",
  },
  charSelection1: [
    {
      name: "kids char1",
      url: "kids1 url",
    },
    {
      name: 'kids char2"',
      url: "kids2 url",
    },
    {
      name: 'kids char3"',
      url: "kids3 url",
    },
  ],
  charSelection2: [
    {
      name: "kids char4",
      url: "kids4 url",
    },
    {
      name: 'kids char5"',
      url: "kids5 url",
    },
    {
      name: 'kids char6"',
      url: "kids6 url",
    },
  ],
};

jest.mock("../assists/useGameData", () => {
  return jest.fn();
});

describe("Selection component", () => {
  it("Renders on screen", () => {
    useGameData.mockReturnValueOnce(fetchedData);
    const { container } = render(
      <BrowserRouter>
        <Selection />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("Renders kids version", () => {
    useGameData.mockReturnValueOnce(fetchedKidsData);
    render(
      <BrowserRouter>
        <Selection version={"kids"} />
      </BrowserRouter>
    );
    expect(useGameData).toBeCalledWith("kids");
  });
});
