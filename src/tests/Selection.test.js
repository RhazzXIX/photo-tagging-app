import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Selection from "../components/Selection";

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
