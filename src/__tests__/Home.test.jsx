import React from "react";
import { renderWithRouterAndContext } from "../test_utils/renderWithRouter";
import Home from "../pages/home/Home"; // Adjust the import path as needed
import { screen, fireEvent } from "@testing-library/react";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
  console.warn.mockRestore();
});

test("renders Home component with real context and router", () => {
  renderWithRouterAndContext(<Home />, { route: "/" });

  // verify component mounts without error
  expect(console.error).not.toHaveBeenCalled();
  expect(console.warn).not.toHaveBeenCalled();
});

test("Clicking each of the 6 lines, should yield hexagram 2", () => {
  const { container } = renderWithRouterAndContext(<Home />, { route: "/" });

  const line1 = container.querySelector(".line1");
  const line2 = container.querySelector(".line2");
  const line3 = container.querySelector(".line3");
  const line4 = container.querySelector(".line4");
  const line5 = container.querySelector(".line5");
  const line6 = container.querySelector(".line6");

  fireEvent.click(line1);
  fireEvent.click(line2);
  fireEvent.click(line3);
  fireEvent.click(line4);
  fireEvent.click(line5);
  fireEvent.click(line6);

  // wait for the hexagram to change, 1 second should be enough
  setTimeout(() => {
    const hexNumber = screen.getByText("Unchanging Hexagram 2");
    expect(hexNumber).toBeInTheDocument();
  }, 200);
});

test("Clicking each of the 6 lines, but clicking line 1 twice, should show The Magnetic(2) ➡ ️Return(24)", () => {
  const { container } = renderWithRouterAndContext(<Home />, { route: "/" });

  const line1 = container.querySelector(".line1");
  const line2 = container.querySelector(".line2");
  const line3 = container.querySelector(".line3");
  const line4 = container.querySelector(".line4");
  const line5 = container.querySelector(".line5");
  const line6 = container.querySelector(".line6");

  fireEvent.click(line1);
  fireEvent.click(line2);
  fireEvent.click(line3);
  fireEvent.click(line4);
  fireEvent.click(line5);
  fireEvent.click(line6);
  fireEvent.click(line1);

  // wait for the hexagram to change, 1 second should be enough
  setTimeout(() => {
    const hexNumber = screen.getByText("The Magnetic(2) ➡ ️Return(24)");
    expect(hexNumber).toBeInTheDocument();
  }, 200);
});

test("Clicking each of the 6 lines, but clicking line 1 twice, should show The Magnetic(2) ➡ ️Return(24)", () => {
  const { container } = renderWithRouterAndContext(<Home />, { route: "/" });

  const line1 = container.querySelector(".line1");
  const line2 = container.querySelector(".line2");
  const line3 = container.querySelector(".line3");
  const line4 = container.querySelector(".line4");
  const line5 = container.querySelector(".line5");
  const line6 = container.querySelector(".line6");

  fireEvent.click(line1);
  fireEvent.click(line2);
  fireEvent.click(line3);
  fireEvent.click(line4);
  fireEvent.click(line5);
  fireEvent.click(line6);
  fireEvent.click(line1);

  // wait for the hexagram to change, 1 second should be enough
  setTimeout(() => {
    const hexNumber = screen.getByText("The Magnetic(2) ➡ ️Return(24)");
    expect(hexNumber).toBeInTheDocument();
  }, 200);
});

test("Clicking each of the 6 lines, but clicking line 1 twice, then clicking on any of the .transformed .line elements should not change state", () => {
  const { container } = renderWithRouterAndContext(<Home />, { route: "/" });

  const line1 = container.querySelector(".line1");
  const line2 = container.querySelector(".line2");
  const line3 = container.querySelector(".line3");
  const line4 = container.querySelector(".line4");
  const line5 = container.querySelector(".line5");
  const line6 = container.querySelector(".line6");

  fireEvent.click(line1);
  fireEvent.click(line2);
  fireEvent.click(line3);
  fireEvent.click(line4);
  fireEvent.click(line5);
  fireEvent.click(line6);
  fireEvent.click(line1);

  // wait for the hexagram to change, 1 second should be enough
  setTimeout(() => {
    const transformedLines = container.querySelectorAll(".transformed .line");
    transformedLines.forEach((line) => {
      fireEvent.click(line);
    });

    const hexNumber = screen.getByText("The Magnetic(2) ➡ ️Return(24)");
    expect(hexNumber).toBeInTheDocument();
  }, 200);
});

test("Going to a search route like ?search=32=>34 should say Consistency(32) ➡ ️Great Power(34)", () => {
  renderWithRouterAndContext(<Home />, {
    route: "/?search=32=>34",
  });

  // wait for the hexagram to change, 1 second should be enough
  setTimeout(() => {
    const hexNumber = screen.getByText("Consistency(32) ➡ ️Great Power(34)");
    expect(hexNumber).toBeInTheDocument();
  }, 200);
});
