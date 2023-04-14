import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import FrontPage from "../components/FrontPage";

const user = userEvent.setup();

describe("FrontPage component", () => {
  it("Renders on screen", () => {
    const { container } = render(
      <BrowserRouter>
        <FrontPage />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("Can render both normal and kids version", async () => {
    const { rerender } = render(
      <BrowserRouter>
        <FrontPage />
      </BrowserRouter>
    );
    expect(screen.getByRole("link").textContent).toEqual("Kids ver.");

    rerender(
      <BrowserRouter>
        <FrontPage version={"kids"} />
      </BrowserRouter>
    );

    expect(screen.getByRole("link").textContent).toEqual("Back to normal ver.");
  });
});
