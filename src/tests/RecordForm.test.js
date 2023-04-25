import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecordForm from "../components/RecordForm";

describe("RecordForm component", () => {
  it("Renders on screen", () => {
    const { container } = render(<RecordForm />);

    expect(container).toMatchSnapshot();
  });
});
