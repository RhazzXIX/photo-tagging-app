import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecordForm from "../components/RecordForm";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

jest.mock("firebase/firestore", () => {
  const originalModule = jest.requireActual("firebase/firestore");

  return {
    __esModile: true,
    ...originalModule,
    doc: jest.fn(),
    setDoc: jest.fn((obj) => true),
    getDoc: jest.fn(),
  };
});

const user = userEvent.setup();
const docRef = "testRef";

describe("RecordForm component", () => {
  it("Renders on screen", () => {
    const { container } = render(
      <BrowserRouter>
        <RecordForm />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
  it("Shows the user the time it took playing the game", () => {
    const { rerender } = render(
      <BrowserRouter>
        <RecordForm time={5500} />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading").textContent).toBe("0m 5s 500ms");

    rerender(
      <BrowserRouter>
        <RecordForm time={60456} />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading").textContent).toBe("1m 0s 456ms");
  });
  it("Lets the user input his name in the name input", async () => {
    render(
      <BrowserRouter>
        <RecordForm time={5500} />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText("Name:");

    await user.type(nameInput, "Juan");

    expect(nameInput.value).toBe("Juan");
  });

  describe("Sending record", () => {
    beforeEach(() => {
      doc.mockReturnValue(docRef);
      getDoc.mockResolvedValue({
        data() {},
      });
    });

    it("Lets users submit their record", async () => {
      render(
        <BrowserRouter>
          <RecordForm time={5500} gameVer={"animeX"} />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText("Name:");
      const submitBtn = screen.getByRole("button", { name: /submit/i });

      await user.type(nameInput, "Juan");

      await user.click(submitBtn);

      expect(doc).toHaveBeenCalled();
      expect(doc.mock.calls[0][1]).toBe("leaderBoard");
      expect(doc.mock.calls[0][2]).toBe("animeX");

      expect(getDoc).toHaveBeenCalled();
      expect(getDoc.mock.calls[0][0]).toBe("testRef");

      expect(setDoc).toHaveBeenCalled();
      expect(setDoc.mock.calls[0][0]).toBe("testRef");
      expect(setDoc.mock.calls[0][1]).toEqual({
        record0: {
          userName: "Juan",
          time: 5500,
        },
      });
    });

    it("Only lets the user submit their record once", async () => {
      render(
        <BrowserRouter>
          <RecordForm time={5500} gameVer={"animeX"} />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText("Name:");
      const submitBtn = screen.getByRole("button", { name: /submit/i });

      await user.type(nameInput, "Juan");

      await user.click(submitBtn);

      expect(doc).toHaveBeenCalled();
      expect(getDoc).toHaveBeenCalled();
      expect(setDoc).toHaveBeenCalled();

      await user.click(submitBtn);

      expect(doc).toBeCalledTimes(1);
      expect(getDoc).toBeCalledTimes(1);
      expect(setDoc).toBeCalledTimes(1);
    });

    it("Loads the leaderboard page when the submit button is pressed", async () => {
      const routes = [
        {
          path: "/photo-tagging-app",
          element: <RecordForm time={5500} gameVer={"animeX"} />,
        },
        {
          path: "/photo-tagging-app/leaderboard",
          element: <h2>Leader Board</h2>,
        },
      ];

      const router = createMemoryRouter(routes, {
        initialEntries: [
          "/photo-tagging-app",
          "/photo-tagging-app/leaderboard",
        ],
        initialIndex: 0,
      });

      render(<RouterProvider router={router} />);

      const nameInput = screen.getByLabelText("Name:");
      const submitBtn = screen.getByRole("button", { name: /submit/i });

      await user.type(nameInput, "Juan");

      await user.click(submitBtn);

      expect(
        screen.getByRole("heading", { name: /leader board/i })
      ).toBeInTheDocument();
      expect(nameInput).not.toBeInTheDocument();
      expect(submitBtn).not.toBeInTheDocument();
    });
  });
});
