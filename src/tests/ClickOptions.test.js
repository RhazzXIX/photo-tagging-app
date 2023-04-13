import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import ClickOptions from "../components/ClickOptions";

const luffy = {
  name: "Luffy",
  fn(e) {
    this.isFound = true;
  },
  id: 1,
  isFound: false,
};

const selections = [
  {
    name: "Heli",
    fn: jest.fn(),
    id: 2,
  },
  {
    name: "Poli",
    fn: jest.fn(),
    id: 3,
  },
];

const user = userEvent.setup();

describe("ClickOptions component", () => {
  beforeEach(() => {
    luffy.isFound = false;
    selections.push(luffy);
  });

  it("Renders on screen", () => {
    const { container } = render(<ClickOptions selections={selections} />);
    expect(container).toMatchSnapshot();
  });

  it("The button activates the appropriate functions of each selection", async () => {
    render(<ClickOptions selections={selections} />);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[2]);

    expect(selections[2].isFound).toBeTruthy();
    expect(selections[1].fn).not.toHaveBeenCalled();

    await user.click(buttons[0]);
    await user.click(buttons[1]);

    expect(selections[0].fn).toHaveBeenCalled();
    expect(selections[1].fn).toHaveBeenCalled();
  });

  it("Doesn't render the button of a found character", async () => {
    const { rerender } = render(<ClickOptions selections={selections} />);
    const luffyBtn = screen.getByRole("button", { name: "Luffy" });
    let buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(3);

    await user.click(luffyBtn);
    rerender(<ClickOptions selections={selections} />);
    buttons = screen.getAllByRole("button");

    expect(
      screen.queryByRole("button", { name: "Luffy" })
    ).not.toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });
  afterEach(() => selections.pop());
});
