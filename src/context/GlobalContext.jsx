import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  emptyHexagram,
  emptyTrigram,
  hexagramStates,
  lineStates,
  trigramStates,
} from "../utilities/constants";

const initialLines = {
  line6: { value: "none", changing: false },
  line5: { value: "none", changing: false },
  line4: { value: "none", changing: false },
  line3: { value: "none", changing: false },
  line2: { value: "none", changing: false },
  line1: { value: "none", changing: false },
};

// Create a new context
const GlobalContext = createContext();

// Create a provider component
const GlobalProvider = ({ children }) => {
  const [hexagram, setHexagram] = useState(emptyHexagram);
  const [trigrams, setTrigrams] = useState([emptyTrigram, emptyTrigram]);
  const [lines, setLines] = useState(initialLines);

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

  const checkTrigrams = (linesToCheck) => {
    // grab lines 6,5,4 and 3,2,1
    const { line6, line5, line4, line3, line2, line1 } = linesToCheck;
    // use lines 6,5,4 to find the upper trigram
    // use lines 3,2,1 to find the lower trigram
    // find the trigram names
    let upperTrigram = trigramStates.find(
      (trigram) =>
        trigram.trigram[0] === line6.value &&
        trigram.trigram[1] === line5.value &&
        trigram.trigram[2] === line4.value
    );
    let lowerTrigram = trigramStates.find(
      (trigram) =>
        trigram.trigram[0] === line3.value &&
        trigram.trigram[1] === line2.value &&
        trigram.trigram[2] === line1.value
    );

    if (!upperTrigram) {
      upperTrigram = trigramStates[0];
    }

    if (!lowerTrigram) {
      lowerTrigram = trigramStates[0];
    }

    // set the trigram names
    setTrigrams([upperTrigram, lowerTrigram]);
  };

  const checkHexagram = (trigramsToCheck) => {
    // find the hexagram number
    let newHexagram = hexagramStates.find(
      (hexagram) =>
        hexagram.trigrams[0] === trigramsToCheck[0].name &&
        hexagram.trigrams[1] === trigramsToCheck[1].name
    );
    if (!newHexagram) {
      newHexagram = hexagramStates[0];
    }
    // set the hexagram number
    setHexagram(newHexagram.number);
  };

  useEffect(() => {
    checkTrigrams(lines);
  }, [lines]);

  useEffect(() => {
    checkHexagram(trigrams);
  }, [trigrams]);

  const getTransformedLines = (primaryLines) => {
    const transformedLines = {};
    for (const lineNumber in primaryLines) {
      const line = primaryLines[lineNumber];
      const transformedLine = { ...line };
      if (transformedLine.changing) {
        transformedLine.value =
          transformedLine.value === "yin" ? "yang" : "yin";
        transformedLine.changing = false;
      }
      transformedLines[lineNumber] = transformedLine;
    }
    return transformedLines;
  };

  const transformedLines = getTransformedLines(lines);

  // Provide the context value to the consumer components
  return (
    <GlobalContext.Provider
      value={{
        hexagram,
        trigrams,
        lines,
        cycleLine,
        transformedLines,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Define your propTypes
GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };
