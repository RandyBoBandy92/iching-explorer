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
import { useFlipHexagram } from "../hooks/useFlipHexagram";
import { useForceChangeHexagram } from "../hooks/useForceChangeHexagram";
import { useSetDesiredHexagram } from "../hooks/useSetDesiredHexagram";

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
  const changingLinesExist = Object.values(lines).some((line) => line.changing);

  const transformedLines = getTransformedLines(lines);
  const transformedTrigrams = checkTrigrams(transformedLines);
  const transformedHexagram = checkHexagram(transformedTrigrams);

  const [random, setRandom] = useState(false);
  const [dekorneText, setDekorneText] = useState([]);
  const { flipHexagram, flipping, setFlipping } = useFlipHexagram(
    hexagram,
    transformedHexagram,
    trigrams,
    setLines
  );
  const forceChangeHexagram = useForceChangeHexagram(setLines);
  const setDesiredHexagram = useSetDesiredHexagram(lines, setLines);

  const primaryHexText = dekorneText[hexagram.number - 1];
  const transformedHexText = dekorneText[transformedHexagram.number - 1];

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

  function checkTrigrams(linesToCheck) {
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
  }

  function checkHexagram(trigramsToCheck) {
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
  }

  function getTransformedLines(primaryLines) {
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
  }

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
  }, []);

  useEffect(() => {
    if (flipping.flippingStatus) {
      setDesiredHexagram(flipping.oldHex);
      setFlipping({ oldHex: undefined, flippingStatus: false });
    }
  }, [flipping]);

  console.log(hexagram);

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
        flipHexagram,
        random,
        setRandom,
        setDesiredHexagram,
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
