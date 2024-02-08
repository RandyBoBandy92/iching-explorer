import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const initialState = {
  primaryHexagram: {
    hexagram: 0,
    trigrams: ["", ""],
    lines: {
      line6: 9,
      line5: 8,
      line4: 7,
      line3: 6,
      line2: 0,
      line1: 0,
    },
  },
  transformedHexagram: {
    hexagram: 0,
    trigrams: ["", ""],
    lines: {
      line6: 0,
      line5: 0,
      line4: 0,
      line3: 0,
      line2: 0,
      line1: 0,
    },
  },
};

// Create a new context
const GlobalContext = createContext();

// Create a provider component
const GlobalProvider = ({ children }) => {
  const [iChingReading, setIChingReading] = useState(initialState);

  function cycleLine(line, type) {
    const newReading = { ...iChingReading };
    const hexagram = newReading[type];
    const newHexagram = { ...hexagram };
    const newLines = { ...newHexagram.lines };
    if (newLines[line] === 0) {
      newLines[line] = 6;
    } else if (newLines[line] === 6) {
      newLines[line] = 7;
    } else if (newLines[line] === 7) {
      newLines[line] = 8;
    } else if (newLines[line] === 8) {
      newLines[line] = 9;
    } else if (newLines[line] === 9) {
      newLines[line] = 6;
    }
    newHexagram.lines = newLines;
    newReading[type] = newHexagram;
    setIChingReading(newReading);
  }

  // Provide the context value to the consumer components
  return (
    <GlobalContext.Provider value={{ iChingReading, cycleLine }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Define your propTypes
GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };
