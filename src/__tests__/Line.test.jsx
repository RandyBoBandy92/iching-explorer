import React from "react";
import { renderWithMockRouterAndContext } from "../test_utils/renderWithRouter";
import Line from "../components/Line/Line";
import { GlobalContext } from "../context/GlobalContext";
import { screen, fireEvent } from "@testing-library/react";

const mockCycleLine = jest.fn();
const mockRandomLine = jest.fn();

const contextValue = {
  cycleLine: mockCycleLine,
  random: false,
  randomLine: mockRandomLine,
};

const lineData = {
  value: "yang",
  changing: true,
};

const lines = {
  line1: { value: "yang", changing: true },
  line2: { value: "yin", changing: false },
  line3: { value: "yang", changing: true },
  line4: { value: "yin", changing: false },
  line5: { value: "yang", changing: true },
  line6: { value: "yin", changing: false },
};

test("renders Line component and handles click when random is false", () => {
  renderWithMockRouterAndContext(
    <Line
      lineData={lineData}
      lineNumber="line1"
      type="primary"
      lines={lines}
    />,
    {
      contexts: [{ provider: GlobalContext.Provider, value: contextValue }],
    }
  );

  const lineElement = screen.getByText((content, element) => {
    return element.classList.contains("line1");
  });

  expect(lineElement).toBeInTheDocument();

  fireEvent.click(lineElement);
  expect(mockCycleLine).toHaveBeenCalledWith("line1", lineData);
});

test("renders Line component and handles click when random is true", () => {
  const randomContextValue = {
    ...contextValue,
    random: true,
  };

  renderWithMockRouterAndContext(
    <Line
      lineData={lineData}
      lineNumber="line1"
      type="primary"
      lines={lines}
    />,
    {
      contexts: [
        { provider: GlobalContext.Provider, value: randomContextValue },
      ],
    }
  );

  const lineElement = screen.getByText((content, element) => {
    return element.classList.contains("line1");
  });

  expect(lineElement).toBeInTheDocument();

  fireEvent.click(lineElement);
  expect(mockRandomLine).toHaveBeenCalledWith("line1", lineData);
});

test("renders Line component with correct classes and transformation symbol", () => {
  renderWithMockRouterAndContext(
    <Line
      lineData={lineData}
      lineNumber="line1"
      type="primary"
      lines={lines}
    />,
    {
      contexts: [{ provider: GlobalContext.Provider, value: contextValue }],
    }
  );

  const lineElement = screen.getByText((content, element) => {
    return element.classList.contains("line1");
  });

  expect(lineElement).toHaveClass("line line1 yang old-yang");
  expect(
    lineElement.querySelector(".transformationSymbol")
  ).toBeInTheDocument();
});

test("cycleLine is called when line is clicked", () => {
  renderWithMockRouterAndContext(
    <Line
      lineData={lineData}
      lineNumber="line1"
      type="primary"
      lines={lines}
    />,
    {
      contexts: [{ provider: GlobalContext.Provider, value: contextValue }],
    }
  );

  const lineElement = screen.getByText((content, element) => {
    return element.classList.contains("line1");
  });

  fireEvent.click(lineElement);
  expect(mockCycleLine).toHaveBeenCalledWith("line1", lineData);
});
