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
  // A hexagram is made up of 6 lines, in groups of 3 called trigrams
  // Each line can be either yin, yang, or a changing yin/yang
  // There are 8 possible trigrams, and 64 possible hexagrams
  // But because of the changing lines, there are 4096 possible hexagram readings
  const [hexagram, setHexagram] = useState(emptyHexagram);
  const [trigrams, setTrigrams] = useState([emptyTrigram, emptyTrigram]);
  const [lines, setLines] = useState(initialLines);
  const [random, setRandom] = useState(false);
  const changingLinesExist = Object.values(lines).some((line) => line.changing);

  // Multiple translations of the I-Ching have been colated into a single text
  const dekorneText = useDekorneText();

  const checkTrigrams = useCheckTrigram(lines, setTrigrams);
  const checkHexagram = useCheckHexagram(trigrams, setHexagram);
  const forceChangeHexagram = useForceChangeHexagram(setLines);
  const setDesiredHexagram = useSetDesiredHexagram(lines, setLines);
  const cycleLine = useCycleLine(lines, setLines);
  const randomLine = useRandomLine(lines, setLines);
  const getTransformedLines = useGetTransformedLines();

  // Transformed hexagram, and constituent lines/trigrams is derived from the initial set of lines
  // considered wrapping these in optimization hooks, but performance is not an issue here
  const transformedLines = getTransformedLines(lines);
  const transformedTrigrams = checkTrigrams(transformedLines);
  const transformedHexagram = checkHexagram(transformedTrigrams);

  const [primaryHexText, setPrimaryHexText] = useState(undefined);
  const [transformedHexText, setTransformedHexText] = useState(undefined);

  const [readingMode, setReadingMode] = useState({
    // Explore mode allows the user to manually change lines
    // Reading mode randomly generates a value for each line when clicked
    mode: "explore",
    modes: ["reading", "explore"],
  });

  const [showJournalModal, setShowJournalModal] = useState(false);

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
  }, [lines, hexagram, dekorneText]);

  useEffect(() => {
    switch (readingMode.mode) {
      case "reading":
        setRandom(true);
        break;
      case "explore":
        setRandom(false);
        break;
      default:
        break;
    }
  }, [readingMode]);

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
        showJournalModal,
        setShowJournalModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };
