import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecordForm from "../components/RecordForm";
import { setDoc, doc, getDoc } from "firebase/firestore";

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
    const { container } = render(<RecordForm />);

    expect(container).toMatchSnapshot();
  });
  it("Shows the user the time it took playing the game", () => {
    const { rerender } = render(<RecordForm time={5500} />);

    expect(screen.getByRole("heading").textContent).toBe("0m 5s 500ms");

    rerender(<RecordForm time={60456} />);

    expect(screen.getByRole("heading").textContent).toBe("1m 0s 456ms");
  });
  it("Lets the user input his name in the name input", async () => {
    render(<RecordForm time={5500} />);

    const nameInput = screen.getByLabelText("Name:");

    await user.type(nameInput, "Juan");

    expect(nameInput.value).toBe("Juan");
  });

  it("Lets users submit their record", async () => {
    doc.mockReturnValue(docRef);
    getDoc.mockResolvedValue({
      data() {},
    });
    render(<RecordForm time={5500} gameVer={"animeX"} />);

    const nameInput = screen.getByLabelText("Name:");
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    await user.type(nameInput, "Juan");

    await user.click(submitBtn);

    expect(doc).toHaveBeenCalled();
    expect(doc.mock.calls[0][1]).toBe("leaderBoard");
    expect(doc.mock.calls[0][2]).toBe("animeX");

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
});
