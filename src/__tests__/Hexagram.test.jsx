import React from "react";
import { renderWithRouterAndContext } from "../test_utils/renderWithRouter";
import Hexagram from "../components/Hexagram/Hexagram";
import { GlobalContext } from "../context/GlobalContext";
import { screen, fireEvent } from "@testing-library/react";

test("renders Hexagram component with primary type", () => {
  const globalContextValue = {
    lines: {
      line1: { value: "yang", changing: true },
      line2: { value: "yang", changing: true },
      line3: { value: "yang", changing: true },
      line4: { value: "yang", changing: true },
      line5: { value: "yang", changing: true },
      line6: { value: "yang", changing: true },
    },
    transformedLines: {
      line1: { value: "yin", changing: false },
      line2: { value: "yin", changing: false },
      line3: { value: "yin", changing: false },
      line4: { value: "yin", changing: false },
      line5: { value: "yin", changing: false },
      line6: { value: "yin", changing: false },
    },
    hexagram: { number: 1 },
    transformedHexagram: { number: 2 },
  };

  renderWithRouterAndContext(<Hexagram type="primary" />, {
    contexts: [{ provider: GlobalContext.Provider, value: globalContextValue }],
  });

  expect(screen.getByText("1")).toBeInTheDocument();
});

test("renders Hexagram component with transformed type", () => {
  const globalContextValue = {
    lines: {
      line1: { value: "yang", changing: true },
      line2: { value: "yang", changing: true },
      line3: { value: "yang", changing: true },
      line4: { value: "yang", changing: true },
      line5: { value: "yang", changing: true },
      line6: { value: "yang", changing: true },
    },
    transformedLines: {
      line1: { value: "yin", changing: false },
      line2: { value: "yin", changing: false },
      line3: { value: "yin", changing: false },
      line4: { value: "yin", changing: false },
      line5: { value: "yin", changing: false },
      line6: { value: "yin", changing: false },
    },
    hexagram: { number: 1 },
    transformedHexagram: { number: 2 },
  };

  renderWithRouterAndContext(<Hexagram type="transformed" />, {
    contexts: [{ provider: GlobalContext.Provider, value: globalContextValue }],
  });

  expect(screen.getByText("2")).toBeInTheDocument();
});

test("calls cycleLine when line is clicked", () => {
  const cycleLineMock = jest.fn();
  const globalContextValue = {
    lines: {
      line1: { value: "yang", changing: true },
      line2: { value: "yang", changing: true },
      line3: { value: "yang", changing: true },
      line4: { value: "yang", changing: true },
      line5: { value: "yang", changing: true },
      line6: { value: "yang", changing: true },
    },
    transformedLines: {
      line1: { value: "yin", changing: false },
      line2: { value: "yin", changing: false },
      line3: { value: "yin", changing: false },
      line4: { value: "yin", changing: false },
      line5: { value: "yin", changing: false },
      line6: { value: "yin", changing: false },
    },
    hexagram: { number: 1 },
    transformedHexagram: { number: 2 },
    cycleLine: cycleLineMock,
  };

  const { container } = renderWithRouterAndContext(
    <Hexagram type="primary" />,
    {
      contexts: [
        { provider: GlobalContext.Provider, value: globalContextValue },
      ],
    }
  );

  // Simulate clicking the line
  const lineElement = container.querySelector(".line1");
  fireEvent.click(lineElement);
  fireEvent.click(lineElement);
  fireEvent.click(lineElement);
  fireEvent.click(lineElement);

  // Assert that the cycleLine function was called
  expect(cycleLineMock).toHaveBeenCalledTimes(4);
});
