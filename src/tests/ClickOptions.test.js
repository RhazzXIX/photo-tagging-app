import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import ClickOptions from "../components/ClickOptions";

const luffy = {
  name: "Luffy",
  checkPosn(e) {
    this.isFound = true;
  },
  id: 1,
  isFound: false,
};

const selections = [
  {
    name: "Heli",
    checkPosn: jest.fn(),
    id: 2,
  },
  {
    name: "Poli",
    checkPosn: jest.fn(),
    id: 3,
  },
];

const handleClick = jest.fn();

let testObj;

async function handleClick2(e) {
  testObj = this;
  this.checkPosn();
}

const user = userEvent.setup();

describe("ClickOptions component", () => {
  beforeEach(() => {
    luffy.isFound = false;
    selections.push(luffy);
    handleClick.mockClear();
  });

  it("Renders on screen", () => {
    const { container } = render(
      <ClickOptions
        selections={selections}
        position={{}}
        handleClick={handleClick}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("Changes style position based on passed position props", () => {
    const { rerender } = render(
      <ClickOptions
        selections={selections}
        position={{}}
        handleClick={handleClick2}
      />
    );
    let list = screen.getByRole("list");
    expect(list).toHaveStyle("top: 5px");
    expect(list).toHaveStyle("left: 5px");
    rerender(
      <ClickOptions
        selections={selections}
        position={{ targetPosY: 5, targetPosX: 5 }}
        handleClick={handleClick2}
      />
    );

    expect(list).toHaveStyle("top: 10px");
    expect(list).toHaveStyle("left: 10px");
  });

  it("Calls the passed onClick function", async () => {
    render(
      <ClickOptions
        selections={selections}
        position={{}}
        handleClick={handleClick}
      />
    );
    const luffyBtn = screen.getByRole("button", { name: "Luffy" });

    expect(handleClick).not.toHaveBeenCalled();

    await user.click(luffyBtn);

    expect(handleClick).toHaveBeenCalled();
  });

  it("The button passes the appropriate character Obj to the click handle", async () => {
    render(
      <ClickOptions
        selections={selections}
        position={{}}
        handleClick={handleClick2}
      />
    );
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[2]);
    expect(testObj).toBe(luffy);
    await user.click(buttons[0]);
    expect(testObj).toBe(selections[0]);
    expect(testObj).not.toBe(luffy);
    await user.click(buttons[1]);
    expect(testObj).toBe(selections[1]);
    expect(testObj).not.toBe(selections[0]);
  });

  it("Doesn't render the button of a found character", async () => {
    const { rerender } = render(
      <ClickOptions
        selections={selections}
        position={{}}
        handleClick={handleClick2}
      />
    );
    const luffyBtn = screen.getByRole("button", { name: "Luffy" });
    let buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(3);

    await user.click(luffyBtn);
    rerender(
      <ClickOptions
        selections={selections}
        position={{}}
        handleClick={handleClick2}
      />
    );
    buttons = screen.getAllByRole("button");

    expect(
      screen.queryByRole("button", { name: "Luffy" })
    ).not.toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });

  afterEach(() => selections.pop());
});
