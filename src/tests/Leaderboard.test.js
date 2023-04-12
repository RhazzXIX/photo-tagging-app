import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Leaderboard from "../components/Leaderboard";

describe("Leaderboard component", () => {
  it("Renders on screen", () => {
    const { container } = render(<Leaderboard />);
    expect(container).toMatchSnapshot();
  });
});
