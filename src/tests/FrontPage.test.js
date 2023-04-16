import "@testing-library/jest-dom";
import { screen, render, waitFor } from "@testing-library/react";
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
    expect(screen.getByRole("link", { name: "Kids ver." })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Back to normal ver." })
    ).not.toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <FrontPage version={"kids"} />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("link", { name: "Back to normal ver." })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Kids ver." })
    ).not.toBeInTheDocument();
  });

  it("Can fetch videos from the backend", async () => {
    render(
      <BrowserRouter>
        <FrontPage />
      </BrowserRouter>
    );
    expect(screen.getByTestId("vidSrc").src).toBe("");
    await waitFor(
      () => {
        if (screen.getByTestId("vidSrc").src === "")
          throw new Error("Not able to fetch video source");
        return expect(screen.getByTestId("vidSrc").src).toMatch(/https/i);
      },
      { timeout: 2000 }
    );
  });
});
