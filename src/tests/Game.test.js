import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../components/Game";

describe("Game component", () => {
  it("Renders on screen", () => {
    const { container } = render(<Game />);

    expect(container).toMatchSnapshot();
  });
});
