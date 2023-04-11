import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import ClickOptions from "../components/ClickOptions";

const selections = [
  {
    name: "Luffy",
    fn: jest.fn(),
    id: 1,
  },
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
  it("Renders on screen", () => {
    const { container } = render(<ClickOptions selections={selections} />);
    expect(container).toMatchSnapshot();
  });

  it("The button activates the appropriate functions of each selection", async () => {
    render(<ClickOptions selections={selections} />);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(selections[0].fn).toHaveBeenCalled();
    expect(selections[1].fn).not.toHaveBeenCalled();

    await user.click(buttons[1]);
    await user.click(buttons[2]);

    expect(selections[1].fn).toHaveBeenCalled();
    expect(selections[2].fn).toHaveBeenCalled();
  });
});
