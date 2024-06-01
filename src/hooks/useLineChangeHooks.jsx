import { lineStates } from "../utilities/constants";

// useGlobalHooks.js
export function useCycleLine(lines, setLines) {
  const cycleLine = (lineNumber, lineData) => {
    // find the index of the current line value from the lineStates array
    const currentIndex = lineStates.findIndex(
      (state) =>
        state.value === lineData.value && state.changing === lineData.changing
    );
    // find the next index
    const nextIndex = (currentIndex + 1) % lineStates.length;
    // set the new line value
    setLines({
      ...lines,
      [lineNumber]: lineStates[nextIndex],
    });
  };

  return cycleLine;
}

export function useRandomLine(lines, setLines) {
  const randomLine = (lineNumber, lineData) => {
    const currentIndex = lineStates.findIndex(
      (state) =>
        state.value === lineData.value && state.changing === lineData.changing
    );
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * lineStates.length);
    } while (randomIndex === 0 || randomIndex === currentIndex);

    setLines({
      ...lines,
      [lineNumber]: lineStates[randomIndex],
    });
  };
  return randomLine;
}
