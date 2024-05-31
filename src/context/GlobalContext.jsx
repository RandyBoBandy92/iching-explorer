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
import { getAllHexagramText } from "../utilities/ichingDataLoader";

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
  const [random, setRandom] = useState(false);
  const [dekorneText, setDekorneText] = useState([]);

  const forceChangeHexagram = (newHexagramNumber) => {
    const newHexagram = hexagramStates.find(
      (hexagram) => hexagram.number === newHexagramNumber
    );
    // get the corresponding trigrams
    const newUpperTrigram = trigramStates.find(
      (trigram) => trigram.name === newHexagram.trigrams[0]
    );
    const newLowerTrigram = trigramStates.find(
      (trigram) => trigram.name === newHexagram.trigrams[1]
    );
    // get the corresponding lines
    const newLines = {
      line6: { value: newUpperTrigram.trigramLines[0], changing: false },
      line5: { value: newUpperTrigram.trigramLines[1], changing: false },
      line4: { value: newUpperTrigram.trigramLines[2], changing: false },
      line3: { value: newLowerTrigram.trigramLines[0], changing: false },
      line2: { value: newLowerTrigram.trigramLines[1], changing: false },
      line1: { value: newLowerTrigram.trigramLines[2], changing: false },
    };
    // set all the new line values
    setLines(newLines);
  };

  const findDesiredHexagram = (desiredHexagramNumber) => {
    const newDesiredHexagram = hexagramStates.find(
      (hexagram) => hexagram.number === desiredHexagramNumber
    );

    const newUpperTrigram = trigramStates.find(
      (trigram) => trigram.name === newDesiredHexagram.trigrams[0]
    );

    const newLowerTrigram = trigramStates.find(
      (trigram) => trigram.name === newDesiredHexagram.trigrams[1]
    );

    const desiredLines = {
      line6: { value: newUpperTrigram.trigramLines[0], changing: false },
      line5: { value: newUpperTrigram.trigramLines[1], changing: false },
      line4: { value: newUpperTrigram.trigramLines[2], changing: false },
      line3: { value: newLowerTrigram.trigramLines[0], changing: false },
      line2: { value: newLowerTrigram.trigramLines[1], changing: false },
      line1: { value: newLowerTrigram.trigramLines[2], changing: false },
    };

    const newLines = {
      line6: {
        ...lines.line6,
        changing: lines.line6.value !== desiredLines.line6.value,
      },
      line5: {
        ...lines.line5,
        changing: lines.line5.value !== desiredLines.line5.value,
      },
      line4: {
        ...lines.line4,
        changing: lines.line4.value !== desiredLines.line4.value,
      },
      line3: {
        ...lines.line3,
        changing: lines.line3.value !== desiredLines.line3.value,
      },
      line2: {
        ...lines.line2,
        changing: lines.line2.value !== desiredLines.line2.value,
      },
      line1: {
        ...lines.line1,
        changing: lines.line1.value !== desiredLines.line1.value,
      },
    };

    setLines(newLines);
  };

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

  const checkTrigrams = (linesToCheck) => {
    // grab lines 6,5,4 and 3,2,1
    const { line6, line5, line4, line3, line2, line1 } = linesToCheck;
    // use lines 6,5,4 to find the upper trigram
    // use lines 3,2,1 to find the lower trigram
    // find the trigram names
    let upperTrigram = trigramStates.find(
      (trigram) =>
        trigram.trigramLines[0] === line6.value &&
        trigram.trigramLines[1] === line5.value &&
        trigram.trigramLines[2] === line4.value
    );
    let lowerTrigram = trigramStates.find(
      (trigram) =>
        trigram.trigramLines[0] === line3.value &&
        trigram.trigramLines[1] === line2.value &&
        trigram.trigramLines[2] === line1.value
    );

    if (!upperTrigram) {
      upperTrigram = trigramStates[0];
    }

    if (!lowerTrigram) {
      lowerTrigram = trigramStates[0];
    }

    // set the trigram names
    return [upperTrigram, lowerTrigram];
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
    return newHexagram;
  };

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

  useEffect(() => {
    const [upperTrigram, lowerTrigram] = checkTrigrams(lines);
    setTrigrams([upperTrigram, lowerTrigram]);
  }, [lines]);

  useEffect(() => {
    const newHexagram = checkHexagram(trigrams);
    setHexagram(newHexagram);
  }, [trigrams]);

  useEffect(() => {
    async function fetchDekorne() {
      const data = await getAllHexagramText();
      setDekorneText(data);
    }
    fetchDekorne();
    forceChangeHexagram(2);
  }, []);

  console.log(hexagram);

  const changingLinesExist = Object.values(lines).some((line) => line.changing);

  const transformedLines = getTransformedLines(lines);
  const transformedTrigrams = checkTrigrams(transformedLines);
  const transformedHexagram = checkHexagram(transformedTrigrams);

  const primaryHexText = dekorneText[hexagram.number - 1];
  const transformedHexText = dekorneText[transformedHexagram.number - 1];

  console.log(primaryHexText, transformedHexText);

  // Provide the context value to the consumer components
  return (
    <GlobalContext.Provider
      value={{
        hexagram,
        trigrams,
        lines,
        cycleLine,
        randomLine,
        changingLinesExist,
        forceChangeHexagram,
        transformedLines,
        transformedTrigrams,
        transformedHexagram,
        primaryHexText,
        transformedHexText,
        random,
        setRandom,
        findDesiredHexagram,
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
