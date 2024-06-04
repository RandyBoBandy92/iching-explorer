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
import { useCycleLine, useRandomLine } from "../hooks/useLineChangeHooks";
import { useCheckTrigram } from "../hooks/useCheckTrigram";
import { useCheckHexagram } from "../hooks/useCheckHexagram";
import { useGetTransformedLines } from "../hooks/useGetTransformedLines";
import { useDekorneText } from "../hooks/useDekorneText";

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
  const changingLinesExist = Object.values(lines).some((line) => line.changing);

  const dekorneText = useDekorneText();
  const checkTrigrams = useCheckTrigram(lines, setTrigrams);
  const checkHexagram = useCheckHexagram(trigrams, setHexagram);
  const forceChangeHexagram = useForceChangeHexagram(setLines);
  const setDesiredHexagram = useSetDesiredHexagram(lines, setLines);
  const cycleLine = useCycleLine(lines, setLines);
  const randomLine = useRandomLine(lines, setLines);
  const getTransformedLines = useGetTransformedLines();
  const transformedLines = getTransformedLines(lines);
  const transformedTrigrams = checkTrigrams(transformedLines);
  const transformedHexagram = checkHexagram(transformedTrigrams);

  const [primaryHexText, setPrimaryHexText] = useState(undefined);
  const [transformedHexText, setTransformedHexText] = useState(undefined);

  const [readingMode, setReadingMode] = useState({
    mode: "reading",
    modes: ["reading", "explore"],
  });

  const { flipHexagram } = useFlipHexagram(
    hexagram,
    transformedHexagram,
    lines,
    setLines
  );

  useEffect(() => {
    const transformedLines = getTransformedLines(lines);
    const transformedTrigrams = checkTrigrams(transformedLines);
    const transformedHexagram = checkHexagram(transformedTrigrams);
    setPrimaryHexText(dekorneText[hexagram.number - 1]);
    setTransformedHexText(dekorneText[transformedHexagram.number - 1]);
  }, [lines]);

  useEffect(() => {
    switch (readingMode.mode) {
      case "reading":
        setRandom(false);
        break;
      case "explore":
        setRandom(true);
        break;
      default:
        break;
    }
  }, [readingMode]);

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
        readingMode,
        setReadingMode,
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
